var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    pixelArt: true,
    scene: {
        preload: preload,
        create: create
    },
    audio: {
        disableWebAudio: true
    }
};

var game = new Phaser.Game(config);

function preload ()
{
    this.load.audio('theme', [
        'assets/sound_alum.mp3'
    ]);

    this.load.image('wizball', 'assets/thumb.png');
}

function create ()
{
    this.add.image(400, 300, 'wizball').setScale(0.3);

    var music = this.sound.add('theme');

    music.play();
}
