var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: window.innerWidth,
    height: window.innerHeight,
    backgroundColor: '#f5f5f5',
    scene: {
        create: create,
        update: update
    }
};

var graphics;
var text;
var rectWidth = 200;
var rectHeight = 60;

var game = new Phaser.Game(config);

function create ()
{
    graphics = this.add.graphics();

    //  We need 3 extra pointers, as we only get 1 by default
    this.input.addPointer(3);

    //オブジェクトとしてカーソルを表示
    var cursor = this.add.rectangle(200, 150, 148, 148, 0x0a0a0a).setInteractive();

    //カーソルをdraggableに
    this.input.setDraggable(cursor);
    this.input.on('dragstart', function(pointer, dragX, dragY){
        // ...
    })
    this.input.on('drag', function(pointer, dragX, dragY){
        gameObject.setPosition(dragX, dragY);
    })
    this.input.on('dragend', function(pointer, dragX, dragY, dropped){
        // ...
    })
}

//毎フレーム実行される
function update ()
{
//    if (this.input.pointer1.isDown || this.input.pointer2.isDown || this.input.pointer3.isDown || this.input.pointer4.isDown)
//    {
//        graphics.clear();
//    }

//    graphics.fillRect(
//        window.innerWidth/2 - rectWidth/2,
//        this.input.pointer1.y,
//        rectWidth,
//        rectHeight);

    for (let i = 0; i < 6; i++) {
        graphics.fillRect(window.innerWidth/2 - rectWidth/2,
        window.innerHeight/2 - rectHeight/2*(-11 + i*4),
        rectWidth,
        rectHeight);
    }

}
