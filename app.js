import Simulation from './core/Simulation.js'
import { Vector } from './math/index.js'
import { Sprite } from './display/index.js'

const app = new Simulation('#stage')

const sprite = new Sprite(new Vector(DEVICE.centerX, DEVICE.centerY), 50, 50, 'orange', 1, '#f46')

app.fixedUpdate = (dt) => {

}

app.render = (graphics) => {
    sprite.draw(graphics)
}