import Phaser from "phaser";

export default class Background extends Phaser.GameObjects.Graphics {
    constructor(config, scene) {
        super(scene);
        this.width = config.columns * config.lineSpacing;
        this.height = config.rows * config.lineSpacing;

        this.lineStyle(config.lineThickness, config.lineColor, 1);
        this.fillStyle(config.backgroundColor);
        this.fillRect(0, 0, this.width, this.height);
        this.beginPath();

        for(let x = 0; x <= this.width; x += config.lineSpacing) {
            this.moveTo(x, 0);
            this.lineTo(x, this.height);
        }

        for(let y = 0; y <= this.height; y += config.lineSpacing) {
            this.moveTo(0, y);
            this.lineTo(this.width, y);
        }

        this.closePath();
        this.strokePath();
        scene.add.existing(this);
        scene.physics.world.setBounds(0, 0, this.width, this.height);

        let textureKey = "background";
        this.generateTexture(textureKey, this.width, this.height);
        this.visible = false;


        scene.add.image(this.width/2, this.height/2, textureKey);
    }
}