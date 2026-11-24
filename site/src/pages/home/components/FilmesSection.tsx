import React, { useEffect, useState } from 'react'
import styles from '../styles.module.css'
import { CARD_COLORS, DEFAULT_FILMES, fetchSanityList, videoHost } from '../../../script'
import { VideoThumb } from '../../../components/ui/VideoThumb'

interface Filme {
  _id: string
  title: string
  description?: string
  videoUrl: string
}

interface FilmesSectionProps {
  onPlay: (url: string) => void
}

export const FilmesSection: React.FC<FilmesSectionProps> = ({ onPlay }) => {
  const [filmes, setFilmes] = useState<Filme[]>(DEFAULT_FILMES)

  useEffect(() => {
    let mounted = true
    fetchSanityList('filmes')
      .then((res: any) => {
        if (mounted && Array.isArray(res) && res.length > 0) {
          setFilmes(res)
        }
      })
      .catch(() => {
        // Keeps fallback DEFAULT_FILMES
      })
    return () => {
      mounted = false
    }
  }, [])

  const pad = (n: number) => (n < 10 ? '0' : '') + n

  return (
    <div data-block>
      <section className={styles.stk} data-cms="filmes">
        {filmes.map((item, i) => {
          const colorPair = CARD_COLORS[i % CARD_COLORS.length]
          const bg = colorPair[0]
          const textColor = colorPair[1]
          const topOffset = `calc(5rem + ${Math.min(i, 8)} * 1.1rem)`
          const host = item.videoUrl ? videoHost(item.videoUrl) : null

          return (
            <article
              key={item._id || i}
              className={styles.st}
              style={{
                backgroundColor: bg,
                color: textColor,
                top: topOffset,
              }}
            >
              <div className={styles.ord}>{pad(i + 1)}/</div>
              <div className={styles.stContent}>
                <h3>{item.title}</h3>
                {item.description && <p>{item.description}</p>}
                {item.videoUrl && (
                  <button
                    type="button"
                    className="pill"
                    style={{
                      backgroundColor: textColor,
                      color: bg,
                      alignSelf: 'flex-start',
                      marginTop: 'auto',
                    }}
                    onClick={() => onPlay(item.videoUrl)}
                  >
                    {host ? `Assistir no ${host} ↗` : 'Assistir ↗'}
                  </button>
                )}
              </div>
              {host && (
                <button
                  type="button"
                  className={styles.stThumb}
                  aria-label={`Assistir "${item.title}" no ${host}`}
                  onClick={() => onPlay(item.videoUrl)}
                >
                  <VideoThumb url={item.videoUrl} />
                  <span className={styles.stPlay} aria-hidden="true" />
                </button>
              )}
            </article>
          )
        })}
      </section>
    </div>
  )
}
