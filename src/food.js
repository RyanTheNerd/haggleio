import {PhysicsEnabledCircle as Circle} from './utils';

class Food extends Circle {
    constructor(scene, x, y, radius, color) {
        super(scene, x, y, radius, color);

        this.scene = scene;
        this.scene.physics.world.enable(this);
        this.scene.add.existing(this);
        this.energy = 2000;
    }
    dieAndRespawn(bounds) {
        let rand = (bound) => Phaser.Math.Between(0, bound);
        this.setPosition(rand(bounds.width), rand(bounds.height));
    }
}
export default class FoodGroup extends Phaser.GameObjects.Group {
    constructor(scene, foodCount) {
        super(scene);

        // Assign arguments to 'this'
        this.scene = scene;
        this.bounds = scene.physics.world.bounds;
        this.foodCount = foodCount;

        // Generate the food and add it to the world
        this.addFood();
        scene.add.existing(this);
        this.scene.physics.world.enable(this);

        this.scene.physics.add.overlap(this, this.scene.cells, function(food, cell) {
            food.dieAndRespawn(this.bounds);
            cell.increaseBoostPotential(food.energy);
            let camera = this.scene.cameras.main;
            
        }, null, this);
    }
    addFood() {
        for(let i = 0; i <= this.foodCount; i++) {
            let x = Phaser.Math.Between(0, this.bounds.width);
            let y = Phaser.Math.Between(0, this.bounds.height);
            let color = Phaser.Display.Color.HSVToRGB(Math.random(), 1, 1).color;
            let food = new Food(this.scene, x, y, 15, color);
            this.add(food);
        }
    }
}