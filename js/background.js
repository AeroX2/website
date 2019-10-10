function autorun() {
    const top = document.querySelector('.top');
    const bottom = document.querySelector('.bottom');
    const anchor = document.getElementById('anchor')

    const recalc = () => {
        const rect = anchor.getBoundingClientRect();
        const center = (rect.top + rect.bottom) / 2;

        top.style.clip = 'rect(0px,auto,' + center + 'px,auto)'
        bottom.style.clip = 'rect(' + center + 'px,auto,auto,auto)'
    }

    recalc();
    document.addEventListener('wheel', recalc, { capture: false, passive: true })

    const cards = document.querySelector('.card-row');
    const card_size = document.querySelector('.card-container').clientWidth;

    document.querySelector('.btn.next').addEventListener('click', () => { cards.scrollBy({ left: card_size,  top: 0, behavior: 'smooth'}) });
    document.querySelector('.btn.prev').addEventListener('click', () => { cards.scrollBy({ left: -card_size, top: 0, behavior: 'smooth' }) });
}
if (document.addEventListener) document.addEventListener("DOMContentLoaded", autorun, false);
else if (document.attachEvent) document.attachEvent("onreadystatechange", autorun);
else window.onload = autorun;
