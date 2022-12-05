let voiture = document.getElementById("voiture");
let titre = document.getElementById("h1");

let position = voiture.getBoundingClientRect();
let x = voiture.offsetLeft
let y = voiture.offsetTop
let rotation = 0
let vitesse = 10
let degre = 10
let avancer = new Audio("avancert.mp3")

function moveTop(x,y,vitesse,rotation) {
    radiant = (rotation*Math.PI)/180
    y -= vitesse * Math.cos(radiant);
    x += vitesse * Math.sin(radiant);
    voiture.style.top = `${y}px`;
    voiture.style.left = `${x}px`;
    return [x,y]
}
function moveBottom(x,y,vitesse,rotation) {
    radiant = (rotation*Math.PI)/180
    y += vitesse * Math.cos(radiant);
    x -= vitesse * Math.sin(radiant);
    voiture.style.top = `${y}px`;
    voiture.style.left = `${x}px`;
    return [x,y] 
}
function rotateRight(rotation,degre) {
    rotation = rotation + degre;
    voiture.style.transform = `rotate(${rotation}deg)`;
    return rotation
}
function rotateLeft(rotation,degre) {
    rotation = rotation - degre;
    voiture.style.transform = `rotate(${rotation}deg)`;
    return rotation
}

/*
window.addEventListener("keydown", function(event) {
    if (event.code === "ArrowUp"){
        h1.innerHTML = `x:${x} et y:${y} et rotation:${rotation}`;
        coord = moveTop(x,y,vitesse,rotation);
        x = coord[0];
        y = coord[1];
    }
    else if (event.code === "ArrowDown"){
        h1.innerHTML = `x:${x} et y:${y} et rotation:${rotation}`;
        coord = moveBottom(x,y,vitesse,rotation);
        x = coord[0];
        y = coord[1];
    }
    else if (event.code === "ArrowRight"){
        h1.innerHTML = `x:${x} et y:${y} et rotation:${rotation}`;
        rotation = rotateRight(rotation,degre);
    }
    else if (event.code === "ArrowLeft"){
        h1.innerHTML = `x:${x} et y:${y} et rotation:${rotation}`;
        rotation = rotateLeft(rotation,degre);
    }
});
*/

let keys = {
    up: false,
    down: false,
    right: false,
    left : false,
};

addEventListener("keydown", (event) => {
    if (event.key === "ArrowUp") {
        keys.up = true;
    }
    if (event.key === "ArrowDown") {
        keys.down = true;
    }
    if (event.key === "ArrowLeft") {
        keys.left = true;
    }
    if (event.key === "ArrowRight") {
        keys.right = true;
    }
});

addEventListener("keyup", (event) => {
    if (event.key === "ArrowUp") {
        keys.up = false;
    }
    if (event.key === "ArrowDown") {
        keys.down = false;
    }
    if (event.key === "ArrowLeft") {
        keys.left = false;
    }
    if (event.key === "ArrowRight") {
        keys.right = false;
    }
});


function move() {
    for (let i in keys) {
        if (keys[i]) {
            if (i=='up') {
                h1.innerHTML = `x:${x} et y:${y} et rotation:${rotation}`;
                coord = moveTop(x,y,vitesse,rotation);
                x = coord[0];
                y = coord[1];
                avancer.play();
            }
            if (i=='down') {
                h1.innerHTML = `x:${x} et y:${y} et rotation:${rotation}`;
                coord = moveBottom(x,y,vitesse,rotation);
                x = coord[0];
                y = coord[1];
                //avancer.play();
            }
            //else {avancer.pause()}
            if (i=='left') {
                h1.innerHTML = `x:${x} et y:${y} et rotation:${rotation}`;
                rotation = rotateLeft(rotation,degre);
                //avancer.play();
            }
            //else {avancer.pause()}
            if (i=='right') {
                h1.innerHTML = `x:${x} et y:${y} et rotation:${rotation}`;
                rotation = rotateRight(rotation,degre);
                //avancer.play();
            }
            //else {avancer.pause()}
        }
        else {
            if (i=='up') {
                avancer.pause();
            }
            
        }
    }
}
setInterval(move, 20)