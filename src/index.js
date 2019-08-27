import Phaser from "phaser";
import titleScreen from "./titleScreen";
import singlePlayerScene from "./singlePlayer";
import localMultiplayerScene from "./localMultiplayer";


let config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    resolution: window.devicePixelRatio,
    scale: {
        mode: Phaser.Scale.RESIZE,
        width: 800,
        height:600,
    },
    physics: {
        default: 'arcade',
        arcade: {
            fps: 60,
        }
    },
};
let game = new Phaser.Game(config);
game.scene.add('titleScreen', titleScreen);
game.scene.add('singlePlayer', singlePlayerScene);
game.scene.add('localMultiplayer', localMultiplayerScene);

game.scene.start('titleScreen');

