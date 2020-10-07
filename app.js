import Simulation from './core/Simulation.js'
import { Vector } from './math/index.js'
import { Sprite } from './display/index.js'

const app = new Simulation('#stage')

const sprite = new Sprite(new Vector(25, 25), 50, 50, 'orange', 1, '#f46')

let angle = 0

app.fixedUpdate = (dt) => {
    angle += 1 * dt
    sprite.transform.identity()
    sprite.transform.translate(150, 150)
    sprite.transform.rotateX(80)
    sprite.transform.rotateZ(angle)
}

app.render = (graphics) => {
    sprite.draw(graphics)
}