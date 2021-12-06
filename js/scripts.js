//Global variables
const startPosition = 3.5;
const endPosition = -startPosition;


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const text = document.querySelector('.text-loading');
const timeLimit = 10;

const light = new THREE.AmbientLight( 0xffffff ); // soft white light
scene.add( light );

renderer.setClearColor(0xb7c3f1, 1);
camera.position.z = 5;

const delay =  async ms => {
    return new Promise(resolve => setTimeout(resolve, ms));

}

class Doll {
    constructor() {
        loader.load('../models/scene.gltf', ( gltf ) => {
            scene.add(gltf.scene);
            gltf.scene.scale.set(.4, .4, .4);
            gltf.scene.position.set(0, -1, 0);
            this.doll = gltf.scene;
        });  
    }
    lookBackWard() {
        // this.doll.rotation.y = -3.15;
        gsap.to(this.doll.rotation, { y: -3.15, duration: .45 });
    }
    lookFrontWard() {
        // this.doll.rotation.y = 0;
        gsap.to(this.doll.rotation , { y: 0, duration: .45 });
    }

    async start() {
        this.lookBackWard();
        await delay((Math.random() * 1000) + 1000);
        this.lookFrontWard();
        await delay((Math.random() * 750) + 750 );
        this.start();
        
    }
}

class Player {
    constructor() {
        const geometry = new THREE.SphereGeometry( .4, 32, 16 );
        const material = new THREE.MeshBasicMaterial( { color: 0xffffff } );
        const sphere = new THREE.Mesh( geometry, material );
        sphere.position.z = -0.5;
        sphere.position.x = startPosition + .5;
        scene.add( sphere );
        this.player = sphere;
        this.playerInfo = {
            positionX: startPosition + .5,
            velocity: 0
        }
    }
    stop() {
        this.playerInfo.velocity = 0;
    }
    run() {
        this.playerInfo.velocity = 0.1;
    }
    update() {
        this.playerInfo.positionX -= this.playerInfo.velocity;
        this.player.position.x = this.playerInfo.positionX;
    }
}

// Instantiate a loader
const loader = new THREE.GLTFLoader();
const doll = new Doll();
const player = new  Player(); 


const createCube = (size, positionX, roty = 0, color = 0XDCA2CD	 ) => {
    const geometry = new THREE.BoxGeometry(size.w, size.h, size.d);
    const material = new THREE.MeshBasicMaterial( { color: color } );
    const cube = new THREE.Mesh( geometry, material );
    cube.position.x = positionX;
    cube.rotation.y = roty;
    scene.add( cube );
    return cube;
};
const startGame = () => {
    let progresBar = createCube({ w: 5, h: 4.5, d: 1 }, 0);
    progresBar.position.y = 5.5;
    gsap.to(progresBar.scale, { x: 0, duration: timeLimit })
    doll.start();
}

const init = async () => {
    await delay(600);
    text.textContent = "Start play in 3"
    await delay(600);
    text.textContent = "Start play in 2"
    await delay(600);
    text.textContent = "Start play in 1"
    await delay(600);
    text.textContent = "Goo!!"
    startGame();

}
init();


function createTruck() {
    createCube({ w: startPosition * 2 + .2, h: 1.5, d: 1.5 }, 0, 0).position.z = -1.2;
    createCube({ w: .2, h: 1.5, d: 1.5 }, startPosition, -.35, 0xF7B3DA);
    createCube({ w: .2, h: 1.5, d: 1.5 }, endPosition, .35, 0xf7b3da);
}
createTruck();



function animate() {
	requestAnimationFrame( animate );
	renderer.render( scene, camera );
    player.update();
    
}
animate();

window.addEventListener('resize', onWindowResize, false);

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener('keydown', e => {
    if (e.key === "ArrowLeft") {
        player.run();
    }
});
window.addEventListener("keyup", e => {
    if (e.key === "ArrowLeft") {
        player.stop();
    }
});