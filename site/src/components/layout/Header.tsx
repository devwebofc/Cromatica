import React from 'react'
import { LogoMark } from '../ui/Logo'

interface HeaderProps {
  onToggleMenu: () => void
  menuOpen: boolean
}

export const Header: React.FC<HeaderProps> = ({ onToggleMenu, menuOpen }) => {
  return (
    <header>
      <a className="brand" href="#inicio" aria-label="Cromática — início">
        <LogoMark className="brand-mark" />
        Cromática
      </a>
      <nav>
        <a href="#capitulos">Sobre</a>
        <a href="#filmes">Filmes</a>
        <a href="#novelas">Novelas</a>
        <a href="#festival">Festival</a>
        <a href="#equipe">Equipe</a>
        <a href="#contato">Contato</a>
      </nav>
      <button
        className="menu"
        id="mb"
        type="button"
        aria-expanded={menuOpen}
        onClick={onToggleMenu}
      >
        {menuOpen ? 'Fechar' : 'Menu'}
      </button>
    </header>
  )
}
