import PhaserLogo from '../objects/phaserLogo'
import FpsText from '../objects/fpsText'

const FULL = 864
const HALF = FULL / 2

const TICK_MS = 200
const X = 0
const Y = 1

const clamp = (value) => {
  if (value <= 0) return 0
  if (value >= 26) return 26
  return value
}
export default class MainScene extends Phaser.Scene {
  fpsText

  constructor() {
    super({ key: 'MainScene' })
  }

  init_map() {
    const draw_heart = (x,y) => {
      this.map[x+1][y+0] = 1
      this.map[x+5][y+0] = 1
      this.map[x+0][y+1] = 1
      this.map[x+1][y+1] = 1
      this.map[x+2][y+1] = 1
      this.map[x+4][y+1] = 1
      this.map[x+5][y+1] = 1
      this.map[x+6][y+1] = 1
      this.map[x+1][y+2] = 1
      this.map[x+2][y+2] = 1
      this.map[x+3][y+2] = 1
      this.map[x+4][y+2] = 1
      this.map[x+5][y+2] = 1
      this.map[x+2][y+3] = 1
      this.map[x+3][y+3] = 1
      this.map[x+4][y+3] = 1
      this.map[x+3][y+4] = 1
    }

    draw_heart(5,5)
    draw_heart(15,21)
    draw_heart(20,7)
}

  evolve_map() {
    this.map = this.map.map((line, x) => {
      return line.map((cell, y) => {
        let count = 0
        count += this.map[clamp(x-1)][clamp(y-1)]
        count += this.map[clamp(x)][clamp(y-1)]
        count += this.map[clamp(x+1)][clamp(y-1)]
        count += this.map[clamp(x-1)][clamp(y)]
        count += this.map[clamp(x+1)][clamp(y)]
        count += this.map[clamp(x-1)][clamp(y+1)]
        count += this.map[clamp(x)][clamp(y+1)]
        count += this.map[clamp(x+1)][clamp(y+1)]
        if (cell) {
          return count == 2 || count == 3
        } else {
          return count == 3
        }
      })
    })
  }

  draw_map() {
    if (this.map_sprites) {
      this.map_sprites.forEach(line => {
        line.forEach(sprite => {
          if (sprite)
          sprite.destroy()
        })
      })
    }
    this.map_sprites = this.map.map((line, x) => {
      return line.map((val, y) => {
        if (val) {
          return this.physics.add.sprite(x*32+16, y*32+16, 'block')
        } else {
          return null
          // return this.physics.add.sprite(x*32, y*32, 'empty')
        }
      })
    })
  }
  create () {
    const music = this.game.sound.add('music')
    music.play({loop: true})
    this.bg = this.physics.add.sprite(HALF, HALF,'background')

    this.map = new Array(27).fill(0).map(x => new Array(27).fill(0))
    this.init_map()
    
    this.keys = this.input.keyboard.addKeys({
      up: 'up',
      down: 'down',
      left: 'left',
      right: 'right'
    })
    
    this.player_pos = [13, 13]
    this.player = this.physics.add.sprite(13*32+16,13*32+16,'player');
    this.player.z = Math.pow(2, 53)    
    setInterval(() => {
      this.evolve_map()
      this.handleControls()
      this.draw_map()
      if (this.map[this.player_pos[X]][this.player_pos[Y]]) {
        this.scene.start('LostScene')
      }
    }, TICK_MS)
  }

  update () {
  }

  handleControls () {
    if (this.keys.up.isDown) {
      this.player_pos[Y] -= 1
      if (this.player_pos[Y] <= 0) this.player_pos[Y] = 0
    }
    else if (this.keys.down.isDown) {
      this.player_pos[Y] += 1
      if (this.player_pos[Y] >= 26) this.player_pos[Y] = 26
    }
    if (this.keys.left.isDown) {
      this.player_pos[X] -= 1
      if (this.player_pos[X] <= 0) this.player_pos[X] = 0
    }
    else if (this.keys.right.isDown) {
      this.player_pos[X] += 1
      if (this.player_pos[X] >= 26) this.player_pos[X] = 26
    }

    this.player.setPosition(this.player_pos[X] * 32 + 16, this.player_pos[Y] * 32 + 16)
  }
}
