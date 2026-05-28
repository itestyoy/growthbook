import {
  ExperimentMetricInterface,
  getAggregateFilters,
  isFactMetric,
} from "shared/experiments";

const AGGREGATE_FILTER_METRIC_COLUMN_ALIAS = "aggregate_filter_metric_value";

function getColumnRef(
  metric: ExperimentMetricInterface | null,
  useDenominator?: boolean,
) {
  if (!metric || !isFactMetric(metric)) return null;
  return useDenominator ? metric.denominator : metric.numerator;
}

// Builds a running-sum window function over the metric's aggregate filter column,
// partitioned by user and ordered by timestamp. The output column is used downstream
// to filter activation events to those at/after a user reaches a given event count
// (e.g. "activate after 5th event"). Returns null when no aggregate filter is set.
export function getAggregateFilterMetricColumn({
  metric,
  userIdCol,
  timestampCol,
  useDenominator,
}: {
  metric: ExperimentMetricInterface | null;
  userIdCol: string;
  timestampCol: string;
  useDenominator?: boolean;
}): string | null {
  const columnRef = getColumnRef(metric, useDenominator);
  if (!columnRef?.aggregateFilterColumn) return null;

  // getAggregateFilters today only emits filters for $$distinctUsers metrics
  if (!getAggregateFilters({ columnRef, column: "x", ignoreInvalid: true }).length) {
    return null;
  }

  const sumArg =
    columnRef.aggregateFilterColumn === "$$count"
      ? "1"
      : `m.${columnRef.aggregateFilterColumn}`;

  return `SUM(${sumArg}) OVER (PARTITION BY ${userIdCol} ORDER BY ${timestampCol} ASC ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW)`;
}

export function getAggregateFilterMetricColumnAlias(): string {
  return AGGREGATE_FILTER_METRIC_COLUMN_ALIAS;
}

// Builds the filter expressions that gate joined activation metric events on the
// running-sum column. Returns an array of conditions to be ANDed by the caller.
export function getAggregateFilterMetricConditions({
  metric,
  alias,
  useDenominator,
}: {
  metric: ExperimentMetricInterface | null;
  alias: string;
  useDenominator?: boolean;
}): string[] {
  const columnRef = getColumnRef(metric, useDenominator);
  if (!columnRef) return [];

  return getAggregateFilters({
    columnRef,
    column: `${alias}.${AGGREGATE_FILTER_METRIC_COLUMN_ALIAS}`,
    ignoreInvalid: true,
  });
}
