class scene extends Phaser.Scene {
    constructor() {
        super("scene");
    }
    preload() {
        this.load.image('slug', '1.png');
        this.load.image("enemy", "2.png");

    }

    create() {

        this.w = this.game.config.width;
        this.h = this.game.config.height;

        this.cx = this.cameras.main.centerX;
        this.cy = this.cameras.main.centerY;

        this.slug = this.physics.add.sprite(400, this.h, "slug")
            .setBodySize(10, 10)
            .setScale(4, 2)
            .setBounce(0)
            .setCollideWorldBounds(true, true, false, true);

        this.enemy = this.physics.add.sprite(this.w + 10, this.h, "enemy")
            .setBodySize(10, 10)
            .setScale(4, 2)
            .setBounce(0)
            .setCollideWorldBounds(true, true, false, true);

        this.physics.add.collider(this.slug, this.enemy, this.collison, null, this);

        this.input.keyboard.on('keydown', (event) => {
            if (event.key === 'w' && this.slug.y >= this.h - 10) {
                this.slug.setVelocityY(-200);
            }

            if (event.key === 'd') {
                this.slug.setVelocityX(200);
            }

            if (event.key === 'a') {
                this.slug.setVelocityX(-200);
            }


        });

        this.input.keyboard.on('keyup', (event) => {

            if (event.key === 'd') {
                this.slug.setVelocityX(0);
            }

            if (event.key === 'a') {
                this.slug.setVelocityX(0);
            }
        });


    }

    collison() {
        this.tweens.add({
            targets: this.slug,
            duration: 300,
            x: "-=50",
            y: "-=100",
            ease: "Back.Out",
            repeat: false,
        });
        this.slug.setVelocityX(0);
    }

    update() {
        if (this.enemy.x <= 20) {
            this.enemy.x = this.w - 10;

        }
        this.enemy.setVelocityX(-200);

        if (this.slug.x >= this.w - 20) {
            this.add.text(this.w * 0.2, this.h * 0.5, "You are win").setFontSize(80);
            this.cameras.main.fade(2000, 255, 255, 255);
            this.physics.pause();
            this.time.delayedCall(2000, () => {
                this.scene.restart();
            });
        }
        else if (this.slug.x <= 20) {

            this.add.text(this.w * 0.2, this.h * 0.5, "You are lose").setFontSize(80);
            this.cameras.main.fade(2000, 255, 255, 255);
            this.physics.pause();
            this.time.delayedCall(2000, () => {
                this.scene.restart();
            });
        }

    }
}

let config = {
    type: Phaser.WEBGL,
    width: 800,
    height: 600,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    backgroundColor: 0x000000,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false,
            gravity: {
                x: 0,
                y: 400,
            }
        }
    },
    scene: [scene]
}

let game = new Phaser.Game(config)
