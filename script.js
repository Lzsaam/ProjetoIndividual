// Selecionando todos os elementos necessários da página HTML
const start_btn = document.querySelector(".start_btn button"); // Botão de início do quiz
const info_box = document.querySelector(".info_box"); // Caixa de informações do quiz
const exit_btn = info_box.querySelector(".buttons .quit"); // Botão de saída dentro da caixa de informações
const continue_btn = info_box.querySelector(".buttons .restart"); // Botão de continuar dentro da caixa de informações
const quiz_box = document.querySelector(".quiz_box"); // Caixa do quiz
const result_box = document.querySelector(".result_box"); // Caixa de resultado do quiz
const option_list = document.querySelector(".option_list"); // Lista de opções do quiz
const time_line = document.querySelector("header .time_line"); // Linha de tempo do quiz no cabeçalho
const timeText = document.querySelector(".timer .time_left_txt"); // Texto de tempo restante
const timeCount = document.querySelector(".timer .timer_sec"); // Contador de tempo


// Evento que ocorre quando o botão de início do quiz é clicado
start_btn.onclick = () => {
    info_box.classList.add("activeInfo"); // Adiciona a classe "activeInfo" à caixa de informações para mostrá-la
}

/// Evento que ocorre quando o botão de saída do quiz é clicado
exit_btn.onclick = () => {
    info_box.classList.remove("activeInfo"); // Remove a classe "activeInfo" da caixa de informações para ocultá-la
}

// Evento que ocorre quando o botão de continuar o quiz é clicado
continue_btn.onclick = () => {
    info_box.classList.remove("activeInfo"); // Remove a classe "activeInfo" da caixa de informações para ocultá-la
    quiz_box.classList.add("activeQuiz"); // Adiciona a classe "activeQuiz" à caixa do quiz para mostrá-la
    showQuetions(0); // Chama a função showQuetions para exibir a primeira questão do quiz
    queCounter(1); // Chama a função queCounter para atualizar o contador de questões passando 1 como parâmetro
    startTimer(15); // Chama a função startTimer para iniciar o temporizador do quiz com 15 segundos
    startTimerLine(0); // Chama a função startTimerLine para iniciar a linha de tempo do quiz
}


// Variáveis para controlar o tempo, contagem de questões, pontuação do usuário e contadores
let timeValue = 15; // Valor inicial do tempo para cada questão
let que_count = 0; // Contagem das questões respondidas
let que_numb = 1; // Número da questão atual
let userScore = 0; // Pontuação do usuário
let counter; // Variável para o temporizador
let counterLine; // Variável para a linha de tempo
let widthValue = 0; // Valor inicial da largura da linha de tempo


// Seleção dos botões de reinício e saída do quiz na caixa de resultado
const restart_quiz = result_box.querySelector(".buttons .restart"); // Botão de reinício do quiz
const quit_quiz = result_box.querySelector(".buttons .quit"); // Botão de saída do quiz


// Evento que ocorre quando o botão de reinício do quiz é clicado
restart_quiz.onclick = () => {
    quiz_box.classList.add("activeQuiz"); // Adiciona a classe "activeQuiz" à caixa do quiz para mostrá-la
    result_box.classList.remove("activeResult"); // Remove a classe "activeResult" da caixa de resultado para ocultá-la
    timeValue = 15; // Reinicia o valor do tempo para 15 segundos
    que_count = 0; // Reinicia a contagem de questões respondidas
    que_numb = 1; // Reinicia o número da questão atual
    userScore = 0; // Reinicia a pontuação do usuário
    widthValue = 0; // Reinicia o valor da largura da linha de tempo
    showQuetions(que_count); // Chama a função showQuetions para exibir a primeira questão do quiz
    queCounter(que_numb); // Chama a função queCounter para atualizar o contador de questões com o número atual
    clearInterval(counter); // Limpa o temporizador
    clearInterval(counterLine); // Limpa a linha de tempo
    startTimer(timeValue); // Chama a função startTimer para iniciar o temporizador do quiz
    startTimerLine(widthValue); // Chama a função startTimerLine para iniciar a linha de tempo do quiz
    timeText.textContent = "Time Left"; // Altera o texto de tempo restante para "Time Left"
    next_btn.classList.remove("show"); // Esconde o botão "Next" (próximo) do quiz
}


// Evento que ocorre quando o botão de saída do quiz é clicado
quit_quiz.onclick = () => {
    window.location.reload(); // Recarrega a janela atual, reiniciando o quiz
}


// Seleção dos elementos do botão "Next" (próximo) e do contador de questões no rodapé
const next_btn = document.querySelector("footer .next_btn"); // Botão "Next" para avançar para a próxima questão
const bottom_ques_counter = document.querySelector("footer .total_que"); // Contador de questões no rodapé


// Evento que ocorre quando o botão "Next" (próximo) da questão é clicado
next_btn.onclick = () => {
    if (que_count < questions.length - 1) { // Verifica se o número de questões respondidas é menor que o total de questões
        que_count++; // Incrementa o contador de questões respondidas
        que_numb++; // Incrementa o número da próxima questão
        showQuetions(que_count); // Chama a função showQuetions para exibir a próxima questão
        queCounter(que_numb); // Atualiza o contador de questões no rodapé
        clearInterval(counter); // Limpa o temporizador
        clearInterval(counterLine); // Limpa a linha de tempo
        startTimer(timeValue); // Inicia o temporizador para a próxima questão
        startTimerLine(widthValue); // Inicia a linha de tempo para a próxima questão
        timeText.textContent = "Tempo Restante"; // Altera o texto indicando o tempo restante
        next_btn.classList.remove("show"); // Esconde o botão "Next" (próximo) da questão atual
    } else {
        clearInterval(counter); // Limpa o temporizador
        clearInterval(counterLine); // Limpa a linha de tempo
        showResult(); // Chama a função showResult para exibir o resultado final do quiz
    }
}




// Função para exibir uma questão específica com suas opções
function showQuetions(index) {
    const que_text = document.querySelector(".que_text"); // Seleciona o elemento HTML que exibirá o texto da questão

    // Cria tags HTML para a pergunta e as opções, utilizando o índice passado como parâmetro para acessar os dados da questão correspondente no array "questions"
    let que_tag = '<span>' + questions[index].numb + ". " + questions[index].question + '</span>'; // Cria a tag HTML para exibir o texto da questão
    let option_tag = '<div class="option"><span>' + questions[index].options[0] + '</span></div>' // Cria as tags HTML para exibir as opções de resposta
        + '<div class="option"><span>' + questions[index].options[1] + '</span></div>'
        + '<div class="option"><span>' + questions[index].options[2] + '</span></div>'
        + '<div class="option"><span>' + questions[index].options[3] + '</span></div>';
    que_text.innerHTML = que_tag; // Insere a tag da pergunta no elemento HTML
    option_list.innerHTML = option_tag; // Insere as tags das opções no elemento HTML

    const option = option_list.querySelectorAll(".option"); // Seleciona todas as opções de resposta

    // Define o atributo "onclick" para todas as opções, chamando a função "optionSelected" quando clicadas e passando o próprio elemento como parâmetro
    for (i = 0; i < option.length; i++) {
        option[i].setAttribute("onclick", "optionSelected(this)");
    }
}


/// Criando as novas tags div para os ícones
let tickIconTag = '<div class="icon tick"><i class="fas fa-check"></i></div>'; // Tag HTML para o ícone de marcação de resposta correta
let crossIconTag = '<div class="icon cross"><i class="fas fa-times"></i></div>'; // Tag HTML para o ícone de marcação de resposta incorreta


// Função chamada quando o usuário clica em uma opção
function optionSelected(answer) {
    clearInterval(counter); // Limpa o contador
    clearInterval(counterLine); // Limpa a linha do contador
    let userAns = answer.textContent; // Obtém a opção selecionada pelo usuário
    let correcAns = questions[que_count].answer; // Obtém a resposta correta do array de questões
    const allOptions = option_list.children.length; // Obtém o número total de opções

    if (userAns == correcAns) { // Se a opção selecionada pelo usuário for igual à resposta correta do array
        userScore += 1; // Incrementa o valor da pontuação em 1
        answer.classList.add("correct"); // Adiciona cor verde à opção selecionada corretamente
        answer.insertAdjacentHTML("beforeend", tickIconTag); // Adiciona o ícone de marcação de resposta correta à opção selecionada corretamente
        console.log("Resposta Correta");
        console.log("Suas respostas corretas = " + userScore);
    } else {
        answer.classList.add("incorrect"); // Adiciona cor vermelha à opção selecionada incorretamente
        answer.insertAdjacentHTML("beforeend", crossIconTag); // Adiciona o ícone de marcação de resposta incorreta à opção selecionada incorretamente
        console.log("Resposta Errada");

        for (i = 0; i < allOptions; i++) {
            if (option_list.children[i].textContent == correcAns) { // Se houver uma opção que corresponda à resposta do array
                option_list.children[i].setAttribute("class", "option correct"); // Adiciona cor verde à opção correspondente
                option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag); // Adiciona o ícone de marcação de resposta correta à opção correspondente
                console.log("Resposta correta automaticamente selecionada.");
            }
        }
    }
    for (i = 0; i < allOptions; i++) {
        option_list.children[i].classList.add("disabled"); // Uma vez que o usuário seleciona uma opção, desabilita todas as opções
    }
    next_btn.classList.add("show"); // Mostra o botão de próxima pergunta se o usuário selecionou alguma opção
}


function showResult() {
    info_box.classList.remove("activeInfo"); // Esconde a caixa de informação
    quiz_box.classList.remove("activeQuiz"); // Esconde a caixa do quiz
    result_box.classList.add("activeResult"); // Mostra a caixa de resultado
    const scoreText = result_box.querySelector(".score_text");

    // Verifica a pontuação do usuário e exibe uma mensagem correspondente
    if (userScore > 3) { // Se o usuário pontuou mais que 3
        // Cria uma nova tag <span> e insere o número de pontuação do usuário e o número total de questões
        let scoreTag = '<span>e parabéns! , Você acertou <p>' + userScore + '</p> de <p>' + questions.length + '</p></span>';
        scoreText.innerHTML = scoreTag; // Adiciona a nova tag <span> dentro de score_Text
    }
    else if (userScore > 1) { // Se o usuário pontuou mais que 1
        let scoreTag = '<span>e bom , Você acertou <p>' + userScore + '</p> de <p>' + questions.length + '</p></span>';
        scoreText.innerHTML = scoreTag;
    }
    else { // Se o usuário pontuou menos que 1
        let scoreTag = '<span>e lamentável , Você acertou apenas <p>' + userScore + '</p> de <p>' + questions.length + '</p></span>';
        scoreText.innerHTML = scoreTag;
    }
}



function startTimer(time) {
    counter = setInterval(timer, 1000);
    function timer() {
        timeCount.textContent = time; // altera o valor de timeCount com o valor de tempo
        time--; // decrementa o valor de tempo
        if (time < 9) { // se o tempo for menor que 9
            let addZero = timeCount.textContent;
            timeCount.textContent = "0" + addZero; // adiciona um 0 antes do valor de tempo
        }
        if (time < 0) { // se o tempo for menor que 0
            clearInterval(counter); // limpa o contador
            timeText.textContent = "Tempo Esgotado"; // muda o texto de tempo para tempo esgotado
            const allOptions = option_list.children.length; // obtém todos os itens de opção
            let correcAns = questions[que_count].answer; // obtém a resposta correta do array
            for (i = 0; i < allOptions; i++) {
                if (option_list.children[i].textContent == correcAns) { // se houver uma opção que corresponda à resposta do array
                    option_list.children[i].setAttribute("class", "option correct"); // adiciona a cor verde à opção correspondente
                    option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag); // adiciona o ícone de marca à opção correspondente
                    console.log("Tempo Esgotado: Resposta correta automaticamente selecionada.");
                }
            }
            for (i = 0; i < allOptions; i++) {
                option_list.children[i].classList.add("disabled"); // uma vez que o usuário selecionou uma opção, desabilita todas as opções
            }
            next_btn.classList.add("show"); // mostra o botão de próximo se o usuário selecionou alguma opção
        }
    }
}


function startTimerLine(time) {
    counterLine = setInterval(timer, 29);
    function timer() {
        time += 1; // aumenta o valor de tempo em 1
        time_line.style.width = time + "px"; // aumenta a largura de time_line em pixels pelo valor de tempo
        if (time > 549) { // se o valor de tempo for maior que 549
            clearInterval(counterLine); // limpa counterLine
        }
    }
}


function queCounter(index) {
    // cria uma nova tag span e passa o número da questão e o total de questões
    let totalQueCounTag = '<span><p>' + index + '</p> de <p>' + questions.length + '</p> Questões</span>';
    bottom_ques_counter.innerHTML = totalQueCounTag;  // adiciona a nova tag span dentro de bottom_ques_counter
}




function displayTime() {
    // Obtém a hora atual
    var currentTime = new Date();
    // Extrai as horas, minutos e segundos da hora atual
    var hours = currentTime.getHours();
    var minutes = currentTime.getMinutes();
    var seconds = currentTime.getSeconds();
    
    // Adiciona um zero à esquerda se a hora, os minutos ou os segundos forem menores que 10
    if (hours < 10) {
        hours = "0" + hours;
    }
    if (minutes < 10) {
        minutes = "0" + minutes;
    }
    if (seconds < 10) {
        seconds = "0" + seconds;
    }
    
    // Exibe a hora formatada no elemento com o ID "waqt"
    document.getElementById("waqt").innerHTML = hours + ":" + minutes + ":" + seconds;
}

// Define uma função para exibir a data
function displayDate() {
    // Obtém a data atual
    var currentDate = new Date();
    // Extrai o dia, o mês e o ano da data atual
    var date = currentDate.getDate();
    var month = currentDate.getMonth();
    var year = currentDate.getFullYear();
    // Define os nomes dos meses em português
    var monthNames = [
        "Janeiro", "Fevereiro", "Março",
        "Abril", "Maio", "Junho", "Julho",
        "Agosto", "Setembro", "Outubro",
        "Novembro", "Dezembro"
    ];
    // Formata a data no formato "dia, mês ano" e exibe no elemento HTML com o ID "din"
    document.getElementById("din").innerHTML = date + ", " + monthNames[month] + " " + year;
}

// Atualiza a função displayDate a cada segundo (1000 milissegundos)
setInterval(displayDate, 1000);
