export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: 'PreloadScene' })
  }

  preload() {
    // this.load.image('empty', 'assets/img/blanc.jpg')
    this.load.image('block', 'assets/img/block.png')
    this.load.image('player', 'assets/img/player.png')
    this.load.image('background', 'assets/img/background.jpg')
    this.load.image('lost', 'assets/img/loose.jpg')

    // this.load.audio('music', 'assets/img/music.wav')
  }

  create() {
    this.scene.start('MainScene')

    /**
     * This is how you would dynamically import the mainScene class (with code splitting),
     * add the mainScene to the Scene Manager
     * and start the scene.
     * The name of the chunk would be 'mainScene.chunk.js
     * Find more about code splitting here: https://webpack.js.org/guides/code-splitting/
     */
    // let someCondition = true
    // if (someCondition)
    //   import(/* webpackChunkName: "mainScene" */ './mainScene').then(mainScene => {
    //     this.scene.add('MainScene', mainScene.default, true)
    //   })
    // else console.log('The mainScene class will not even be loaded by the browser')
  }
}
