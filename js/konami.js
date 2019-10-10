let KONAMI = ["up", "up", "down", "down", "left", "right", "left", "right", "b", "a"]

function isMobileDevice() {
    return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
};

let konamiSymbols;
let konamiIndex = 0;
function check(trans) {
    if (KONAMI[konamiIndex] === trans) {
        konamiSymbols.children[konamiIndex].classList.add("konami-green");

        konamiIndex++;
        if (konamiIndex === KONAMI.length) {
            window.alert("Coming soon ;P");
        }
    } else {
        for (let child of konamiSymbols.children) child.classList.remove("konami-green");
        konamiIndex = 0;
    }
}

function autorun() {
    konamiSymbols = document.getElementById("konami");

    if (isMobileDevice()) {
        document.body.classList.add('mobile');

        let touch = document.createElement("div")
        touch.setAttribute("id", "touch-area");
        document.body.appendChild(touch);

        let hammer = new Hammer.Manager(touch, {
            recognizers: [
                [Hammer.Pinch,{ enable: true }],
                [Hammer.Tap,{ event: 'doubletap', taps: 2 }],
                [Hammer.Tap,{ event: 'singletap' }],
                [Hammer.Swipe,{ direction: Hammer.DIRECTION_ALL }],
            ]
        });
        hammer.get('doubletap').recognizeWith('singletap');
        hammer.get('doubletap').requireFailure('pinch');
        hammer.get('singletap').requireFailure('doubletap');

        hammer.on("swipeup swipedown swipeleft swiperight singletap doubletap pinchstart", (ev) => {
            let trans = "";
            if (ev.type === "swipeup") trans = "up";
            else if (ev.type === "swipedown") trans = "down";
            else if (ev.type === "swipeleft") trans = "left";
            else if (ev.type === "swiperight") trans = "right";
            else if (ev.type === "singletap") trans = "a";
            else if (ev.type === "doubletap") trans = "b";
            else if (ev.type === "pinchstart") trans = "b";

            check(trans);
        })
    } else {
        document.addEventListener("keydown", (ev) => {
            let trans = "";
            if (ev.key === "ArrowUp") trans = "up";
            else if (ev.key === "ArrowDown") trans = "down";
            else if (ev.key === "ArrowLeft") trans = "left";
            else if (ev.key === "ArrowRight") trans = "right";
            else if (ev.key === "a" || ev.key === "A") trans = "a";
            else if (ev.key === "b" || ev.key === "B") trans = "b";
            check(trans);
        })
    }
}
if (document.addEventListener) document.addEventListener("DOMContentLoaded", autorun, false);
else if (document.attachEvent) document.attachEvent("onreadystatechange", autorun);
else window.onload = autorun;