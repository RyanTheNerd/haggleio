import Phaser from "phaser";

export default function genCircleTexture(scene, radius, color) {
    let textureKey = `circle ${radius} ${color}`;
    if(!scene.textures.exists(textureKey)) {
        let graphics = genCircleGraphics(scene, radius, color);
        graphics.generateTexture(textureKey, radius*2, radius*2);
        graphics.visible = false;
    }
    return textureKey;
}

export function genCircleGraphics(scene, radius, color) {
    let graphics = scene.make.graphics();
    graphics.beginPath();
    graphics.fillStyle(color, 1.0);
    graphics.fillCircle(radius, radius, radius);
    return graphics;

}