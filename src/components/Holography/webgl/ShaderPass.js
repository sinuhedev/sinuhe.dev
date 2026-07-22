import {
  Mesh,
  OrthographicCamera,
  PlaneGeometry,
  Scene,
  ShaderMaterial,
  UniformsUtils
} from 'three'

export default class {
  needsSwap = true
  // if set to true, the result of the pass is rendered to screen
  renderToScreen = false
  uniforms = null
  material = null
  quad = null
  scene = null
  camera = null

  constructor(shader) {
    this.uniforms = UniformsUtils.clone(shader.uniforms)
    this.material = new ShaderMaterial({
      defines: Object.assign({}, shader.defines),
      uniforms: this.uniforms,
      vertexShader: shader.vertexShader,
      fragmentShader: shader.fragmentShader
    })

    this.camera = new OrthographicCamera(-1, 1, 1, -1, 0, 1)
    this.scene = new Scene()

    this.quad = new Mesh(new PlaneGeometry(2, 2), null)
    this.scene.add(this.quad)
  }

  render(renderer, writeBuffer, readBuffer) {
    this.uniforms.tDiffuse.value = readBuffer.texture
    this.quad.material = this.material

    if (this.renderToScreen) {
      renderer.setRenderTarget(null)
    } else {
      renderer.setRenderTarget(writeBuffer)
    }

    renderer.render(this.scene, this.camera)
  }
}
