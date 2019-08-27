import Phaser from "phaser";
import Cell from './cell';
import Background from './background';
import FoodGroup from './food';
import Ball from "./ball";
import Goal from "./goal";
import Minimap from "./minimap";

const BG_COLOR = 0xcccccc;
class BaseScene extends Phaser.Scene {
    constructor(config) {
        super();
        this.config = config;
    }
    create() {
        this.overlayObjects = [];

        // Background
        this.backgroundColor = BG_COLOR;
        this.background = new Background({
            columns: 32,
            rows: 18,
            lineSpacing: 256,
            lineThickness: 5,
            lineColor: 0x0000cc,
            backgroundColor: this.backgroundColor,
        },this);


        // In Game Objects
        this.cells = [];
        for(let cellConf of this.config.cells) {
            cellConf.scene = this;
            this.cells.push(new Cell(cellConf));
        }
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
            this.cells, 
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
        for(let cell of this.cells) {
            cell.camera.ignore(this.overlayObjects);
        }
    }
    update() {
        for(let cell of this.cells) {
            cell.update();
        }
    }
    handleGoal(goal) {
        for(let cell of this.cells) {
            cell.resetPosition();
        }
        this.ball.resetPosition();
    }

}
export default BaseScene;