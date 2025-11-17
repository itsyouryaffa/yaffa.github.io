document.addEventListener("DOMContentLoaded", function() {
    // Card definitions
    const majorArcana = Array.from({length:22}, (_,i)=>`m${i.toString().padStart(2,'0')}`);
    const cups = Array.from({length:14}, (_,i)=>`c${(i+1).toString().padStart(2,'0')}`);
    const coins = Array.from({length:14}, (_,i)=>`p${(i+1).toString().padStart(2,'0')}`);
    const swords = Array.from({length:14}, (_,i)=>`s${(i+1).toString().padStart(2,'0')}`);
    const wands = Array.from({length:14}, (_,i)=>`w${(i+1).toString().padStart(2,'0')}`);

    const allCards = [
        ...majorArcana.map(name=>({name, type:'Major Arcana'})),
        ...cups.map(name=>({name, type:'Cups'})),
        ...coins.map(name=>({name, type:'Coins'})),
        ...swords.map(name=>({name, type:'Swords'})),
        ...wands.map(name=>({name, type:'Wands'}))
    ];

    // 3-card spread (unchanged)
    const button = document.getElementById("draw-btn");
    const cardWrappers = document.querySelectorAll(".card-wrapper");
    if (button) {
        button.addEventListener("click", () => {
            let drawnCards = [];
            for(let i=0;i<3;i++){
                const card = allCards[Math.floor(Math.random()*allCards.length)];
                const reversed = Math.random() < 0.5 ? "Upright" : "Reversed";
                drawnCards.push({...card, reversed});
            }
            cardWrappers.forEach((wrapper, index)=>{
                const imgEl = wrapper.querySelector(".tarot-img");
                if(!imgEl) return;
                imgEl.style.transform = "rotateY(0deg) rotate(0deg)";
                imgEl.src = "../images/back.jpg";
                setTimeout(()=>{
                    const card = drawnCards[index];
                    if(!card) return;
                    imgEl.src = `../images/${card.name}.jpg`;
                    if(card.reversed === "Reversed"){
                        imgEl.style.transform = "rotateY(180deg) rotate(180deg)";
                    } else {
                        imgEl.style.transform = "rotateY(180deg) rotate(0deg)";
                    }
                }, index * 500);
            });
        });
    }

    // 5-card V-shape (unchanged)
    const vButton = document.getElementById("draw-v-btn");
    const vCardWrappers = document.querySelectorAll(".v-card");
    if (vButton) {
        vButton.addEventListener("click", () => {
            let deck = [...allCards];
            let drawnCards = [];
            for(let i=0;i<5;i++){
                const idx = Math.floor(Math.random()*deck.length);
                const card = deck.splice(idx,1)[0];
                const reversed = Math.random() < 0.5 ? "Upright" : "Reversed";
                drawnCards.push({...card, reversed});
            }
            vCardWrappers.forEach((wrapper, index)=>{
                const imgEl = wrapper.querySelector(".tarot-img");
                if(!imgEl) return;
                imgEl.style.transform = "rotateY(0deg) rotate(0deg)";
                imgEl.src = "../images/back.jpg";
                setTimeout(()=>{
                    const card = drawnCards[index];
                    if(!card) return;
                    imgEl.src = `../images/${card.name}.jpg`;
                    if(card.reversed === "Reversed"){
                        imgEl.style.transform = "rotateY(180deg) rotate(180deg)";
                    } else {
                        imgEl.style.transform = "rotateY(180deg) rotate(0deg)";
                    }
                }, index * 500);
            });
        });
    }

    // 7-card spread (controls removed: all v7 cards become selectable after draw)
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
                drawnCards.push({...card, reversed});
            }
            v7CardWrappers.forEach((wrapper, index) => {
                const imgEl = wrapper.querySelector(".tarot-img");
                if (!imgEl) return;
                // reset classes and visuals
                wrapper.classList.remove('selected');
                wrapper.classList.add('selectable');
                imgEl.style.transform = "rotateY(0deg) rotate(0deg)";
                imgEl.src = "../images/back.jpg";
                setTimeout(() => {
                    const card = drawnCards[index];
                    if (!card) return;
                    imgEl.src = `../images/${card.name}.jpg`;
                    if (card.reversed === "Reversed") {
                        imgEl.style.transform = "rotateY(180deg) rotate(180deg)";
                    } else {
                        imgEl.style.transform = "rotateY(180deg) rotate(0deg)";
                    }
                    wrapper.dataset.cardName = card.name;
                    wrapper.dataset.cardOrientation = card.reversed;
                }, index * 500);
            });
            currentSelected7 = null;
        });
    }

    // Selection behavior for 7-card spread (all v7 cards selectable)
    v7CardWrappers.forEach(c => {
        // ensure initially selectable so user can click before draw if desired
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
