const ordemPeriodos = [
    "classico",
    "renascimento",
    "barroco",
    "romantismo",
    "impressionismo",
    "expressionismo",
    "cubismo",
    "fauvismo",
    "dadaismo",
    "surrealismo",
    "pop-art",
    "op-art"
];

document.addEventListener("DOMContentLoaded", async () => {

    // HEAD
    const headInclude = document.querySelector("[data-include-head]");
    if (headInclude) {
        const response = await fetch(headInclude.getAttribute("data-include-head"));
        const content = await response.text();
        document.head.insertAdjacentHTML("beforeend", content);
    }

    // BODY (header, etc)
    const includes = document.querySelectorAll("[data-include]");
    for (const el of includes) {
        const response = await fetch(el.getAttribute("data-include"));
        const content = await response.text();
        el.innerHTML = content;
    }

    // 🔥 AGORA SIM tudo existe no HTML

    destacarMenu();
    carregarPeriodo();

});

function destacarMenu() {
    const params = new URLSearchParams(window.location.search);
    const atual = params.get("id");

    const links = document.querySelectorAll(".nav-link");

    links.forEach(link => {
        if (link.dataset.id === atual) {
            link.classList.add("ativo");
        }
    });
}

function controlarNavegacao(idAtual, data) {

    const index = ordemPeriodos.indexOf(idAtual);

    const btnAnterior = document.getElementById("btn-anterior");
    const btnProximo = document.getElementById("btn-proximo");

    // limpa tudo primeiro
    btnAnterior.classList.add("d-none");
    btnProximo.classList.add("d-none");

    // 🔙 anterior
    if (index > 0) {
        const idAnterior = ordemPeriodos[index - 1];

        btnAnterior.classList.remove("d-none");
        btnAnterior.href = `periodo.html?id=${idAnterior}`;
        btnAnterior.innerText = `← ${data[idAnterior].nome_menu}`;
    }

    // 🔜 próximo
    if (index < ordemPeriodos.length - 1) {
        const idProximo = ordemPeriodos[index + 1];

        btnProximo.classList.remove("d-none");
        btnProximo.href = `periodo.html?id=${idProximo}`;
        btnProximo.innerText = `${data[idProximo].nome_menu} →`;
    }
}

async function carregarPeriodo() {

    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    const response = await fetch("data/periodos.json");
    const data = await response.json();

    const periodo = data[id];

    if (!periodo) return; // evita erro

    document.title = periodo.nome_menu;

    document.querySelector(".navbar h1").innerText = periodo.nome_menu;

    document.getElementById("titulo").innerText = periodo.titulo;
    document.getElementById("descricao").innerText = periodo.descricao;

    const container = document.getElementById("container-obras");

    container.innerHTML = ""; // limpa antes


    periodo.obras.forEach(obra => {
        container.innerHTML += `
        <div class="col-12 col-md-6 col-lg-4">

            <div class="exposição">

                <div class="card_obras">
                    <h3>${obra.titulo}</h3>
                    <div class="obra">
                        <img src="${obra.imagem}" alt="${obra.titulo}">
                    </div>
                </div>

                <div class="legenda">
                    <p><b>Ano:</b> ${obra.ano}</p>
                    <p><b>Autor:</b> ${obra.autor}</p>
                    <p><b>Local:</b> ${obra.local}</p>
                    <p><b>Descrição:</b> ${obra.descricao}</p>
                    <p><b>Interpretação:</b> ${obra.interpretacao}</p>
                </div>

            </div>

        </div>
        `;
    });

    controlarNavegacao(id, data);
}