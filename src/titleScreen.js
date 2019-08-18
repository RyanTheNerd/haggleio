import Phaser from "phaser";
import {Button} from './utils';

class TitleScreen extends Phaser.Scene {
    constructor(config) {
        super(config);
    }
    preload() {
        let textConfig = {
            fontFamily: 'monospace',
            fontSize: '23px',
            padding: {x: 8, y: 8},
        }
        let buttonConfig = {
            scene: this,
            content: 'Single Player',
            onclick: function()  { this.scene.start('singlePlayer') }.bind(this),
            hAlign: true,
            vAlign: true,
            colors: {
                secondary: {
                    foreground: "#ff3a65",
                    background: "#3affd1",
                },
                primary: {
                    foreground: "#ff0044",
                    background: "#00ffb7",
                },
            },
        }
        this.startButton = new Button(buttonConfig, textConfig);
    }

}

export default TitleScreen;