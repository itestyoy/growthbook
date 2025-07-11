// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import { themes } from "prism-react-renderer";

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "GrowthBook Docs",
  tagline: "Open source feature flagging and A/B testing platform.",
  url: "https://docs.growthbook.io",
  baseUrl: "/",
  onBrokenLinks: "throw",
  onBrokenAnchors: "warn",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/favicon.ico",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "growthbook", // Usually your GitHub org/user name.
  projectName: "growthbook", // Usually your repo name.

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  future: {
    experimental_faster: true,
  },

  // Kapa.ai chat bot on Docs page
  scripts: [
    {
      src: "https://widget.kapa.ai/kapa-widget.bundle.js",
      "data-website-id": "c4406b9f-35c5-43ca-b0c1-e7c0e261831f", // Safe to expose publicly
      "data-user-analytics-cookie-enabled": "false",
      "data-project-name": "GrowthBook",
      "data-project-color": "#7817d3",
      "data-modal-example-questions":
        "How do I create a feature flag?, How do I run an experiment?",
      "data-project-logo": "/img/gb-logo-white.svg",
      "data-modal-image": "/img/gb-logo-ai.svg",
      "data-button-width": "72px",
      "data-button-height": "72px",
      async: true,
    },
    {
      src: "https://w.appzi.io/w.js?token=jZ31J",
      async: true,
    },
  ],
  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          breadcrumbs: true,
          remarkPlugins: [
            [require("@docusaurus/remark-plugin-npm2yarn"), { sync: true }],
            remarkMath,
          ],
          rehypePlugins: [rehypeKatex],
          sidebarPath: require.resolve("./sidebars.js"),
          routeBasePath: "/", // Serve the docs at the site's root
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: "https://github.com/growthbook/growthbook/edit/main/docs/",
        },
        blog: false,
        theme: {
          customCss: [
            require.resolve("./src/styles/custom.scss"),
            require.resolve("modern-normalize/modern-normalize.css"),
          ],
        },
        gtag: {
          trackingID: "G-3W683MDLMQ",
        },
      }),
    ],
    [
      "redocusaurus",
      {
        // Plugin Options for loading OpenAPI files
        specs: [
          {
            spec: "../packages/back-end/generated/spec.yaml",
            route: "/api/",
          },
        ],
      },
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    {
      navbar: {
        //hideOnScroll: true,
        //title: 'GrowthBook Docs',
        logo: {
          alt: "GrowthBook Docs",
          src: "img/growthbook-docslogo-light.png",
          srcDark: "img/growthbook-docslogo-dark.png",
        },
        items: [
          {
            to: "/",
            label: "Docs",
            activeBaseRegex: "/(?!api)",
            position: "left",
          },
          {
            to: "/api",
            label: "API",
            position: "left",
          },
          {
            href: "https://growthbook.io",
            label: "Home",
            position: "right",
          },
          {
            href: "https://app.growthbook.io",
            label: "Log in / sign up",
            position: "right",
          },
          {
            href: "https://github.com/growthbook/growthbook",
            label: "GitHub",
            position: "right",
          },
          {
            label: "Support",
            position: "right",
            items: [
              {
                href: "https://slack.growthbook.io",
                label: "Join our Slack",
                target: "_blank",
                rel: null,
              },
              {
                href:
                  "https://github.com/growthbook/growthbook/issues/new/choose",
                label: "Open an issue",
                target: "_blank",
                rel: null,
              },
            ],
            className: "navbar__link--support",
          },
        ],
      },
      metadata: [
        {
          name: "og:image",
          content: "https://cdn.growthbook.io/growthbook-github-card.png",
        },
        {
          name: "twitter:image",
          content: "https://cdn.growthbook.io/growthbook-github-card.png",
        },
        {
          name: "twitter:card",
          content: "summary_large_image",
        },
        {
          name: "twitter:domain",
          content: "growthbook.io",
        },
        {
          name: "twitter:site",
          content: "@growth_book",
        },
        {
          name: "twitter:creator",
          content: "growthbook",
        },
        {
          name: "og:type",
          content: "website",
        },
        {
          name: "og:site_name",
          content: "GrowthBook Docs",
        },
      ],
      prism: {
        theme: themes.github,
        darkTheme: themes.dracula,
        additionalLanguages: [
          "csharp",
          "ruby",
          "php",
          "java",
          "kotlin",
          "swift",
          "dart",
          "groovy",
          "scala",
          "json",
          "bash",
        ],
      },
      colorMode: {
        defaultMode: "light",
        disableSwitch: false,
        respectPrefersColorScheme: true,
      },
      algolia: {
        // The application ID provided by Algolia
        appId: "MN7ZMY63CG",

        // Public API key: it is safe to commit it
        apiKey: "43a7bc1b7a1494649e79a9fa7c3376be",

        indexName: "growthbook",

        // Optional: see doc section below
        contextualSearch: true,

        // Optional: Specify domains where the navigation should occur through window.location instead on history.push. Useful when our Algolia config crawls multiple documentation sites and we want to navigate with window.location.href to them.
        //externalUrlRegex: "external\\.com|domain\\.com",

        // Optional: Algolia search parameters
        searchParameters: {},

        // Optional: path for search page that enabled by default (`false` to disable it)
        searchPagePath: "search",

        //... other Algolia params
      },
    },
  plugins: [
    "docusaurus-plugin-sass",
    [
      "docusaurus-plugin-llms",
      {
        includeOrder: [
          "index.mdx",
          "overview.mdx",
          "quick-start.mdx",
          "guide/index.mdx",
          "guide/create-react-app-and-growthbook.mdx",
          "guide/nextjs-and-growthbook.mdx",
          "guide/nextjs-app-router.mdx",
          "guide/nextjs-and-vercel-feature-flags.mdx",
          "guide/express-js.mdx",
          "guide/deno-hono.mdx",
          "guide/strapi.mdx",
          "guide/contentful.mdx",
          "guide/rudderstack-and-nextjs-with-growthbook.mdx",
          "guide/google-tag-manager-and-growthbook.mdx",
          "guide/importing.mdx",
          "experimentation-analysis/connecting-to-your-data-warehouse.mdx",
          "experimentation-analysis/data-source-configuration.mdx",
          "experimentation-analysis/managed-warehouse.mdx",
          "experimentation-analysis/data-pipeline.mdx",
          "warehouses/*",
          "lib/index.mdx",
          "lib/js.mdx",
          "lib/react.mdx",
          "lib/node.mdx",
          "lib/python.mdx",
          "lib/php.mdx",
          "lib/ruby.mdx",
          "lib/java.mdx",
          "lib/go.mdx",
          "lib/csharp.mdx",
          "lib/kotlin.mdx",
          "lib/swift.mdx",
          "lib/flutter.mdx",
          "lib/vue.mdx",
          "lib/react-native.mdx",
          "lib/elixir.mdx",
          "lib/script-tag.mdx",
          "lib/build-your-own.mdx",
          "lib/edge/*",
          "integrations/*",
          "event-trackers/*",
          "features/index.mdx",
          "features/basics.mdx",
          "features/prerequisites.mdx",
          "features/environments.mdx",
          "features/approval-flows.mdx",
          "features/rules.mdx",
          "features/targeting.mdx",
          "features/safe-rollouts.mdx",
          "features/scheduling.mdx",
          "features/stale-detection.mdx",
          "features/code-references.mdx",
          "experiments.mdx",
          "feature-flag-experiments.mdx",
          "experimentation-analysis/experiment-configuration.mdx",
          "experimentation-analysis/experiment-results.mdx",
          "experimentation-analysis/experiment-time-series.mdx",
          "experimentation-analysis/decision-framework.mdx",
          "experimentation-analysis/cluster-experiments.mdx",
          "experimentation-analysis/dimensions.mdx",
          "experimentation-analysis/query-optimization.mdx",
          "running-experiments/pre-launch-checklist.mdx",
          "running-experiments/experiment-templates.mdx",
          "running-experiments/making-changes.mdx",
          "running-experiments/url-redirects.mdx",
          "metrics/index.mdx",
          "metrics/metrics.mdx",
          "metrics/metric-examples.mdx",
          "metrics/legacy-metrics.mdx",
          "kb/experiments/*",
          "kb/metrics/*",
          "using/index.mdx",
          "using/fundamentals.mdx",
          "using/experimenting.mdx",
          "using/experimentation-best-practices.mdx",
          "using/experimentation-problems.mdx",
          "using/growthbook-best-practices.mdx",
          "using/product-development.mdx",
          "using/programs.mdx",
          "using/security.mdx",
          "insights.mdx",
          "sticky-bucketing.mdx",
          "visual-editor.mdx",
          "faq.mdx",
          "importing-experiments.mdx",
          "account/user-permissions.mdx",
          "account/audit-logs.mdx",
          "sso.mdx",
          "compliance.mdx",
          "statistics/*",
          "bandits/*",
          "webhooks/*",
          "self-host/*",
          "tools/*",
          "kb/glossary.mdx",
          "kb/google-analytics/*",
        ],
        includeUnmatchedLast: true,
      },
    ],
  ],

  stylesheets: [
    {
      href: "https://cdn.jsdelivr.net/npm/katex@0.13.24/dist/katex.min.css",
      type: "text/css",
      integrity:
        "sha384-odtC+0UGzzFL/6PNoE8rX/SPcQDXBJ+uRepguP4QkPCm2LBxH3FA3y+fKSiJ+AmM",
      crossorigin: "anonymous",
    },
  ],
};

module.exports = config;
