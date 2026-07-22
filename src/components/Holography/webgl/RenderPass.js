export default class {
  scene = null
  camera = null

  constructor(scene, camera) {
    this.scene = scene
    this.camera = camera
  }

  render(renderer, writeBuffer, readBuffer) {
    renderer.setRenderTarget(readBuffer)
    renderer.render(this.scene, this.camera)
  }
}
