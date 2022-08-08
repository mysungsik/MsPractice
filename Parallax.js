var image = document.querySelector(".Parallax-effect");

new simpleParallax(image, {
    delay:0.2,
    scale:2.0,
    maxTransition:99
});
// setting 값은 new이므로, 객체를 생성하여 옵션을 바꾼다.