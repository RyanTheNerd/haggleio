import Phaser from "phaser";
import {Button} from './utils';

class TitleScreen extends Phaser.Scene {
    constructor(config) {
        super(config);
    }
    preload() {
        this.load.script('webfont', 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js');
        this.buttonStyle = {
            scene: this,
            hAlign: true,
            vAlign: false,
            y: 50,
            textStyle: {
                fontSize: '23px',
                fontFamily: "'Work Sans'",
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
    }
    create() {
        WebFont.load({
            google: {
                families: ['Work Sans']
            },
            active: function() {

                this.menu = new Menu(this.buttons, this.buttonStyle);
            }.bind(this)
        })
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