var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: window.innerWidth,
    height: window.innerHeight,
    backgroundColor: '#badae8',
    scene: {
        create: create,
        update: update
    }
}; //#f5f5f5　0x000000

/*
var graphics;
var text;
var rectWidth = window.innerWidth/1.5 ;
var rectHeight = 100;
var cursorHeight = 100;
var cursorColor = 0xffffff; //0xffffff
var stripeColor = 0xffffff;

var game = new Phaser.Game(config);

/*

function create ()
{
    graphics = this.add.graphics();

    //オブジェクトとしてカーソルを表示
//    var rect = new Phaser.Geom.Rectangle(100, 100, 30, 30);
    var cursor = this.add.rectangle(window.innerWidth/2, 0, rectWidth, cursorHeight, cursorColor).setInteractive();

    //カーソルをdraggableに
    this.input.setDraggable(cursor);
    this.input.on('drag', function (pointer, cursor, dragX, dragY) {
        cursor.y = dragY;
    });

    for (let i = 0; i < 6; i++) {
//        graphics.fillStyle(stripeColor, 1);
        graphics.fillRect();
        var stripe = this.add.rectangle(window.innerWidth/2,
                                          window.innerHeight/2 - rectHeight/2*(-11 + i*4),
                                          rectWidth,
                                          rectHeight, cursorColor);
    }

}
*/

//今だけ(後で戻す)
var graphics;
var text;
var rectWidth = window.innerWidth ;
var rectHeight = 100;
var cursorHeight = 200;
var cursorColor = 0x000000; //0xffffff
var stripeColor = 0x000000;

var game = new Phaser.Game(config);


function create ()
{
    graphics = this.add.graphics();

    //オブジェクトとしてカーソルを表示
    var cursor = this.add.rectangle(window.innerWidth/2, 0, rectWidth, rectHeight*2, cursorColor).setInteractive();

}

//毎フレーム実行される
function update (){
    cursor.getTopCenter();

//毎フレーム実行される
function update ()
{

}
