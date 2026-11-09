import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'React Native World',
  tagline: 'Um guia de React Native para quem vem do Android/Kotlin',
  favicon: 'img/favicon.svg',

  url: 'https://GuerraAna.github.io',
  baseUrl: '/react-native-world/',

  organizationName: 'GuerraAna',
  projectName: 'react-native-world',

  onBrokenLinks: 'throw',

  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },

  i18n: {
    defaultLocale: 'pt-BR',
    locales: ['pt-BR'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl: 'https://github.com/GuerraAna/react-native-world/tree/main/',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    navbar: {
      title: 'RN World',
      logo: {
        alt: 'React Native World',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'docs',
          position: 'left',
          label: 'Documentação',
          className: 'nav-icon nav-icon-docs',
        },
        {
          href: 'https://github.com/GuerraAna/react-native-world',
          label: 'GitHub',
          position: 'right',
          className: 'nav-icon nav-icon-github',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Documentação',
          items: [
            {label: 'Introdução', to: '/docs/intro'},
            {label: 'Fundamentos', to: '/docs/fundamentos'},
            {label: 'Kotlin → TypeScript', to: '/docs/linguagem'},
          ],
        },
        {
          title: 'Referências',
          items: [
            {label: 'React Native Docs', href: 'https://reactnative.dev'},
            {label: 'React Navigation', href: 'https://reactnavigation.org'},
            {label: 'Expo Docs', href: 'https://docs.expo.dev'},
            {label: 'Kotlin Docs', href: 'https://kotlinlang.org/docs/home.html'},
          ],
        },
      ],
      copyright: `Documentação pessoal de estudos · Ana Guerra · ${new Date().getFullYear()}`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['kotlin', 'java', 'groovy', 'bash', 'json', 'diff'],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
