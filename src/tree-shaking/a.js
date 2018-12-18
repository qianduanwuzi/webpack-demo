import {square} from './math.js'

function component1() {
    // 1.必须使用square
    alert(2)
    return square(2)
    // 2.未使用square
    return 2
}

console.log(component1)