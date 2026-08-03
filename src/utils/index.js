import { getVersion } from 'nextia'
import WebGLClass from './WebGLClass'
import WebGLMain from './WebGLMain'

const env = Object.freeze({
  ...import.meta.env,
  VERSION: getVersion(),
  HOME_PAGE: '#/about',
  MENU_WIDTH: 200,
  HEADER_HEIGHT: 50,
  VIEW_TRANSITION_NAME: 'fade'
})

function fullscreen(element = document.documentElement) {
  if (!document.fullscreenElement) {
    return element.requestFullscreen()
  } else {
    return document.exitFullscreen()
  }
}

function isMobile() {
  const value = getComputedStyle(document.documentElement)
    .getPropertyValue('--breakpoint-md')
    .trim()

  return window.matchMedia(`(max-width: ${value})`).matches
}

export { env, fullscreen, isMobile, WebGLClass, WebGLMain }
