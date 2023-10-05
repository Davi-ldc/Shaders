import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'
import waterFragmentShader from './Shaders/Fragment.glsl'
import waterVertexShader from './Shaders/Vertex.glsl'


THREE.ColorManagement.enabled = false

/**
 * Base
 */
// Debug
const gui = new dat.GUI()
const debugObject = {}
debugObject.depthColor = '#186691'
debugObject.surfaceColor = '#9bd8ff'

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Water
 */
// Geometry
const waterGeometry = new THREE.PlaneGeometry(2*3, 2*3, 128*3*3, 128*3*3)

// Material
const waterMaterial = new THREE.ShaderMaterial(
    {
    vertexShader: waterVertexShader,
    fragmentShader: waterFragmentShader,
    uniforms:{
        Time: {value:0},
        speedDasOndasGrandes: {value: 0.75},

        TamanhoDasOndasGrandes: {value: 0.2},
        FrequenciaDasOndasGrander: {value: new THREE.Vector2(4, 1.5)},

        uSmallWavesElevation: { value: 0.15 },
        uSmallWavesFrequency: { value: 3 },
        uSmallWavesSpeed: { value: 0.2 },
        uSmallIterations: { value: 4 },

        DepthColor: { value: new THREE.Color(debugObject.depthColor) },
        SurfaceColor: { value: new THREE.Color(debugObject.surfaceColor) },
        SurfaceColorPower: {value: 5},
        SurfaceColorAdicional: {value:0.08}

    }
})

gui.add(waterMaterial.uniforms.uSmallWavesElevation, 'value').min(0).max(1).step(0.001).name('uSmallWavesElevation')
gui.add(waterMaterial.uniforms.uSmallWavesFrequency, 'value').min(0).max(30).step(0.001).name('uSmallWavesFrequency')
gui.add(waterMaterial.uniforms.uSmallWavesSpeed, 'value').min(0).max(4).step(0.001).name('uSmallWavesSpeed')
gui.add(waterMaterial.uniforms.uSmallIterations, 'value').min(0).max(5).step(1).name('uSmallIterations')
gui.add(waterMaterial.uniforms.SurfaceColorAdicional, 'value').min(0).max(1).step(0.001).name('SurfaceColorAdicional')
gui.add(waterMaterial.uniforms.SurfaceColorPower, 'value').min(0).max(10).step(0.001).name('SurfaceColorPower')
gui.add(waterMaterial.uniforms.TamanhoDasOndasGrandes, 'value').min(0).max(1).step(0.001).name('TamanhoDasOndasGrandes')
gui.add(waterMaterial.uniforms.speedDasOndasGrandes, 'value').min(0).max(3).step(0.001).name('speedDasOndasGrandes')
gui.add(waterMaterial.uniforms.FrequenciaDasOndasGrander.value, 'x').min(0).max(10).step(0.001).name('FrequenciaDasOndasGranderX')
gui.add(waterMaterial.uniforms.FrequenciaDasOndasGrander.value, 'y').min(0).max(10).step(0.001).name('FrequenciaDasOndasGranderY')
gui.addColor(debugObject, 'depthColor').onChange(() => { waterMaterial.uniforms.DepthColor.value.set(debugObject.depthColor) })
gui.addColor(debugObject, 'surfaceColor').onChange(() => { waterMaterial.uniforms.SurfaceColor.value.set(debugObject.surfaceColor) })

// Mesh
const water = new THREE.Mesh(waterGeometry, waterMaterial)
water.rotation.x = - Math.PI * 0.5
scene.add(water)

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
camera.position.set(1, 1, 1)
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
    waterMaterial.uniforms.Time.value = elapsedTime

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()
