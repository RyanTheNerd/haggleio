function addAbsolute(n1, n2) {
    if(n1 >= 0) {
        n1 += n2;
    }
    else {
        n1 -= n2;
    }
    return n1;
};

export default class ForwardVelocity {
    constructor(config) {
        this.baseSpeed = config.baseSpeed;
        this.baseAcceleration = config.acceleration;
        this.acceleration = 0;
        this.value = config.velocity;
        this.maxSpeed = 1500;
        this.speed = Math.abs(config.velocity);
        this.boostMaxPotential = config.boostMaxPotential;
        this.boostRate = config.boostRate;
        this.boostPotential = config.boostPotential;
        this.drag = config.drag;
    }
    handleKeys(keys) {
        if(keys.up.isDown) {
            this.acceleration = this.baseAcceleration;
        }
        else if(keys.down.isDown) {
            this.acceleration = -this.baseAcceleration;
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
    }
    moveForward(ratio) {
        if(ratio > 1) {
            ratio = 1;
        }
        this.acceleration = this.baseAcceleration * ratio;
        this.update();
    }
    boost() {
        if(this.boostPotential > this.boostRate) {
            this.boostPotential -= this.boostRate;
            this.value = addAbsolute(this.value, this.boostRate);
        }
    }
    setVelocity(velocity) {
        this.value = velocity;
        this.speed = Math.abs(this.value);
    }
    changeVelocity(velocity) {
        this.setVelocity(this.value + velocity);
    }
    changeSpeed(speed) {
        if(this.value >= 0) {
            this.changeVelocity(speed);
        }
        else {
            this.changeVelocity(-speed);
        }
    }
    setSpeed(speed) {
        this.changeSpeed(speed - this.speed);
    }
    update() {
        if(this.speed < this.baseSpeed && this.speed + Math.abs(this.acceleration) < this.baseSpeed) {
            this.changeVelocity(this.acceleration);
        }
        else if(this.speed > this.maxSpeed) {
            this.setSpeed(this.maxSpeed);
        }
        if(this.speed > this.drag) {
            this.changeSpeed(-this.drag);
        }
        else {
            this.setVelocity(0);
        }
        return this.value;
    }

}