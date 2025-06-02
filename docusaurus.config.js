// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import { themes as prismThemes } from "prism-react-renderer";

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "NodeDash",
  tagline: "Modern, flow-based device management for the Helium Network",
  favicon: "img/favicon.ico",

  // Set the production url of your site here
  url: "https://docs.nodedash.app",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "helium", // Usually your GitHub org/user name.
  projectName: "helium-device-manager", // Usually your repo name.

  onBrokenLinks: "warn",
  onBrokenMarkdownLinks: "warn",

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: "./sidebars.js",
          // Change the docs to be at the site root
          routeBasePath: "/",
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: "https://github.com/NodeDash/Docs/tree/main/",
        },

        theme: {
          customCss: "./src/css/custom.css",
        },
      }),
    ],
  ],

  // Configure client-side redirects
  plugins: [
    [
      "@docusaurus/plugin-client-redirects",
      {
        redirects: [
          {
            from: "/",
            to: "/intro",
          },
        ],
      },
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: "img/helium-device-manager-social-card.jpg",
      navbar: {
        title: "NodeDash",
        logo: {
          alt: "NodeDash Logo",
          src: "img/logo.svg",
        },
        items: [
          {
            type: "docSidebar",
            sidebarId: "tutorialSidebar",
            position: "left",
            label: "Documentation",
          },

          {
            href: "https://github.com/NodeDash",
            label: "GitHub",
            position: "right",
          },
        ],
      },
      footer: {
        style: "dark",
        links: [
          {
            title: "Docs",
            items: [
              {
                label: "Getting Started",
                to: "/getting-started/quick-start",
              },
              {
                label: "Devices",
                to: "/devices/overview",
              },
              {
                label: "Flows",
                to: "/flows/overview",
              },
              {
                label: "Functions",
                to: "/functions/overview",
              },
            ],
          },
          {
            title: "Community",
            items: [
              {
                label: "Discord",
                href: "https://discord.gg/helium",
              },
              {
                label: "Twitter",
                href: "https://twitter.com/helium",
              },
              {
                label: "Forum",
                href: "https://community.helium.com",
              },
            ],
          },
          {
            title: "More",
            items: [
              {
                label: "GitHub",
                href: "https://github.com/NodeDash",
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} NodeDash. Built with Docusaurus.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
        additionalLanguages: ["bash", "json", "javascript", "typescript"],
      },
    }),
};

export default config;
