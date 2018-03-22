import React, { PureComponent } from 'react';
import { Button } from 'react-materialize'
import { createPlayer } from './services/players.service'
import { readAllOptions } from './services/options.service'
import { Redirect } from 'react-router-dom'
import Select from 'react-select'
import 'react-select/dist/react-select.css'

export default class Player extends PureComponent {
    state = {
        weapons: [],
        skills: [],
        feats: []
    }

    componentDidMount() {
        return readAllOptions()
            .then(options => {
                let weaponsArray = options.data[0]
                let skillsArray = options.data[1]
                let featsArray = options.data[2]

                this.setState({
                    weapons: weaponsArray,
                    skills: skillsArray,
                    feats: featsArray
                })
            })
            .catch(err => {
                console.warn(err)
            })
    }

    render() {
        return (
            <CreatePlayer weapons={this.state.weapons} skills={this.state.skills} feats={this.state.feats} />
        )
    }
}

class CreatePlayer extends PureComponent {
    state = {
        formData: {
            playerName: "",
            characterName: "",
            race: "",
            class: "",
            level: "",
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

    playerInputChange = (event) => {
        let target = event.target
        let value = target.value
        let name = target.name

        this.setState(prevState => {
            const newState = { ...prevState.formData }
            newState[name] = value

            return {
                formData: newState
            }
        })
    }


    playerStatChange = (event) => {
        let target = event.target
        let value = target.value
        let name = target.name

        this.setState(prevState => {
            const newState = { ...prevState.formData }
            newState.stats[name] = value

            return {
                formData: newState
            }
        })
    }

    handleWeaponChange = (selectedOption) => {
        this.setState(prevState => {
            let newState = { ...prevState.formData }
            newState.weapons = selectedOption

            return {
                formData: newState
            }
        })
    }

    handleSkillChange = (selectedOption) => {
        this.setState(prevState => {
            let newState = { ...prevState.formData }
            newState.skills = selectedOption

            return {
                formData: newState
            }
        })
    }

    handleFeatChange = (selectedOption) => {
        this.setState(prevState => {
            let newState = { ...prevState.formData }
            newState.feats = selectedOption

            return {
                formData: newState
            }
        })
    }

    handleAbilityChange = selectedOption => {
        this.setState(prevState => {
            let newState = { ...prevState.formData }
            newState.abilities = selectedOption

            return {
                formData: newState
            }
        })
    }

    rollDice = () => {
        let dieArray = []
        for (let i = 0; i < 4; i++) {
            dieArray.push((Math.floor(Math.random() * 6) + 1))
        }

        dieArray.sort((a, b) => a - b).shift()

        return dieArray.reduce((a, b) => {
            return a + b
        })
    }

    rollAbility = event => {
        event.preventDefault()
        let target = event.target
        let name = target.id
        let total = this.rollDice()

        this.setState(prevState => {
            let newState = { ...prevState.formData }
            newState.stats[name] = total

            return {
                formData: newState
            }
        })
    }

    submitCharacter = (event) => {
        event.preventDefault()
        createPlayer(this.state.formData)
            .then(response => {
                console.log(response)
                this.setState({
                    redirect: true
                })
            })
            .catch(err => {
                console.log(err)
            })
    }

    render() {
        let weaponOptions = this.props.weapons.map(item => {
            return {
                label: item.weaponName,
                value: item._id
            }
        })
        let skillOptions = this.props.skills.map(item => {
            return {
                label: item.skillName,
                value: item._id
            }
        })
        let featOptions = this.props.feats.map(item => {
            return {
                label: item.featName,
                value: item._id
            }
        })
        let abilityOptions = []

        if (this.state.redirect === true) {
            return <Redirect to='/player-list' />
        }

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
                                <input type="text" name="playerName" value={this.state.formData.playerName} onChange={this.playerInputChange} />
                            </div>
                            <div className="input-field col s5">
                                <label>Character Name</label>
                                <input type="text" name="characterName" value={this.state.formData.characterName} onChange={this.playerInputChange} />
                            </div>
                            <div className="input-field col s1">
                                <label>Level</label>
                                <input type="number" name="level" value={this.state.formData.level} onChange={this.playerInputChange} />
                            </div>
                            <div className="input-field col s3">
                                <label>Race</label>
                                <input type="text" name="race" value={this.state.formData.race} onChange={this.playerInputChange} />
                            </div>
                            <div className="input-field col s3">
                                <label>Class</label>
                                <input type="text" name="class" value={this.state.formData.class} onChange={this.playerInputChange} />
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s2">
                                <a onClick={this.rollAbility} href="">
                                    <i id="strength" className="small material-icons icon-diceRoll">casino</i>
                                </a>
                                <label className={"label-diceRoll " + (this.state.formData.stats.strength !== "" ? "active" : " ")}>Str</label>
                                <input className="input-diceRoll" type="number" name="strength" value={this.state.formData.stats.strength} onChange={this.playerStatChange} />
                            </div>
                            <div className="input-field col s2">
                                <a onClick={this.rollAbility} href="">
                                    <i id="dexterity" className="small material-icons icon-diceRoll">casino</i>
                                </a>
                                <label className={"label-diceRoll " + (this.state.formData.stats.dexterity !== "" ? "active" : " ")}>Dex</label>
                                <input className="input-diceRoll" type="number" name="dexterity" value={this.state.formData.stats.dexterity} onChange={this.playerStatChange} />
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s2">
                                <a onClick={this.rollAbility} href="">
                                    <i id="constitution" className="small material-icons icon-diceRoll">casino</i>
                                </a>
                                <label className={"label-diceRoll " + (this.state.formData.stats.constitution !== "" ? "active" : " ")}>Con</label>
                                <input className="input-diceRoll" type="number" name="constitution" value={this.state.formData.stats.constitution} onChange={this.playerStatChange} />
                            </div>
                            <div className="input-field col s2">
                                <a onClick={this.rollAbility} href="">
                                    <i id="intelligence" className="small material-icons icon-diceRoll">casino</i>
                                </a>
                                <label className={"label-diceRoll " + (this.state.formData.stats.intelligence !== "" ? "active" : " ")}>Int</label>
                                <input className="input-diceRoll" type="number" name="intelligence" value={this.state.formData.stats.intelligence} onChange={this.playerStatChange} />
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s2">
                                <a onClick={this.rollAbility} href="">
                                    <i id="wisdom" className="small material-icons icon-diceRoll">casino</i>
                                </a>
                                <label className={"label-diceRoll " + (this.state.formData.stats.wisdom !== "" ? "active" : " ")}>Wis</label>
                                <input className="input-diceRoll" type="number" name="wisdom" value={this.state.formData.stats.wisdom} onChange={this.playerStatChange} />
                            </div>
                            <div className="input-field col s2">
                                <a onClick={this.rollAbility} href="">
                                    <i id="charisma" className="small material-icons icon-diceRoll">casino</i>
                                </a>
                                <label className={"label-diceRoll " + (this.state.formData.stats.charisma !== "" ? "active" : " ")}>Cha</label>
                                <input className="input-diceRoll" type="number" name="charisma" value={this.state.formData.stats.charisma} onChange={this.playerStatChange} />
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s2">
                                <label>Fort</label>
                                <input type="number" name="fortitude" value={this.state.formData.stats.fortitude} onChange={this.playerStatChange} />
                            </div>
                            <div className="input-field col s2">
                                <label>Ref</label>
                                <input type="number" name="reflex" value={this.state.formData.stats.reflex} onChange={this.playerStatChange} />
                            </div>
                            <div className="input-field col s2">
                                <label>Will</label>
                                <input type="number" name="will" value={this.state.formData.stats.will} onChange={this.playerStatChange} />
                            </div>
                            <div className="input-field col s4 offset-s2">
                                <label>Base Attack</label>
                                <input type="number" name="baseAttack" value={this.state.formData.baseAttack} onChange={this.playerInputChange} />
                            </div>
                        </div>
                        <div className='row'>
                            <div className="section div-formSelect input-field col s8">
                                <Select
                                    name="weapons"
                                    multi={true}
                                    onChange={this.handleWeaponChange}
                                    options={weaponOptions}
                                    placeholder="Weapons"
                                    removeSelected={false}
                                    value={this.state.formData.weapons}
                                />
                            </div>
                            <div className="section div-formSelect input-field col s8">
                                <Select
                                    name="skills"
                                    multi={true}
                                    onChange={this.handleSkillChange}
                                    options={skillOptions}
                                    placeholder="Skills"
                                    removeSelected={false}
                                    value={this.state.formData.skills}
                                />
                            </div>
                            <div className="section div-formSelect input-field col s8">
                                <Select
                                    name="feats"
                                    multi={true}
                                    onChange={this.handleFeatChange}
                                    options={featOptions}
                                    placeholder="Feats"
                                    removeSelected={false}
                                    value={this.state.formData.feats}
                                />
                            </div>
                            <div className="section div-formSelect input-field col s8">
                                <Select
                                    name="abilities"
                                    multi={true}
                                    onChange={this.handleAbilityChange}
                                    options={abilityOptions}
                                    placeholder="Abilities"
                                    removeSelected={false}
                                    value={this.state.formData.abilities}
                                />
                            </div>
                        </div>
                        <Button type="submit" className="btn waves-effect waves-light btn-submitForm" onClick={this.submitCharacter}>Submit Character
                            <i className="material-icons right">send</i>
                        </Button>
                        <Button type="submit" className="btn red waves-effect waves-light btn-cancelForm" onClick={this.cancelCreate}>Cancel
                            <i className="material-icons right">close</i>
                        </Button>
                    </form>
                </div>
            </div>
        )
    }
}