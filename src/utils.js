import Phaser from "phaser";

export function genCircleTexture(scene, radius, color) {
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

export class Button extends Phaser.GameObjects.Text {
    constructor(config, content, handleClick) {
        let xPosition = config.hAlign ? config.scene.cameras.main.centerX : config.x;
        let yPosition = config.vAlign ? config.scene.cameras.main.centerY : config.y;

        super (
            config.scene, 
            xPosition, 
            yPosition, 
            content, 
            config.textStyle,
        );
        this.font = "'Work Sans'";
        this.setOrigin();
        this.scene.add.existing(this);

        this.colors = config.colors;
        this.setPrimaryColors();



        this.setInteractive();
        this.on('pointerover', () => this.setSecondaryColors());
        this.on('pointerout', () => this.setPrimaryColors());
        this.on('pointerup', handleClick);
    }
    setColors(primary) {
        let foreground = primary ? this.colors.primary.foreground : this.colors.secondary.foreground;
        let background = primary ? this.colors.primary.background : this.colors.secondary.background;
        this.setColor(foreground);
        this.setBackgroundColor(background);
    }
    setPrimaryColors() { this.setColors(true) }
    setSecondaryColors() { this.setColors(false) }

}

export class PhysicsEnabledCircle extends Phaser.GameObjects.Ellipse {
    constructor(scene, x, y, radius, color) {
        super(scene, x, y, radius*2, radius*2, color);

        // Add to the scene and enable physics
        this.scene = scene;
        this.scene.add.existing(this);
        this.scene.physics.world.enable(this);
        
        // Set physics to cirlce and collide world bounds
        this.body.setCircle(radius);
        this.body.collideWorldBounds = true;

    }
}