console.log("Hello Humans!");
alert("You are full of wonders!");
let x = 10;
console.log("o valor de x é: " + x);
const nomeAgencia = 'Jornada Viagens';
const descontoPix = 5;
let promocaoAtiva = true;

const destinosDestaque = ['Japão', 'Paraíba', 'San Andreas'];

const pacoteDoMes = {
  destino: 'Paraíba',
  preco: 1199,
  dias: 4
};

console.log(nomeAgencia, '→', typeof nomeAgencia);
console.log(descontoPix, '→', typeof descontoPix);
console.log(promocaoAtiva, '→', typeof promocaoAtiva);
console.log('Primeiro destino da lista:', destinosDestaque[0]);
console.log('Destino do pacote do mês:', pacoteDoMes.destino);
// ===== Etapa 12: MANIPULAÇÃO DO DOM =====

// 1) Escrever na página usando as variáveis da Etapa 11
const textoDestaque = document.getElementById('texto-destaque');   // pega o <p> pelo id
textoDestaque.textContent = 'Pacote do mês: ' + pacoteDoMes.destino +
    ' por R$ ' + pacoteDoMes.preco + ' (' + pacoteDoMes.dias + ' dias). ' +
    'Destaques: ' + destinosDestaque.join(', ') + '.';

if (promocaoAtiva) {
    textoDestaque.style.fontWeight = 'bold';   // muda o ESTILO pelo JavaScript
}

// 2) Pegar os campos do formulário pelo id
const campoHospedagem = document.getElementById('hospedagem');
const campoPessoas = document.getElementById('pessoas');
const campoDiarias = document.getElementById('diarias');
const saidaPessoas = document.getElementById('saida-pessoas');
const saidaTotal = document.getElementById('total');

// 3) Função que calcula o total e mostra na tela
function calcularTotal() {
    // .value LÊ o que está no campo (vem como texto); Number() transforma em número
    const diaria = Number(campoHospedagem.value);
    const pessoas = Number(campoPessoas.value);
    const diarias = Number(campoDiarias.value);

    const total = diaria * pessoas * diarias;a

    // textContent ESCREVE o texto dentro do elemento
    saidaPessoas.textContent = pessoas;
    saidaTotal.textContent = total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

    // style muda a aparência: acima de R$ 3.000 o total ganha fundo laranja-claro
    if (total > 3000) {
        saidaTotal.style.backgroundColor = '#ffe5b4';
        saidaTotal.style.padding = '0 8px';
    } else {
        saidaTotal.style.backgroundColor = '';   // '' = volta ao normal
        saidaTotal.style.padding = '';
    }
}

// 4) Sempre que o usuário mexer nos campos, recalcula
campoHospedagem.addEventListener('change', calcularTotal);
campoPessoas.addEventListener('input', calcularTotal);
campoDiarias.addEventListener('input', calcularTotal);

calcularTotal();   // calcula uma vez quando a página abre
// ===== Etapa 13: BARRA DE PROGRESSO E VALIDAÇÃO =====
const formulario = document.getElementById('form-orcamento');
const barra = document.getElementById('barra-preenchimento');
const areaAlertas = document.getElementById('area-alertas');

// Um ARRAY com os 4 campos obrigatórios
const camposObrigatorios = [
    document.getElementById('nome'),
    document.getElementById('email'),
    document.getElementById('destino'),
    campoHospedagem
];

// Conta quantos campos estão preenchidos e atualiza a barra
function atualizarProgresso() {
    let preenchidos = 0;
    camposObrigatorios.forEach(function (campo) {      // repete para cada campo da lista
        if (campo.value.trim() !== '') {              // trim() tira os espaços
            preenchidos = preenchidos + 1;
        }
    });

    const porcentagem = (preenchidos / camposObrigatorios.length) * 100;
    barra.style.width = porcentagem + '%';            // muda a LARGURA da barra
    barra.textContent = porcentagem + '%';            // muda o TEXTO da barra
    barra.parentElement.setAttribute('aria-valuenow', porcentagem);

    if (porcentagem === 100) {
        barra.classList.add('bg-success');            // tudo preenchido: barra verde
    } else {
        barra.classList.remove('bg-success');
    }
}

// Quando o usuário digitar ou trocar a opção, atualiza a barra
camposObrigatorios.forEach(function (campo) {
    campo.addEventListener('input', atualizarProgresso);
    campo.addEventListener('change', atualizarProgresso);
});

// Quando o formulário for ENVIADO
formulario.addEventListener('submit', function (evento) {
    evento.preventDefault();   // impede a página de recarregar

    let tudoCerto = true;
    camposObrigatorios.forEach(function (campo) {
        if (campo.checkValidity()) {                  // o campo está válido?
            campo.classList.remove('is-invalid');
            campo.classList.add('is-valid');          // borda verde
        } else {
            campo.classList.remove('is-valid');
            campo.classList.add('is-invalid');        // borda vermelha + mensagem
            tudoCerto = false;
        }
    });

    if (tudoCerto) {
        areaAlertas.innerHTML = '<div class="alert alert-success" role="alert">' +
            '<strong>Pronto!</strong> Seu orçamento foi enviado. Total: ' + saidaTotal.textContent + '</div>';
    } else {
        areaAlertas.innerHTML = '<div class="alert alert-danger" role="alert">' +
            '<strong>Atenção!</strong> Corrija os campos em vermelho.</div>';
    }
});

// Botão "Limpar": zera a barra, as cores e o alerta
formulario.addEventListener('reset', function () {
    setTimeout(function () {                          // espera o navegador limpar os campos
        camposObrigatorios.forEach(function (campo) {
            campo.classList.remove('is-valid', 'is-invalid');
        });
        areaAlertas.innerHTML = '';
        atualizarProgresso();
        calcularTotal();
    }, 0);
});
