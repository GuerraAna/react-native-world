import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import styles from './index.module.css';

type Segment = {
  level: string;
  title: string;
  to: string;
  androidEquivalent: string;
  description: string;
};

const segments: Segment[] = [
  {
    level: 'LVL 01',
    title: 'Fundamentos',
    to: '/docs/fundamentos',
    androidEquivalent: 'JNI · Gradle · Build',
    description: 'Arquitetura do RN, Expo vs CLI e o Metro bundler.',
  },
  {
    level: 'LVL 02',
    title: 'Kotlin → TypeScript',
    to: '/docs/linguagem',
    androidEquivalent: 'Kotlin',
    description: 'Null safety, coroutines vs async/await, sealed classes vs unions.',
  },
  {
    level: 'LVL 03',
    title: 'UI e Layout',
    to: '/docs/ui',
    androidEquivalent: 'Views · Compose · XML',
    description: 'Componentes, Flexbox/Yoga, StyleSheet e listas.',
  },
  {
    level: 'LVL 04',
    title: 'Ciclo de Vida e Estado',
    to: '/docs/estado',
    androidEquivalent: 'Activity · ViewModel · Flow',
    description: 'useEffect, AppState, Context e gerenciamento de estado.',
  },
  {
    level: 'LVL 05',
    title: 'Navegação',
    to: '/docs/navegacao',
    androidEquivalent: 'Intents · NavGraph',
    description: 'React Navigation: stacks, tabs, parâmetros tipados.',
  },
  {
    level: 'LVL 06',
    title: 'Dados',
    to: '/docs/dados',
    androidEquivalent: 'Retrofit · Room · Prefs',
    description: 'HTTP, validação com Zod e armazenamento local.',
  },
  {
    level: 'LVL 07',
    title: 'Mundo Nativo',
    to: '/docs/nativo',
    androidEquivalent: 'Seu superpoder',
    description: 'TurboModules em Kotlin e o Gradle que você já conhece.',
  },
  {
    level: 'LVL 08',
    title: 'Tooling e Qualidade',
    to: '/docs/tooling',
    androidEquivalent: 'Logcat · JUnit · Espresso',
    description: 'Debug, testes e código específico por plataforma.',
  },
];

function SegmentCard({level, title, to, androidEquivalent, description}: Segment) {
  return (
    <Link to={to} className={styles.card}>
      <span className={styles.levelBadge}>{level}</span>
      <Heading as="h3">{title}</Heading>
      <p className={styles.cardEquivalent}>{androidEquivalent}</p>
      <p>{description}</p>
      <div className={styles.xpBar} aria-hidden="true" />
    </Link>
  );
}

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/intro">
            Começar a ler
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={siteConfig.title}
      description="Guia pessoal de React Native para desenvolvedores Android/Kotlin">
      <HomepageHeader />
      <main>
        <section className={styles.segments}>
          <div className="container">
            <div className="row">
              {segments.map((segment) => (
                <div key={segment.title} className="col col--4">
                  <SegmentCard {...segment} />
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
