import Phaser from "phaser";
import Circle from "./circle";
import Velocity from './forwardVelocity';

const FORWARD_ACCEL = 20;
const ANGULAR_VELOCITY = 180;
const BASE_SPEED = 800;
const BOOST_RATE = 10;
const ANGULAR_DRAG = 500;



export default class Cell extends Circle {
    constructor(scene, side, radius, color) {
        let bounds = scene.physics.world.bounds;
        let x = bounds.width/2;
        let y = bounds.height/2;
        super(scene, x, y, radius, color);

        this.setAngle(180);
        this.body.angularVelocity = 0;
        this.body.angularDrag = ANGULAR_DRAG;
        this.body.setAllowRotation();
        this.velocity = new Velocity({
            baseSpeed: BASE_SPEED,
            acceleration: FORWARD_ACCEL,
            boostRate: BOOST_RATE,
            boostPotential: 2000,
            boostMaxPotential:2000,
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
        let angularVelocity = ANGULAR_VELOCITY;
        if(keys.shift.isDown) {
            angularVelocity += 1.50; 
        }

        if(keys.left.isDown) {
            this.body.setAngularVelocity(-angularVelocity);
        }
        else if(keys.right.isDown) {
            this.body.setAngularVelocity(angularVelocity);
        }
        else {
            this.handlePointer(angularVelocity);
        }

        this.velocity.handleKeys(keys);
        this.changeDirection();

    }
    handlePointer(angularVelocity, pointer = this.scene.pointer) {
        let cam = this.scene.cameras.main;
        let points = [cam.centerX, cam.centerY, pointer.x, pointer.y];
        let distance = Phaser.Math.Distance.Between(...points);
        let angle = Phaser.Math.Angle.Between(...points);
        if(distance > 20) {
            this.body.rotation = angle/Math.PI * 180;
            this.velocity.moveForward();
        }
    }
    update(keys) {
        this.velocity.update();
        this.handleCursorKeys(keys);
    }
}