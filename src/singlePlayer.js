import Phaser from "phaser";
import Cell from './cell';
import Background from './background';
import FoodGroup from './food';
import Ball from "./ball";
import Goal from "./goal";
import Minimap from "./minimap";

class SinglePlayerScene extends Phaser.Scene {
    constructor(config) {
        super(config);
    }
    create() {
        this.backgroundColor = 0xcccccc;
        this.background = new Background({
            columns: 32,
            rows: 18,
            lineSpacing: 256,
            lineThickness: 5,
            lineColor: 0x0000cc,
            backgroundColor: this.backgroundColor,
        },this);
        this.cameras.main.setBackgroundColor(this.backgroundColor);

        //this.physics.world.setBounds(0, 0, 100*100, 100*25);
        this.keys = this.input.keyboard.addKeys({
            'up': Phaser.Input.Keyboard.KeyCodes.W,
            'down': Phaser.Input.Keyboard.KeyCodes.S,
            'left': Phaser.Input.Keyboard.KeyCodes.A,
            'right': Phaser.Input.Keyboard.KeyCodes.D,
            'space': Phaser.Input.Keyboard.KeyCodes.SPACE,
            'shift': Phaser.Input.Keyboard.KeyCodes.SHIFT,
        });

        this.cell = new Cell(this, 'left', 50, 0x6666ff);
        this.food = new FoodGroup(this, 25);
        this.ball = new Ball(this, 75, 0x00ffff);
        this.minimap = new Minimap({
            scene: this,
            width: 500,
            padding: 10,
            background: this.background,
            corner: [0, 1],
        });

        let goalConfig = {
            width: 200,
            height: 1000,
            scene: this,
            color: 0xff00ff,
            alpha: 0.5,
        };

        this.goals = {
            'left': new Goal(goalConfig, 'left'),
            'right': new Goal(goalConfig, 'right'),
        };


        this.pointer = new Phaser.Geom.Point(0, 0);
        this.input.on('pointermove', function(pointer) {
            this.pointer.setTo(pointer.x, pointer.y);
        }, this);

        let camera = this.cameras.main;
        console.log(camera);

        camera.startFollow(this.cell, true);
        camera.update = function() {
            let camera = this.cameras.main;
            if(this.cell.body.speed > this.cell.baseSpeed) {
                camera.zoomTo(Math.sqrt(this.cell.baseSpeed/this.cell.body.speed + 0.1), 100);
            }
            else {
                camera.zoomTo(1);
            }
        }.bind(this);
    }
    update() {
        this.cell.update(this.keys);
    }
}

Phaser.Math.Distance.BetweenPoints = function(point1, point2) {
    return Phaser.Math.Distance.Between(point1.x, point1.y, point2.x, point2.y);
}

export default SinglePlayerScene;