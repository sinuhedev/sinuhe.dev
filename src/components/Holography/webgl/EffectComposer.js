export default class {
  renderer = null
  writeBuffer = null
  readBuffer = null
  passes = []

  constructor(renderer, renderTarget) {
    this.renderer = renderer
    this.writeBuffer = renderTarget
    this.readBuffer = renderTarget.clone()
  }

  addPass(pass) {
    this.passes.push(pass)
  }

  render() {
    this.passes.forEach((e) => {
      e.render(this.renderer, this.writeBuffer, this.readBuffer)

      if (e.needsSwap) {
        const swap = this.readBuffer
        this.readBuffer = this.writeBuffer
        this.writeBuffer = swap
      }
    })
  }
}
