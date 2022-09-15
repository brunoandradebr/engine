import Simulation from './core/Simulation.js'
import { Vector } from './math/index.js'
import { Cube, Sphere, Pyramid } from './display/index.js'

const app = new Simulation('#stage')

const cube = new Cube(new Vector(0, 0, 0), 100)
const sphere = new Sphere(new Vector(0, 0, 0), 100)
const pyramid = new Pyramid(new Vector(0, 0, 0), 100)

app.fixedUpdate = (dt, elapsedTime) => {

    // sphere transform
    sphere.yAngle += 2 * dt
    sphere.xAngle += 2 * dt
    sphere.position.x = sphere.initialPosition.x + Math.cos(elapsedTime * 0.001) * ((DEVICE.width * 0.5) - DEVICE.width * 0.2)
    sphere.position.z = sphere.initialPosition.z + Math.sin(elapsedTime * 0.001) * ((DEVICE.height * 0.5) - DEVICE.height)

    sphere.points.map((point) => {

        sphere.transform
            .identity()
            .translate(sphere.position.x, sphere.position.y, sphere.position.z)
            .rotateZ(sphere.zAngle)
            .rotateY(sphere.yAngle)
            .rotateX(sphere.xAngle)
            .scale(sphere.size, sphere.size, sphere.size)

        sphere.transform.multiply(point.tmp)

        sphere.transform.setPerspectiveProjection()

        point.update(sphere.transform.vector)

    })

    // pyramid transform
    pyramid.yAngle += 2 * dt
    pyramid.xAngle += 2 * dt
    pyramid.position.x = pyramid.initialPosition.x - Math.cos(elapsedTime * 0.001) * ((DEVICE.width * 0.5) - DEVICE.width * 0.2)
    pyramid.position.z = pyramid.initialPosition.z - Math.sin(elapsedTime * 0.001) * ((DEVICE.height * 0.5) - DEVICE.height)

    pyramid.points.map((point) => {

        pyramid.transform
            .identity()
            .translate(pyramid.position.x, pyramid.position.y, pyramid.position.z)
            .rotateZ(pyramid.zAngle)
            .rotateY(pyramid.yAngle)
            .rotateX(pyramid.xAngle)
            .scale(pyramid.size, pyramid.size, pyramid.size)

        pyramid.transform.multiply(point.tmp)

        pyramid.transform.setPerspectiveProjection()

        point.update(pyramid.transform.vector)

    })

    // cube transform
    cube.yAngle = Math.cos(elapsedTime * 0.001) * 45
    cube.points.map((point) => {

        cube.transform
            .identity()
            .translate(cube.position.x, cube.position.y, cube.position.z)
            .rotateZ(cube.zAngle)
            .rotateY(cube.yAngle)
            .rotateX(cube.xAngle)
            .scale(cube.size, cube.size, cube.size)

        cube.transform.multiply(point.tmp)

        cube.transform.setPerspectiveProjection()

        point.update(cube.transform.vector)

    })

}

app.render = (graphics) => {

    cube.draw(graphics)
    sphere.draw(graphics)
    pyramid.draw(graphics)

}