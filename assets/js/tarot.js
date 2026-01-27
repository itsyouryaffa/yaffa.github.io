document.addEventListener("DOMContentLoaded", function() {
    function flipToCard(imgEl, card, delay = 0) {
        if (!imgEl || !card) return;
        imgEl.style.transform = "rotateY(0deg) rotate(0deg)";
        imgEl.src = "../images/back.jpg";

        setTimeout(() => {
            imgEl.style.transform = "rotateY(180deg) rotate(0deg)";

            setTimeout(() => {
                imgEl.src = `../images/${card.name}.jpg`;
                if (card.reversed === "Reversed") {
                    imgEl.style.transform = "rotateY(0deg) rotate(180deg)";
                } else {
                    imgEl.style.transform = "rotateY(0deg) rotate(0deg)";
                }
            }, 500);

        }, delay);
    }

    // ---------- Card definitions ----------
    const majorArcana = Array.from({ length: 22 }, (_, i) => `m${i.toString().padStart(2, '0')}`);
    const cups = Array.from({ length: 14 }, (_, i) => `c${(i + 1).toString().padStart(2, '0')}`);
    const coins = Array.from({ length: 14 }, (_, i) => `p${(i + 1).toString().padStart(2, '0')}`);
    const swords = Array.from({ length: 14 }, (_, i) => `s${(i + 1).toString().padStart(2, '0')}`);
    const wands = Array.from({ length: 14 }, (_, i) => `w${(i + 1).toString().padStart(2, '0')}`);

    const allCards = [
        ...majorArcana.map(name => ({ name, type: 'Major Arcana' })),
        ...cups.map(name => ({ name, type: 'Cups' })),
        ...coins.map(name => ({ name, type: 'Coins' })),
        ...swords.map(name => ({ name, type: 'Swords' })),
        ...wands.map(name => ({ name, type: 'Wands' }))
    ];
    // ---------1 card ----------
    const oneButton = document.getElementById("draw-one-btn");
    const oneCardWrapper = document.querySelector(".one-card-wrapper");
    
    if (oneButton && oneCardWrapper) {
        oneButton.addEventListener("click", () => {
            const imgEl = oneCardWrapper.querySelector(".tarot-img");
            if (!imgEl) return;
    
            const card = allCards[Math.floor(Math.random() * allCards.length)];
            card.reversed = Math.random() < 0.5 ? "Upright" : "Reversed";
    
            flipToCard(imgEl, card, 0);
    
            oneCardWrapper.dataset.cardName = card.name;
            oneCardWrapper.dataset.cardOrientation = card.reversed;
        });
    }

    // ---------- 3-card spread ----------
    const button = document.getElementById("draw-btn");
    const cardWrappers = document.querySelectorAll(".card-wrapper");

    if (button) {
        button.addEventListener("click", () => {
            let drawnCards = [];

            for (let i = 0; i < 3; i++) {
                const card = allCards[Math.floor(Math.random() * allCards.length)];
                const reversed = Math.random() < 0.5 ? "Upright" : "Reversed";
                drawnCards.push({ ...card, reversed });
            }

            cardWrappers.forEach((wrapper, index) => {
                const imgEl = wrapper.querySelector(".tarot-img");
                if (!imgEl) return;

                const card = drawnCards[index];
                flipToCard(imgEl, card, index * 500);
            });
        });
    }

    // ---------- 5-card V-shape ----------
    const vButton = document.getElementById("draw-v-btn");
    const vCardWrappers = document.querySelectorAll(".v-card");

    if (vButton) {
        vButton.addEventListener("click", () => {
            let deck = [...allCards];
            let drawnCards = [];

            for (let i = 0; i < 5; i++) {
                const idx = Math.floor(Math.random() * deck.length);
                const card = deck.splice(idx, 1)[0];
                const reversed = Math.random() < 0.5 ? "Upright" : "Reversed";
                drawnCards.push({ ...card, reversed });
            }

            vCardWrappers.forEach((wrapper, index) => {
                const imgEl = wrapper.querySelector(".tarot-img");
                if (!imgEl) return;

                const card = drawnCards[index];
                flipToCard(imgEl, card, index * 500);
            });
        });
    }

    // ---------- 7-card spread ----------
    const v7Button = document.getElementById("draw-v7-btn");
    const v7CardWrappers = Array.from(document.querySelectorAll(".v7-card"));
    let currentSelected7 = null;

    if (v7Button) {
        v7Button.addEventListener("click", () => {
            let deck = [...allCards];
            const drawCount = Math.min(v7CardWrappers.length, deck.length);
            let drawnCards = [];

            for (let i = 0; i < drawCount; i++) {
                const idx = Math.floor(Math.random() * deck.length);
                const card = deck.splice(idx, 1)[0];
                const reversed = Math.random() < 0.5 ? "Upright" : "Reversed";
                drawnCards.push({ ...card, reversed });
            }

            v7CardWrappers.forEach((wrapper, index) => {
                const imgEl = wrapper.querySelector(".tarot-img");
                if (!imgEl) return;

                const card = drawnCards[index];
                flipToCard(imgEl, card, index * 500);

                // 存数据给选择逻辑用
                wrapper.dataset.cardName = card.name;
                wrapper.dataset.cardOrientation = card.reversed;

                // reset classes
                wrapper.classList.remove('selected');
                wrapper.classList.add('selectable');
            });

            currentSelected7 = null;
        });
    }

    // ---------- Selection behavior for 7-card spread ----------
    v7CardWrappers.forEach(c => {
        c.classList.add('selectable');

        c.addEventListener('click', () => {
            if (!c.classList.contains('selectable')) return;

            if (currentSelected7 && currentSelected7 !== c) {
                currentSelected7.classList.remove('selected');
            }

            const willSelect = c !== currentSelected7;

            if (willSelect) {
                c.classList.add('selected');
                currentSelected7 = c;
            } else {
                c.classList.remove('selected');
                currentSelected7 = null;
            }
        });
    });

});
