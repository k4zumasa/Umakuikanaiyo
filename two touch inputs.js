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
var rectWidth = 1000; //200
var rectHeight = 130; //60
var iconWidth = 600;

var game = new Phaser.Game(config);

function create ()
{
    graphics = this.add.graphics();

    //  We need 3 extra pointers, as we only get 1 by default
    this.input.addPointer(3);

//    text = this.add.text(10, 10, 'Use up to 4 fingers at once', { font: '16px Courier', fill: '#00ff00' });
}

//毎フレーム実行される
function update ()
{
    if (this.input.pointer1.isDown || this.input.pointer2.isDown || this.input.pointer3.isDown || this.input.pointer4.isDown)
    {
        graphics.clear();
    }

//    text.setText([
//        'pointer1.isDown: ' + this.input.pointer1.isDown,
//    ]); //

    //操作できるカーソルを描画
    graphics.fillStyle(0xffffff, 1);//graphics.fillStyle(0x0a0a0a, 1)
    graphics.fillRect(window.innerWidth/2 - iconWidth/2, this.input.pointer1.y-60, iconWidth, rectHeight*2);
    //graphics.fillRect(window.innerWidth/2 - rectWidth/2, this.input.pointer1.y,200, rectHeight*2);

    //縞模様を描画
    for (let i = 0; i < 20; i++) {
        graphics.fillRect(-20, i*2*rectHeight ,rectWidth, rectHeight);
        //graphics.fillRect(window.innerWidth/2 - rectWidth/2,window.innerHeight/2 - rectHeight/2*(-11 + i*4),rectWidth,rectHeight);
    }
     document.write("");



}
