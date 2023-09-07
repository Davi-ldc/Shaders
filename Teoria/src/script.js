/*
 Principal componente do webgl
 programa feito em GLSL 
 roda na GPU
 Posiciona e da cor aos vertex na tela
 são divididos em:
 VERTEX: posiciona cada vertice
 FRAGMENT: da cor a eles
 Palavras chave:
 atributes: valores que mudam (tipo na lissão das particulas que agnt passo uma array pra geometria)
 uniforms: constantes que se mantem pra todos os vertices
*/

import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'
import vertexShader from './shaders/Vertex.glsl'
import fragmentShader from './shaders/Fragment.glsl'

/**
 * Base
 */
// Debug
const gui = new dat.GUI()
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()

/**
 * Test mesh
 */
// Geometry
const geometry = new THREE.PlaneGeometry(1, 1, 32, 32)

const count = geometry.attributes.position.count
const randoms = new Float32Array(count)

for (let i=1; i<count; i++){
    randoms[i] = Math.random()
}
geometry.setAttribute("vRandom", new THREE.BufferAttribute(randoms, 1) )

// Material
const material = new THREE.RawShaderMaterial({
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,
    side: THREE.DoubleSide,
    uniforms: {
        Frequency: { value: new THREE.Vector2(10,5)},
        Time: {value:0},
        Speed: {value:2}
    }
})
gui.add(material.uniforms.Frequency.value, 'x').min(0).max(20).step(0.1)
// gui.add(material.uniforms.Frequency.value, 'y').min(0).max(20).step(0.1)
gui.add(material.uniforms.Speed, 'value').min(0).max(10).step(1).name('Speed')



// Mesh
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.set(0.25, - 0.25, 1)
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()
    material.uniforms.Time.value = elapsedTime

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()