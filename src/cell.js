import Phaser from "phaser";
import Velocity from './forwardVelocity';

const FORWARD_ACCEL = 20;
const ANGULAR_VELOCITY = 180;
const BASE_SPEED = 600;
const BOOST_RATE = 10;
const ANGULAR_DRAG = 500;



export default class Cell extends Phaser.GameObjects.Ellipse {
    constructor(scene, x, y, radius, color) {
        super(scene, x, y, radius*2, radius*2, color);

        this.scene = scene;
        this.scene.add.existing(this);
        this.scene.physics.world.enable(this);

        this.body.collideWorldBounds = true;
        this.setAngle(180);
        this.body.angularVelocity = 0;
        this.body.angularDrag = ANGULAR_DRAG;
        this.body.setAllowRotation();
        this.velocity = new Velocity({
            baseSpeed: BASE_SPEED,
            acceleration: FORWARD_ACCEL,
            boostRate: BOOST_RATE,
            boostPotential: 1000,
            velocity: 0,
            drag: 5,
        });
    }
    changeDirection() {
        this.scene.physics.velocityFromAngle(
            this.body.rotation, 
            this.velocity.value, 
            this.body.velocity,
        );
    }
    handleCursorKeys(keys) {

        if(keys.left.isDown) {
            this.body.setAngularVelocity(-ANGULAR_VELOCITY);
        }
        else if(keys.right.isDown) {
            this.body.setAngularVelocity(ANGULAR_VELOCITY);
        }

        this.velocity.handleKeys(keys);
        this.changeDirection();

    }
    update(keys) {
        this.velocity.update();
        this.handleCursorKeys(keys);
    }
}