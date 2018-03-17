import React, { PureComponent } from 'react'

export default class Monster extends PureComponent{
    state = {
        name: "",
        stats: "",
    }

    getMonsters = () => {
        console.log("Rawr")
    }

    render() {
        
        return (
            <div className="div-monsterList">
                <p>Monsters will go here in the future!</p>
            </div>
        )
    }
}