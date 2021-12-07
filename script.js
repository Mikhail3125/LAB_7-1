let menu = document.querySelector('.menu');
let overlay = document.querySelector('.back');

let menu_width = menu.clientWidth;
let last_position = -menu_width;

let swipe_menu = false;

let mouseDownX = 0;
let moveDistance = -menu_width;

window.addEventListener('mousedown', function(e) {
    if (e.clientX <= 100) {
        menuStartSwipe(e);
    }
})

window.addEventListener('mouseup', menuFinalSwipe)

window.addEventListener('mousemove', function(e) {
    if (swipe_menu) {
        menuDrag(e);
    }
})
menu.addEventListener('mousedown', function(e) {
    menuStartSwipe(e);
})
overlay.addEventListener('mousedown', menuClose)

function menuStartSwipe(e) {
    e.preventDefault();
    mouseDownX = e.clientX;
    swipe_menu = true;
}

function menuDrag(e) {
    moveDistance = Math.max(Math.min(e.clientX - mouseDownX + last_position, 0), -menu_width);
    menu.style.cssText = 'transform: translate(' + moveDistance + 'px, 0px)';
    if (moveDistance > -menu_width) {
        var opacity = Math.min((moveDistance + menu_width) / menu_width, 1);
        overlay.style.cssText = 'visibility: visible; opacity:' + opacity + '';
    } else {
        overlay.style.cssText = 'visibility: hidden';
    }
}

function menuFinalSwipe() {
    swipe_menu = false;
    if (moveDistance + menu_width > menu_width / 10) {
        menuOpen();
    }
}

function menuOpen() {
    menu.classList.add('active');
    menu.style.cssText = 'transition: transform .2s linear';
    overlay.classList.add('active');
    overlay.style.cssText = 'transition: opacity .2s linear';
    moveDistance = 0;
    last_position = moveDistance;
}

function menuClose() {
    menu.classList.remove('active');
    menu.style.cssText = 'transition: transform 0.5s linear';
    overlay.classList.remove('active');
    overlay.style.cssText = 'transition: opacity .3s linear, visibility .5s linear';
    moveDistance = -menu_width;
    last_position = moveDistance;
}