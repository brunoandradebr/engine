export default class Simulation {

    constructor(canvasId = null, FPS = 60) {

        this.canvas = document.querySelector(canvasId)
        this.graphics = this.canvas.getContext('2d')
        this.canvas.width = DEVICE.width
        this.canvas.height = DEVICE.height
        this.canvas.style.width = DEVICE.width + 'px'
        this.canvas.style.height = DEVICE.height + 'px'
        document.body.style.margin = 0
        document.body.style.padding = 0
        document.body.style.backgroundColor = '#242528'
        document.body.style.overflow = 'hidden'

        this.FPS = 1 / FPS

        this._start()

    }

    _start() {

        // desired fps in milliseconds
        const desiredFPS = 1000 * this.FPS
        // accumulates time between frames
        let frameTimeAccumulator = 0
        // last time
        let lastTime = window.performance.now()
        // delta between frames
        let dt = 0
        // indicates how far we are from next frame
        let alpha = 1

        const loop = (time) => {

            // calculates delta time
            dt = time - lastTime
            // updates last time to current time
            lastTime = time
            // accumulates delta time
            frameTimeAccumulator += dt

            // while there is whole frame time accumulated   
            while (frameTimeAccumulator >= desiredFPS) {

                // run scene update
                this.fixedUpdate(desiredFPS * 0.05)

                // remove from accumulated time chunks of desired fps
                frameTimeAccumulator -= desiredFPS
            }

            this.update(desiredFPS * 0.05)

            // calculates alpha
            alpha = frameTimeAccumulator / desiredFPS

            // render scene
            this.graphics.clearRect(0, 0, this.canvas.width, this.canvas.height)
            this.render(this.graphics, alpha)

            // loop once again...
            requestAnimationFrame(loop)
        }

        // start loop
        requestAnimationFrame(loop)

    }

    /**
     * Scene's update logic.
     * Run as possible.
     * 
     * @param {DOMHighResTimeStamp} dt
     * 
     * @return {Void} 
     */
    update(dt) { }

    /**
     * Scene's update logic.
     * Runs at fixed scene's FPS.
     * Integrates physics here.
     * 
     * @param {DOMHighResTimeStamp} dt
     * 
     * @return {Void} 
     */
    fixedUpdate(dt) { }

    /**
     * 
     * @param {CanvasRenderingContext2D} graphics 
     * @param {Number} alpha
     * 
     * @return {Void}
     */
    render(graphics, alpha) { }

}