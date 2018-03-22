import React, { PureComponent } from 'react'
import PlayerTable from './player.table'
import { readPlayers } from './services/players.service'

export default class PlayerList extends PureComponent {
    state = {
        tableData: ''
    }


    componentDidMount = () => {
        readPlayers()
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
                <h3 className="title">Character List</h3>
                <div className="div-playerList">
                    <PlayerTable tableData={this.state.tableData} />
                </div>
            </div>
        )
    }
}