import Phaser from "phaser";
import genCircleTexture from "./utils";


export default class Cell extends Phaser.GameObjects.Ellipse {
    constructor(scene, x, y, radius, color) {
        super(scene, x, y, radius*2, radius*2, color);

        this.scene = scene;
        this.scene.add.existing(this);
        this.scene.physics.world.enable(this);

        this.body.collideWorldBounds = true;
        this.angle = 180;
        this.angularVelocity = 0;
        this.angularDrag = 0.3;
        this.baseSpeed = 300;
        this.potentialBoost = 100;
        this.boostRate = 10;
    }
    changeDirection(angle) {
        if(this.potentialBoost > this.boostRate) {
            this.potentialBoost -= this.boostRate;
            this.speed += this.boostRate;
        }
        if(this.speed >= this.baseSpeed) {

            this.speed -= this.drag;
        }
        this.scene.physics.velocityFromAngle(
            angle, 
            this.speed, 
            this.body.velocity,
        );
    }
    handleCursorKeys(keys, angle) {
        if(keys.left.isDown) {
            this.angularVelocity -= angle;
        }
        else if(keys.right.isDown) {
            this.angularVelocity += angle;
        }
        this.angularVelocity += this.angularVelocity > 0 ? -this.angularDrag : this.angularDrag;
        this.angle += this.angularVelocity;

        if(keys.up.isDown) {
            this.changeDirection(this.angle);
        }
        else if(keys.down.isDown) {
            this.changeDirection(this.angle + 180);
        }
    }
}