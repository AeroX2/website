function autorun() {
    let top = document.querySelector('.top');
    let bottom = document.querySelector('.bottom');
    let anchor = document.getElementById('anchor')

    let recalc = () => {
        let rect = anchor.getBoundingClientRect();
        let center = (rect.top + rect.bottom) / 2;

        top.style.clip = 'rect(0px,auto,' + center + 'px,auto)'
        bottom.style.clip = 'rect(' + center + 'px,auto,auto,auto)'
    }

    recalc();
    document.addEventListener('wheel', recalc, { capture: false, passive: true })
}
if (document.addEventListener) document.addEventListener("DOMContentLoaded", autorun, false);
else if (document.attachEvent) document.attachEvent("onreadystatechange", autorun);
else window.onload = autorun;
