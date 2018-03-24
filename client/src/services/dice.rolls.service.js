"use strict"

export function rollStats() {
    let dieArray = []
    for (let i = 0; i < 4; i++) {
        dieArray.push((Math.floor(Math.random() * 6) + 1))
    }

    dieArray.sort((a, b) => a - b).shift()

    return dieArray.reduce((a, b) => {
        return a + b
    })
}

export function rollMultiple(sides, number) {
    let roll
    let diceArray = []
    if (number === 1) {
        return roll = Math.floor(Math.random() * sides) + 1
    }
    else {
        for (let i = 0; i < number; i++) {
            diceArray.push((Math.floor(Math.random() * sides) + 1))
        }
        return diceArray.reduce((a, b) => {
            return a + b
        })
    }
}