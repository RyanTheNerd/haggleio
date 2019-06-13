import Phaser from "phaser";


export default class extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, radius, color) {
        let textureKey = `${radius} ${color}`;

        let graphics = scene.add.graphics();
        graphics.fillStyle(color, 1.0);
        graphics.fillCircle(radius, radius, radius);
        graphics.generateTexture(textureKey, radius*2, radius*2);
        graphics.visible = false;

        super(scene, x, y, textureKey);

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