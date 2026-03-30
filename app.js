const cartas = document.querySelectorAll(".carta");
let tentativas = 0;
const contador = document.getElementById("contador");
let cartasViradas = [];

const emojis = ["🥱", "😴", "🤩", "😛"];
const pares = [...emojis, ...emojis];

pares.sort(() => Math.random() - 0.5);

cartas.forEach((carta, index) => {
    carta.querySelector(".carta-costas").textContent = pares[index];
});



function animarEmbaralhar() {
    const cartas = document.querySelectorAll(".carta");

    cartas.forEach((carta, index) => {
        setTimeout(() => {
            carta.classList.add("embaralhando");

            setTimeout(() => {
                carta.classList.remove("embaralhando");
            }, 400);

        }, index * 100);
    });
}

animarEmbaralhar();

function virarCarta() {
    cartas.forEach(carta => {
        carta.addEventListener("click", () => {
            if(cartasViradas.length < 2 && !carta.classList.contains("virada")) {
                carta.classList.add("virada");
                cartasViradas.push(carta);
            }

            if(cartasViradas.length === 2) {
                tentativas++;
                contador.textContent = tentativas;

                verificarCartas();
            }
        });
    })
}



function verificarCartas() {
    bloqueado = true;
    const [carta1, carta2] = cartasViradas;

    const emoji1 = carta1.querySelector(".carta-costas").textContent;
    const emoji2 = carta2.querySelector(".carta-costas").textContent;

    if(emoji1 === emoji2) {
        cartasViradas = [];
        bloqueado = false;
    } else {
        setTimeout(() => {
            carta1.classList.remove("virada");
            carta2.classList.remove("virada");

            cartasViradas = [];
            bloqueado = false;
        }, 1000);
    }
}

virarCarta();