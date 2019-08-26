import Phaser from "phaser";
import {Button} from './utils';

class TitleScreen extends Phaser.Scene {
    constructor(config) {
        super(config);
    }
    preload() {
        let buttonStyle = {
            scene: this,
            hAlign: true,
            vAlign: false,
            y: 50,
            textStyle: {
                fontFamily: 'monospace',
                fontSize: '23px',
                padding: {x: 8, y: 8},
            },
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
        this.buttons = [
            {
                content: "Single Player",
                handleClick: function() { this.scene.start('singlePlayer')}.bind(this),
            },
            {
                content: "Local MultiPlayer",
                handleClick: function() {this.scene.start('localMultiplayer')}.bind(this),
            }
        ];
        this.menu = new Menu(this.buttons, buttonStyle);
    }

}

class Menu {
    constructor(buttons, buttonStyle) {
        this.buttons = [];
        for(let buttonConfig of buttons) {
            let button = new Button(buttonStyle, buttonConfig.content, buttonConfig.handleClick);
            buttonStyle.y += button.height + 20;
            this.buttons.push(button);
        }
        return this;
    }
}

export default TitleScreen;