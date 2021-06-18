var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: window.innerWidth,
    height: window.innerHeight,
    backgroundColor: '#ffffff',
    scene: {
        create: create,
        update: update
    }
};

var graphics;
var text;
var rectWidth = window.innerWidth ;
var rectHeight = 240;
var cursorHeight = 240;
var cursorColor = 0x000000; //0xffffff
var stripeColor = 0x000000;

var game = new Phaser.Game(config);

function create ()
{
    graphics = this.add.graphics();

    //オブジェクトとしてカーソルを表示
    var cursor = this.add.rectangle(window.innerWidth/2, 0, rectWidth+1, cursorHeight, cursorColor).setInteractive();

    //カーソルをdraggableに
    this.input.setDraggable(cursor);
    this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
        gameObject.y = dragY;
    });

    for (let i = 0; i < 6; i++) {
        graphics.fillStyle(stripeColor, 1);
        graphics.fillRect(window.innerWidth/2 - rectWidth/2,
        window.innerHeight/2 - rectHeight/2*(-11 + i*4),
        rectWidth,
        rectHeight);
    }
}

//毎フレーム実行される
function update ()
{

//    if (this.input.pointer1.isDown || this.input.pointer2.isDown || this.input.pointer3.isDown || this.input.pointer4.isDown)
//    {
//        graphics.clear();
//    }

}
