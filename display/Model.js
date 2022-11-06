import { Matrix, Vector } from './../math/index.js'

export default class Model {

   constructor(position = new Vector, size = 100, objData = null, normalize = false) {

      this.normalized = normalize

      this.objData = objData

      this.points = [
         ...this.objData.vertices.map(v => new Vector(v.x, v.y, v.z))
      ]

      // normalize obj vertices
      if (this.normalized) {
         const invPointsLength = 1 / this.points.length

         let x = 0, y = 0, z = 0
         for (let p of this.points) {
            x += p.x
            y += p.y
            z += p.z
         }
         x *= invPointsLength
         y *= invPointsLength
         z *= invPointsLength

         this.centroid = new Vector(x, y, z)

         for (let p of this.points) {
            p.subtract(this.centroid).normalize
         }
      }

      this.points.map((point) => point.tmp = point.clone())

      this.position = position
      this.initialPosition = position.clone();

      this.transform = new Matrix()

      this.size = size

      this.xAngle = 0
      this.yAngle = 0
      this.zAngle = 0

      this.lineColor = 'rgba(0, 0, 0, 0.3)'
      this.fillColor = 'rgba(255, 255,255, 0.3)'

   }

   draw(graphics) {

      graphics.fillStyle = this.fillColor
      graphics.strokeStyle = this.lineColor

      for (let i = 0; i < this.objData.faces.length; i++) {

         let face = this.objData.faces[i]

         graphics.beginPath()

         for (let j = 0; j < face.length; j++) {
            const index = face[j] - 1
            const vertexB = this.points[index]
            if (vertexB) {
               graphics.lineTo(vertexB.x, vertexB.y)
            }
         }

         graphics.closePath()

         graphics.fill()
         graphics.stroke()


      }

      graphics.fillStyle = this.lineColor
      let pointSize = this.normalized ? this.size * 0.05 : 5
      this.points.map((point) => {
         graphics.fillRect(
            point.x - (pointSize * 0.5),
            point.y - (pointSize * 0.5),
            pointSize,
            pointSize
         )
      })

   }

}