var graphics;
var cursor;
var cursor2;
var stripes;
var rectangles;
var cursorWidth = window.innerWidth;
var stripeWidth = window.innerWidth;
var cursorHeight = 160;
var stripeHeight = 160;
var cursorColor = 0x2b2b2b; //0xffffff
var stripeColor = 0x2b2b2b;
var suitekiplayed;
var knockplayed;
var mainMode;
var textColor = "0x000000";

class titleScene extends Phaser.Scene {

    constructor ()    {
        super({ key: 'titleScene', active: true });
    }

    create(){

        // textを配置
        var textToWater = this.add.text(100, 100, "waterScene").setFontSize(32).setColor(textColor);
        var textToKnock = this.add.text(100, 200, "knockScene").setFontSize(32).setColor(textColor);

        // textをクリックできるように設定
        textToWater.setInteractive({

            useHandCursor: true  // マウスオーバーでカーソルが指マークになる

        });

        textToKnock.setInteractive({

            useHandCursor: true  // マウスオーバーでカーソルが指マークになる

        });

        // textをクリックしたら__Sceneに遷移
        textToWater.on('pointerdown', () => {

            mainMode = "water";

            cursorHeight = 160;
            stripeHeight = 160;
//            cursorColor = 0xffffff; //0xffffff
//            stripeColor = 0xffffff;

            this.scene.start("mainScene")

        });

        textToKnock.on('pointerdown', () => {

            mainMode = "knock";

            cursorHeight = 320;
            stripeHeight = 160;
//            cursorColor = 0xffffff; //0xffffff
//            stripeColor = 0xffffff;

            this.scene.start("mainScene")
        });
    }
}

class mainScene extends Phaser.Scene {

    constructor ()    {
        super({ key: 'mainScene', active: false });
    }

    preload (){
        this.load.audio('suiteki', ['assets/suiteki.mp3']);
        this.load.audio('suityu', ['assets/suityu.mp3']);
        this.load.audio('knock', ['assets/knock.mp3']);
        this.load.image('thumb', 'assets/thumb.png');
        this.load.image('thumb_mobile', 'assets/thumb.png');

    }

    create (){

        //Return to titleボタンを配置
        var textToTitle = this.add.text(0, 0, "Return to title").setFontSize(32).setColor('#000000');

        textToTitle.setInteractive({

            useHandCursor: true  // マウスオーバーでカーソルが指マークになる

        });

        textToTitle.on('pointerdown', () => {
            this.scene.start("titleScene")
        });

        this.suityu = this.sound.add('suityu', false);
        this.suiteki = this.sound.add('suiteki', false);
        this.knock = this.sound.add('knock', false);

        graphics = this.add.graphics(
        {fillStyle: { color: cursorColor }
        });
        cursor = new Phaser.Geom.Rectangle(
            window.innerWidth/2 - cursorWidth/2,
            0,
            cursorWidth,
            cursorHeight, Phaser.Geom.Rectangle.Contains);

        //当たり判定のための透明カーソル
        cursor2 = new Phaser.Geom.Rectangle(
            window.innerWidth/2 - cursorWidth/2,
            0,
            cursorWidth,
            cursorHeight * 0.9,
            Phaser.Geom.Rectangle.Contains);

        //ストライプ生成
        rectangles = [];
        for(var i = 0; i < 6; i++)
        {
            rectangles.push(new Phaser.Geom.Rectangle(
            window.innerWidth/2 - stripeWidth/2,
            window.innerHeight/2 - stripeHeight/2*(-11 + i*4),
            stripeWidth,
            stripeHeight,
            cursorColor));
        }

        this.input.on('pointermove', function (pointer) {
            Phaser.Geom.Rectangle.CenterOn(
                cursor, window.innerWidth/2, pointer.y);

            Phaser.Geom.Rectangle.CenterOn(
                cursor2, window.innerWidth/2, pointer.y);
        });
    }

    update(){
        graphics.clear();
        graphics.fillRectShape(cursor);

        for(var i = 0; i < rectangles.length; i++){
            graphics.fillRectShape(rectangles[i]);
        }

        if(mainMode == "water"){
            if (Phaser.Geom.Intersects.RectangleToRectangle(cursor2, rectangles[0])
                || Phaser.Geom.Intersects.RectangleToRectangle(cursor2, rectangles[1])
                || Phaser.Geom.Intersects.RectangleToRectangle(cursor2, rectangles[2])
                || Phaser.Geom.Intersects.RectangleToRectangle(cursor2, rectangles[3])
                || Phaser.Geom.Intersects.RectangleToRectangle(cursor2, rectangles[4])
                || Phaser.Geom.Intersects.RectangleToRectangle(cursor2, rectangles[5]) ){


                if(!this.suityu.isPlaying){
                    this.suityu.play();
                }
                suitekiplayed = false;

            }else{
                if(this.suityu.isPlaying){
                    this.suityu.stop();
                }
        //
                if(!this.suiteki.isPlaying && !suitekiplayed){
                    this.suiteki.play();
                    suitekiplayed = true;
                }
            }
        }
        if(mainMode == "knock"){
            if(Phaser.Geom.Intersects.RectangleToRectangle(cursor2, rectangles[0])
                && Phaser.Geom.Intersects.RectangleToRectangle(cursor2, rectangles[1])
                || Phaser.Geom.Intersects.RectangleToRectangle(cursor2, rectangles[1])
                && Phaser.Geom.Intersects.RectangleToRectangle(cursor2, rectangles[2])
                || Phaser.Geom.Intersects.RectangleToRectangle(cursor2, rectangles[2])
                && Phaser.Geom.Intersects.RectangleToRectangle(cursor2, rectangles[3])
                || Phaser.Geom.Intersects.RectangleToRectangle(cursor2, rectangles[3])
                && Phaser.Geom.Intersects.RectangleToRectangle(cursor2, rectangles[4])
                || Phaser.Geom.Intersects.RectangleToRectangle(cursor2, rectangles[4])
                && Phaser.Geom.Intersects.RectangleToRectangle(cursor2, rectangles[5] )) {

                if(knockplayed == false){

                    this.knock.play();
                    knockplayed = true;

                }

            }else{
                knockplayed = false;
            }
        }
    }
}

let config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: window.innerWidth,
    height: window.innerHeight,
    backgroundColor: '#ffffff',
    scene: [ titleScene, mainScene ],
    audio: {
        disableWebAudio: true
    }
}

let game = new Phaser.Game(config);

