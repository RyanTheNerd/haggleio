import Phaser from "phaser";

export default class PhysicsEnabledCircle extends Phaser.GameObjects.Ellipse {
    constructor(scene, x, y, radius, color) {
        super(scene, x, y, radius*2, radius*2, color);

        // Add to the scene and enable physics
        this.scene = scene;
        this.scene.add.existing(this);
        this.scene.physics.world.enable(this);
        
        // Set physics to cirlce and collide world bounds
        this.body.setCircle(radius);
        this.body.collideWorldBounds = true;

    }
}