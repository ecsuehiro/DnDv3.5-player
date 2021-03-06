import React, { PureComponent } from 'react'
import MonsterTable from './monster.table'
import { readMonsters } from './services/monsters.service'

export default class Monster extends PureComponent {
    state = {
        tableData: ""
    }

    componentDidMount = () => {
        readMonsters()
            .then(response => {
                this.setState({
                    tableData: response.data
                })
            })
            .catch(err => {
                console.warn(err)
            })
    }

    render() {

        return (
            <div>
                <h3>Monster Compendium</h3>
                <div className="div-monsterList">
                    <MonsterTable tableData={this.state.tableData} />
                </div>
            </div>
        )
    }
}