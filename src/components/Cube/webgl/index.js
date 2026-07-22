import textureFrag from 'assets/shaders/texture.frag.glsl'
import textureVert from 'assets/shaders/texture.vert.glsl'
import rockTesture from 'assets/textures/rock.webp'
import {
  BoxGeometry,
  Mesh,
  PerspectiveCamera,
  Scene,
  ShaderMaterial,
  TextureLoader
} from 'three'

import { WebGLMain } from 'utils'

let scene, camera, cube

function init() {
  scene = new Scene()
  camera = new PerspectiveCamera(75, 1, 0.1, 1000)
  camera.position.z = 5

  const texture = new TextureLoader().load(rockTesture)
  const geometry = new BoxGeometry()
  const material = new ShaderMaterial({
    uniforms: {
      uTexture: { value: texture }
    },
    vertexShader: textureVert,
    fragmentShader: textureFrag
  })

  cube = new Mesh(geometry, material)
  scene.add(cube)
}

function resize({ width, height }) {
  camera.aspect = width / height
  camera.updateProjectionMatrix()
}

function animate({ renderer }) {
  cube.rotation.x += 0.01
  cube.rotation.y += 0.01

  renderer.render(scene, camera)
}

export default WebGLMain(init, resize, animate)
