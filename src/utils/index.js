import { getVersion } from 'nextia'
import WebGLClass from './WebGLClass'
import WebGLMain from './WebGLMain'

const env = Object.freeze({
  VERSION: getVersion(),
  HOME_PAGE: '#/about',
  MENU_WIDTH: 200,
  HEADER_HEIGHT: 50,
  VIEW_TRANSITION_NAME: 'fade',
  PUBLIC_TITLE: process.env.PUBLIC_TITLE
})

function fullscreen(element = document.documentElement) {
  if (!document.fullscreenElement) {
    return element.requestFullscreen()
  } else {
    return document.exitFullscreen()
  }
}

function isMobile() {
  const value = window
    .getComputedStyle(document.documentElement)
    .getPropertyValue('--breakpoint-md')
    .trim()

  return window.matchMedia(`(max-width: ${value})`).matches
}

function getMenu() {
  if (isMobile()) return false
  return (window.localStorage.getItem('menu') ?? true) !== 'false'
}

export { env, fullscreen, getMenu, isMobile, WebGLClass, WebGLMain }
