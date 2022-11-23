// Welcome to Code Seoul~
// Let's have fun building a game together!
// Gotta Catch 'Em All!

let characterSpeed = 5;
let mapWidth = 90;  // the width of the map in tiles
const blockSize = 60;  // the size of each block (tile) on the map

const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const backgroundImage = document.createElement('img');
backgroundImage.src = 'assets/images/map_elements/island_town_bg.png';

const background = {
    image: backgroundImage,
    dx: -4022 + (canvas.width / 2),
    dy: -2500 + (canvas.height / 2)
};

const keys = {
    up: false,
    down: false,
    left: false,
    right: false,
};

let lastKey = '';

const playerDownImage = document.createElement('img');
playerDownImage.src = 'assets/images/character/playerDown.png'
const playerUpImage = document.createElement('img');
playerUpImage.src = 'assets/images/character/playerUp.png'
const playerLeftImage = document.createElement('img');
playerLeftImage.src = 'assets/images/character/playerLeft.png'
const playerRightImage = document.createElement('img');
playerRightImage.src = 'assets/images/character/playerRight.png'

const player = {
    image: playerDownImage,
    width: 192 / 4,
    height: 68,
    dx: (canvas.width / 2) - (48 / 2),
    dy: (canvas.height / 2) - (68 / 2),
    animate: false,
};

const playerFrames = {
    current: 0,
    max: 4,
    elapsed: 0,
    hold: 7,
};

function handleInput() {
    if (keys.up && lastKey === 'up') {
        player.animate = true;
        background.dy += characterSpeed;
        player.image = playerUpImage;
    } else if (keys.down && lastKey === 'down') {
        player.animate = true;
        background.dy -= characterSpeed;
        player.image = playerDownImage;
    } else if (keys.left && lastKey === 'left') {
        player.animate = true;
        background.dx += characterSpeed;
        player.image = playerLeftImage;
    } else if (keys.right && lastKey === 'right') {
        player.animate = true;
        background.dx -= characterSpeed;
        player.image = playerRightImage;
    } else {
        player.animate = false;
    }

    if (!player.animate) return;

    playerFrames.elapsed++;
    if (playerFrames.elapsed % playerFrames.hold === 0) {
        if (playerFrames.current < playerFrames.max - 1) {
            playerFrames.current++;
        } else {
            playerFrames.current = 0;
        }
    }
}

// the array in collisions.js is a one-dimensional array
// that is, it's just a list of numbers
// here, we convert it to a 2d array to match the map
const collisionsMap = [];
for (let i = 0; i < collisions.length; i += mapWidth) {
    collisionsMap.push(collisions.slice(i, mapWidth + i));
}

const boundaries = [];
collisionsMap.forEach((row, i) => {
    row.forEach((collisionValue, j) => {
        // 1025 is our blocking value
        if (collisionValue === 1025) {
            boundaries.push({
                x: j * blockSize + background.dx,
                y: i * blockSize + background.dy,
            });
        }
    });
});

function animate() {
    // attempts to run at 60fps
    window.requestAnimationFrame(animate);
    context.drawImage(
        background.image,
        background.dx,
        background.dy
    );
    // draw the player onto the canvas
    // image: CanvasImageSource, sx: number, sy: number, sw: number, sh: number, dx: number, dy: number, dw: number, dh: number
    context.drawImage(
        player.image,
        playerFrames.current * player.width,
        0,
        player.width,
        player.height,
        player.dx,
        player.dy,
        player.width,
        player.height
    );

    // draw the collision objects onto the canvas

    handleInput();
}

window.addEventListener('keydown', function(event) {
    switch (event.key) {
        case 'ArrowDown':
        case 's':
            keys.down = true;
            lastKey = 'down';
            break;
        case 'ArrowUp':
        case 'w':
            keys.up = true;
            lastKey = 'up';
            break;
        case 'ArrowLeft':
        case 'a':
            keys.left = true;
            lastKey = 'left';
            break;
        case 'ArrowRight':
        case 'd':
            keys.right = true;
            lastKey = 'right';
            break;
    }
});

window.addEventListener('keyup', function(event) {
    switch (event.key) {
        case 'ArrowDown':
        case 's':
            keys.down = false;
            break;
        case 'ArrowUp':
        case 'w':
            keys.up = false;
            break;
        case 'ArrowLeft':
        case 'a':
            keys.left = false;
            break;
        case 'ArrowRight':
        case 'd':
            keys.right = false;
            break;
    }
});

animate();


