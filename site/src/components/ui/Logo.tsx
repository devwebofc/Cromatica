import React, { useId } from 'react'

interface LogoMarkProps extends React.SVGProps<SVGSVGElement> {
  /** Texto alternativo. Sem ele, o símbolo é decorativo (aria-hidden). */
  title?: string
}

/**
 * Símbolo da Cromática: meio sol com listras em "V" e o cavalete ao centro.
 * Usa `currentColor`, então a cor vem do CSS (`color`). As listras e o
 * cavalete são recortes transparentes, deixando o fundo aparecer, como na
 * logo original.
 */
export const LogoMark: React.FC<LogoMarkProps> = ({ title, ...props }) => {
  const id = useId().replace(/:/g, '')
  const maskId = `cromatica-mark-${id}`

  return (
    <svg
      viewBox="0 0 1200 600"
      xmlns="http://www.w3.org/2000/svg"
      role={title ? 'img' : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
      focusable="false"
      {...props}
    >
      <defs>
        <mask id={maskId} maskUnits="userSpaceOnUse" x="0" y="0" width="1200" height="600">
          <path d="M0 600A600 600 0 0 1 1200 600Z" fill="#fff" />
          <g stroke="#000" strokeWidth="26" fill="none">
            <path d="M0 0L600 600M0 195L405 600M0 385L215 600" />
            <path d="M1200 0L600 600M1200 195L795 600M1200 385L985 600" />
          </g>
          <g stroke="#000" strokeWidth="15" strokeLinecap="round" strokeLinejoin="round" fill="none">
            <path d="M572 110L565 158M628 110L635 158" />
            <rect x="496" y="158" width="208" height="134" />
            <path d="M514 274L556 224L580 252M546 274L608 206L670 274Z" />
            <path d="M466 312H734" strokeWidth="18" />
            <path d="M530 312L520 386M600 312V354M670 312L680 386" />
          </g>
          <circle cx="534" cy="194" r="12" fill="#000" />
        </mask>
      </defs>
      {title && <title>{title}</title>}
      <rect width="1200" height="600" fill="currentColor" mask={`url(#${maskId})`} />
    </svg>
  )
}
