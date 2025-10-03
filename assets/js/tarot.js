document.addEventListener("DOMContentLoaded", function() {

    // Define card sets
    const majorArcana = Array.from({length:22}, (_,i)=>`m${i.toString().padStart(2,'0')}`);
    const cups = Array.from({length:14}, (_,i)=>`c${(i+1).toString().padStart(2,'0')}`);
    const coins = Array.from({length:14}, (_,i)=>`p${(i+1).toString().padStart(2,'0')}`);
    const swords = Array.from({length:14}, (_,i)=>`s${(i+1).toString().padStart(2,'0')}`);
    const wands = Array.from({length:14}, (_,i)=>`w${(i+1).toString().padStart(2,'0')}`);

    // Combine all cards with type
    const allCards = [
        ...majorArcana.map(name=>({name, type:'Major Arcana'})),
        ...cups.map(name=>({name, type:'Cups'})),
        ...coins.map(name=>({name, type:'Coins'})),
        ...swords.map(name=>({name, type:'Swords'})),
        ...wands.map(name=>({name, type:'Wands'}))
    ];

    const button = document.getElementById("draw-btn");
    const cardWrappers = document.querySelectorAll(".card-wrapper");

    button.addEventListener("click", () => {

        // Randomly draw three cards
        let drawnCards = [];
        for(let i=0;i<3;i++){
            const card = allCards[Math.floor(Math.random()*allCards.length)];
            const reversed = Math.random() < 0.5 ? "Upright" : "Reversed";
            drawnCards.push({...card, reversed});
        }

        // Flip cards with animation
        cardWrappers.forEach((wrapper, index)=>{
            const imgEl = wrapper.querySelector(".tarot-img");

            // Reset to back image
            imgEl.style.transform = "rotateY(0deg) rotate(0deg)";
            imgEl.src = "../images/back.jpg";

            // Delay flip for animation effect
            setTimeout(()=>{
                const card = drawnCards[index];
                imgEl.src = `../images/${card.name}.jpg`;
                if(card.reversed === "Reversed"){
                    imgEl.style.transform = "rotateY(180deg) rotate(180deg)";
                } else {
                    imgEl.style.transform = "rotateY(180deg) rotate(0deg)";
                }
                // No text display under card
            }, index * 500); // 0.5s delay per card
        });

    });
});
