import Phaser from "phaser";
import Circle from "./circle";

const FORWARD_ACCEL = 500;
const ANGULAR_VELOCITY = 180;
const BASE_SPEED = 100;
const MAX_SPEED = 150;
const BOOST_RATE = 10;



export default class Cell extends Circle {
    constructor(scene, side, radius, color) {
        let bounds = scene.physics.world.bounds;
        let x = bounds.width/2;
        let y = bounds.height/2;
        super(scene, x, y, radius, color);

        this.setAngle(180);
        this.body.angularVelocity = 0;
        this.body.setAllowRotation();
        this.body.setMaxSpeed(MAX_SPEED);
        this.baseSpeed = BASE_SPEED;
        this.baseAccel = FORWARD_ACCEL;
        this.boostRate = BOOST_RATE;
   }
    changeDirection() {
        this.scene.physics.velocityFromAngle(
            this.body.rotation, 
            this.body.speed, 
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
            this.handlePointer();
        }
        if(keys.up.isDown) {
            // TODO: make 2d acceleration radial
            this.acceleration = this.baseAccel;
        }
        else if(keys.down.isDown) {
            this.acceleration = -this.baseAccel;
        }
        else {
            this.acceleration = 0;
        }
        if(keys.shift.isDown) {
            this.changeSpeed(-this.baseSpeed*0.05);
        }

        if(keys.space.isDown) {
            this.boost();
        }
        this.changeDirection();

    }
    handlePointer(pointer = this.scene.pointer) {
        let cam = this.scene.cameras.main;
        let points = [cam.centerX, cam.centerY, pointer.x, pointer.y];
        let distance = Phaser.Math.Distance.Between(...points);
        let angle = Phaser.Math.Angle.Between(...points);
        this.body.rotation = angle/Math.PI * 180;

        let ratio = distance / (this.scene.cameras.main.centerX * 0.30);
    }
    update(keys) {
        this.handleCursorKeys(keys);
    }
}