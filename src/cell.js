import Phaser from "phaser";


export default class extends Phaser.Physics.Arcade.Sprite {
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

        this.body.collideWorldBounds = true;
    }
    changeDirection(direction) {
        let directions = {
            'N': -90,
            'S': 90,
            'E': 0,
            'W': 180,
            'NE': -45,
            'NW': -135,
            'SE': 45,
            'SW': 135,
        };
        this.scene.physics.velocityFromAngle(
            directions[direction], 
            this.speed, 
            this.body.velocity,
        );
    }
}