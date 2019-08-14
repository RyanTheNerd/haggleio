import Phaser from "phaser";
import Circle from "./circle";

const FORWARD_ACCEL = 50;
const ANGULAR_VELOCITY = 180;
const BASE_SPEED = 1000;
const MAX_SPEED = 1500;
const DRAG = 300;
const BOOST_RATE = 100;
const MAX_BOOST_POTENTIAL = 10000;
const BOOST_POTENTIAL = MAX_BOOST_POTENTIAL;



export default class Cell extends Circle {
    constructor(scene, side, radius, color) {
        let bounds = scene.physics.world.bounds;
        let x = bounds.width/2;
        let y = bounds.height/2;
        super(scene, x, y, radius, color);

        this.keys = scene.keys;
        this.boosting = false;

        this.setAngle(180);
        this.body.angularVelocity = 0;
        this.body.setAllowRotation();
        this.body.setAllowDrag();
        this.body.setDrag(DRAG, DRAG);
        this.body.setMaxSpeed(MAX_SPEED);
        this.baseSpeed = BASE_SPEED;
        this.baseAccel = FORWARD_ACCEL;
        this.boostRate = BOOST_RATE;
        this.boostPotential = BOOST_POTENTIAL;
        this.maxBoostPotential = MAX_BOOST_POTENTIAL;
   }
    changeDirection() {
        let boost = this.boosting ? this.boostRate : 0;
        this.boosting = 0;
        if(this.body.speed > this.baseSpeed) {
            this.acceleration = 0;
        }
        this.scene.physics.velocityFromAngle(
            this.body.rotation, 
            this.body.speed + this.acceleration + boost, 
            this.body.velocity,
        );
    }
    handleCursorKeys() {
        let angularVelocity = ANGULAR_VELOCITY;
        if(this.keys.shift.isDown) {
            angularVelocity += 1.50; 
        }

        this.handlePointer();

        if(this.keys.up.isDown) {
            // TODO: make 2d acceleration radial
            this.acceleration = this.baseAccel;
        }
        else if(this.keys.down.isDown) {
            this.acceleration = -this.baseAccel;
        }
        else {
            this.acceleration = 0;
        }

        if(this.keys.space.isDown) {
            if(this.boostPotential > this.boostRate) {
                this.boostPotential -= this.boostRate;
                this.boosting = true;
            }
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
    increaseBoostPotential(foodEnergy) {
        if(this.boostPotential < this.maxBoostPotential) {
            this.boostPotential += foodEnergy;
        }
        else {
            this.boostPotential = this.maxBoostPotential;
        }
    }
    update() {
        this.handleCursorKeys();
    }
}
