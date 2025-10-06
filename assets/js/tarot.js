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
    button.addEventListener("click", () => {
        let drawnCards = [];
        for(let i=0;i<3;i++){
            const card = allCards[Math.floor(Math.random()*allCards.length)];
            const reversed = Math.random() < 0.5 ? "Upright" : "Reversed";
            drawnCards.push({...card, reversed});
        }
        cardWrappers.forEach((wrapper, index)=>{
            const imgEl = wrapper.querySelector(".tarot-img");
            imgEl.style.transform = "rotateY(0deg) rotate(0deg)";
            imgEl.src = "../images/back.jpg";
            setTimeout(()=>{
                const card = drawnCards[index];
                imgEl.src = `../images/${card.name}.jpg`;
                if(card.reversed === "Reversed"){
                    imgEl.style.transform = "rotateY(180deg) rotate(180deg)";
                } else {
                    imgEl.style.transform = "rotateY(180deg) rotate(0deg)";
                }
            }, index * 500);
        });
    });

    // 5-card V-shape grid logic
    const vButton = document.getElementById("draw-v-btn");
    const vCardWrappers = document.querySelectorAll(".v-card");
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
            imgEl.style.transform = "rotateY(0deg) rotate(0deg)";
            imgEl.src = "../images/back.jpg";
            setTimeout(()=>{
                const card = drawnCards[index];
                imgEl.src = `../images/${card.name}.jpg`;
                if(card.reversed === "Reversed"){
                    imgEl.style.transform = "rotateY(180deg) rotate(180deg)";
                } else {
                    imgEl.style.transform = "rotateY(180deg) rotate(0deg)";
                }
            }, index * 500);
        });
    });
});
