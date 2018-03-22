import React, { PureComponent } from 'react'

export default class MonsterTable extends PureComponent {

    render() {
        let tableData
        if (!this.props.tableData) { return null }

        tableData = this.props.tableData.map((item, index) => {
            return (
                <tr key={item._id}>
                    <td>{index + 1}</td>
                    <td>{item.name}</td>
                    <td>{item.description}</td>
                </tr>
            )
        })

        return (
            <div>
                <table className="table hover bordered responsive">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Monster Name</th>
                            <th>Description</th>
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