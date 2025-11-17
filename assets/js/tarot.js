document.addEventListener("DOMContentLoaded", function() {
    // Card definitions (same as your 3-card logic)
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

    // 3-card spread logic (unchanged)
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

    // 5-card V-shape grid logic (unchanged)
    const vButton = document.getElementById("draw-v-btn");
    const vCardWrappers = document.querySelectorAll(".v-card");
    if (vButton) {
        vButton.addEventListener("click", () => {
            // Draw 5 unique cards
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

    // 7-card shape grid logic (one bottom card + three branches)
    const v7Button = document.getElementById("draw-v7-btn");
    const v7CardWrappers = Array.from(document.querySelectorAll(".v7-card"));

    // Branch controls (Left/Center/Right)
    const branchButtons = Array.from(document.querySelectorAll('.option-btn'));
    let activeBranch = 'center';
    let currentSelected7 = null;
    const selectedElem = document.getElementById('selected');

    function updateBranch7(branch) {
        activeBranch = branch;
        branchButtons.forEach(b => b.classList.toggle('active', b.dataset.branch === branch));
        v7CardWrappers.forEach(c => {
            if (c.dataset.branch === branch) {
                c.classList.remove('dim');
                c.classList.add('selectable');
            } else {
                c.classList.add('dim');
                c.classList.remove('selectable');
                c.classList.remove('selected');
            }
        });
        currentSelected7 = null;
        if (selectedElem) selectedElem.textContent = 'none';
    }

    if (branchButtons.length) {
        branchButtons.forEach(b => b.addEventListener('click', () => updateBranch7(b.dataset.branch)));
    }
    // initialize branch
    updateBranch7(activeBranch);

    if (v7Button) {
        v7Button.addEventListener("click", () => {
            // draw unique cards equal to v7 positions
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

            // reset branch selection after draw
            updateBranch7(activeBranch);
        });
    }

    // Selection behavior for 7-card spread
    v7CardWrappers.forEach(c => {
        c.addEventListener('click', () => {
            if (!c.classList.contains('selectable')) return;
            if (currentSelected7 && currentSelected7 !== c) {
                currentSelected7.classList.remove('selected');
            }
            const willSelect = c !== currentSelected7;
            if (willSelect) {
                c.classList.add('selected');
                currentSelected7 = c;
                if (selectedElem) selectedElem.textContent = c.dataset.cardName || c.dataset.label || c.dataset.label || 'card';
            } else {
                c.classList.remove('selected');
                currentSelected7 = null;
                if (selectedElem) selectedElem.textContent = 'none';
            }
        });
    });

    // Keyboard shortcuts for branch selection: 1 = left, 2 = center, 3 = right
    window.addEventListener('keydown', (ev) => {
        if (ev.key === '1') updateBranch7('left');
        if (ev.key === '2') updateBranch7('center');
        if (ev.key === '3') updateBranch7('right');
    });
});
