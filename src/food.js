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

        this.scene = scene;
        this.bounds = scene.physics.world.bounds;

        this.foodCount = foodCount;
        this.addFood();
        scene.add.existing(this);
        this.scene.physics.world.enable(this);

        this.scene.physics.add.collider(this, this.scene.cell, function(food, cell) {
            food.destroy();
            cell.velocity.boostPotential += cell.velocity.boostRate * 50;
            let camera = this.scene.cameras.main;
            
            this.addFood();
        }, null, this);
    }
    addFood() {
        for(let i = this.countActive(); i < this.foodCount; i++) {
            let x = Phaser.Math.Between(0, this.bounds.width);
            let y = Phaser.Math.Between(0, this.bounds.height);
            let color = Phaser.Display.Color.HSVToRGB(Math.random(), 1, 1).color;
            let food = new Food(this.scene, x, y, 15, color);
            this.add(food);
        }
    }
}