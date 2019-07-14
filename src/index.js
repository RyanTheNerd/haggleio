import Phaser from "phaser";
import Cell from './cell';
import generateBackground from './background';
import FoodGroup from './food';
import Ball from "./ball";
import Goal from "./goal";

let mainScene = new Phaser.Scene('main');

var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    resolution: window.devicePixelRatio,
    scene: mainScene,
    scale: {
        mode: Phaser.Scale.RESIZE,
        width: 800,
        height:600,
    },
    physics: {
        default: 'arcade',
        arcade: {
            debug: true,
            fps: 60,
        }
    }
};


mainScene.preload = function()
{
}

mainScene.create = function()
{
    this.backgroundColor = 0xcccccc;
    generateBackground({
        columns: 100,
        rows: 25,
        lineSpacing: 100,
        lineThickness: 5,
        lineColor: 0x0000cc,
        backgroundColor: this.backgroundColor,
    },this);
    this.cameras.main.setBackgroundColor(this.backgroundColor);

    //this.physics.world.setBounds(0, 0, 100*100, 100*25);

    this.cell = new Cell(this, 400, 300, 50, 0x6666ff);
    this.food = new FoodGroup(this, 25);
    this.ball = new Ball(this, 75, 0x00ffff);

    let goalConfig = {
        width: 200,
        height: 500,
        scene: this,
        color: 0xff00ff,
        alpha: 0.5,
    };

    this.goals = {
        'left': new Goal(goalConfig, 'left'),
        'right': new Goal(goalConfig, 'right'),
    };

    this.keys = this.input.keyboard.addKeys({
        'up': Phaser.Input.Keyboard.KeyCodes.W,
        'down': Phaser.Input.Keyboard.KeyCodes.S,
        'left': Phaser.Input.Keyboard.KeyCodes.A,
        'right': Phaser.Input.Keyboard.KeyCodes.D,
        'space': Phaser.Input.Keyboard.KeyCodes.SPACE,
        'shift': Phaser.Input.Keyboard.KeyCodes.SHIFT,
    });
    this.cursor = new Phaser.Math.Vector2(0, 0);
    this.input.on('pointermove', function(pointer) {
        this.cursor.set(pointer.x, pointer.y);
    }, this);

    this.cameras.main.startFollow(this.cell, true);

}

mainScene.update = function() 
{
    let camera = this.cameras.main;
    this.cell.handleCursorKeys(this.keys);
    this.cell.update(this.keys);
    if(this.cell.velocity.speed > this.cell.velocity.baseSpeed) {
        camera.zoomTo(Math.sqrt(this.cell.velocity.baseSpeed/this.cell.velocity.speed) + 0.1, 100);
    }
}

Phaser.Math.Distance.BetweenPoints = function(point1, point2) {
    return Phaser.Math.Distance.Between(point1.x, point1.y, point2.x, point2.y);
}
var game = new Phaser.Game(config);
