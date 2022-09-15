import Simulation from './core/Simulation.js'
import { Vector } from './math/index.js'
import { Cube, Sphere, Pyramid } from './display/index.js'

const app = new Simulation('#stage')

const cube = new Cube(new Vector(0, 0, 0), 100)
const sphere = new Sphere(new Vector(0, 0, 0), 100)
const pyramid = new Pyramid(new Vector(0, 0, 0), 100)

const SCREEN_CENTER = new Vector(DEVICE.centerX, DEVICE.centerY)

app.fixedUpdate = (dt, elapsedTime) => {

    // sphere transform
    sphere.yAngle += 2 * dt
    sphere.xAngle += 2 * dt
    sphere.position.x = sphere.initialPosition.x + Math.cos(elapsedTime * dt * 0.001) * ((DEVICE.width * 0.5) - DEVICE.width * 0.2)
    sphere.position.z = sphere.initialPosition.z + Math.sin(elapsedTime * dt * 0.001) * ((DEVICE.height * 0.5) - DEVICE.height)

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
    pyramid.position.x = pyramid.initialPosition.x - Math.cos(elapsedTime * dt * 0.001) * ((DEVICE.width * 0.5) - DEVICE.width * 0.2)
    pyramid.position.z = pyramid.initialPosition.z - Math.sin(elapsedTime * dt * 0.001) * ((DEVICE.height * 0.5) - DEVICE.height)

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
    cube.yAngle = Math.cos(elapsedTime * dt * 0.001) * 45

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

    cube.transform.zAxis.normalize.multiplyScalar(cube.size * .5).debug(graphics, { center: cube.position.clone().add(SCREEN_CENTER), lineWidth: 2, lineColor: 'lime' })
    cube.transform.xAxis.normalize.multiplyScalar(cube.size * .5).debug(graphics, { center: cube.position.clone().add(SCREEN_CENTER), lineWidth: 2, lineColor: '#f48' })
    cube.transform.yAxis.normalize.multiplyScalar(cube.size * .5).reverse.debug(graphics, { center: cube.position.clone().add(SCREEN_CENTER), lineWidth: 2, lineColor: 'royalblue' })

    pyramid.transform.zAxis.normalize.multiplyScalar(pyramid.size * .5).debug(graphics, { center: pyramid.position.clone().add(SCREEN_CENTER), lineWidth: 2, lineColor: 'lime' })
    pyramid.transform.xAxis.normalize.multiplyScalar(pyramid.size * .5).debug(graphics, { center: pyramid.position.clone().add(SCREEN_CENTER), lineWidth: 2, lineColor: '#f48' })
    pyramid.transform.yAxis.normalize.multiplyScalar(pyramid.size * .5).reverse.debug(graphics, { center: pyramid.position.clone().add(SCREEN_CENTER), lineWidth: 2, lineColor: 'royalblue' })

    sphere.transform.zAxis.normalize.multiplyScalar(sphere.size * .5).debug(graphics, { center: sphere.position.clone().add(SCREEN_CENTER), lineWidth: 2, lineColor: 'lime' })
    sphere.transform.xAxis.normalize.multiplyScalar(sphere.size * .5).debug(graphics, { center: sphere.position.clone().add(SCREEN_CENTER), lineWidth: 2, lineColor: '#f48' })
    sphere.transform.yAxis.normalize.multiplyScalar(sphere.size * .5).reverse.debug(graphics, { center: sphere.position.clone().add(SCREEN_CENTER), lineWidth: 2, lineColor: 'royalblue' })

}