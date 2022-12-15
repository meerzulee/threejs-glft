import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const canvas = document.querySelector('#bg')
const scene = new THREE.Scene()

scene.background = new THREE.Color(0xffffff)

const loader = new GLTFLoader()

loader.load('model/girl.glb', function (glb) {
  console.log(glb)
  const root = glb.scene;
  root.position.set(0, -1, 0)
  root.scale.set(100, 100, 100)
  scene.add(root)
}, function (xhr) {
  console.log((xhr.loaded / xhr.total * 100) + "% loaded")
}, function (error) {
  console.log('error', error);
})

const light = new THREE.DirectionalLight(0xffffff, 1)
light.position.set(2, 2, 5)
scene.add(light)

// const geometry = new THREE.BoxGeometry(1, 1, 1)
// const material = new THREE.MeshBasicMaterial({
//   color: 'red'
// })

// const boxMesh = new THREE.Mesh(geometry, material)
// scene.add(boxMesh)


const sizes = {
  width: window.innerWidth,
  // height: window.innerHeight,
  height: '600',
}

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.set(0, 1, 2)
scene.add(camera)

const renderer = new THREE.WebGL1Renderer({
  canvas: canvas
})

renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.shadowMap.enabled = true
renderer.gammaOutput = true
renderer.render(scene, camera)


const controls = new OrbitControls(camera, renderer.domElement);
controls.addEventListener('change', render); // use if there is no animation loop

controls.update();

window.addEventListener('resize', onWindowResize);

function onWindowResize() {

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);

  render();

}

function animate() {
  requestAnimationFrame(animate)

  renderer.render(scene, camera)
}

function render() {

  renderer.render(scene, camera);

}
animate()