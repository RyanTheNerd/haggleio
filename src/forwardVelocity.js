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
        this.maxSpeed = 1000;
        this.speed = Math.abs(config.velocity);
        this.boostRate = config.boostRate;
        this.boostPotential = config.boostPotential;
        this.drag = config.drag;
    }
    handleKeys(keys) {
        if(keys.up.isDown) {
            this.acceleration = this.baseAcceleration;
        }
        else if(keys.down.isDown) {
            this.acceleration = - this.baseAcceleration;
        }
        else {
            this.acceleration = 0;
        }

        if(keys.space.isDown) {
            this.boost();
        }
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
        this.value += velocity;
        this.speed = Math.abs(this.value);
    }
    changeSpeed(speed) {
        if(this.value >= 0) {
            this.value += speed;
        }
        else {
            this.value -= speed;
        }
        this.speed = Math.abs(this.value);
    }
    update() {
        if(this.speed < this.baseSpeed) {
            this.changeVelocity(this.acceleration);
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