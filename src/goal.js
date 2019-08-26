import Phaser from 'phaser';

export default class Goal extends Phaser.GameObjects.Rectangle {
    constructor(config, side) {
        let bounds = config.scene.physics.world.bounds;
        let x = side == 'left' ? config.width/2 : bounds.width - config.width/2;
        let y = bounds.height/2;

        super(config.scene, x, y, config.width, config.height, config.color, config.alpha);
        this.side = side;
        this.score = 0;
        this.scoreText = this.scene.add.text(0, 0, `${side}: ${this.score}`, {fontFamily: 'monospace', padding: 16});
        this.scoreText.setBlendMode(4);
        let camera = this.scene.cameras.main;
        this.scoreText.setPosition(side == 'left' ? 0 : camera.width, 0);
        this.scoreText.setOrigin(...(side == 'left' ? [0, 0] : [1, 0]));
        this.side = side;
        this.ballOverlapping = false;
        this.winningText = this.scene.add.text(
            camera.width/2, 
            camera.height/2, 
            `Point earned for ${this.side}`, 
            {
                fontFamily: 'monospace',
                fontSize: '64px',
            }
        );
        this.winningText.setOrigin(0.5, 0.5);
        this.winningText.setVisible(false);
        config.scene.add.existing(this);
        config.scene.physics.world.enable(this);
        config.scene.physics.add.overlap(this, this.scene.ball, function(goal, ball) {
            if(this.ballOverlapping) return;
            this.ballOverlapping = true;
            this.score++;
            this.scoreText.setText(`${side}: ${this.score}`);
            this.winningText.setVisible(true);
            this.scene.handleGoal(goal);
        }, null, this);
        this.scene.overlayObjects.push(this.scoreText, this.winningText);
    }
}