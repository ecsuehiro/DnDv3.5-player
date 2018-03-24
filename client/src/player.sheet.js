import React, { PureComponent } from 'react'
import { Redirect } from 'react-router-dom'
import { readPlayerById } from './services/players.service'

export default class PlayerSheet extends PureComponent {
    state = {
        formData: {
            playerName: "",
            characterName: "",
            race: "",
            class: "",
            level: "",
            hp: "",
            stats: {
                strength: "",
                dexterity: "",
                constitution: "",
                intelligence: "",
                wisdom: "",
                charisma: "",
                fortitude: "",
                reflex: "",
                will: ""
            },
            baseAttack: "",
            weapons: [],
            skills: [],
            feats: [],
            abilities: []
        },
        redirect: false
    }

    componentDidMount() {
        readPlayerById(this.props.match.params.id)
            .then(response => {
                this.setState({
                    formData: response.data
                })
            })
            .catch(err => console.warn(err))
    }

    render() {
        if (this.state.redirect === true) {
            return <Redirect to='/player-list' />
        }
        return (
            <div>
                <h3>Character Sheet</h3>
                <p>Hello There!</p>
                <div className="container">
                    <form>
                        <div className="row">
                            <div>
                                <div className="col s6">
                                    <p>{this.state.formData.playerName}</p>
                                    <p>{this.state.formData.characterName}</p>
                                    <p>{this.state.formData.race}</p>
                                    <p>{this.state.formData.class}</p>
                                    <p>{this.state.formData.level}</p>
                                    <p>{this.state.formData.hp}</p>
                                    <p>{this.state.formData.baseAttack}</p>
                                </div>
                                <div className="col s6">
                                    <p>{this.state.formData.stats.strength}</p>
                                    <p>{this.state.formData.stats.dexterity}</p>
                                    <p>{this.state.formData.stats.constitution}</p>
                                    <p>{this.state.formData.stats.intelligence}</p>
                                    <p>{this.state.formData.stats.wisdom}</p>
                                    <p>{this.state.formData.stats.charisma}</p>
                                    <p>{this.state.formData.stats.fortitude}</p>
                                    <p>{this.state.formData.stats.reflex}</p>
                                    <p>{this.state.formData.stats.will}</p>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}