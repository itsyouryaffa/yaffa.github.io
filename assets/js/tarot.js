document.addEventListener("DOMContentLoaded", function() {
    const majorArcana = Array.from({length:22}, (_,i)=>`m${i.toString().padStart(2,'0')}`);
    const cups = Array.from({length:14}, (_,i)=>`c${(i+1).toString().padStart(2,'0')}`);
    const coins = Array.from({length:14}, (_,i)=>`p${(i+1).toString().padStart(2,'0')}`);
    const swords = Array.from({length:14}, (_,i)=>`s${(i+1).toString().padStart(2,'0')}`);
    const wands = Array.from({length:14}, (_,i)=>`w${(i+1).toString().padStart(2,'0')}`);

    const allCards = [
        ...majorArcana.map(name=>({name, type:'大阿尔克那'})),
        ...cups.map(name=>({name, type:'圣杯'})),
        ...coins.map(name=>({name, type:'星币'})),
        ...swords.map(name=>({name, type:'宝剑'})),
        ...wands.map(name=>({name, type:'权杖'}))
    ];

    const button = document.getElementById("draw-btn");
    const cardWrappers = document.querySelectorAll(".card-wrapper");

    button.addEventListener("click", () => {
        let drawnCards = [];
        while(drawnCards.length < 3){
            const card = allCards[Math.floor(Math.random()*allCards.length)];
            if(!drawnCards.some(c=>c.name === card.name)){
                const reversed = Math.random() < 0.5 ? "正位" : "逆位";
                drawnCards.push({...card, reversed});
            }
        }

        cardWrappers.forEach((wrapper, index)=>{
            const imgEl = wrapper.querySelector(".tarot-img");
            const resultDiv = wrapper.querySelector(".card-result");

            imgEl.style.transform = "rotateY(0deg) rotate(0deg)";
            imgEl.src = "../images/back.jpg";
            resultDiv.innerText = "";

            setTimeout(()=>{
                const card = drawnCards[index];
                imgEl.src = `../images/${card.name}.jpg`;
                imgEl.style.transform = card.reversed === "逆位" ? "rotateY(180deg) rotate(180deg)" : "rotateY(180deg) rotate(0deg)";
                resultDiv.innerText = `${card.name} (${card.type}) - ${card.reversed}`;
            }, index*500);
        });
    });
});
