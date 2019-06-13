import Phaser from "phaser";
import Cell from './cell';
import generateBackground from './background';
import FoodGroup from './food';

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
    generateBackground({
        columns: 50,
        rows: 50,
        lineSpacing: 100,
        lineThickness: 5,
        lineColor: 0xff00ff,
    },this);

    this.cell = new Cell(this, 400, 300, 50, 0x6666ff);
    this.food = new FoodGroup(this, 150);


    this.cursor = new Phaser.Math.Vector2(0, 0);
    this.input.on('pointermove', function(pointer) {
        this.cursor.set(pointer.x, pointer.y);
    }, this);

    this.cameras.main.startFollow(this.cell, true);

}

mainScene.update = function() 
{
    let camera = this.cameras.main;
    let center = new Phaser.Math.Vector2(camera.centerX, camera.centerY);
    if (Phaser.Math.Distance.BetweenPoints(center, this.cursor) > 5) {
        let angle = Phaser.Math.Angle.BetweenPoints(center, this.cursor);
        this.cell.changeDirection(angle*180/Math.PI);
    }
}

Phaser.Math.Distance.BetweenPoints = function(point1, point2) {
    return Phaser.Math.Distance.Between(point1.x, point1.y, point2.x, point2.y);
}
var game = new Phaser.Game(config);
