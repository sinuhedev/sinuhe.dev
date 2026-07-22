import { WebGLRenderer } from 'three'

export default class {
  animationFrameId
  renderer
  width
  height

  action(canvas, width = '100%', height = '100%', props = { antialias: true }) {
    /**
     * init
     */
    canvas.style.width = width
    canvas.style.height = height

    this.renderer = new WebGLRenderer({ canvas, ...props })
    this.width = canvas.clientWidth
    this.height = canvas.clientHeight

    this.init()

    /**
     * resize
     */
    const resize = () => {
      this.width = canvas.clientWidth
      this.height = canvas.clientHeight

      this.renderer.setSize(this.width, this.height)
      this.resize()

      canvas.style.width = width
      canvas.style.height = height
    }
    window.addEventListener('resize', () => resize())
    resize()

    /**
     * animate
     */
    const animate = () => {
      this.animationFrameId = window.requestAnimationFrame(animate)
      this.animate()
    }
    animate()
  }

  stop() {
    this.renderer.dispose()
    window.cancelAnimationFrame(this.animationFrameId)
  }

  init() {}
  resize() {}
  animate() {}
}
