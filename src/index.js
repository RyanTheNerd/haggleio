import Phaser from "phaser";
import Cell from './cell';

let mainScene = new Phaser.Scene('main');

var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    resolution: window.devicePixelRatio,
    scene: mainScene,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false,
            fps: 60,
        }
    }
};


mainScene.preload = function()
{
}

mainScene.create = function()
{
    this.cell = new Cell(this, 400, 300, 50, 0xff00ff);
    this.keys = this.input.keyboard.createCursorKeys();
    console.log(this.cell);
}

mainScene.update = function() 
{
    if (this.keys.up) {
        this.cell.changeDirection("N");
    }
    else if (this.keys.down) {
        this.cell.changeDirection("S");
    }
    if (this.keys.left) {
        this.cell.changeDirection("W");
    }
    else if (this.keys.right) {
        this.cell.changeDirection("E"); 
    }
}
var game = new Phaser.Game(config);
