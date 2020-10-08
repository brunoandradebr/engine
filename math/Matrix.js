export default class Matrix {

    constructor(m = null) {

        this.m = m || [
            [1, 0, 0, 0],
            [0, 1, 0, 0],
            [0, 0, 1, 0],
            [0, 0, 0, 1],
        ]

    }

    get a() {
        return this.m[0][0]
    }
    get b() {
        return this.m[1][0]
    }
    get c() {
        return this.m[0][1]
    }
    get d() {
        return this.m[1][1]
    }
    get e() {
        return this.m[0][3]
    }
    get f() {
        return this.m[1][3]
    }

    multiply(matrix) {

        const A = this.m
        const B = matrix.m

        // first row
        const m1_1 = A[0][0] * B[0][0] + A[0][1] * B[1][0] + A[0][2] * B[2][0] + A[0][3] * B[3][0]
        const m1_2 = A[0][0] * B[0][1] + A[0][1] * B[1][1] + A[0][2] * B[2][1] + A[0][3] * B[3][1]
        const m1_3 = A[0][0] * B[0][2] + A[0][1] * B[1][2] + A[0][2] * B[2][2] + A[0][3] * B[3][2]
        const m1_4 = A[0][0] * B[0][3] + A[0][1] * B[1][3] + A[0][2] * B[2][3] + A[0][3] * B[3][3]
        // second row
        const m2_1 = A[1][0] * B[0][0] + A[1][1] * B[1][0] + A[1][2] * B[2][0] + A[1][3] * B[3][0]
        const m2_2 = A[1][0] * B[0][1] + A[1][1] * B[1][1] + A[1][2] * B[2][1] + A[1][3] * B[3][1]
        const m2_3 = A[1][0] * B[0][2] + A[1][1] * B[1][2] + A[1][2] * B[2][2] + A[1][3] * B[3][2]
        const m2_4 = A[1][0] * B[0][3] + A[1][1] * B[1][3] + A[1][2] * B[2][3] + A[1][3] * B[3][3]
        // third row
        const m3_1 = A[2][0] * B[0][0] + A[2][1] * B[1][0] + A[2][2] * B[2][0] + A[2][3] * B[3][0]
        const m3_2 = A[2][0] * B[0][1] + A[2][1] * B[1][1] + A[2][2] * B[2][1] + A[2][3] * B[3][1]
        const m3_3 = A[2][0] * B[0][2] + A[2][1] * B[1][2] + A[2][2] * B[2][2] + A[2][3] * B[3][2]
        const m3_4 = A[2][0] * B[0][3] + A[2][1] * B[1][3] + A[2][2] * B[2][3] + A[2][3] * B[3][3]
        // fourth row
        const m4_1 = A[3][0] * B[0][0] + A[3][1] * B[1][0] + A[3][2] * B[2][0] + A[3][3] * B[3][0]
        const m4_2 = A[3][0] * B[0][1] + A[3][1] * B[1][1] + A[3][2] * B[2][1] + A[3][3] * B[3][1]
        const m4_3 = A[3][0] * B[0][2] + A[3][1] * B[1][2] + A[3][2] * B[2][2] + A[3][3] * B[3][2]
        const m4_4 = A[3][0] * B[0][3] + A[3][1] * B[1][3] + A[3][2] * B[2][3] + A[3][3] * B[3][3]

        // result first row
        this.m[0][0] = m1_1
        this.m[0][1] = m1_2
        this.m[0][2] = m1_3
        this.m[0][3] = m1_4
        // result second row
        this.m[1][0] = m2_1
        this.m[1][1] = m2_2
        this.m[1][2] = m2_3
        this.m[1][3] = m2_4
        // result third row
        this.m[2][0] = m3_1
        this.m[2][1] = m3_2
        this.m[2][2] = m3_3
        this.m[2][3] = m3_4
        // result fourth row
        this.m[3][0] = m4_1
        this.m[3][1] = m4_2
        this.m[3][2] = m4_3
        this.m[3][3] = m4_4

        return this

    }

    rotateX(angle) {

        const rad = angle * toRad
        const c = Math.cos(rad)
        const s = Math.sin(rad)

        const R = new Matrix([
            [1, 0, 0, 0],
            [0, c, s, 0],
            [0, -s, c, 0],
            [0, 0, 0, 1],
        ])

        return this.multiply(R)
    }

    rotateY(angle) {

        const rad = angle * toRad
        const c = Math.cos(rad)
        const s = Math.sin(rad)

        const R = new Matrix([
            [c, 0, s, 0],
            [0, 1, 0, 0],
            [-s, 0, c, 0],
            [0, 0, 0, 1],
        ])

        return this.multiply(R)
    }

    rotateZ(angle) {

        const rad = angle * toRad
        const c = Math.cos(rad)
        const s = Math.sin(rad)

        const R = new Matrix([
            [c, s, 0, 0],
            [-s, c, 0, 0],
            [0, 0, 1, 0],
            [0, 0, 0, 1],
        ])

        return this.multiply(R)
    }

    scale(x = 1, y = 1, z = 1) {

        const S = new Matrix([
            [x, 0, 0, 0],
            [0, y, 0, 0],
            [0, 0, z, 0],
            [0, 0, 0, 1],
        ])

        return this.multiply(S)
    }

    translate(x = 0, y = 0, z = 0) {

        const T = new Matrix([
            [1, 0, 0, x],
            [0, 1, 0, y],
            [0, 0, 1, z],
            [0, 0, 0, 1],
        ])

        return this.multiply(T)
    }

    /**
     * Reset matrix
     */
    identity() {

        // first row
        this.m[0][0] = 1
        this.m[0][1] = 0
        this.m[0][2] = 0
        this.m[0][3] = 0
        // second row
        this.m[1][0] = 0
        this.m[1][1] = 1
        this.m[1][2] = 0
        this.m[1][3] = 0
        // third row
        this.m[2][0] = 0
        this.m[2][1] = 0
        this.m[2][2] = 1
        this.m[2][3] = 0
        // fourth row
        this.m[3][0] = 0
        this.m[3][1] = 0
        this.m[3][2] = 0
        this.m[3][3] = 1

        return this

    }

    /**
     * Transpose row matrix to column matrix
     */
    transpose() {

        // first row
        const m_1_1 = this.m[0][0]
        const m_1_2 = this.m[0][1]
        const m_1_3 = this.m[0][2]
        const m_1_4 = this.m[0][3]
        // second row
        const m_2_1 = this.m[1][0]
        const m_2_2 = this.m[1][1]
        const m_2_3 = this.m[1][2]
        const m_2_4 = this.m[1][3]
        // third row
        const m_3_1 = this.m[2][0]
        const m_3_2 = this.m[2][1]
        const m_3_3 = this.m[2][2]
        const m_3_4 = this.m[2][3]
        // fourth row
        const m_4_1 = this.m[3][0]
        const m_4_2 = this.m[3][1]
        const m_4_3 = this.m[3][2]
        const m_4_4 = this.m[3][3]

        // first column
        this.m[0][0] = m_1_1
        this.m[1][0] = m_1_2
        this.m[2][0] = m_1_3
        this.m[3][0] = m_1_4
        // second column
        this.m[0][1] = m_2_1
        this.m[1][1] = m_2_2
        this.m[2][1] = m_2_3
        this.m[3][1] = m_2_4
        // third column
        this.m[0][2] = m_3_1
        this.m[1][2] = m_3_2
        this.m[2][2] = m_3_3
        this.m[3][2] = m_3_4
        // fourth column
        this.m[0][3] = m_4_1
        this.m[1][3] = m_4_2
        this.m[2][3] = m_4_3
        this.m[3][3] = m_4_4

        return this

    }

}