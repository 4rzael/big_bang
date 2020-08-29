import PhaserLogo from '../objects/phaserLogo'
import FpsText from '../objects/fpsText'

const FULL = 868
const HALF = FULL / 2

export default class LostScene extends Phaser.Scene {
  constructor() {
    super({ key: 'LostScene' })
  }

  create () {
    this.bg = this.physics.add.sprite(HALF, HALF,'lost')
  }

  update () {
  }
}
