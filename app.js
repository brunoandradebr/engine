import Simulation from './core/Simulation.js'
import { Vector } from './math/index.js'
import { Model, Cube } from './display/index.js'

const app = new Simulation('#stage')

const earthObj = await loadObjFile('./obj/earth.obj')
const dogObj = await loadObjFile('./obj/dog.obj')

const earth = new Model(new Vector(0, -100, 0), 100, earthObj, true)
const dog = new Model(new Vector(0, 200, 0), 5, dogObj)
const cube = new Cube(new Vector(0, 0, 0), 100)

const SCREEN_CENTER = new Vector(DEVICE.centerX, DEVICE.centerY)

app.fixedUpdate = (dt, elapsedTime) => {

    // dog transform
    dog.yAngle += 1
    dog.xAngle = 90
    dog.zAngle = 0

    dog.points.map((point) => {

        dog.transform
            .identity()
            .translate(dog.position.x, dog.position.y, dog.position.z)
            .rotateZ(dog.zAngle)
            .rotateY(dog.yAngle)
            .rotateX(dog.xAngle)
            .scale(dog.size, dog.size, dog.size)

        dog.transform.multiply(point.tmp)

        dog.transform.setPerspectiveProjection()

        point.update(dog.transform.vector)

    })

    // earth transform
    earth.yAngle += 2 * dt
    earth.xAngle += 2 * dt
    earth.position.x = earth.initialPosition.x + Math.cos(elapsedTime * dt * 0.001) * ((DEVICE.width * 0.5) - DEVICE.width * 0.2)
    earth.position.z = earth.initialPosition.z + Math.sin(elapsedTime * dt * 0.001) * ((DEVICE.height * 0.5) - DEVICE.height)

    earth.points.map((point) => {

        earth.transform
            .identity()
            .translate(earth.position.x, earth.position.y, earth.position.z)
            .rotateZ(earth.zAngle)
            .rotateY(earth.yAngle)
            .rotateX(earth.xAngle)
            .scale(earth.size, earth.size, earth.size)

        earth.transform.multiply(point.tmp)

        earth.transform.setPerspectiveProjection()

        point.update(earth.transform.vector)

    })

    // cube transform
    cube.yAngle += 2 * dt
    cube.xAngle += 2 * dt
    cube.position.x = cube.initialPosition.x - Math.cos(elapsedTime * dt * 0.001) * ((DEVICE.width * 0.5) - DEVICE.width * 0.2)
    cube.position.z = cube.initialPosition.z - Math.sin(elapsedTime * dt * 0.001) * ((DEVICE.height * 0.5) - DEVICE.height)

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

    if (dog.position.z > earth.position.z) {
        dog.draw(graphics)
        earth.draw(graphics)
    } else {
        earth.draw(graphics)
        dog.draw(graphics)
    }

    cube.draw(graphics)

    cube.transform.zAxis.normalize.multiplyScalar(cube.size * .5).debug(graphics, { center: cube.position.clone().add(SCREEN_CENTER), lineWidth: 2, lineColor: 'lime' })
    cube.transform.xAxis.normalize.multiplyScalar(cube.size * .5).debug(graphics, { center: cube.position.clone().add(SCREEN_CENTER), lineWidth: 2, lineColor: '#f48' })
    cube.transform.yAxis.normalize.multiplyScalar(cube.size * .5).reverse.debug(graphics, { center: cube.position.clone().add(SCREEN_CENTER), lineWidth: 2, lineColor: 'royalblue' })

    cube.transform.zAxis.normalize.multiplyScalar(cube.size * .5).debug(graphics, { center: cube.position.clone().add(SCREEN_CENTER), lineWidth: 2, lineColor: 'lime' })
    cube.transform.xAxis.normalize.multiplyScalar(cube.size * .5).debug(graphics, { center: cube.position.clone().add(SCREEN_CENTER), lineWidth: 2, lineColor: '#f48' })
    cube.transform.yAxis.normalize.multiplyScalar(cube.size * .5).reverse.debug(graphics, { center: cube.position.clone().add(SCREEN_CENTER), lineWidth: 2, lineColor: 'royalblue' })

    earth.transform.zAxis.normalize.multiplyScalar(earth.size * .5).debug(graphics, { center: earth.position.clone().add(SCREEN_CENTER), lineWidth: 2, lineColor: 'lime' })
    earth.transform.xAxis.normalize.multiplyScalar(earth.size * .5).debug(graphics, { center: earth.position.clone().add(SCREEN_CENTER), lineWidth: 2, lineColor: '#f48' })
    earth.transform.yAxis.normalize.multiplyScalar(earth.size * .5).reverse.debug(graphics, { center: earth.position.clone().add(SCREEN_CENTER), lineWidth: 2, lineColor: 'royalblue' })

}