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
        this.overlayObjects = [];

        // Background
        this.backgroundColor = 0xcccccc;
        this.background = new Background({
            columns: 32,
            rows: 18,
            lineSpacing: 256,
            lineThickness: 5,
            lineColor: 0x0000cc,
            backgroundColor: this.backgroundColor,
        },this);


        // In Game Objects
        let bounds = this.physics.world.bounds;
        let cellx = bounds.width/2;
        let celly = bounds.height/2;

        this.cell = new Cell({
            scene: this,
            side: 'left',
            position: new Phaser.Math.Vector2(cellx, celly),
            color: 0x66f,
            keys: ['W', 'D', 'A', 'D', 'SPACE', 'SHIFT'],
            usePointer: true,
            camera: 'fullscreen',
            backgroundColor: this.backgroundColor,
        });
        this.food = new FoodGroup(this, 25);
        this.ball = new Ball(this, 75, 0x00ffff);

        // Goals

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

        this.inGameObjects = [
            this.background.image, 
            this.cell, 
            this.food, 
            this.ball, 
            this.goals.left, 
            this.goals.right,
        ];

        // Minimap
        this.minimap = new Minimap({
            scene: this,
            width: 500,
            padding: 10,
            background: this.background,
            corner: [0, 1],
        });

        this.cameras.main.ignore(this.inGameObjects);
        this.cameras.cameras.push(this.cameras.cameras.shift());

        this.pointer = new Phaser.Geom.Point(0, 0);
        this.input.on('pointermove', function(pointer) {
            this.pointer.setTo(pointer.x, pointer.y);
        }, this);
        this.cell.camera.ignore(this.overlayObjects);
    }
    update() {
        this.cell.update();
    }
    handleGoal(goal) {
        this.cell.resetPosition();
        this.ball.resetPosition();

    }
}

Phaser.Math.Distance.BetweenPoints = function(point1, point2) {
    return Phaser.Math.Distance.Between(point1.x, point1.y, point2.x, point2.y);
}

export default SinglePlayerScene;