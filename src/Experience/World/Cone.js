import * as THREE from 'three'
import Experience from '../Experience.js'
import planeVertexShader from '../shaders/tunnel/planeVert.glsl'
import planeFragmentShader from '../shaders/tunnel/tunnelFragA.glsl'


export default class Cone {
    constructor() {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.time = this.experience.time
        this.debug = this.experience.debug

        // Debug
        if (this.debug.active) {
            this.debugFolder = this.debug.ui.addFolder('portal-cone')
        }

        // Resource
        this.resource = this.resources.items.portalModelCone

        this.setTextures()
        this.setModel()
    }

    setTextures()
    {
        this.textures = {}

        this.textures.tile = this.resources.items.tileCratersTexture1
        // this.textures.tile.colorSpace = THREE.SRGBColorSpace
        // this.textures.tile.repeat.set(1.5, 1.5)
        this.textures.tile.wrapS = THREE.RepeatWrapping
        this.textures.tile.wrapT = THREE.RepeatWrapping
        this.textures.tile.generateMipmaps = false;
    }

    setModel() {
        this.model = this.resource.scene
        this.model.scale.setScalar(12)
        this.model.rotation.z = Math.PI / 2;
        this.model.rotation.y = Math.PI / -2;
        this.model.position.z = 7;


        this.material = new THREE.ShaderMaterial({
            vertexShader: planeVertexShader,
            fragmentShader: planeFragmentShader,
            side: THREE.BackSide,
            transparent: true,
            uniforms: {
                tMap: { value: this.textures.tile },
                uColor: { value: new THREE.Color('#000000') },
                uAnimate: { value: 0 },
            }
        })
        
        
        this.model.traverse((child) => {
            if (child instanceof THREE.Mesh) {
                child.material = this.material
            }
        })
    }

    update() {
        // update uniforms or something
        this.material.uniforms.uAnimate.value = this.time.elapsed * 0.0001;
    }
}