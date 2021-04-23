import { Matrix, Vector } from './../math/index.js'

export default class Sphere {

    constructor(position = new Vector, size = 100) {

        this.points = []

        for (let i = 0; i < 200; i++) {
            const x = random(1, true)
            const y = random(1, true)
            const z = random(1, true)
            const d = 1 / Math.sqrt((x * x + y * y + z * z))
            const point = new Vector(x * d, y * d, z * d)
            this.points.push(point)
        }

        this.points.map((point) => point.tmp = point.clone())

        this.position = position
        this.size = size
        this.xAngle = 0
        this.yAngle = 0
        this.zAngle = 0

    }

    draw(graphics) {

        graphics.fillStyle = 'rgba(255, 255, 255, 0.3)'

        this.points.map((point) => {
            graphics.fillRect(point.x, point.y, 2, 2)
        })

    }

}