import React, { Component } from 'react';
import detectStorage from '../_utils/detect-storage'
import exportCharacter from '../_utils/export-character'
//import encodeImage from '../_utils/encode-image'
import characterData from '../_utils/character-data'
import { Container, Spacer, Box, Row, VerticalRule } from './Layout/Layout'
import TextInput from './Inputs/TextInput'
import NumberInput from './Inputs/NumberInput'


class App extends Component {

    state = {
        theme: 'dark',
        notSupported: '',
        character: {}
    }

    componentDidMount() {
        // Load character from localStorage if he exists
        if (detectStorage('localStorage')) {
            try {
                let storedCharacter = JSON.parse(localStorage.getItem('dnd-character'));
                this.setState({ character: storedCharacter })
            } catch (e) {
                // Character does not exist, Create New one.
                this.setState({ character: characterData })
            }
        } else {
            this.setState({ notSupported: <div>Sorry. App is not supported in this browser.</div> })
        }

        // set theme
        document.body.classList.add(this.state.theme);

        // add event for saving 
        window.addEventListener("beforeunload", this.onUnload)
    }

    componentWillUnmount() {
        window.removeEventListener("beforeunload", this.onUnload)
    }

    onUnload = (event) => {
        if (detectStorage('localStorage')) {
            localStorage.setItem('dnd-character', JSON.stringify(this.state.character));
            // TODO: localStorage.setItem('settings', this.state.theme);
        }
    }

    handleExport = (e) => {
        exportCharacter(JSON.stringify(this.state.character), `character-sheet-${this.state.character.name}.json`);
    }

    handleChange = (e) => {
        let character = { ...this.state.character }
        character[e.target.id] = e.target.value;
        this.setState({ character })
    }


    render() {

        document.title = (this.state.character.name) ? this.state.character.name + ' | D&D Character Sheet' : 'D&D Character Sheet';

        let character = this.state.character;
        let characterRace = (character.subrace) ? character.subrace : character.race;
        let characterClass = (character.subclass) ? character.subclass : character.class;

        return (
            <div id="dnd-app">
                {this.state.notSupported}
                <header>
                    <img id="dnd-logo" src="/images/dnd-logo.png" alt="D&amp;D Logo" />
                    <h1 id="dnd-title">Character Sheet</h1>
                </header>
                <main id="dnd-content">
                    <Box>
                        <TextInput
                            value={character.name || ''}
                            id="name"
                            onChange={this.handleChange}
                            placeholder="Character Name"
                        />
                        <Row>
                            <TextInput
                                value={characterRace || ''}
                                id="race"
                                size="dnd-small"
                                onChange={this.handleChange}
                                placeholder="Race"
                            />
                            <VerticalRule />
                            <TextInput
                                value={characterClass || ''}
                                id="class"
                                size="dnd-small"
                                onChange={this.handleChange}
                                placeholder="Class"
                            />
                            <VerticalRule />
                            <TextInput
                                value={character.level || ''}
                                id="level"
                                size="dnd-small"
                                onChange={this.handleChange}
                                placeholder="Level"
                            />
                            <Container size="3"></Container>
                        </Row>
                    </Box>

                    <section id="dnd-ability-scores">
                        <Box tag="Strength">
                            <NumberInput
                                value={character.strength || ''}
                                id="strength"
                                onChange={this.handleChange}
                            />
                        </Box>
                        <Box tag="Dexterity">
                            <NumberInput
                                value={character.dexterity || ''}
                                id="dexterity"
                                onChange={this.handleChange}
                            />
                        </Box>
                        <Box tag="Constitution">
                            <NumberInput
                                value={character.constitution || ''}
                                id="constitution"
                                onChange={this.handleChange}
                            />
                        </Box>
                        <Box tag="Intelligence">
                            <NumberInput
                                value={character.intelligence || ''}
                                id="intelligence"
                                onChange={this.handleChange}
                            />
                        </Box>
                        <Box tag="Wisdom">
                            <NumberInput
                                value={character.wisdom || ''}
                                id="wisdom"
                                onChange={this.handleChange}
                            />
                        </Box>
                        <Box tag="Charisma">
                            <NumberInput
                                value={character.charisma || ''}
                                id="charisma"
                                onChange={this.handleChange}
                            />
                        </Box>
                    </section>
                </main>
                <footer>
                    <p>&copy; 2019 Jacob King</p>
                </footer>
            </div>
        );
    }
}

export default App;