export default class Vector {

    constructor(x = 0, y = 0, z = 0) {
        this.x = x
        this.y = y
        this.z = z
    }

    clone() {
        return new Vector(this.x, this.y, this.z)
    }

    update(x, y, z) {
        this.x = x || this.x
        this.y = y || this.y
        this.z = z || this.z
    }

    add(v) {
        this.x += v.x
        this.y += v.y
        this.z += v.z
        return this
    }

    subtract(v) {
        this.x -= v.x
        this.y -= v.y
        this.z -= v.z
        return this
    }

    multiply(v) {
        this.x *= v.x
        this.y *= v.y
        this.z *= v.z
        return this
    }

    multiplyScalar(s) {
        this.x *= s
        this.y *= s
        this.z *= s
        return this
    }

    dot(v) {
        return this.x * v.x + this.y * v.y + this.z * v.z
    }

    cross(v) {
        const x = this.y * v.z - this.z * v.y
        const y = this.z * v.x - this.x * v.z
        const z = this.x * v.y - this.y * v.x
        return new Vector(x, y, z)
    }

    get length() {
        return Math.sqrt(this.dot(this))
    }

    get lengthSquared() {
        return this.dot(this)
    }

    get normalize() {
        const l = this.length
        const iLength = l ? 1 / l : 1
        this.x *= iLength
        this.y *= iLength
        this.z *= iLength
        return this
    }

    get ln() {
        return new Vector(this.y, -this.x, 0)
    }

    get rn() {
        return new Vector(-this.y, this.x, 0)
    }

    debug(graphics, options = {}) {

        const debugOptions = {
            center: new Vector(DEVICE.centerX, DEVICE.centerY, 0),
            lineColor: 'black',
            ...options
        }

        graphics.save()
        graphics.strokeStyle = debugOptions.lineColor
        graphics.beginPath()
        graphics.moveTo(debugOptions.center.x, debugOptions.center.y)
        graphics.lineTo(debugOptions.center.x + this.x, debugOptions.center.y + this.y)
        graphics.stroke()
        graphics.restore()

    }

}