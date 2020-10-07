export default class Matrix {

    constructor() {

        this.m = [
            [1, 0, 0, 0],
            [0, 1, 0, 0],
            [0, 0, 1, 0],
            [0, 0, 0, 1],
        ]

    }

    get a(){
        return this.m[0][0]
    }
    get b(){
        return this.m[1][0]
    }
    get c(){
        return this.m[0][1]
    }
    get d(){
        return this.m[1][1]
    }
    get e(){
        return this.m[0][3]
    }
    get f(){
        return this.m[1][3]
    }

}