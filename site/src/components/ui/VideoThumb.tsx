import React, { useEffect, useState } from 'react'
import { vimeoId, vimeoThumb, youtubeId, youtubeThumbCandidates } from '../../script'

interface VideoThumbProps {
  /** Link do vídeo (YouTube ou Vimeo) */
  url: string
  /** Imagens locais para usar se nenhuma capa do vídeo carregar */
  fallback?: string
  className?: string
  alt?: string
  /** Avisa se está mostrando a capa do vídeo ou o fallback */
  onSourceChange?: (usingFallback: boolean) => void
}

// O YouTube responde com uma imagem cinza de 120x90 (e não com erro)
// quando uma resolução não existe. Qualquer coisa desse tamanho é descartada.
const PLACEHOLDER_MAX_WIDTH = 120

/**
 * Capa de vídeo resistente: tenta as resoluções do YouTube em sequência
 * (maxres → sd → hq → mq), busca a capa do Vimeo via oEmbed e, se nada
 * funcionar, usa o `fallback` ou não renderiza nada.
 */
export const VideoThumb: React.FC<VideoThumbProps> = ({ url, fallback, className, alt = '', onSourceChange }) => {
  const [candidates, setCandidates] = useState<string[]>(() => {
    const yt = youtubeId(url)
    return yt ? youtubeThumbCandidates(yt) : []
  })
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const yt = youtubeId(url)
    setIndex(0)
    if (yt) {
      setCandidates(youtubeThumbCandidates(yt))
      return
    }
    setCandidates([])
    if (!vimeoId(url)) return
    let alive = true
    vimeoThumb(url).then((thumb: string | null) => {
      if (alive && thumb) setCandidates([thumb])
    })
    return () => {
      alive = false
    }
  }, [url])

  const list = fallback ? [...candidates, fallback] : candidates
  const src = list[index]
  const usingFallback = !!fallback && src === fallback

  useEffect(() => {
    onSourceChange?.(usingFallback)
  }, [usingFallback, onSourceChange])

  if (!src) return null

  const next = () => setIndex((i) => i + 1)

  return (
    <img
      key={src}
      className={className}
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      onError={next}
      onLoad={(e) => {
        if (src !== fallback && e.currentTarget.naturalWidth <= PLACEHOLDER_MAX_WIDTH) next()
      }}
    />
  )
}
