import Phaser from 'phaser';
import {genCircleGraphics} from './utils';

export default class Ball extends Phaser.GameObjects.Arc {
    constructor(scene, radius, color, x = null, y = null) {
        let bounds = scene.physics.world.bounds;
        x = (x == null) ? bounds.width/2 : x;
        y = (y == null) ? bounds.height/2 : y;
        super(scene, x, y, radius, 0, 360, true, color);
        this.radius = radius;
        this.scene.physics.world.enable(this);
        this.scene.add.existing(this);
        this.body.setCircle(radius, -radius/2, -radius/2);

        this.body.collideWorldBounds = true;
        this.body.setBounce(0.9, 0.9);
        this.body.setDrag(10);
        this.scene.physics.add.collider(this, this.scene.cell);
    }
}
