import React, { useEffect, useRef, useState } from 'react'
import styles from '../styles.module.css'
import { DEFAULT_NOVELAS, fetchSanityList, safeUrl, TILE_COLORS, TILE_X, TILE_Y } from '../../../script'

interface Novela {
  _id: string
  title: string
  genre?: string
  episodes?: number
  status?: string
  synopsis?: string
  watchUrl?: string
  cover?: string
}

interface NovelasSectionProps {
  onPlay: (url: string) => void
}

const pad = (n: number) => String(n).padStart(2, '0')

export const NovelasSection: React.FC<NovelasSectionProps> = ({ onPlay }) => {
  const [novelas, setNovelas] = useState<Novela[]>(DEFAULT_NOVELAS)
  const [isDemo, setIsDemo] = useState(true)
  const [activeIndex, setActiveIndex] = useState(0)
  const featRef = useRef<HTMLElement>(null)

  useEffect(() => {
    let mounted = true
    fetchSanityList('novelas')
      .then((res: any) => {
        if (mounted && Array.isArray(res) && res.length > 0) {
          setNovelas(res)
          setIsDemo(false)
          setActiveIndex(0)
        }
      })
      .catch(() => {
        // Mantém DEFAULT_NOVELAS
      })
    return () => {
      mounted = false
    }
  }, [])

  const select = (i: number) => {
    setActiveIndex(i)
    // No celular a lista fica abaixo do destaque: volta para ele ao escolher.
    const feat = featRef.current
    if (feat && window.matchMedia('(max-width: 899px)').matches) {
      const r = feat.getBoundingClientRect()
      if (r.top < 0 || r.bottom > window.innerHeight) {
        feat.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }
  }

  const index = Math.min(activeIndex, novelas.length - 1)
  const active = novelas[index]
  if (!active) return null

  const k = index % 6
  const coverUrl = active.cover && safeUrl(active.cover)
  const watchUrl = active.watchUrl && safeUrl(active.watchUrl)

  return (
    <section className={styles.nv} id="novelas">
      <div className={`w ${styles.nvh}`}>
        <div>
          <span className={styles.nvKicker}>Em cartaz na Cromática</span>
          <h2>Novelas</h2>
        </div>
        <div>
          <p>As histórias em episódios criadas pela Cromática. Escolha uma novela na programação.</p>
          {isDemo && <small data-demo>(Conteúdo de teste)</small>}
        </div>
      </div>

      <div className={`w ${styles.nvGrid}`} data-cms="novelas">
        <article
          ref={featRef}
          key={active._id || index}
          className={styles.nvFeat}
          style={{ ['--tile-color' as string]: TILE_COLORS[k] }}
        >
          <div className={styles.nvPoster} aria-hidden="true">
            {coverUrl ? (
              <img src={`${coverUrl}?w=1200&auto=format`} alt="" />
            ) : (
              <div
                className={styles.im}
                style={{
                  background: `radial-gradient(circle at ${TILE_X[k]}% ${TILE_Y[k]}%, #ececec 0, #8a8a8a 16%, #2a2a2a 42%, #050505 76%)`,
                }}
              />
            )}
            <span className={styles.nvNum}>{pad(index + 1)}</span>
          </div>

          <div className={styles.nvInfo}>
            <div className={styles.nvTags}>
              {active.status && <span className={styles.nvStatus}>{active.status}</span>}
              {active.genre && <span>{active.genre}</span>}
              {active.episodes ? <span>{active.episodes} episódios</span> : null}
            </div>
            <h3>{active.title}</h3>
            {active.synopsis && <p>{active.synopsis}</p>}
            {watchUrl && (
              <button type="button" className={`pill ${styles.nvWatch}`} onClick={() => onPlay(watchUrl)}>
                Assistir ↗
              </button>
            )}
          </div>
        </article>

        <div className={styles.nvGuide}>
          <p className={styles.nvGuideHd}>
            <span>Programação</span>
            <span>
              {pad(index + 1)} / {pad(novelas.length)}
            </span>
          </p>
          <ol className={styles.nvList}>
            {novelas.map((n, i) => {
              const isActive = i === index
              return (
                <li key={n._id || i} style={{ ['--tile-color' as string]: TILE_COLORS[i % 6] }}>
                  <button
                    type="button"
                    className={`${styles.nvItem} ${isActive ? styles.nvItemOn : ''}`}
                    aria-pressed={isActive}
                    onClick={() => select(i)}
                  >
                    <span className={styles.nvItemNum}>{pad(i + 1)}</span>
                    <span className={styles.nvItemTx}>
                      <b>{n.title}</b>
                      <small>
                        {[n.genre, n.episodes ? `${n.episodes} ep.` : null, n.status].filter(Boolean).join(' · ')}
                      </small>
                    </span>
                    <span className={styles.nvItemGo} aria-hidden="true">
                      →
                    </span>
                  </button>
                </li>
              )
            })}
          </ol>
        </div>
      </div>
    </section>
  )
}
