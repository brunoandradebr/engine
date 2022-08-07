import Simulation from './core/Simulation.js'
import { Matrix, Vector } from './math/index.js'
import { Sprite, Cube, Sphere, Coffin } from './display/index.js'

const app = new Simulation('#stage')

const cube = new Cube(new Vector(0, 0, 0), 100)
const coffin = new Coffin(new Vector(0, 0, 0), 100)
const sphere = new Sphere(new Vector(0, 0, 0), 100)

const objects = [
    cube,
    coffin,
    sphere,
]

let object = objects[0]

const Transform = new Matrix()

setInterval(() => {
    const rndIndex = random(objects.length) | 0
    object = objects[rndIndex]
}, 3000)

app.fixedUpdate = (dt) => {

    object.yAngle += 0.7 * dt
    object.xAngle += 0.7 * dt

    object.transform = Transform

    object.points.map((point) => {

        Transform
            .identity()
            .translate(object.position.x, object.position.y, object.position.z)
            .rotateZ(object.zAngle)
            .rotateY(object.yAngle)
            .rotateX(object.xAngle)
            .scale(object.size, object.size, object.size)

        Transform.multiply(point.tmp)

        Transform.setPerspectiveProjection()

        point.update(Transform.vector)

    })

}

app.render = (graphics) => {

    object.draw(graphics)

}