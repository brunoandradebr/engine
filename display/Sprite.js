import { Vector, Matrix } from "./../math/index.js";

export default class Sprite {

    constructor(position = new Vector, width = 50, height = 50, fillColor = '#f46', lineWidth = 1, lineColor = 'black') {

        this.position = position
        this.width = width
        this.height = height
        this.fillColor = fillColor
        this.lineWidth = lineWidth
        this.lineColor = lineColor

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

        graphics.fillRect(this.position.x, this.position.y, this.width, this.height)

        if (this.lineWidth > 0)
            graphics.strokeRect(this.position.x, this.position.y, this.width, this.height)

    }

}