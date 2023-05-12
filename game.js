class Demo1 extends AdventureScene {
    constructor() {
        super("demo1", "First Room");
    }

    onEnter() {

        let clip = this.add.text(this.w * 0.3, this.w * 0.3, "📎 paperclip")
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerover', () => this.showMessage("Metal, bent."))
            .on('pointerdown', () => {
                this.showMessage("No touching!");
                this.tweens.add({
                    targets: clip,
                    x: '+=' + this.s,
                    repeat: 2,
                    yoyo: true,
                    ease: 'Sine.inOut',
                    duration: 100
                });
            });

        let key = this.add.text(this.w * 0.5, this.w * 0.1, "🔑 key")
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage("It's a nice key.")
            })
            .on('pointerdown', () => {
                this.showMessage("You pick up the key.");
                this.gainItem('key');
                this.tweens.add({
                    targets: key,
                    y: `-=${2 * this.s}`,
                    alpha: { from: 1, to: 0 },
                    duration: 500,
                    onComplete: () => key.destroy()
                });
            })

        let door = this.add.text(this.w * 0.1, this.w * 0.15, "🚪 locked door")
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerover', () => {
                if (this.hasItem("key")) {
                    this.showMessage("You've got the key for this door.");
                } else {
                    this.showMessage("It's locked. Can you find a key?");
                }
            })
            .on('pointerdown', () => {
                if (this.hasItem("key")) {
                    this.loseItem("key");
                    this.showMessage("*squeak*");
                    door.setText("🚪 unlocked door");
                    this.gotoScene('demo2');
                }
            })

    }
}

class Demo2 extends AdventureScene {
    constructor() {
        super("demo2", "The second room has a long name (it truly does).");
    }
    onEnter() {
        this.add.text(this.w * 0.3, this.w * 0.4, "just go back")
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage("You've got no other choice, really.");
            })
            .on('pointerdown', () => {
                this.gotoScene('demo1');
            });

        let finish = this.add.text(this.w * 0.6, this.w * 0.2, '(finish the game)')
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage('*giggles*');
                this.tweens.add({
                    targets: finish,
                    x: this.s + (this.h - 2 * this.s) * Math.random(),
                    y: this.s + (this.h - 2 * this.s) * Math.random(),
                    ease: 'Sine.inOut',
                    duration: 500
                });
            })
            .on('pointerdown', () => this.gotoScene('outro'));
    }
}

class StartingRoom extends AdventureScene {
    constructor() {
        super("StartingRoom", "It's cold in here.");
    }
    onEnter() {
        this.cameras.main.setBackgroundColor('#999');
        let door = createDoor(this, 0.6, 0.25, "It seems to lead to a dark hall.", 'DarkHall');

        let bed = this.add.text(this.w * 0.01, this.w * 0.25, "🛏️ bed")
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage("The bed is cold with no sheets. Maybe check underneath?");
            })
            .on('pointerdown', () => {
                    this.showMessage("You look under, there is nothing, not even dust.");
            });
        
        let desk = this.add.text(this.w * 0.3, this.w * 0.01, "🟫🟫 desk")
        .setFontSize(this.s * 2)
        .setInteractive()
        .on('pointerover', () => {
            this.showMessage("The desk has something on it.");
        })
        .on('pointerdown', () => {
                this.showMessage("You examine the desk, \nThere is a photo of someone standing in a forest");
        });   
        
        let light = this.add.text(this.w * 0.3, this.w * 0.25, "💡 light")
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage("There is a lightbulb installed in the ceiling. Best to not unscrew it.");
            })
            .on('pointerdown', () => {
                    this.showMessage("Uh oh.");
                    light.setText("*unscrews*")
                    this.gainItem('lightbulb');
                    this.cameras.main.setBackgroundColor('#000');
                    this.tweens.add({
                        targets: light,
                        y: `+=${1 * this.s}`,
                        alpha: { from: 1, to: 0 },
                        duration: 1000,
                        onComplete: () => {
                            light.destroy();
                            this.gotoScene('NoLight');}
                    });
            });
    }
}

class NoLight extends Phaser.Scene {
    constructor() {
        super('NoLight');
    }
    create() {
        this.add.text(50, 50, "N̸o̴ ̵L̶i̸g̴h̵t̵ ̴L̶e̸f̸t̶").setFontSize(50);
        this.add.text(500, 400, "You unscrewed the lamp, the light is gone.\nYou hear a clicking noise from outside.\n The door creaks open. The clicking is next to you. \n The clicking stops, and so does your breath.", {
            fontSize: 35,
            color: '#ff0000',
            align: "left",
            wordWrap: { width: 1100, useAdvancedWrap: true},
            lineSpacing: 100,
        });
        this.add.text(50, 100, "Click anywhere to restart.").setFontSize(20);
        this.input.on('pointerdown', () => this.scene.start('intro'));
    }
}

class DarkHall extends AdventureScene {
    constructor() {
        super("DarkHall", "It's dark here. I can hear the rain.");
    }
    onEnter() {
        let door = createDoor(this, 0.01, 0.25, "It leads back to where I woke up.", 'StartingRoom');

        let window1 = this.add.text(this.w * 0.15, this.w * 0.01, "🪟 window")
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage("Maybe I could see where I am.");
            })
            .on('pointerdown', () => {
                    this.showMessage("You look at the window,\nYou see trees.\nThere seems to be a dark figure staring back at you.\nProbably just a shadow.");
            });
        
        let window2 = this.add.text(this.w * 0.45, this.w * 0.01, "🪟 window")
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage("Maybe there is something out there.");
            })
            .on('pointerdown', () => {
                    this.showMessage("You look at the window,\nYou see trees.\nLooks like nothing is there.");
            });

        let door2 = createDoor(this, 0.3, 0.5, "It leads down to some stairs.", 'Stairs');
        
        let door3 = createDoor(this, 0.6, 0.25, "It leads somewhere.", 'Dining');

        let lamp = this.add.text(this.w * 0.55, this.w * 0.5, "🏮 lantern")
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage("There hangs a lantern on the wall.");
            })
            .on('pointerdown', () => {
                    this.showMessage("You try to turn it on but it is broken. You grab it.");
                    this.gainItem('lantern');
                    this.tweens.add({
                        targets: lamp,
                        y: `-=${2 * this.s}`,
                        alpha: { from: 1, to: 0 },
                        duration: 500,
                        onComplete: () => lamp.destroy()
                    });
            });
    }
}


class Stairs extends AdventureScene {
    constructor() {
        super("Stairs", "It feels like something is following.");
    }
    onEnter() {
        let door = createDoor(this, 0.01, 0.25, "It heads down to the basement.", 'Basement');

        let door2 = createDoor(this, 0.3, 0.5, "It leads to the front of the place.", 'Front');

        let door3 = createDoor(this, 0.3, 0.01, "It leads up the stairs.",'DarkHall');
        
        let door4 = createDoor(this, 0.6, 0.3, "I can see some figure or sculpture inside.", 'Art');
    }
}

function createDoor(currentScene, x, y, over, scene){
    let door = currentScene.add.text(currentScene.w * x, currentScene.w * y, "🚪 door")
    .setFontSize(currentScene.s * 2)
    .setInteractive()
    .on('pointerover', () => {
        currentScene.showMessage(over);
    })
    .on('pointerdown', () => {
            currentScene.showMessage("*squeak*");
            door.setText("🚪 opened door");
            currentScene.gotoScene(scene);
    });
    return door;
}

class Basement extends AdventureScene {
    constructor() {
        super("Basement", "It feels like someone is here.");
    }
    onEnter() {

        let door = createDoor(this, 0.6, 0.3, "It leads back to the Stair room.", 'Stairs');

    }
}

class Front extends AdventureScene {
    constructor() {
        super("Front", "Maybe I could exit here?");
    }
    onEnter() {

        let door = createDoor(this, 0.3, 0.01, "It leads back to the Stair room.", 'Stairs');

    }
}

class Dining extends AdventureScene {
    constructor() {
        super("Dining", "It feels lonely.");
    }
    onEnter() {

        let door = createDoor(this, 0.01, 0.3, "It leads back to the dark hallway.", 'DarkHall');
        
        let door2 = createDoor(this, 0.6, 0.3, "It leads to the kitchen.", 'Kitchen');
        
        
        let table = this.add.text(this.w * 0.3, this.w * 0.25, "🟫🟫 table")
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage("There is the dining table. It is big.");
            })
            .on('pointerdown', () => {
                    table.setText("⚰️ table");
                    this.showMessage("You examine the table,\nit is in the shape of a coffin.\nIt is empty and clean.");
            });
        
        let chair = this.add.text(this.w * 0.45, this.w * 0.25, "🪑 chair")
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage("There seems to be a single chair here for a large table.");
            })
            .on('pointerdown', () => {
                this.showMessage("They must live alone. It still feels warm.");
            }); 
    }
}
//🫙🧰🗄🍵

class Kitchen extends AdventureScene {
    constructor() {
        super("Kitchen", "It smells in here.");
    }
    onEnter() {

        let door = createDoor(this, 0.01, 0.3, "It leads back to the dining room.", 'Dining');

        let stove = this.add.text(this.w * 0.35, this.w * 0.45, "🍵 stove")
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage("On the stove there is a pot with some rotting food. I wouldn't touch it.");
            })
            .on('pointerdown', () => {
                this.showMessage("You decide to take a bite since you were hungry.");
                this.tweens.add({
                    targets: stove,
                    y: `-=${1 * this.s}`,
                    alpha: { from: 1, to: 0 },
                    duration: 1000,
                    onComplete: () => {
                        this.gotoScene('Sick');
                    }
                });
            });
        
    }
}

class Sick extends Phaser.Scene {
    constructor() {
        super('Sick');
    }
    create() {
        this.add.text(50, 50, "N̸o̵t̴ ̸h̴u̷n̸g̷r̴y̷ ̸a̵n̶y̴m̴o̸r̸e̷").setFontSize(50);
        this.add.text(500, 400, "You swallow the rotten food and instantly feel sick.\nYou become weak and catch yourself on the ground. \n Coughing up your body, you collapse.", {
            fontSize: 35,
            color: '#ff0000',
            align: "left",
            wordWrap: { width: 1100, useAdvancedWrap: true},
            lineSpacing: 100,
        });
        this.add.text(50, 100, "Click anywhere to restart.").setFontSize(20);
        this.input.on('pointerdown', () => this.scene.start('intro'));
    }
}

class Art extends AdventureScene {
    constructor() {
        super("Art", "I can hear banging outside the house.");
    }
    onEnter() {

        let door = this.add.text(this.w * 0.01, this.w * 0.3, "🚪 door")
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage("It leads back to the stairs area.");
            })
            .on('pointerdown', () => {
                    this.showMessage("*squeak*");
                    door.setText("🚪 opened door");
                    this.gotoScene('Stairs');
            });
        
    }
}

class Intro extends Phaser.Scene {
    constructor() {
        super('intro')
    }
    create() {
        this.add.text(50,50, "Adventure awaits!").setFontSize(50);
        this.add.text(50,100, "Click anywhere to begin.").setFontSize(20);
        this.input.on('pointerdown', () => {
            this.cameras.main.fade(1000, 0,0,0);
            this.time.delayedCall(1000, () => this.scene.start('DarkHall'));
        });
    }
}

class Outro extends Phaser.Scene {
    constructor() {
        super('outro');
    }
    create() {
        this.add.text(50, 50, "That's all!").setFontSize(50);
        this.add.text(50, 100, "Click anywhere to restart.").setFontSize(20);
        this.input.on('pointerdown', () => this.scene.start('intro'));
    }
}


const game = new Phaser.Game({
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1920,
        height: 1080
    },
    scene: [Intro, Demo1, Demo2, Outro,
            StartingRoom, DarkHall, NoLight,
            Stairs, Basement, Front, Dining, 
            Kitchen, Art, Sick],
    title: "Adventure Game",
});

