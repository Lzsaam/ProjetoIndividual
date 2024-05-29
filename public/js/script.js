
const start_btn = document.querySelector(".start_btn button"); 
const info_box = document.querySelector(".info_box"); 
const exit_btn = info_box.querySelector(".buttons .quit"); 
const continue_btn = info_box.querySelector(".buttons .restart");
const quiz_box = document.querySelector(".quiz_box");
const result_box = document.querySelector(".result_box");
const option_list = document.querySelector(".option_list"); 
const time_line = document.querySelector("header .time_line"); 
const timeText = document.querySelector(".timer .time_left_txt"); 
const timeCount = document.querySelector(".timer .timer_sec"); 



start_btn.onclick = () => {
    info_box.classList.add("activeInfo"); 
}


exit_btn.onclick = () => {
    info_box.classList.remove("activeInfo"); 
}


continue_btn.onclick = () => {
    info_box.classList.remove("activeInfo");
    quiz_box.classList.add("activeQuiz"); 
    showQuetions(0); 
    queCounter(1); 
    startTimer(15); 
    startTimerLine(0); 
}



let timeValue = 15; // Valor inicial do tempo para cada questão
let que_count = 0; // Contagem das questões respondidas
let que_numb = 1; // Número da questão atual
let userScore = 0; // Pontuação do usuário
let counter; // Variável para o temporizador
let counterLine; // Variável para a linha de tempo
let widthValue = 0; // Valor inicial da largura da linha de tempo

let idUsuario = 5

function cadastrarPontuacao(){

    console.log("TESTE ETESTE TESTE")
          // Enviando o valor da nova input
          fetch("/pontuacao/cadastrar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                // crie um atributo que recebe o valor recuperado aqui
                // Agora vá para o arquivo routes/usuario.js
                idUsuarioServer: idUsuario,
                userScoreServer: userScore
                // empresaServer: empresaVar
            }),
        })
            .then(function (resposta) {
                console.log("resposta: ", resposta);
    
                if (resposta.ok) {
                    //   cardErro.style.display = "block";
    
                    //   mensagem_erro.innerHTML =
                    //     "Cadastro realizado com sucesso! Redirecionando para tela de Login...";
    
                    console.log(resposta)
    
                    //   limparFormulario();
                    //   finalizarAguardar();
                    // } else {
                    //   throw "Houve um erro ao tentar realizar o cadastro!";
                }
            })
            .catch(function (resposta) {
                console.log(`#ERRO: ${resposta}`);
                // finalizarAguardar();
            });
    
    return false;
    }

const restart_quiz = result_box.querySelector(".buttons .restart"); 
const quit_quiz = result_box.querySelector(".buttons .quit"); 



restart_quiz.onclick = () => {
    quiz_box.classList.add("activeQuiz"); 
    result_box.classList.remove("activeResult"); 
    timeValue = 15;
    que_count = 0; 
    que_numb = 1; 
    userScore = 0; 
    widthValue = 0; 
    showQuetions(que_count); 
    queCounter(que_numb); 
    clearInterval(counter); 
    clearInterval(counterLine); 
    startTimer(timeValue); 
    startTimerLine(widthValue); 
    timeText.textContent = "Time Left"; 
    next_btn.classList.remove("show"); 
}



quit_quiz.onclick = () => {
    window.location.reload(); 
}



const next_btn = document.querySelector("footer .next_btn"); 
const bottom_ques_counter = document.querySelector("footer .total_que"); 



next_btn.onclick = () => {
    if (que_count < questions.length - 1) {
        que_count++; 
        que_numb++; 
        showQuetions(que_count); 
        queCounter(que_numb); 
        clearInterval(counter); 
        clearInterval(counterLine); 
        startTimer(timeValue); 
        startTimerLine(widthValue); 
        timeText.textContent = "Tempo Restante"; 
        next_btn.classList.remove("show"); 
    } else {
        clearInterval(counter); 
        clearInterval(counterLine); 
        showResult(); 
    }
}





function showQuetions(index) {
    const que_text = document.querySelector(".que_text"); 

    
    let que_tag = '<span>' + questions[index].numb + ". " + questions[index].question + '</span>';  
    let option_tag = '<div class="option"><span>' + questions[index].options[0] + '</span></div>' 
        + '<div class="option"><span>' + questions[index].options[1] + '</span></div>'
        + '<div class="option"><span>' + questions[index].options[2] + '</span></div>'
        + '<div class="option"><span>' + questions[index].options[3] + '</span></div>';
    que_text.innerHTML = que_tag; 
    option_list.innerHTML = option_tag; 

    const option = option_list.querySelectorAll(".option"); 

    
    for (i = 0; i < option.length; i++) {
        option[i].setAttribute("onclick", "optionSelected(this)");
    }
}



let tickIconTag = '<div class="icon tick"><i class="fas fa-check"></i></div>'; 
let crossIconTag = '<div class="icon cross"><i class="fas fa-times"></i></div>'; 



function optionSelected(answer) {
    clearInterval(counter); 
    clearInterval(counterLine); 
    let userAns = answer.textContent; 
    let correcAns = questions[que_count].answer; 
    const allOptions = option_list.children.length; 

    if (userAns == correcAns) { 
        userScore += 1; 
        answer.classList.add("correct"); 
        answer.insertAdjacentHTML("beforeend", tickIconTag);
        console.log("Resposta Correta");
        console.log("Suas respostas corretas = " + userScore);
    } else {
        answer.classList.add("incorrect"); 
        answer.insertAdjacentHTML("beforeend", crossIconTag); 
        console.log("Resposta Errada");

        for (i = 0; i < allOptions; i++) {
            if (option_list.children[i].textContent == correcAns) {
                option_list.children[i].setAttribute("class", "option correct"); 
                option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag); 
                console.log("Resposta correta automaticamente selecionada.");
            }
        }
    }
    for (i = 0; i < allOptions; i++) {
        option_list.children[i].classList.add("disabled"); 
    }
    next_btn.classList.add("show"); 
}


function showResult() {
    info_box.classList.remove("activeInfo"); 
    quiz_box.classList.remove("activeQuiz"); 
    result_box.classList.add("activeResult"); 
    const scoreText = result_box.querySelector(".score_text");


    if (userScore > 3) { // Se o usuário pontuou mais que 3
        
        let scoreTag = '<span>e parabéns! , Você acertou <p>' + userScore + '</p> de <p>' + questions.length + '</p></span>';
        scoreText.innerHTML = scoreTag; 
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
        timeCount.textContent = time; 
        time--; 
        if (time < 9) {
            let addZero = timeCount.textContent;
            timeCount.textContent = "0" + addZero; 
        }
        if (time < 0) { 
            clearInterval(counter); 
            timeText.textContent = "Tempo Esgotado"; 
            const allOptions = option_list.children.length; 
            let correcAns = questions[que_count].answer;
            for (i = 0; i < allOptions; i++) {
                if (option_list.children[i].textContent == correcAns) { 
                    option_list.children[i].setAttribute("class", "option correct"); 
                    option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag); 
                    console.log("Tempo Esgotado: Resposta correta automaticamente selecionada.");
                }
            }
            for (i = 0; i < allOptions; i++) {
                option_list.children[i].classList.add("disabled"); 
            }
            next_btn.classList.add("show"); 
        }
    }
}


function startTimerLine(time) {
    counterLine = setInterval(timer, 29);
    function timer() {
        time += 1;
        time_line.style.width = time + "px";
        if (time > 549) { 
            clearInterval(counterLine); 
        }
    }
}


function queCounter(index) {
   
    let totalQueCounTag = '<span><p>' + index + '</p> de <p>' + questions.length + '</p> Questões</span>';
    bottom_ques_counter.innerHTML = totalQueCounTag; 
}




function displayTime() {
   
    let currentTime = new Date();
    
    let hours = currentTime.getHours();
    let minutes = currentTime.getMinutes();
    let seconds = currentTime.getSeconds();
    
 
    if (hours < 10) {
        hours = "0" + hours;
    }
    if (minutes < 10) {
        minutes = "0" + minutes;
    }
    if (seconds < 10) {
        seconds = "0" + seconds;
    }
    

    document.getElementById("waqt").innerHTML = hours + ":" + minutes + ":" + seconds;
}


function displayDate() {
    
    let currentDate = new Date();
  
    let date = currentDate.getDate();
    let month = currentDate.getMonth();
    let year = currentDate.getFullYear();
    
    let monthNames = [
        "Janeiro", "Fevereiro", "Março",
        "Abril", "Maio", "Junho", "Julho",
        "Agosto", "Setembro", "Outubro",
        "Novembro", "Dezembro"
    ];
    
    document.getElementById("din").innerHTML = date + ", " + monthNames[month] + " " + year;
}


setInterval(displayDate, 1000);
