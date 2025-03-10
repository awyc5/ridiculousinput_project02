import kaboom from "../lib/kaboom.mjs"

kaboom({
        width: 1080,
        height: 800,
        letterbox: true
})

const usernameInput = document.getElementById("username");
const USERNAME_LIMIT = 10;
function generateRandomLetter() {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    return letters[Math.floor(Math.random() * letters.length)];
}
function updateUsernameInput(letter) {
    usernameInput.value += letter;

    if (usernameInput.value.length >= USERNAME_LIMIT) {
    setTimeout(() => {
        usernameInput.value = ''; // Clear the input box
    }, 500);
    }
}
loadSprite("shark","assets/Asset 14.png")
loadSprite("bg", "assets/Asset 15.png")
loadSprite("fish1","assets/Asset 10.png")

//loads background
add([
    sprite("bg")
])

const SPEED = 400

const player = add([
    sprite("shark"),
    pos(center()),
    area(),
    body(),
])

//Shark movement using arrow keys
onKeyDown("left", () => {
	player.move(-SPEED, 0)
    player.flipX = false
})

onKeyDown("right", () => {
	player.move(SPEED, 0)
    player.flipX = true
})

onKeyDown("up", () => {
	player.move(0, -SPEED)
})

onKeyDown("down", () => {
	player.move(0, SPEED)
})

onClick(() => {
	player.moveTo(mousePos())
})

function spawnFish() {
    add([sprite('fish1'),
    pos(rand(0, width()), rand(0, height())),
    area(),
    "enemy",
    ])

    wait(rand(20, 60), spawnFish);

  }

  player.onCollide("enemy", (enemy) => {
    destroy(enemy)
    const randomLetter = generateRandomLetter();
    updateUsernameInput(randomLetter);
  })
  spawnFish();
