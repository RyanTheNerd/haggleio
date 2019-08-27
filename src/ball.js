import Circle from './circle';

export default class Ball extends Circle {
    constructor(scene, radius, color, x = null, y = null) {
        let bounds = scene.physics.world.bounds;
        x = (x == null) ? bounds.width/2 : x;
        y = (y == null) ? bounds.height/2 : y;
        let startingPosition = new Phaser.Math.Vector2(x, y);
        super(scene, x, y, radius, color);
        this.startingPosition = startingPosition;
        this.radius = radius;

        this.body.setBounce(1, 1);
        this.body.setAllowDrag(true);
        let drag = 250;
        this.body.setDrag(drag, drag);
        this.scene.physics.add.collider(this, this.scene.cells);
        this.body.setMass(0.5);
    }
    resetPosition() {
        this.body.reset(this.startingPosition.x, this.startingPosition.y);
    }
}
