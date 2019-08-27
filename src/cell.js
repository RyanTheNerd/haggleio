import Phaser from "phaser";
import {PhysicsEnabledCircle as Circle} from "./utils";

const BASE_RADIUS = 50;
const DISTANCE_FROM_CENTER = 1000;
const BASE_CONST = 100;
const ANGULAR_VELOCITY = BASE_CONST;
const FORWARD_ACCEL = BASE_CONST * 20;
const MAX_ACCEL_SPEED = BASE_CONST * 12;
const MAX_BOOST_SPEED = MAX_ACCEL_SPEED * 1.5;
const DRAG = FORWARD_ACCEL / 5;
const BOOST_RATE = 100;
const MAX_BOOST_POTENTIAL = 10000;
const BOOST_POTENTIAL = MAX_BOOST_POTENTIAL;



export default class Cell extends Circle {
    constructor(config) {
        let center = new Phaser.Math.Vector2(config.scene.background.width/2, config.scene.background.height/2);

        let xOffset = config.side == 'left' ? -DISTANCE_FROM_CENTER : DISTANCE_FROM_CENTER;
        super(config.scene, center.x + xOffset, center.y + Math.random()/10, BASE_RADIUS, config.color);
        this.startingPosition = this.body.position.clone();
        this.usePointer = config.usePointer;
        this.side = config.side;

        // Input
        let keys = config.keys;
        this.keys = this.scene.input.keyboard.addKeys({
            'up': Phaser.Input.Keyboard.KeyCodes[keys[0]],
            'down': Phaser.Input.Keyboard.KeyCodes[keys[1]],
            'left': Phaser.Input.Keyboard.KeyCodes[keys[2]],
            'right': Phaser.Input.Keyboard.KeyCodes[keys[3]],
            'space': Phaser.Input.Keyboard.KeyCodes[keys[4]],
            'shift': Phaser.Input.Keyboard.KeyCodes[keys[5]],
        });

        // Physics
        this.setAngle(this.side == 'left' ? 360 : 180);
        this.body.angularVelocity = 0;
        this.body.setAllowRotation();
        this.body.setAllowDrag();
        this.baseDrag = DRAG;
        this.body.setDrag(this.baseDrag, this.baseDrag);
        this.baseAngularVelocity = ANGULAR_VELOCITY;
        this.acceleration = 0;
        this.maxAccelSpeed = MAX_ACCEL_SPEED;
        this.baseAccel = FORWARD_ACCEL;
        this.boostRate = BOOST_RATE;
        this.boostPotential = BOOST_POTENTIAL;
        this.maxBoostPotential = MAX_BOOST_POTENTIAL;
        this.maxBoostSpeed = MAX_BOOST_SPEED;

        // Camera
        let viewport = this.scene.cameras.main;
        if(config.camera == 'fullscreen') {
            var camWidth = viewport.width;
            var camHeight = viewport.height;
            var camX = 0;
            var camY = 0;
        }
        else if (config.camera == 'vSplit') {
            var camWidth = viewport.width / 2;
            var camHeight = viewport.height;
            var camY = 0;
            var camX = config.side == 'left' ? 0 : camWidth;
        }
        this.camera = this.scene.cameras.add(camX, camY, camWidth, camHeight, false, config.side);
        this.camera.setBackgroundColor(config.backgroundColor);
        this.camera.startFollow(this, true);
        this.camera.update = function() {
            if(this.body.speed > this.maxAccelSpeed) {
                this.camera.zoomTo(this.maxAccelSpeed / this.body.speed, 1000, 'Linear', true);
            }
            else {
                this.camera.zoomTo(1, 1000, 'Linear', true);
            }
        }.bind(this);
   }
    changeDirection() {
        this.scene.physics.velocityFromAngle(
            this.body.rotation, 
            this.acceleration,
            this.body.acceleration,
        );
        this.scene.physics.velocityFromAngle(
            this.body.rotation, 
            this.body.speed,
            this.body.velocity,
        );
        this.boost = 0;
    }
    handleCursorKeys() {
        if(this.usePointer) {
            this.handlePointer();
        }
        else {
            this.angularVelocity = this.baseAngularVelocity;
            if(this.keys.shift.isDown) {
                this.angularVelocity *= 1.50; 
            }
            if(this.keys.left.isDown) {
                this.body.angularVelocity = this.angularVelocity * -1;
            }
            else if(this.keys.right.isDown) {
                this.body.angularVelocity = this.angularVelocity;
            }
            else {
                this.body.angularVelocity = 0;
            }
        }
        if(this.keys.space.isDown) {
            if(this.boostPotential > this.boostRate) {
                this.boostPotential -= this.boostRate;
                this.boost = this.boostRate;
            }
        }
        if(this.keys.up.isDown) {
            this.acceleration = this.baseAccel;
        }
        else if(this.keys.down.isDown) {
            this.acceleration = -this.baseAccel;
            this.boost *= -1;
        }
        if(this.keys.shift.isDown) {
            this.body.setDrag(this.baseDrag*5, this.baseDrag*5);
        }
        else {
            this.body.setDrag(this.baseDrag, this.baseDrag);
        }
        if(this.body.speed >= this.maxAccelSpeed) {
            if(Math.abs(this.boost) > 0 && this.body.speed <= this.maxBoostSpeed) {
                this.acceleration += this.boost;
            }
            else {
                this.acceleration = 0;
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
    resetPosition() {
        this.body.reset(this.startingPosition.x, this.startingPosition.y);
    }
    update() {
        this.handleCursorKeys();
    }
}
