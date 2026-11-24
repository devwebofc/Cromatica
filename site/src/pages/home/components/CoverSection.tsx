import React from 'react'
import styles from '../styles.module.css'
import { LogoMark } from '../../../components/ui/Logo'

// Vídeo da hero (YouTube): toca sozinho, sem som, em loop e sem controles.
const HERO_VIDEO_ID = 'JxKQtUfOuK0'
const HERO_VIDEO_SRC =
  `https://www.youtube-nocookie.com/embed/${HERO_VIDEO_ID}` +
  `?autoplay=1&mute=1&loop=1&playlist=${HERO_VIDEO_ID}&controls=0&playsinline=1&rel=0&modestbranding=1&disablekb=1&iv_load_policy=3`
const HERO_VIDEO_URL = `https://www.youtube.com/watch?v=${HERO_VIDEO_ID}`

// As 12 cores da roda cromática (uma por semitom)
const SCALE = [
  '#E3000B', '#FF5A1F', '#FF9A1F', '#FFE600', '#9BD62F', '#1FC48D',
  '#14B8C4', '#2E4BFF', '#6A4DDB', '#9A4DDB', '#D63384', '#F0386B',
]

interface CoverSectionProps {
  onPlay: (url: string) => void
}

export const CoverSection: React.FC<CoverSectionProps> = ({ onPlay }) => {
  return (
    <section className={styles.cover} id="inicio">
      <div className={`w ${styles.cvTop}`}>
        <span className={styles.cvKicker}>Patrocínio · Minas Gerais</span>
        <span className={styles.cvPillars}>
          <i style={{ background: 'var(--red)' }} />Música
          <i style={{ background: 'var(--blue)' }} />Filmes
          <i style={{ background: 'var(--sun)' }} />Educação
        </span>
      </div>

      <div className="w">
        <h1 className={styles.wm} aria-label="Cromática">
          <span aria-hidden="true">
            CR<i><LogoMark /></i>MÁTICA
          </span>
        </h1>
        <div className={styles.scale} aria-hidden="true">
          {SCALE.map((c) => (
            <span key={c} style={{ background: c }} />
          ))}
        </div>
      </div>

      <div className={`w ${styles.cvDefs}`}>
        <p className={styles.cvPhon}>
          <b>cro·má·ti·ca</b> <span>/substantivo feminino/</span>
        </p>
        <ol className={styles.def}>
          <li>Relativo às cores.</li>
          <li>Escala musical formada por doze semitons.</li>
          <li>Escola de música e produtora de filmes de Patrocínio, Minas Gerais.</li>
        </ol>
      </div>

      <div className={`w ${styles.cg}`}>
        <div className={styles.cvText}>
          <p className={styles.cgText}>
            Do primeiro acorde ao set de filmagem: arte que transforma vidas.
          </p>
          <div className={styles.cvCta}>
            <a className="pill" href="#filmes">
              Ver os filmes
            </a>
            <a className={`pill ${styles.cvGhost}`} href="#contato">
              Fale com a gente
            </a>
          </div>
        </div>

        <div className={styles.galBox}>
          <div className={styles.gal}>
            <iframe
              src={HERO_VIDEO_SRC}
              title="Vídeo de apresentação da Cromática"
              allow="autoplay; encrypted-media; picture-in-picture"
              referrerPolicy="strict-origin-when-cross-origin"
              loading="eager"
              tabIndex={-1}
            />
            <span className={styles.galRec} aria-hidden="true">
              Cromática
            </span>
            <button type="button" className={styles.galSound} onClick={() => onPlay(HERO_VIDEO_URL)}>
              <span aria-hidden="true">▶</span> Assistir com som
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
