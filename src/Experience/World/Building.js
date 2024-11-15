import * as THREE from 'three'
import Experience from '../Experience.js'


export default class Building
{
    constructor(_id)
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.time = this.experience.time
        this.debug = this.experience.debug

        // Debug
        if(this.debug.active)
        {
            this.debugFolder = this.debug.ui.addFolder('building')
        }
        
        const typeList = ['buildingAModel', 'buildingBModel', 'buildingCModel', 'buildingDModel', 'buildingEModel', 'buildingFModel', 'buildingGModel', 'buildingHModel']
        const type = typeList[Math.floor(Math.random() * typeList.length)]

        // Resource
        this.resource = this.resources.items[type]
        this.id = _id
        this.setModel()
        this.setAnimation()
    }

    setModel()
    {
        this.model = this.resource.scene.clone()
        //this.model.scale.set(0.2, 0.2, 0.2)
        this.model.position.set(this.id, 0, this.id)
        const rotations = [0, Math.PI / 2, Math.PI, Math.PI * 1.5]
        this.model.rotation.y = rotations[Math.floor(Math.random() * rotations.length)]
        const colors = [0x8062cc, 0x5e1fff, 0xb8a5e8]
        this.model.traverse((child) =>
        {
            if(child instanceof THREE.Mesh)
            {
                child.castShadow = true
                child.material.color = new THREE.Color(colors[Math.floor(Math.random() * colors.length)])
                
            }
        })
    }

    setAnimation()
    {
        // this.animation = {}
        
        // // Mixer
        // this.animation.mixer = new THREE.AnimationMixer(this.model)
        
        // // Actions
        // this.animation.actions = {}
        
        // this.animation.actions.idle = this.animation.mixer.clipAction(this.resource.animations[0])
        // this.animation.actions.walking = this.animation.mixer.clipAction(this.resource.animations[1])
        // this.animation.actions.running = this.animation.mixer.clipAction(this.resource.animations[2])
        
        // this.animation.actions.current = this.animation.actions.idle
        // this.animation.actions.current.play()

        // // Play the action
        // this.animation.play = (name) =>
        // {
        //     const newAction = this.animation.actions[name]
        //     const oldAction = this.animation.actions.current

        //     newAction.reset()
        //     newAction.play()
        //     newAction.crossFadeFrom(oldAction, 1)

        //     this.animation.actions.current = newAction
        // }

        // Debug
        // if(this.debug.active)
        // {
        //     const debugObject = {
        //         playIdle: () => { this.animation.play('idle') },
        //         playWalking: () => { this.animation.play('walking') },
        //         playRunning: () => { this.animation.play('running') }
        //     }
        //     this.debugFolder.add(debugObject, 'playIdle')
        //     this.debugFolder.add(debugObject, 'playWalking')
        //     this.debugFolder.add(debugObject, 'playRunning')
        // }
    }

    update()
    {
    }
}