import * as THREE from 'three'
import Experience from './Experience.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import gsap from 'gsap'

export default class Camera
{
    constructor()
    {
        this.experience = new Experience()
        this.sizes = this.experience.sizes
        this.scene = this.experience.scene
        this.canvas = this.experience.canvas
        this.appState = this.experience.appState

        this.setInstance()
        this.setControls()

        this.addHandlers();
    }

    setInstance()
    {
        this.instance = new THREE.PerspectiveCamera(35, this.sizes.width / this.sizes.height, 0.1, 100)
        this.instance.position.set(0, 4, 10)
        this.vectorLookAt = new THREE.Vector3(0, 0, 0)
        this.instance.lookAt(this.vectorLookAt);
        this.scene.add(this.instance)
    }

    setControls()
    {
        this.controls = new OrbitControls(this.instance, this.canvas)
        this.controls.enableDamping = true
    }

    resize()
    {
        this.instance.aspect = this.sizes.width / this.sizes.height
        this.instance.updateProjectionMatrix()
    }

    addHandlers() {
        this.appState.on('stepChange', (newStep) => {
            if (newStep == 3) {
                this.moveToPortalScene();
            } else if (newStep == 5) {
                this.moveToTunnelScene();
            } else if (newStep == 9) {
                this.moveToCityScene();
            }
        });
    }

    moveToPortalScene() {
        console.log('moveToPortalScene');
        gsap.to(this.instance.position, { x: 8, y: -19.5, z: 0.75, duration: 2, ease: "power4.out" });
        gsap.to(this.vectorLookAt, { y: -19.5, z: 1.5, duration: 1.2, ease: "power4.out" });
    }
    
    moveToTunnelScene() {
        console.log('moveToTunnelScene');
        gsap.to(this.instance.position, { x: -2, y: -20, z: 0, duration: 2, ease: "power4.out" });
        gsap.to(this.vectorLookAt, { x: -10, y: -20, z: 0, duration: 1.2, ease: "power4.out" });
    }

    moveToCityScene() {
        gsap.to(this.instance.position, { x: 0, y: 4, z: 10, duration: 2, ease: "power4.out" });
        gsap.to(this.vectorLookAt, { x: 0, y: 0, z: 0, duration: 1.2, ease: "power4.out" });
    }

    update()
    {
        this.controls.update()
        this.instance.lookAt(this.vectorLookAt);
    }
}