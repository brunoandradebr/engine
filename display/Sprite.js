import { Vector, Matrix } from "./../math/index.js";

export default class Sprite {

    constructor(position = new Vector, width = 50, height = 50, fillColor = '#f46', lineWidth = 1, lineColor = 'black') {

        this.position = position
        this.width = width
        this.height = height
        this.fillColor = fillColor
        this.lineWidth = lineWidth
        this.lineColor = lineColor

        this.anchor = { x: 0.5, y: 0.5 }

        this.xAngle = 0
        this.yAngle = 0
        this.zAngle = 0

        this.xScale = 1
        this.yScale = 1

        this.transform = new Matrix()

    }

    /**
     * 
     * @param {CanvasRenderingContext2D} graphics 
     * @param {Number} alpha
     * 
     * @return {Void}
     */
    draw(graphics, alpha) {

        graphics.save()

        graphics.fillStyle = this.fillColor
        graphics.strokeStyle = this.lineColor
        graphics.lineWidth = this.lineWidth

        this.transform.translate(this.position.x, this.position.y)
        this.transform.rotateY(this.yAngle)
        this.transform.rotateX(this.xAngle)
        this.transform.rotateZ(this.zAngle)
        this.transform.scale(this.xScale, this.yScale)

        graphics.transform(this.transform.xAxis.x, this.transform.xAxis.y, this.transform.yAxis.x, this.transform.yAxis.y, this.transform.origin.x, this.transform.origin.y)

        const centerX = -this.width * this.anchor.x
        const centerY = -this.height * this.anchor.y

        graphics.fillRect(centerX, centerY, this.width, this.height)

        if (this.lineWidth > 0)
            graphics.strokeRect(centerX, centerY, this.width, this.height)

        graphics.restore()

        this.transform.identity()

    }

}