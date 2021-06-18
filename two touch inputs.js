var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: window.innerWidth,
    height: window.innerHeight,
    backgroundColor: '#000000',
    scene: {
        create: create,
        update: update
    }
}; //#f5f5f5

var graphics;
var text;
var rectWidth = 10000; //200
var rectHeight = 130; //60
var iconWidth = 600;
var pre_y = 0;
var new_y = 0;
var dy = 0;

var game = new Phaser.Game(config);

function create ()
{
    graphics = this.add.graphics();

    //オブジェクトとしてカーソルを表示
    var cursor = this.add.rectangle(window.innerWidth/2, 0, rectWidth, cursorHeight, cursorColor).setInteractive();

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
    
}
