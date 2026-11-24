import React from 'react'
import styles from '../styles.module.css'
import { LogoMark } from '../../../components/ui/Logo'

// Vídeo da hero (YouTube): toca sozinho, sem som, em loop e sem controles.
const HERO_VIDEO_ID = 'JxKQtUfOuK0'
const HERO_VIDEO_SRC =
  `https://www.youtube-nocookie.com/embed/${HERO_VIDEO_ID}` +
  `?autoplay=1&mute=1&loop=1&playlist=${HERO_VIDEO_ID}&controls=0&playsinline=1&rel=0&modestbranding=1&disablekb=1&iv_load_policy=3`

export const CoverSection: React.FC = () => {
  return (
    <section className={styles.cover} id="inicio">
      <div className="w">
        <h1 className={styles.wm} aria-label="Cromática">
          <span aria-hidden="true">
            CR<i><LogoMark /></i>MÁTICA
          </span>
        </h1>
      </div>
      <div className={`w ${styles.cg}`}>
        <div className={styles.def}>
          <b>Cromática</b>
          <small>/kro·má·ti·ca/ substantivo feminino</small>
          <ol>
            <li>Relativo às cores.</li>
            <li>Escala musical formada por doze semitons.</li>
            <li>Escola de música e produtora de filmes de Patrocínio, Minas Gerais.</li>
          </ol>
        </div>
        <p className={styles.cgText}>
          Do primeiro acorde ao set de filmagem: uma escola de música e uma produtora de filmes
          que transformam vidas por meio da arte.
          <span>(Role para explorar)</span>
        </p>
        <div className={styles.gal}>
          <iframe
            src={HERO_VIDEO_SRC}
            title="Vídeo de apresentação da Cromática"
            allow="autoplay; encrypted-media; picture-in-picture"
            referrerPolicy="strict-origin-when-cross-origin"
            loading="eager"
            tabIndex={-1}
          />
        </div>
      </div>
    </section>
  )
}
