const rakingList = document.querySelector("#rankingList");
const NomeUsuarios = document.querySelector("#NomeUsuario");
const Acertos = document.querySelector("#Acertos");
const ScoreUsuario = document.querySelector("#ScoreUsuario");



fetch("/pontuacao/RankPontuacao").then((response) => {
response.json().then((res) => {
   
    for(posicao = 0; posicao < res.length; posicao ++){
        rakingList.innerHTML += `
<p>
                    <span id="NomeUsuario">${res[0].nome}</span>
                    <span id="ScoreUsuario">${res[0].pontos * 1000}</span>
                    <span id="Acertos">${res[0].acertos}</span>
</p>
`
    }
    
});
});
