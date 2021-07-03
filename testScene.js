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
var fadeTime = 1300;
var menuTweenDuration = 200;

//素材の読み込みシーン
class preloadScene extends Phaser.Scene {

    constructor ()    {
        super({ key: 'preloadScene', active: true });
    }

    preload() {
        this.load.image('titleBg', 'assets/thumb_mobile.png');
        this.load.image('description', ['assets/description.png']);

        this.load.audio('suiteki', ['assets/suiteki.mp3']);
        this.load.audio('suityu', ['assets/suityu.mp3']);
        this.load.audio('knock', ['assets/knock.mp3']);
    }

    create() {
        this.scene.start("titleScene")
    }
}

//タイトルシーン
class titleScene extends Phaser.Scene {

    constructor () {
        super({ key: 'titleScene', active: false });
    }

    create() {
        var titleBg = this.add.sprite(window.innerWidth/2, window.innerHeight/2, 'titleBg').setAlpha(0).setInteractive();

        this.tweens.add({
          targets: titleBg,
          alpha: 1,
          duration: fadeTime,
          ease: 'Power2'
        }, this);

        titleBg.on('pointerdown', () => {

            this.tweens.add({
              targets: titleBg,
              alpha: 0,
              duration: fadeTime,
              ease: 'Power2',
              onComplete: () => { this.scene.start("descriptionScene") },
            }, this);
        });

    }
}

class descriptionScene extends Phaser.Scene {

    constructor () {
        super({ key: 'descriptionScene', active: false });
    }

    create() {
        var descriptionImage = this.add.sprite(window.innerWidth/2, window.innerHeight/2+40, 'description').setAlpha(0).setInteractive();

        this.tweens.add({
          targets: descriptionImage,
          alpha: 1,
          y : window.innerHeight/2,
          duration: fadeTime,
          ease: 'Power2'
        }, this);

        descriptionImage.on('pointerdown', () => {

            this.tweens.add({
              targets: descriptionImage,
              alpha: 0,
              y : window.innerHeight/2-40,
              duration: fadeTime,
              ease: 'Power2',
              onComplete: () => { this.scene.start("menuScene") },
            }, this);
        });

    }
}

class menuScene extends Phaser.Scene {

    constructor ()    {
        super({ key: 'menuScene', active: false });
    }

    create() {
        var rect1 = this.add.rectangle(innerWidth/8 * 1, innerHeight/2, innerWidth/4 * 1, innerHeight, 0x72dae8);
        var rect2 = this.add.rectangle(innerWidth/8 * 3, innerHeight/2, innerWidth/4 * 1, innerHeight, 0x5F9968);
        var rect3 = this.add.rectangle(innerWidth/8 * 5, innerHeight/2, innerWidth/4 * 1, innerHeight, 0x8A9DAD);
        var rect4 = this.add.rectangle(innerWidth/8 * 7, innerHeight/2, innerWidth/4 * 1, innerHeight, 0x7F6152);

        rect1.setStrokeStyle(0, 0xffffff);
        rect2.setStrokeStyle(0, 0xffffff);
        rect3.setStrokeStyle(0, 0xffffff);
        rect4.setStrokeStyle(0, 0xffffff);

        rect1.setInteractive();
        rect2.setInteractive();
        rect3.setInteractive();
        rect4.setInteractive();

        rect1.on('pointerover', () => {

            this.tweens.add({
                targets: rect1,
                scaleX: 1.07,
                duration: menuTweenDuration,
                ease: 'Power2'

            });
        });

        rect2.on('pointerover', () => {

            this.tweens.add({
                targets: rect2,
                scaleX: 1.07,
                duration: menuTweenDuration,
                ease: 'Power2'

            });
        });

        rect3.on('pointerover', () => {

            this.tweens.add({
                targets: rect3,
                scaleX: 1.07,
                duration: menuTweenDuration,
                ease: 'Power2'

            });
        });

        rect4.on('pointerover', () => {

            this.tweens.add({
                targets: rect4,
                scaleX: 1.07,
                duration: menuTweenDuration,
                ease: 'Power2'

            });
        });

        rect1.on('pointerout', () => {

            this.tweens.add({
                targets: rect1,
                scaleX: 1,
                duration: menuTweenDuration,
                ease: 'Power2'

            });
        });

        rect2.on('pointerout', () => {

            this.tweens.add({
                targets: rect2,
                scaleX: 1,
                duration: menuTweenDuration,
                ease: 'Power2'

            });
        });

        rect3.on('pointerout', () => {

            this.tweens.add({
                targets: rect3,
                scaleX: 1,
                duration: menuTweenDuration,
                ease: 'Power2'

            });
        });

        rect4.on('pointerout', () => {

            this.tweens.add({
                targets: rect4,
                scaleX: 1,
                duration: menuTweenDuration,
                ease: 'Power2'

            });
        });
    }
}

class mainScene extends Phaser.Scene {

    constructor ()    {
        super({ key: 'mainScene', active: false });
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

class protoTitleScene extends Phaser.Scene {

    constructor ()    {
        super({ key: 'protoTitleScene', active: false });
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
//            cursorColor = 0xffffff;
//            stripeColor = 0xffffff;

            this.scene.start("mainScene")
        });
    }
}

let config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: window.innerWidth,
    height: window.innerHeight,
    backgroundColor: '#ffffff',
    scene: [ preloadScene,
             titleScene,
             descriptionScene,
             protoTitleScene,
             menuScene,
             mainScene ],
    audio: {
        disableWebAudio: true
    }
}

let game = new Phaser.Game(config);

