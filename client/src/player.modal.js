/*global $*/

import React, { PureComponent } from 'react'
import { Modal, Button } from 'react-materialize'
import { readWeapons } from './services/weapons.service'
import { readSkills } from './services/skills.service'
import { readFeats } from './services/feats.service'

export default class PlayerModal extends PureComponent {
    constructor(props) {
        super(props)
        const name = this.props.name

        if (name === "weapons") {
            readWeapons()
                .then(response => {
                    this.setState({
                        weapons: response.data
                    })
                })
        }
        else if (name === "skills") {
            readSkills()
                .then(response => {
                    this.setState({
                        skills: response.data
                    })
                })
        }
        else if (name === "feats") {
            readFeats()
                .then(response => {
                    this.setState({
                        feats: response.data
                    })
                })
        }
        else {
            console.log("Not abilities yet")
        }
        this.state = {
            weapons: [],
            skills: [],
            feats: []
        }
    }

    componentDidMount() {
        if (this.props.show === true) {
            $('#modal1').modal('open')
        }

    }

    close = () => {
        this.setState({
            weapons: [],
            skills: [],
            feats: []
        })
        $("#modal1").modal('close')
        this.props.close()
    }

    render() {
        return (
            <Modal id="modal1" header="Details" modalOptions={{ dismissible: false }}
                fixedFooter actions={<Button type="button" onClick={this.close}>Close</Button>}>
                <div className="container">
                    <div className="row">
                        {
                            this.state.weapons
                                .sort((a, b) => {
                                    if (a.weaponName < b.weaponName) return -1;
                                    if (a.weaponName > b.weaponName) return 1;
                                    return 0;
                                })
                                .map(item => {
                                    return (
                                        <div key={item._id}>
                                            <div className="div-optionBox">
                                                <div className="col s6">
                                                    <p><b>Name:</b> {item.weaponName}</p>
                                                    <p><b>Damage(S):</b> {item.dmgS}</p>
                                                    <p><b>Damage(M):</b> {item.dmgM}</p>
                                                    <p><b>Crit:</b> {item.crit}</p>
                                                    <p><b>Type:</b> {item.type}</p>
                                                    <p><b>Range:</b> {item.range}</p>
                                                </div>
                                                <div className="col s6">
                                                    <p><b>Notes:</b> {item.notes}</p>
                                                </div>
                                            </div>
                                        </div>)
                                })
                        }
                        {
                            this.state.skills
                                .sort((a, b) => {
                                    if (a.skillName < b.skillName) return -1;
                                    if (a.skillName > b.skillName) return 1;
                                    return 0;
                                })
                                .map(item => {
                                    return (
                                        <div key={item._id}>
                                            <div className="div-skillBox">
                                                <p><b>Name:</b> {item.skillName}</p>
                                                <p><b>Modifier:</b> {item.modifier}</p>
                                                <p><b>Description:</b> {item.description}</p>
                                            </div>
                                        </div>)
                                })
                        }
                        {
                            this.state.feats
                                .sort((a, b) => {
                                    if (a.featName < b.featName) return -1;
                                    if (a.featName > b.featName) return 1;
                                    return 0;
                                })
                                .map(item => {
                                    return (
                                        <div key={item._id}>
                                            <div className="div-featBox">
                                                <p><b>Name:</b> {item.featName}</p>
                                                <p><b>Prerequisites:</b> {item.prerequisites}</p>
                                                <p><b>Benefit:</b> {item.benefit}</p>
                                            </div>
                                        </div>)
                                })
                        }
                    </div>
                </div>
            </Modal>
        )
    }
}
