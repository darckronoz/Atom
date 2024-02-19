import * as THREE from 'three';
import { Color } from 'three';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xe85a3a);
// Agregar niebla a la escena
const near = 1;
const far = 10;
const color = new THREE.Color(0x000000); // Ajusta el color de la niebla según tus preferencias
scene.fog = new THREE.Fog(color, near, far);
/*camera:
        atributo 1 > Campo de visión.
        atributo 2 > aspect ratio. its recomended to be the 
                                   weidth divided by the heigth
        atributo 3 > near - the elements after this number wont be rendered.
        atributo 4 > far - the elements before this number wont be rendered.
        
        color: (232, 89, 58)
        */
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth
     / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

//nucleo
const sphere_g = new THREE.SphereGeometry( 1, 16, 8 );
const sphere_m = new THREE.MeshBasicMaterial( { color: 0x90e5f0 } ); 
const sphere = new THREE.Mesh( sphere_g, sphere_m );

//Orbita
const orbit_g = new THREE.TorusGeometry( 4, 0.1, 16, 100 ); 
const orbit_m = new THREE.MeshBasicMaterial( { color: 0xffff00 } ); 
const torus = new THREE.Mesh( orbit_g, orbit_m );

//proton
const proton_g = new THREE.SphereGeometry( 1, 16, 8 );
const proton_m = new THREE.MeshBasicMaterial( { color: 0x90e5f0 } ); 
const proton = new THREE.Mesh( proton_g, proton_m );

scene.add( sphere );
scene.add( torus );
scene.add( proton );
camera.position.z = 30;

function animate() {
	requestAnimationFrame( animate );

	sphere.rotation.x += 0.01;
	sphere.rotation.y += 0.01;

    torus.rotation.x += 0.005;
	torus.rotation.y -= 0.02;

    var puntoEspecificoLocal = new THREE.Vector3(0, 0, 0);

    var matrizTransformacion = new THREE.Matrix4();
    matrizTransformacion.extractRotation(torus.matrixWorld); 

    var puntoEspecificoMundial = puntoEspecificoLocal.applyMatrix4(matrizTransformacion);

    var x = puntoEspecificoMundial.x;
    var y = puntoEspecificoMundial.y;
    var z = puntoEspecificoMundial.z;

    proton.position.set(x, y, z);

    renderer.render( scene, camera );
}

window.addEventListener('resize', onWindowResize);

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function obtenerPosicionEnDona(angulo, radio) {
    const x = Math.cos(angulo) * (dona.geometry.parameters.radius + radio);
    const y = Math.sin(angulo) * (dona.geometry.parameters.radius + radio);
    const z = 0; 

    return new THREE.Vector3(x, y, z);
}

onWindowResize();

animate();