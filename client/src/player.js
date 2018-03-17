import React, { PureComponent } from 'react';
import { Button } from 'react-materialize'
import { create } from './services/players.service'

export default class Player extends PureComponent {
    state = {
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
    }

    playerInputChange = (event) => {
        let target = event.target
        let value = target.value
        let name = target.name

        this.setState({
            [name]: value
        })
    }

    playerStatChange = (event) => {
        let target = event.target
        let value = target.value
        let name = target.name

        this.setState(prevState => {
            let newState = { ...prevState.stats }
            newState[name] = value

            return {
                stats: newState
            }
        })
    }

    submitCharacter = (event) => {
        event.preventDefault()
        create(this.state)
            .then(response => {
                console.log("Created")
                console.log(response)
            })
            .catch(err => {
                console.log(err)
            })
    }

    render() {

        return (
            <div>
                <div className="container player-form">
                    <form>
                        <div className="row">
                            <div>
                                <h3 className="title">Create Character</h3>
                            </div>
                            <div className="input-field col s6">
                                <label>Player Name</label>
                                <input type="text" name="playerName" value={this.state.playerName} onChange={this.playerInputChange} />
                            </div>
                            <div className="input-field col s5">
                                <label>Character Name</label>
                                <input type="text" name="characterName" value={this.state.characterName} onChange={this.playerInputChange} />
                            </div>
                            <div className="input-field col s1">
                                <label>Level</label>
                                <input type="text" name="level" value={this.state.level} onChange={this.playerInputChange} />
                            </div>
                            <div className="input-field col s2">
                                <label>HP</label>
                                <input type="text" name="hp" value={this.state.hp} onChange={this.playerInputChange} />
                            </div>
                            <div className="input-field col s3">
                                <label>Race</label>
                                <input type="text" name="race" value={this.state.race} onChange={this.playerInputChange} />
                            </div>
                            <div className="input-field col s3">
                                <label>Class</label>
                                <input type="text" name="class" value={this.state.class} onChange={this.playerInputChange} />
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s2">
                                <label>Str</label>
                                <input type="text" name="strength" value={this.state.stats.strength} onChange={this.playerStatChange} />
                            </div>
                            <div className="input-field col s2">
                                <label>Dex</label>
                                <input type="text" name="dexterity" value={this.state.stats.dexterity} onChange={this.playerStatChange} />
                            </div>
                            <div className="input-field col s2">
                                <label>Con</label>
                                <input type="text" name="constitution" value={this.state.stats.constitution} onChange={this.playerStatChange} />
                            </div>
                            <div className="input-field col s2">
                                <label>Int</label>
                                <input type="text" name="intelligence" value={this.state.stats.intelligence} onChange={this.playerStatChange} />
                            </div>
                            <div className="input-field col s2">
                                <label>Wis</label>
                                <input type="text" name="wisdom" value={this.state.stats.wisdom} onChange={this.playerStatChange} />
                            </div>
                            <div className="input-field col s2">
                                <label>Cha</label>
                                <input type="text" name="charisma" value={this.state.stats.charisma} onChange={this.playerStatChange} />
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s2">
                                <label>Fort</label>
                                <input type="text" name="fortitude" value={this.state.stats.fortitude} onChange={this.playerStatChange} />
                            </div>
                            <div className="input-field col s2">
                                <label>Ref</label>
                                <input type="text" name="reflex" value={this.state.stats.reflex} onChange={this.playerStatChange} />
                            </div>
                            <div className="input-field col s2">
                                <label>Will</label>
                                <input type="text" name="will" value={this.state.stats.will} onChange={this.playerStatChange} />
                            </div>
                            <div className="input-field col s4 offset-s2">
                                <label>Base Attack</label>
                                <input type="text" name="baseAttack" value={this.state.baseAttack} onChange={this.playerInputChange} />
                            </div>
                        </div>
                        <div className="input-field col s6">
                            <label>Weapons</label>
                            <input type="text" name="weapons" value={this.state.weapons} onChange={this.playerInputChange} />
                        </div>
                        <div className="input-field col s6">
                            <label>Skills</label>
                            <input type="text" name="skills" value={this.state.skills} onChange={this.playerInputChange} />
                        </div>
                        <div className="input-field col s6">
                            <label>Feats</label>
                            <input type="text" name="feats" value={this.state.feats} onChange={this.playerInputChange} />
                        </div>
                        <div className="input-field col s6">
                            <label>Abilities</label>
                            <input type="text" name="abilities" value={this.state.abilities} onChange={this.playerInputChange} />
                        </div>
                        <Button type="submit" className="btn waves-effect waves-light btn-submitForm" onClick={this.submitCharacter}>Submit Character
                            <i className="material-icons right">send</i>
                        </Button>
                        <Button type="submit" className="btn red waves-effect waves-light btn-cancelForm" onClick={this.cancelCreate}>Cancel
                            <i className="material-icons right">close</i>
                        </Button>
                    </form>
                </div>
            </div >
        )
    }
}