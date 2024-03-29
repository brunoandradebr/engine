const trace = (...content) => console.log(...content)

const PI = Math.PI
const PI2 = 2 * PI
const toRad = PI / 180
const toDeg = 180 / PI
const random = (scale = 1, signed = false) => signed ? ((Math.random() - .5) * 2) * scale : Math.random() * scale
const randomPick = (values) => values[random(values.length) | 0]

const DEVICE = {
    width: window.innerWidth,
    height: window.innerHeight,
    centerX: window.innerWidth / 2,
    centerY: window.innerHeight / 2,
}

const mouse = {
    x: DEVICE.centerX,
    y: DEVICE.centerY,
    isDown: false
}

addEventListener('mousedown', (e) => {
    mouse.x = e.clientX
    mouse.y = e.clientY
    mouse.isDown = true
})
addEventListener('mouseup', (e) => {
    mouse.x = e.clientX
    mouse.y = e.clientY
    mouse.isDown = false
})
addEventListener('mousemove', (e) => {
    mouse.x = e.clientX
    mouse.y = e.clientY
})
addEventListener('touchstart', (e) => {
    mouse.x = e.touches[0].clientX
    mouse.y = e.touches[0].clientY
    mouse.isDown = true
})
addEventListener('touchend', (e) => {
    mouse.x = e.changedTouches[0].clientX
    mouse.y = e.changedTouches[0].clientY
    mouse.isDown = false
})
addEventListener('touchmove', (e) => {
    mouse.x = e.touches[0].clientX
    mouse.y = e.touches[0].clientY
    mouse.isDown = true
})

const loadObjFile = async (fileURL) => {

    const file = await fetch(fileURL)
    const content = await file.text()
    const lines = content.split('\n')

    const vertices = lines.filter(line => line.includes('v ')).map(v => v.split(' ')).map(components => ({
        x: Number(components[1]),
        y: Number(components[2]),
        z: Number(components[3]),
    }))

    const faces = lines.filter(line => line.includes('f ')).map(f => f.split(' ')).map(vertexIndex => ([
        ...vertexIndex.filter(index => index).map(index => Number(index.split('/')[0])).slice(1),
    ]))

    return { vertices, faces }

}