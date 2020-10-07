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

        graphics.fillStyle = this.fillColor
        graphics.strokeStyle = this.lineColor
        graphics.lineWidth = this.lineWidth

        graphics.setTransform(this.transform.a, this.transform.b, this.transform.c, this.transform.d, this.transform.e, this.transform.f)

        const centerX = -this.width * this.anchor.x
        const centerY = -this.height * this.anchor.y

        graphics.fillRect(centerX, centerY, this.width, this.height)

        if (this.lineWidth > 0)
            graphics.strokeRect(centerX, centerY, this.width, this.height)

    }

}