import Phaser from 'phaser';

export default class Goal extends Phaser.GameObjects.Rectangle {
    constructor(config, side) {
        let bounds = config.scene.physics.world.bounds;
        let x = side == 'left' ? config.width/2 : bounds.width - config.width/2;
        let y = bounds.height/2;

        super(config.scene, x, y, config.width, config.height, config.color, config.alpha);
        this.side = side;
        config.scene.add.existing(this);
        config.scene.physics.world.enable(this);
        config.scene.physics.add.overlap(this, this.scene.ball, function(goal, ball) {
            console.log(`Point earned for ${goal.side}`);
        }, null, this);
    }
}