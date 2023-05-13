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

function createDesObj(currentScene, x, y, name, over, down){ // create useless descriptive object.
    let obj = currentScene.add.text(currentScene.w * x, currentScene.w * y, name)
    .setFontSize(currentScene.s * 2)
    .setInteractive()
    .on('pointerover', () => {
        currentScene.showMessage(over);
    })
    .on('pointerdown', () => {
            currentScene.showMessage(down);
    });
    return obj;
}
class StartingRoom extends AdventureScene {
    constructor() {
        super("StartingRoom", "It's cold in here.");
    }
    onEnter() {

        let door = createDoor(this, 0.6, 0.25, "It seems to lead to a dark hall.", 'DarkHall');

        let bed = createDesObj(this, 0.01, 0.25, "🛏️ bed", "The bed is cold with no sheets. Maybe check underneath?",
        "You look under, there is nothing, not even dust.");

        
        let desk = createDesObj(this, 0.3, 0.01,"🟫🟫 desk", "The desk has something on it.",
        "You examine the desk, \nThere is a photo of someone standing in a forest");
        
        if (!this.hasItem("lightbulb")) {
            this.cameras.main.setBackgroundColor('#999');
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

        let window1 = createDesObj(this, 0.15, 0.01, "🪟 window", "Maybe I could see where I am.",
        "You look at the window,\nYou see trees.\nThere seems to be a dark figure staring back at you.\nProbably just a shadow.");
        
        let window2 = createDesObj(this, 0.45, 0.01, "🪟 window", "Maybe there is something out there.",
        "You look at the window,\nYou see trees.\nLooks like nothing is there.");

        let door2 = createDoor(this, 0.3, 0.5, "It leads down to some stairs.", 'Stairs');
        
        let door3 = createDoor(this, 0.6, 0.25, "It leads somewhere.", 'Dining');

        if (!this.hasItem("lantern")) {
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
}


class Stairs extends AdventureScene {
    constructor() {
        super("Stairs", "It feels like something is following.");
    }
    onEnter() {

        if (this.hasItem("lighter") && this.hasItem("lantern")){
            
            let door = this.add.text(this.w * 0.01, this.w * 0.25, "🚪 door")
                .setFontSize(this.s * 2)
                .setInteractive()
                .on('pointerover', () => {
                    this.showMessage("This leads down to the basement. I'll use the lighter and the lantern to light up the room.");
                })
                .on('pointerdown', () => {
                        this.showMessage("*floof*");
                        door.setText("🚪 opened door");
                        this.loseItem('lighter');
                        this.loseItem('lantern');
                        let lantern = this.add.text(this.w * 0.10, this.w * 0.2, "🏮 lit lantern")
                        .setFontSize(this.s * 3)
                        let lighter = this.add.text(this.w * 0.10, this.w * 0.225, "🔥")
                        .setFontSize(this.s * 3)
                        this.gainItem('lit lantern');
                        this.tweens.add({
                            targets: lighter,
                            y: `-=${2 * this.s}`,
                            alpha: { from: 1, to: 0 },
                            duration: 2000,
                            onComplete: () => {
                                lighter.destroy();
                                this.showMessage("*shut!*");
                                door.destroy();
                                door = createDoor(this, 0.01, 0.25, "Using the lantern, you just faintly saw a dark figure standing inside.\nYou closed the door in fear.\nMaybe its gone?", 'Basement');
                                door.setText("🚪 closed door");
                            }
                        });

                        this.tweens.add({
                            targets: lantern,
                            y: `-=${2 * this.s}`,
                            alpha: { from: 1, to: 0 },
                            duration: 2000,
                            onComplete: () => lantern.destroy()
                        });

                });
                // this.showMessage("Using the lantern, you can faintly see a dark figure standing inside, you close the door and open it. It is gone.");
        } else {
             let door = createDoor(this, 0.01, 0.25, "It heads down to the basement. I shouldn't go in, it's too dark.", 'Basement');
        }
        let door2 = createDoor(this, 0.3, 0.5, "It leads to the front of the place.", 'Front');

        let door3 = createDoor(this, 0.3, 0.01, "It leads up the stairs.",'DarkHall');
        
        let door4 = createDoor(this, 0.6, 0.3, "I can see some figure or sculpture inside.", 'Art');
    }
}
//🏮🔥
class Basement extends AdventureScene {
    constructor() {
        super("Basement", "It feels like someone is here.");
    }
    onEnter() {

        let door = createDoor(this, 0.6, 0.3, "It leads back to the Stair room.", 'Stairs');

        if (this.hasItem("lit lantern")){
            this.cameras.main.setBackgroundColor('#210');
            let shelf  = createDesObj(this, 0.01, 0.3, "🗄 shelf", "There are things on the shelf.",
            "Sitting on the shelf are clothes that seemed to be stained with rust?");


            let chest = this.add.text(this.w * 0.45, this.w * 0.05, "🧰 chest")
                .setFontSize(this.s * 2)
                .setInteractive()
                .on('pointerover', () => {
                    this.showMessage("There is a chest here, open it?");
                })
                .on('pointerdown', () => {
                    if (!this.hasItem("screwdriver")) {
                        let screwdriver = this.add.text(this.w * 0.45, this.w * 0.03, "🪛 screwdriver")
                        .setFontSize(this.s * 2)
                        this.showMessage("There is a screwdriver inside. Keep it.");
                        this.gainItem('screwdriver');
                        this.tweens.add({
                            targets: screwdriver,
                            y: `-=${2 * this.s}`,
                            alpha: { from: 1, to: 0 },
                            duration: 1000,
                            onComplete: () => screwdriver.destroy()
                        });
                    } else {
                        this.showMessage("There is nothing here.");
                    }
                });
        } else {
            this.showMessage("Someone is standing in the corner.");
            //this.cameras.main.setBackgroundColor('#000');
            this.tweens.add({
                targets: door,
                y: `+=${1 * this.s}`,
                alpha: { from: 1, to: 0 },
                duration: 1000,
                onComplete: () => {
                    door.destroy();
                    this.gotoScene('NoLantern');}
            });
        }

    }
}

class NoLantern extends Phaser.Scene {
    constructor() {
        super('NoLantern');
    }
    create() {
        this.add.text(50, 50, "T̴h̷e̸y̵ ̵g̴o̸t̵ ̵y̷o̸u̷").setFontSize(50);
        this.add.text(500, 300, "You walked down the steps into darkness.\n Once at the bottom, you hear a clicking noise in the corner behind you.\n You can't see it, but something is there. \n The clicking stops. It jumps and grabs you.", {
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

//🚪🔒🔓🚪
class Front extends AdventureScene {
    constructor() {
        super("Front", "Maybe I could exit here?");
    }
    onEnter() {

        let door = createDoor(this, 0.3, 0.01, "It leads back to the Stair room.", 'Stairs');

        let window = createDesObj(this, 0.1, 0.5, "🪟 window", "Maybe there is something waiting outside.",
        "You look at the window.\nYou can see a small dirt road that leads to a busy highway.\nThe moon lights it from above.");

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
        
        let chair = createDesObj(this, 0.45, 0.25, "🪑 chair", "There seems to be a single chair here for a large table.",
        "They must live alone. It still feels warm.");

    }
}
//🫙🧰🗄🍵🔥

class Kitchen extends AdventureScene {
    constructor() {
        super("Kitchen", "It smells in here.");
    }
    onEnter() {

        let door = createDoor(this, 0.01, 0.3, "It leads back to the dining room.", 'Dining');

        let stove = this.add.text(this.w * 0.35, this.w * 0.5, "🍵 stove")
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

        let fridge = createDesObj(this, 0.45, 0.05, "🫙 fridge", "Should I open it?",
        "You open the fridge, the light flickers.\nIt is very cold and there is some meat at the bottom.");

        let cabinet = createDesObj(this, 0.6, 0.3, "🗄 cabinet", "Check inside?",
        "You open the cabinet,\nThere are some spices.\nSome nice plates and knives.");

        let drawer = this.add.text(this.w * 0.1, this.w * 0.45, "🧰 drawer")
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage("There is a drawer here, open it?");
            })
            .on('pointerdown', () => {
                if (!this.hasItem("lighter")) {
                    let lighter = this.add.text(this.w * 0.1, this.w * 0.43, "🔥 lighter")
                    .setFontSize(this.s * 2)
                    this.showMessage("There is a lighter inside. Keep it.");
                    this.gainItem('lighter');
                    this.tweens.add({
                        targets: lighter,
                        y: `-=${2 * this.s}`,
                        alpha: { from: 1, to: 0 },
                        duration: 1000,
                        onComplete: () => lighter.destroy()
                    });
                } else {
                    this.showMessage("There is nothing here.");
                }
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
// 🔲
class Art extends AdventureScene {
    constructor() {
        super("Art", "I can hear banging outside the house.");
    }
    onEnter() {

        let moved = [false,false,false];

        let door = createDoor(this, 0.01, 0.3, "It leads back to the stairs area.", 'Stairs');
        
        let sculpture = this.add.text(this.w * 0.3, this.w * 0.25, "🪨 sculpture")
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage("It is the shape of a skull.");
            })
            .on('pointerdown', () => {
                    sculpture.setText("💀 sculpture");
                    this.showMessage("It has writing engraved:'Look beyond the pictures to find the path you should follow.'⬆️⬇️➡️");
            });

        let painting1 = this.add.text(this.w * 0.4, this.w * 0.05, "🔲 painting")
        .setFontSize(this.s * 2)
        .setInteractive()
        .on('pointerover', () => {
            this.showMessage("You look at the painting.\nThere is a pirate ship, where the pirates are fighting ghosts.\nCool.");
        })
        .on('pointerdown', () => {
            if (!this.hasItem("screwdriver") && moved[0] == false) {
                this.showMessage("*squeak squeak*");
                this.tweens.add({
                    targets: painting1,
                    y: `+=${4 * this.s}`,
                    //alpha: { from: 1, to: 0 },
                    duration: 2000,
                    onComplete: () => {
                        let number = this.add.text(this.w * 0.45, this.w * 0.05, "1").setColor("#ff0000")
                        .setFontSize(this.s * 3)
                        this.showMessage("You remove the painting from the wall");
                        moved[0] = true;
                    }
                });
            } else if(moved[0] == true){
                this.showMessage("It revealed a message.");
            }else {
                this.showMessage("It is bolted down.");
            }
        });

        let painting2 = this.add.text(this.w * 0.6, this.w * 0.3, "🔲 painting")
        .setFontSize(this.s * 2)
        .setInteractive()
        .on('pointerover', () => {
            this.showMessage("The painting is of a small family, they are all wearing gas masks.");
        })
        .on('pointerdown', () => {
            if (!this.hasItem("screwdriver") && moved[1] == false) {
                this.showMessage("*squeak squeak*");
                this.tweens.add({
                    targets: painting2,
                    x: `-=${4 * this.s}`,
                    //alpha: { from: 1, to: 0 },
                    duration: 2000,
                    onComplete: () => {
                        let number = this.add.text(this.w * 0.72, this.w * 0.3, "5").setColor("#ff0000")
                        .setFontSize(this.s * 3)
                        this.showMessage("You remove the painting from the wall");
                        moved[1] = true;
                    }
                });
            } else if(moved[1] == true){
                this.showMessage("It revealed a message.");
            }else {
                this.showMessage("It is bolted down.");
            }
        });

        let painting3 = this.add.text(this.w * 0.3, this.w * 0.5, "🔲 painting")
        .setFontSize(this.s * 2)
        .setInteractive()
        .on('pointerover', () => {
            this.showMessage("The paint depicts a city skyline. The sky is red. There are dark figures standing on the streets.");
        })
        .on('pointerdown', () => {
            if (!this.hasItem("screwdriver") && moved[2] == false) {
                this.showMessage("*squeak squeak*");
                this.tweens.add({
                    targets: painting3,
                    y: `-=${4 * this.s}`,
                    //alpha: { from: 1, to: 0 },
                    duration: 2000,
                    onComplete: () => {
                        let number = this.add.text(this.w * 0.35, this.w * 0.5, "1").setColor("#ff0000")
                        .setFontSize(this.s * 3)
                        this.showMessage("You remove the painting from the wall");
                        moved[2] = true;
                    }
                });
            } else if(moved[2] == true){
                this.showMessage("It revealed a message.");
            }else {
                this.showMessage("It is bolted down.");
            }
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
            this.time.delayedCall(1000, () => this.scene.start('Stairs'));
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
            Kitchen, Art, Sick, NoLantern],
    title: "Adventure Game",
});

