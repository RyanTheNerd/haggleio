import Phaser from 'phaser';

export default class Goal extends Phaser.GameObjects.Rectangle {
    constructor(config, side) {
        let bounds = config.scene.physics.world.bounds;
        console.log(config.side);
        let x = side == 'left' ? config.width/2 : bounds.width - config.width/2;
        let y = bounds.height/2;

        super(config.scene, x, y, config.width, config.height, config.color, config.alpha);
        config.scene.add.existing(this);
        config.scene.physics.world.enable(this);
    }
}