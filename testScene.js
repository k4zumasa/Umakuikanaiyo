var graphics;
var cursor;
var cursor2;
var stripes;
var rectangles;
var cursorWidth = window.innerWidth;
var stripeWidth = window.innerWidth;
var cursorHeight = 160;
var stripeHeight = 160;
var cursorColor = 0xffffff; //0xffffff
var stripeColor = 0xffffff;
var suitekiplayed;
var knockplayed;
var mainMode;
var textColor = "0x000000";
var fadeTime = 1300;
var menuTweenDuration = 2000;
var tweenIsPlaying = false;
var currentMainMode = [0, 0, 0];

var waterblue = "0x72DAE8"
var grassgreen = "0x5F9968"
var metalgray = "0x8A9DAD"
var mudbrown = "0x7F6152"

var waterblueRGB = [114, 218, 232];
var grassgreenRGB = [95, 153, 104];
var metalgrayRGB = [138, 157, 173];
var mudbrownRGB = [127, 97, 82];

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
//        this.scene.start("titleScene")
        this.scene.start("titleScene")
    }
}

//タイトルシーン
class titleScene extends Phaser.Scene {

    constructor () {
        super({ key: 'titleScene', active: true });
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

class audioNotifyScene extends Phaser.Scene {

    constructor () {
        super({ key: 'audioNotifyScene', active: false });
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
        tweenIsPlaying = false;

        var rectArray = [];
        var rect1 = this.add.rectangle(innerWidth/2 - 100 - 100 * 0.6 * 1.5 - 100 * 0.5, innerHeight/2 + 40, 100, 100, waterblue);
        var rect2 = this.add.rectangle(innerWidth/2 - 100 * 0.5 - 100 * 0.6 * 0.5, innerHeight/2 + 40, 100, 100, grassgreen);
        var rect3 = this.add.rectangle(innerWidth/2 + 100 * 0.5 + 100 * 0.6 * 0.5, innerHeight/2 + 40, 100, 100, metalgray);
        var rect4 = this.add.rectangle(innerWidth/2 + 100 + 100 * 0.6 * 1.5 + 100 * 0.5, innerHeight/2 + 40, 100, 100, mudbrown);

        rectArray.push(rect1, rect2, rect3, rect4);

        //アイコンのフェードイン表現
        for (const elem of rectArray){
            elem.setAlpha(0);
        }

        for (const elem of rectArray) {
            this.tweens.add({
              targets: elem,
              y: innerHeight/2,
              alpha: 1,
              duration: fadeTime,
              ease: 'Expo.easeInOut',
              onComplete: function () {  }
              }, this);

              elem.setStrokeStyle(0);
              elem.setInteractive();
        }

        rect1.on('pointerdown', () => {

            if(tweenIsPlaying == false){

                arrayCopy( currentMainMode, waterblueRGB ) ;

                tweenIsPlaying = true;

                this.tweens.add({
                    targets: rect1,
                    scaleX: innerWidth/100,
                    scaleY: innerHeight/100,
                    x: innerWidth/2,
                    duration: menuTweenDuration,
                    ease: 'Expo.easeInOut',
                    onComplete: function () { goToMainScene(1) ; }
                    }, this);

                fadeOut(this, rect2, rect3, rect4);
            }

        });

        rect2.on('pointerdown', () => {

            if(tweenIsPlaying == false){

                arrayCopy( currentMainMode, grassgreenRGB );

                tweenIsPlaying = true;

                this.tweens.add({
                    targets: rect2,
                    scaleX: innerWidth/100,
                    scaleY: innerHeight/100,
                    x: innerWidth/2,
                    duration: menuTweenDuration,
                    ease: 'Expo.easeInOut',
                    onComplete: function () { goToMainScene(2); }
                    }, this);

                fadeOut(this, rect1, rect3, rect4);
            }


        });

        rect3.on('pointerdown', () => {

            if(tweenIsPlaying == false){

                arrayCopy( currentMainMode, metalgrayRGB );

                tweenIsPlaying = true;

                this.tweens.add({
                    targets: rect3,
                    scaleX: innerWidth/100,
                    scaleY: innerHeight/100,
                    x: innerWidth/2,
                    duration: menuTweenDuration,
                    ease: 'Expo.easeInOut',
                    onComplete: function () { goToMainScene(3); }
                    }, this);

                fadeOut(this, rect1, rect2, rect4);

            }
        });

        rect4.on('pointerdown', () => {

            if(tweenIsPlaying == false){

                arrayCopy( currentMainMode, mudbrownRGB );

                tweenIsPlaying = true;

                this.tweens.add({
                    targets: rect4,
                    scaleX: innerWidth/100,
                    scaleY: innerHeight/100,
                    x: innerWidth/2,
                    duration: menuTweenDuration,
                    ease: 'Expo.easeInOut',
                    onComplete: function () { goToMainScene(4); }
                    }, this);

                fadeOut(this, rect1, rect2, rect3);
            }
        });

        function fadeOut(a, rectA, rectB, rectC){

                a.tweens.add({
                    targets: [ rectA,rectB,rectC ],
                    alpha: 0,
                    duration: 2000,
                    ease: 'Expo',
                }, this);
        }

        function goToMainScene(a){

            if(a == 1){
                mainMode = "water";

                cursorHeight = 160;
                stripeHeight = 160;
            }

            if(a == 2){

            }

            if(a == 3){

            }

            if(a == 4){
                mainMode = "knock";

                cursorHeight = stripeHeight * 2;
                stripeHeight = 160;
            }
            game.scene.start("mainScene")
            console.log("gotomainscene called");
        }

        function arrayCopy(a, b) {
            for (let i = 0; i < b.length; ++i) {
                a[i] = b[i];
            }
        }
    }
}

class mainScene extends Phaser.Scene {

    constructor ()    {
        super({ key: 'mainScene', active: false });
    }

    create (){

        console.log(currentMainMode[0], currentMainMode[1], currentMainMode[2]);
//        this.cameras.main.fadeIn(1000, waterblueRGB[0], waterblueRGB[1], waterblueRGB[2]);
        this.cameras.main.fadeIn(1000, currentMainMode[0], currentMainMode[1], currentMainMode[2]);

        //Return to titleボタンを配置
        var textToTitle = this.add.text(0, 0, "Return to title").setFontSize(32).setColor('#000000');

        textToTitle.setInteractive({

            useHandCursor: true  // マウスオーバーでカーソルが指マークになる

        });

        textToTitle.on('pointerdown', () => {
//            this.cameras.main.fadeOut(1000, 255, 255, 255);
            this.scene.start("menuScene");
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

            cursorHeight = stripeHeight * 2;
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
