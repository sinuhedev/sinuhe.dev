import { WebGLRenderer } from 'three'

export default (init, resize, animate, fx) => {
  let animationFrameId, renderer

  function action(
    canvas,
    width = '100%',
    height = '100%',
    props = { antialias: true }
  ) {
    let clientWidth, clientHeight

    canvas.style.width = width
    canvas.style.height = height

    renderer = new WebGLRenderer({ canvas, ...props })
    clientWidth = canvas.clientWidth
    clientHeight = canvas.clientHeight

    init({ renderer, width: clientWidth, height: clientHeight })

    const onResize = () => {
      clientWidth = canvas.clientWidth
      clientHeight = canvas.clientHeight

      renderer.setSize(clientWidth, clientHeight)
      resize({ renderer, width: clientWidth, height: clientHeight })

      canvas.style.width = width
      canvas.style.height = height
    }
    window.addEventListener('resize', () => onResize())
    onResize()

    const onAnimate = () => {
      animationFrameId = window.requestAnimationFrame(onAnimate)
      animate({ renderer, width: clientWidth, height: clientHeight })
    }
    onAnimate()
  }

  function stop() {
    renderer.dispose()
    window.cancelAnimationFrame(animationFrameId)
  }

  return {
    action,
    stop,
    ...fx
  }
}
