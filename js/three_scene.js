//import gsap from 'gsap';

// Canvas
const canvas = document.querySelector('canvas.webgl');

// Scene
const scene = new THREE.Scene();
//let tl = gsap.timeline();

// Our Model

const circle = new THREE.Object3D();
const skelet = new THREE.Object3D();
const particle = new THREE.Object3D();

scene.add(circle);
scene.add(skelet);
scene.add(particle);

const geometry = new THREE.TetrahedronGeometry(2, 0);
const geom = new THREE.IcosahedronGeometry(7, 3);
const geom2 = new THREE.IcosahedronGeometry(15, 1);

const material = new THREE.MeshPhongMaterial({
  color: 0xffffff,
  shading: THREE.FlatShading
});

for (let i = 0; i < 1000; i++) {
  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5).normalize();
  mesh.position.multiplyScalar(90 + (Math.random() * 700));
  mesh.rotation.set(Math.random() * 2, Math.random() * 2, Math.random() * 2);
  particle.add(mesh);
}

const mat = new THREE.MeshPhongMaterial({
  color: 0xffffff,
  shading: THREE.FlatShading
});


const mat2 = new THREE.MeshPhongMaterial({
  color: 0xffffff,
  wireframe: true,
  side: THREE.DoubleSide

});

const planet = new THREE.Mesh(geom, mat);
planet.scale.x = planet.scale.y = planet.scale.z = 16;
circle.add(planet);

const planet2 = new THREE.Mesh(geom2, mat2);
planet2.scale.x = planet2.scale.y = planet2.scale.z = 10;
//skelet.add(planet2);


// Lights

const ambientLight = new THREE.AmbientLight(0x999999);
scene.add(ambientLight);

const lights = [];
lights[0] = new THREE.DirectionalLight( 0x96ebd4, 1 );
lights[0].position.set( 1, 0, 0 );
lights[1] = new THREE.DirectionalLight( 0x11E8BB, 1 );
lights[1].position.set( 0.75, 1, 0.5 );
lights[2] = new THREE.DirectionalLight( 0x111111, 0.4 );
lights[2].position.set( -0.75, -1, 0.5 );
scene.add( lights[0] );
scene.add( lights[1] );
scene.add( lights[2] );

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
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 1, 1000)
camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 400;
scene.add(camera);

// Controls
//const controls = new OrbitControls(camera, canvas);
//controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */

const clock = new THREE.Clock()

const animate = () => 
{
  requestAnimationFrame(animate);

  particle.rotation.x += 0.0000;
  particle.rotation.y -= 0.0040;
  circle.rotation.x -= 0.0020;
  circle.rotation.y -= 0.0030;
  skelet.rotation.x -= 0.0010;
  skelet.rotation.y += 0.0020;
  renderer.clear();

  renderer.render( scene, camera );
}

animate();

const tick = () =>
{

    const elapsedTime = clock.getElapsedTime()

    // Update objects
    //sphere.rotation.y = .5 * elapsedTime

    // Update Orbital Controls
    // controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()