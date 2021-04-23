import Simulation from './core/Simulation.js'
import { Matrix, Vector } from './math/index.js'
import { Sprite, Cube, Sphere, Coffin } from './display/index.js'

const app = new Simulation('#stage')

const object = new Coffin(new Vector(0, 0, 0), 100)

const Transform = new Matrix()

app.fixedUpdate = (dt) => {

    object.yAngle += 0.7 * dt

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