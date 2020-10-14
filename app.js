import Simulation from './core/Simulation.js'
import { Matrix, Vector } from './math/index.js'
import { Sprite } from './display/index.js'

const app = new Simulation('#stage')

const points = []
points[0] = new Sprite(new Vector(-.5, .5, -0.5), 5, 5, 'cyan', 0)
points[1] = new Sprite(new Vector(-.5, -.5, -0.5), 5, 5, 'cyan', 0)
points[2] = new Sprite(new Vector(.5, -.5, -0.5), 5, 5, 'cyan', 0)
points[3] = new Sprite(new Vector(.5, .5, -0.5), 5, 5, 'cyan', 0)

points.map((point) => point.initialPosition = point.position.clone())

let M = new Matrix()
let xAngle = 0
let yAngle = 0
let zAngle = 0

app.fixedUpdate = (dt) => {

    xAngle += 1 * dt
    yAngle += 1 * dt
    zAngle += 1 * dt

    points.map((point) => {
        M.identity()
            .translate(DEVICE.centerX, DEVICE.centerY)
            .rotateX(0)
            .rotateZ(zAngle)
            .scale(50, 50)
        const p = M.multiply(point.initialPosition)
        point.position.update(p.e, p.f)
    })

}

app.render = (graphics) => {
    points.map((point) => point.draw(graphics))
}