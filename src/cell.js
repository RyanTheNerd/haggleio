import phaser from "phaser";


class Cell extends phaser.GameObjects.Sprite {
    constructor(scene, x, y, radius, color) {
        this.graphics = scene.add.graphics({'add': 'false'});
        this.graphics.fillCircle(radius, radius, radius);
        this.textureKey = radius + color;
        this.texture = graphics.generateTexture(this.textureKey, radius*2, radius*2);
        super(scene, x, y, this.textureKey);
    } 
}