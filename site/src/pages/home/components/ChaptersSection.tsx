import React, { useEffect, useRef, useState } from 'react'
import styles from '../styles.module.css'
import fachadaImg from '../../../assets/escola-fachada.jpg'
import pianoImg from '../../../assets/escola-piano.jpg'
import bateriaImg from '../../../assets/escola-bateria.jpg'
import { youtubeThumb } from '../../../script'

// Capa do curta "Pestana e Rastilho" no YouTube; se não existir, usa um quadro da escola.
const FILM_ID = 'T3-1M0ONxPA'

interface ChapterPhotoProps {
  src: string
  fallback?: string
  caption: string
  fallbackCaption?: string
}

const ChapterPhoto: React.FC<ChapterPhotoProps> = ({ src, fallback, caption, fallbackCaption }) => {
  const [failed, setFailed] = useState(false)
  const useFallback = failed && !!fallback
  return (
    <figure className={styles.th}>
      <img
        src={useFallback ? fallback : src}
        alt=""
        loading="lazy"
        decoding="async"
        onError={() => setFailed(true)}
        onLoad={(e) => {
          // O YouTube devolve uma imagem cinza pequena quando a capa em alta não existe
          if (fallback && !failed && e.currentTarget.naturalWidth < 400) setFailed(true)
        }}
      />
      <figcaption>{useFallback ? fallbackCaption ?? caption : caption}</figcaption>
    </figure>
  )
}

export const ChaptersSection: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null)
  const [slideIndex, setSlideIndex] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current
      if (!container) return

      const r = container.getBoundingClientRect()
      const H = window.innerHeight
      const progress = Math.max(0, Math.min(1, -r.top / (r.height - H)))
      const k = Math.min(2, Math.floor(progress * 3))
      setSlideIndex(k)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll)
    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [])

  const progressPercent = (slideIndex + 1) * 33.34

  return (
    <section ref={containerRef} className={styles.hs} id="capitulos">
      <div className={styles.pin}>
        <div
          className={styles.track}
          id="tk"
          style={{ transform: `translateX(-${slideIndex * 100}vw)` }}
        >
          <div className={styles.sl}>
            <div className={styles.ord}>01/</div>
            <div>
              <h3>A escola</h3>
              <p>
                Nascemos para ensinar música com qualidade e a preço justo, para alunos de todas
                as idades. Cada curso se adapta ao ritmo e ao objetivo de quem aprende.
              </p>
            </div>
            <ChapterPhoto src={fachadaImg} caption="A sede da Cromática, em Patrocínio" />
          </div>

          <div className={styles.sl}>
            <div className={styles.ord}>02/</div>
            <div>
              <h3>Os filmes</h3>
              <p>
                A paixão pela arte saiu da sala de aula e chegou às telas. Dos pequenos projetos
                ligados à escola e à comunidade vieram curtas, séries e longas de forte apelo
                emocional.
              </p>
            </div>
            <ChapterPhoto
              src={youtubeThumb(FILM_ID)}
              fallback={pianoImg}
              caption="Pestana e Rastilho, curta da Cromática"
              fallbackCaption="Gravação na Cromática"
            />
          </div>

          <div className={styles.sl}>
            <div className={styles.ord}>03/</div>
            <div>
              <h3>Hoje</h3>
              <p>
                Roteirizamos, produzimos e levamos nossas histórias a eventos e mercados
                internacionais do audiovisual. Duas linguagens, um mesmo propósito.
              </p>
            </div>
            <ChapterPhoto src={bateriaImg} caption="Aula de bateria na Cromática" />
          </div>
        </div>
        <div
          className={styles.sp}
          id="sp"
          style={{ width: `${progressPercent}%` }}
        />
      </div>
    </section>
  )
}
