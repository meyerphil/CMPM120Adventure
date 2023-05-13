A simple adventure game by Phil based on a simple adventure game engine by [Adam Smith](https://github.com/rndmcnlly).

Code requirements:
- **4+ scenes based on `AdventureScene`**: 
    1. StartingRoom
    2. DarkHall
    3. Stairs
    4. Basement
    5. Front
    6. Dining
    7. Kitchen
    8. Art
    
- **2+ scenes *not* based on `AdventureScene`**:
    1. NoLight
    2. NoLantern
    3. WrongCode
    4. Escape
    5. Sick

- **2+ methods or other enhancement added to the adventure game engine to simplify my scenes**:
    - Enhancement 1: function createDoor(currentScene, x, y, over, scene);
        It removes the repetitive code of creating a door. All you need to do is
        pass in the currentscene, (x,y) position, the mouseover text,
        and the scene the door leads to.

    - Enhancement 2: function createDesObj(currentScene, x, y, name, over, down);
        It creates a useless game object. It removes repetition when adding details
        to a scene.

        You pass in the current scene, (x,y) position, object text/name, the mouseover text,
        and the mousedown text.

Experience requirements:
- **4+ locations in the game world**: (name at least 4 of the classes).
    1. StartingRoom
    2. DarkHall
    3. Stairs
    4. Basement
    5. Front
    6. Dining
    7. Kitchen
    8. Art
    
- **2+ interactive objects in most scenes**: (describe two examples)
    1. Can interact with chest in the basement to find a screwdriver,
        adding it to your inventory.
    2. Can interact with front door to unlock it using a combination inputted
        by user.
    3. Can interact with paintings to find clues.
    4. Other interactions not listed(useless objects, bad ending triggers, items)

- **Many objects have `pointerover` messages**: (describe two examples)
    Can hover over all objects to reveal descriptions or details.
    1. Can hover over paintings to see what's in the picture.
    2. Can hover over doors to see where they lead.

- **Many objects have `pointerdown` effects**: (describe two examples)
    Can click all objects to reveal details or trigger events.
    1. All doors have pointer down events to get to the desired area.
    2. Can click on a sculpture to reveal a clue.

- **Some objects are themselves animated**: (describe two examples)
    1. When obtaining items, they have a pick up animation where they fade out and move in a direction.
    2. When unbolting the paintings, they move to reveal clues.

Asset sources:
- (For each image/audio/video asset used, describe how it was created. What tool did you use to create it? Was it based on another work? If so, how did you change it, and where can we learn more about the original work for comparison? Use [Markdown link syntax](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax#links).)
- I wrote text in phaser text objects to create the assets. I copy and pasted emojis from https://getemoji.com/ to get visual assets.


Code sources:
- `adventure.js` and `index.html` were created for this project [Adam Smith](https://github.com/rndmcnlly) and edited by me.
- `game.js` was sketched by [Adam Smith](https://github.com/rndmcnlly) and rewritten by me.
