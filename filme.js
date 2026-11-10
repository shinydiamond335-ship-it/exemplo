const botao = document.getElementById("btnMostrar");
const resultado = document.getElementById("resultado");

botao.addEventListener("click",
function () {

    const filme = document.getElementById("filme").value;
    const ano = document.getElementById("ano").value;
    const nota = document.getElementById("nota").value;

    resultado.textContent =
      "Seu filme favorito é: " + filme +
      "Lançado em " + ano + 
      "Nota informada "+ nota + ".";

});

file.js
