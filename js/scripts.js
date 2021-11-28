const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

renderer.setClearColor(0xb7c3f1, 1);

const light = new THREE.AmbientLight( 0xffffff ); // soft white light
scene.add( light );

/* const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube ); */

camera.position.z = 5;
// Instantiate a loader
const loader = new THREE.GLTFLoader();

class Doll {
    constructor() {
        loader.load('../models/scene.gltf', ( gltf ) => {
            gltf.scene.scale.set(.4, .4, .4);
            gltf.scene.position.set(0, -1, 0);
            scene.add(gltf.scene);
            this.doll = gltf.scene;
        });  
    }
    lookBack() {
        this.doll.rotation.y = 1;
    }
}
let doll = new Doll();
setTimeout(() => {
    doll.lookBack();
}, 1000);

function animate() {
	requestAnimationFrame( animate );
    /* cube.rotation.y += 0.03; */
	renderer.render( scene, camera );
}
animate();

window.addEventListener('resize', onWindowResize, false);

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}
