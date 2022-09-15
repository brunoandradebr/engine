import { Matrix, Vector } from './../math/index.js'

export default class Coffin {

    constructor(position = new Vector, size = 100) {

        this.points = []
        this.points[0] = new Vector(-1, 3, 1)
        this.points[1] = new Vector(-2, -1, 1)
        this.points[2] = new Vector(-1, -2.5, 1)
        this.points[3] = new Vector(1, -2.5, 1)
        this.points[4] = new Vector(2, -1, 1)
        this.points[5] = new Vector(1, 3, 1)
        this.points[6] = new Vector(-1, 3, -0.3)
        this.points[7] = new Vector(-2, -1, -0.3)
        this.points[8] = new Vector(-1, -2.5, -0.3)
        this.points[9] = new Vector(1, -2.5, -0.3)
        this.points[10] = new Vector(2, -1, -0.3)
        this.points[11] = new Vector(1, 3, -0.3)

        this.points.map((point) => point.tmp = point.clone())

        this.lines = []
        this.lines[0] = { a: this.points[0], b: this.points[1] }
        this.lines[1] = { a: this.points[1], b: this.points[2] }
        this.lines[2] = { a: this.points[2], b: this.points[3] }
        this.lines[3] = { a: this.points[3], b: this.points[4] }
        this.lines[4] = { a: this.points[4], b: this.points[5] }
        this.lines[5] = { a: this.points[5], b: this.points[0] }
        this.lines[6] = { a: this.points[6], b: this.points[7] }
        this.lines[7] = { a: this.points[7], b: this.points[8] }
        this.lines[8] = { a: this.points[8], b: this.points[9] }
        this.lines[9] = { a: this.points[9], b: this.points[10] }
        this.lines[10] = { a: this.points[10], b: this.points[11] }
        this.lines[11] = { a: this.points[11], b: this.points[6] }
        this.lines[12] = { a: this.points[0], b: this.points[6] }
        this.lines[13] = { a: this.points[1], b: this.points[7] }
        this.lines[14] = { a: this.points[2], b: this.points[8] }
        this.lines[15] = { a: this.points[3], b: this.points[9] }
        this.lines[16] = { a: this.points[4], b: this.points[10] }
        this.lines[17] = { a: this.points[5], b: this.points[11] }

        this.position = position
        this.initialPosition = position.clone();
        this.transform = new Matrix()
        this.size = size
        this.xAngle = 0
        this.yAngle = 0
        this.zAngle = 0

    }

    draw(graphics) {

        graphics.fillStyle = 'rgba(0, 0, 0, 0.3)'
        graphics.strokeStyle = 'rgba(255, 255, 255, 0.4)'

        graphics.beginPath()
        this.lines.map((line) => {
            graphics.moveTo(line.a.x, line.a.y)
            graphics.lineTo(line.b.x, line.b.y)
        })

        graphics.stroke()
        graphics.closePath()

    }

}