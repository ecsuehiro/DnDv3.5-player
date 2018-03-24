import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom'

export default class PlayerList extends PureComponent {

    render() {
        let tableData

        if (!this.props.tableData) { return null }
        tableData = this.props.tableData.map((item, index) => {
            return (
                <tr key={item._id}>
                    <td>{index + 1}</td>
                    <td>{item.playerName}</td>
                    <td>{item.characterName}</td>
                    <td>{item.race} {item.class}</td>
                </tr>
            )
        })

        return (
            <div>

                <Link to="/player-sheet/5ab40b5ce9979626a4dc619c">Press Me</Link>

                <table className="table hover bordered responsive">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Character Name</th>
                            <th>Character Name</th>
                            <th>Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableData}
                    </tbody>
                </table>
            </div>
        )
    }
}