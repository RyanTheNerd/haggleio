import Phaser from 'phaser';

export default class MiniMap extends Phaser.Cameras.Scene2D.Camera {
    constructor(config) {
        let bg = config.background;
        let ratio = config.width / bg.width;
        let width = config.width;
        let height = ratio * bg.height;

        var x = config.padding;
        var y = config.padding;
        if(config.corner[0] == 1) {
            x = config.scene.cameras.main.width - width - config.padding;
        }
        if(config.corner[1] == 1) {
            y = config.scene.cameras.main.height - height - config.padding;
        }
        super(x, y, width, height);

        this.scene = config.scene;

        this.scene.cameras.cameras.push(this);
        this.scene.cameras.addExisting(this);
        this.setZoom(ratio);
        this.setScroll(bg.width/2, bg.height/2);
        this.setAlpha(0.5);
        return this;

    }
}