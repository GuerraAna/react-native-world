import {useMemo, useRef} from 'react';
import type {PointerEvent as ReactPointerEvent, ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
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

const RAY_COUNT = 72;

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
  const logoSrc = useBaseUrl('img/logo.svg');
  const heroRef = useRef<HTMLElement>(null);
  const raysRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);

  const rays = useMemo(
    () =>
      Array.from({length: RAY_COUNT}, (_, i) => {
        const angle = (360 / RAY_COUNT) * i;
        return {
          angle,
          // comprimento e opacidade variando de forma determinística
          length: 70 + ((i * 37) % 110),
          width: i % 6 === 0 ? 2 : 1,
          opacity: 0.15 + ((i * 53) % 60) / 100,
          // transição de cor seguindo o ângulo: verde -> ciano
          hue: 150 + (angle / 360) * 50,
        };
      }),
    [],
  );

  const handlePointerMove = (e: ReactPointerEvent<HTMLElement>) => {
    const rect = heroRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    if (raysRef.current) {
      raysRef.current.style.transform = `translate(${x * 16}px, ${y * 16}px) rotate(${x * 10}deg)`;
    }
    if (logoRef.current) {
      logoRef.current.style.transform = `translate(${x * 10}px, ${y * 10}px) rotate(${x * -3}deg)`;
    }
  };

  const handlePointerLeave = () => {
    if (raysRef.current) raysRef.current.style.transform = '';
    if (logoRef.current) logoRef.current.style.transform = '';
  };

  return (
    <header
      ref={heroRef}
      className={clsx('hero', styles.heroBanner)}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}>
      <div className={clsx('container', styles.heroGrid)}>
        <div className={styles.heroText}>
          <Heading as="h1" className="hero__title">
            {siteConfig.title}
          </Heading>
          <p className="hero__subtitle">{siteConfig.tagline}</p>
          <div className={styles.buttons}>
            <Link className="button button--secondary button--lg" to="/docs/intro">
              Começar a ler
            </Link>
          </div>
        </div>

        <div className={styles.burstWrap} aria-hidden="true">
          <div ref={raysRef} className={styles.rays}>
            {rays.map((ray, i) => (
              <span
                key={i}
                className={styles.ray}
                style={{
                  height: ray.length,
                  width: ray.width,
                  opacity: ray.opacity,
                  transform: `rotate(${ray.angle}deg)`,
                  background: `linear-gradient(to top, transparent, hsl(${ray.hue} 85% 65%))`,
                }}
              />
            ))}
          </div>
          <div ref={logoRef} className={styles.heroLogo}>
            <img src={logoSrc} alt="" />
          </div>
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
