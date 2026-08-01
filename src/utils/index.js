import { getVersion } from 'nextia'
import WebGLClass from './WebGLClass'
import WebGLMain from './WebGLMain'

const env = Object.freeze({
  ...import.meta.env,
  VERSION: getVersion(),
  HOME_PAGE: '#/about',
  MENU_WIDTH: 200,
  HEADER_HEIGHT: 50,
  VIEW_TRANSITION_NAME: 'fade',
  WINDOW_RESIZE: { md: 768, lg: 1024, xl: 1280 }
})

export { env, WebGLClass, WebGLMain }
