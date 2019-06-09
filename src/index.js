import Phaser from "phaser";

var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    resolution: window.devicePixelRatio,
    scene: startScene,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false,
            fps: 60,
        }
    }
};

let mainScene = new Phaser.Scene('main');

mainScene.preload = function()
{

}

mainScene.create = function()
{
}

mainScene.update = function() 
{
}
var game = new Phaser.Game(config);
