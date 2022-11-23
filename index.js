// Welcome to Code Seoul~
// Let's have fun building a game together!
// Gotta Catch 'Em All!


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

let characterSpeed = 5;

function handleInput() {
    if (keys.up && lastKey === 'up') {
        background.dy += characterSpeed;
    } else if (keys.down && lastKey === 'down') {
        background.dy -= characterSpeed;
    } else if (keys.left && lastKey === 'left') {
        background.dx += characterSpeed;
    } else if (keys.right && lastKey === 'right') {
        background.dx -= characterSpeed;
    }
}

function animate() {
    // attempts to run at 60fps
    window.requestAnimationFrame(animate);
    context.drawImage(background.image, background.dx, background.dy);
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


