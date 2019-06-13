import Phaser from "phaser";

export default function genCircleTexture(scene, radius, color) {
    let textureKey = `circle ${radius} ${color}`;
    if(!scene.textures.exists(textureKey)) {
        let graphics = scene.add.graphics();
        graphics.fillStyle(color, 1.0);
        graphics.fillCircle(radius, radius, radius);
        graphics.generateTexture(textureKey, radius*2, radius*2);
        graphics.visible = false;
    }
    return textureKey;
}