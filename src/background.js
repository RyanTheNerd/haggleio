import Phaser from "phaser";

export default function(config, scene) {
    let graphics = new Phaser.GameObjects.Graphics(scene);

    let xMax = config.columns * config.lineSpacing;
    let yMax = config.rows * config.lineSpacing;

    graphics.lineStyle(config.lineThickness, config.lineColor, 1);
    graphics.beginPath();

    for(let x = 0; x <= xMax; x += config.lineSpacing) {
        graphics.moveTo(x, 0);
        graphics.lineTo(x, yMax);
    }

    for(let y = 0; y <= yMax; y += config.lineSpacing) {
        graphics.moveTo(0, y);
        graphics.lineTo(xMax, y);
    }

    graphics.closePath();
    graphics.strokePath();
    scene.add.existing(graphics);
    scene.physics.world.setBounds(0, 0, xMax, yMax);

    let textureKey = "background";
    graphics.generateTexture(textureKey, xMax, yMax);
    graphics.visible = false;


    scene.add.image(xMax/2, yMax/2, textureKey);
}