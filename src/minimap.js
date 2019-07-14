import Phaser from 'phaser';

export default class MiniMap extends Phaser.Cameras.Scene2D.Camera {
  constructor ({
    scene,
    x = 10,
    y = 10,
    width = 500,
    height = 125,
    zoom = 0.05,
    scroll = { x: 100*100/2, y: 100*25/2 }
  }) {
    super(x, y, width, height)
    this.scene = scene
    this.zoom = zoom
    this.scroll = scroll
  }

  init () {
    this.scene.cameras.cameras.push(this)
    this.scene.cameras.addExisting(this)
    this.setZoom(this.zoom)
    this.setScroll(this.scroll.x, this.scroll.y)
    return this
  }
}