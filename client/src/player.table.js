import React, { PureComponent } from 'react'

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