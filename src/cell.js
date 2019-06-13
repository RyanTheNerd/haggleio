import Phaser from "phaser";
import genCircleTexture from "./utils";


export default class Cell extends Phaser.GameObjects.Ellipse {
    constructor(scene, x, y, radius, color) {
        let textureKey = genCircleTexture(scene, radius, color); 
        super(scene, x, y, radius*2, radius*2, color);

        this.scene = scene;
        this.scene.add.existing(this);
        this.scene.physics.world.enable(this);

        this.body.collideWorldBounds = true;
        this.speed = 300;
    }
    changeDirection(angle) {
        this.scene.physics.velocityFromAngle(
            angle, 
            this.speed, 
            this.body.velocity,
        );
    }
}