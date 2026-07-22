import additiveBlendingFrag from 'assets/shaders/additiveBlending.frag.glsl'
import badTVFrag from 'assets/shaders/badTV.frag.glsl'
import horizontalBlurFrag from 'assets/shaders/horizontalBlur.frag.glsl'
import vertex from 'assets/shaders/vertex.vert.glsl'
import verticalBlurFrag from 'assets/shaders/verticalBlur.frag.glsl'
import volumetericLightFrag from 'assets/shaders/volumetericLight.frag.glsl'
import {
  LinearFilter,
  Mesh,
  MeshBasicMaterial,
  Object3D,
  PerspectiveCamera,
  PlaneGeometry,
  RGBAFormat,
  Scene,
  TextureLoader,
  Timer,
  Vector2,
  WebGLRenderTarget
} from 'three'
import { WebGLMain } from 'utils'
import EffectComposer from './EffectComposer'
import RenderPass from './RenderPass'
import ShaderPass from './ShaderPass'

const lightColor = 0x0099ff
const DEFAULT_LAYER = 0
const OCCLUSION_LAYER = 1
const bluriness = 7

let scene, timer, camera, hBlur, vBlur, occlusionComposer, blendPass, composer

function init({ renderer, width, height }) {
  scene = new Scene()
  timer = new Timer()
  camera = new PerspectiveCamera(75, 1, 0.1, 1000)

  hBlur = new ShaderPass({
    uniforms: {
      tDiffuse: { value: null },
      h: { value: 1.0 / 512.0 }
    },
    vertexShader: vertex,
    fragmentShader: horizontalBlurFrag
  })
  vBlur = new ShaderPass({
    uniforms: {
      tDiffuse: { value: null },
      v: { value: 1.0 / 512.0 }
    },
    vertexShader: vertex,
    fragmentShader: verticalBlurFrag
  })

  // Bad TV Pass
  const badTVPass = new ShaderPass({
    uniforms: {
      tDiffuse: { value: null },
      time: { value: 0.0 },
      distortion: { value: 3.0 },
      distortion2: { value: 5.0 },
      speed: { value: 0.2 },
      rollSpeed: { value: 0.1 }
    },
    vertexShader: vertex,
    fragmentShader: badTVFrag
  })
  badTVPass.uniforms.distortion.value = 1.9
  badTVPass.uniforms.distortion2.value = 1.2
  badTVPass.uniforms.speed.value = 0.1
  badTVPass.uniforms.rollSpeed.value = 0

  // Volumetric Light Pass
  const lightSource = new Object3D()
  lightSource.position.x = 0
  lightSource.position.y = -15
  lightSource.position.z = -15

  const vector = lightSource.position.project(camera)
  const x = (vector.x + 1) / 2
  const y = (vector.y + 1) / 2

  const vlPass = new ShaderPass({
    uniforms: {
      tDiffuse: { value: null },
      lightPosition: { value: new Vector2(0.5, 0.5) },
      exposure: { value: 1 },
      decay: { value: 1 },
      density: { value: 6 },
      weight: { value: 0.57 },
      samples: { value: 30 }
    },
    vertexShader: vertex,
    fragmentShader: volumetericLightFrag
  })
  vlPass.needsSwap = false
  vlPass.uniforms.lightPosition.value.set(x, y)

  const occRenderTarget = new WebGLRenderTarget(width, height)

  // Occlusion Composer
  occlusionComposer = new EffectComposer(renderer, occRenderTarget)
  occlusionComposer.addPass(new RenderPass(scene, camera))
  occlusionComposer.addPass(hBlur)
  occlusionComposer.addPass(vBlur)
  occlusionComposer.addPass(hBlur)
  occlusionComposer.addPass(vBlur)
  occlusionComposer.addPass(hBlur)
  occlusionComposer.addPass(badTVPass)
  occlusionComposer.addPass(vlPass)

  blendPass = new ShaderPass({
    uniforms: {
      tDiffuse: { value: null },
      tAdd: { value: null }
    },
    vertexShader: vertex,
    fragmentShader: additiveBlendingFrag
  })
  blendPass.uniforms.tAdd.value = occRenderTarget.texture
  blendPass.renderToScreen = true
}

function resize({ renderer, width, height }) {
  const aspect = width / height
  camera.aspect = aspect
  camera.position.z = aspect < 1.4 ? 8 : 4
  camera.updateProjectionMatrix()

  hBlur.uniforms.h.value = bluriness / width
  vBlur.uniforms.v.value = bluriness / height

  composer = new EffectComposer(
    renderer,
    new WebGLRenderTarget(width, height, {
      minFilter: LinearFilter,
      magFilter: LinearFilter,
      format: RGBAFormat,
      stencilBuffer: false
    })
  )
  composer.addPass(new RenderPass(scene, camera))
  composer.addPass(blendPass)
}

function animate() {
  timer.update()
  const elapsed = timer.getElapsed()

  if (scene.getObjectByName('occMesh')) {
    const itemMesh = scene.getObjectByName('itemMesh')
    const occMesh = scene.getObjectByName('occMesh')

    itemMesh.rotation.y = Math.sin(elapsed) / 10
    itemMesh.rotation.z = Math.cos(elapsed) / 10
    occMesh.rotation.copy(itemMesh.rotation)
  }

  camera.layers.set(OCCLUSION_LAYER)
  occlusionComposer.render()

  camera.layers.set(DEFAULT_LAYER)
  composer.render()
}

function onChange(value) {
  const itemMesh2 = scene.getObjectByName('itemMesh')

  if (itemMesh2) {
    const occMesh2 = scene.getObjectByName('occMesh')
    scene.remove(itemMesh2)
    scene.remove(occMesh2)
  }

  const itemTexture = new TextureLoader().load(value)
  const itemGeo = new PlaneGeometry(9, 2.1)
  const itemMaterial = new MeshBasicMaterial({
    transparent: true,
    opacity: 0.7
  })

  itemMaterial.map = itemTexture

  const itemMesh = new Mesh(itemGeo, itemMaterial)
  itemMesh.name = 'itemMesh'
  scene.add(itemMesh)

  const occItemMaterial = new MeshBasicMaterial({
    color: lightColor
  })
  occItemMaterial.map = itemTexture
  const occMesh = new Mesh(itemGeo, occItemMaterial)
  occMesh.layers.set(OCCLUSION_LAYER)
  occMesh.name = 'occMesh'
  scene.add(occMesh)
}

export default WebGLMain(init, resize, animate, {
  onChange
})
