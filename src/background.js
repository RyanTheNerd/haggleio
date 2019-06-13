import Phaser from "phaser";

export default function(config, scene) {
    let graphics = new Phaser.GameObjects.Graphics(scene);
    scene.add.existing(graphics);

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

    let textureKey = "background";
    graphics.generateTexture(textureKey, xMax, yMax);

    scene.physics.world.setBounds(0, 0, xMax, yMax);

    let world = scene.physics.world;
    scene.add.image(textureKey, world.width/2, world.height/2);
}