const cartas = document.querySelectorAll(".carta");
let cartasViradas = [];

let tentativas = 0;
const contador = document.getElementById("contador");

let acertos = 0;
const contadorAcertos = document.getElementById("contadorAcertos");

const botaoReinicia = document.getElementById("reiniciar");

const botaoReiniciaVitoria = document.getElementById("reiniciar-vitoria");
const mensagemVitoria = document.getElementById("vitoria");

const emojis = ["🥱", "😴", "🤩", "😛"];
const pares = [...emojis, ...emojis];

function embaralhar() {
    pares.sort(() => Math.random() - 0.5);

    cartas.forEach((carta, index) => {
        carta.querySelector(".carta-costas").textContent = pares[index];
    });
}

embaralhar();


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

virarCarta();

function verificarCartas() {
    bloqueado = true;
    const [carta1, carta2] = cartasViradas;

    const emoji1 = carta1.querySelector(".carta-costas").textContent;
    const emoji2 = carta2.querySelector(".carta-costas").textContent;

    if(emoji1 === emoji2) {
        cartasViradas = [];
        bloqueado = false;

        acertos++;
        contadorAcertos.textContent = acertos;

        if (document.querySelectorAll(".virada").length === cartas.length) {
            mostrarVitoria();
            soltarConfete();
        }
    } else {
        setTimeout(() => {
            carta1.classList.remove("virada");
            carta2.classList.remove("virada");

            cartasViradas = [];
            bloqueado = false;
        }, 1000);
    }
}

function mostrarVitoria() {
    mensagemVitoria.classList.add("ativo")
}

botaoReinicia.addEventListener("click", () => {
    location.reload();
})

botaoReiniciaVitoria.addEventListener("click", () => {
    location.reload();
})

function soltarConfete() {
    for (let i = 0; i < 300; i++) {
        const confete = document.createElement("div");
        confete.classList.add("confete");

        confete.style.left = Math.random() * 100 + "vw";

        confete.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;

        const tamanho = Math.random() * 8 + 5;
        confete.style.width = tamanho + "px";
        confete.style.height = tamanho + "px";

        confete.style.animationDuration = (Math.random() * 2 + 2) + "s";

        document.body.appendChild(confete);

        setTimeout(() => {
            confete.remove();
        }, 3000);
    }
}

