import genCircleTexture from './utils';

class Food extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, radius, color) {
        let textureKey = genCircleTexture(scene, radius, color); 
        super(scene, x, y, textureKey);

        this.scene = scene;
        this.scene.physics.world.enable(this);
        this.scene.add.existing(this);
    }
}
export default class FoodGroup extends Phaser.GameObjects.Group {
    constructor(scene, foodCount) {
        super(scene);

        let bounds = scene.physics.world.bounds;

        for(let i = 0; i < foodCount; i++) {
            let x = Phaser.Math.Between(0, bounds.width);
            let y = Phaser.Math.Between(0, bounds.height);
            let color = Phaser.Display.Color.HSVToRGB(Math.random(), 1, 1).color;
            let food = new Food(scene, x, y, 15, color);
            this.add(food);
        }
        scene.add.existing(this);
        this.scene.physics.world.enable(this);

        this.scene.physics.add.collider(this, this.scene.cell, function(food, cell) {
            food.destroy();
            cell.setScale(cell.scaleX + 0.1);
            let camera = this.scene.cameras.main;
            camera.zoomTo(camera.zoom * 0.95);
        }, null, this);
    }
}