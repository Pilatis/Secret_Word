
<h1>Explicação</h1>
Esse projeto é um jogo de adivinhação de palavras, onde o usuário tem que adivinhar uma palavra com base em uma categoria fornecida.

<h2>Estrutura do Jogo</h2>

O projeto possui três estágios principais: 'start', 'game' e 'end'.

Esses estágios controlam o fluxo do jogo, mostrando diferentes telas conforme o progresso do usuário.

<h2>App.jsx</h2>

Responsável por gerenciar o estado do jogo e renderizar os diferentes estágios.

Usa o estado (useState) para controlar o estágio atual do jogo (gameStage).

Passa as funções e dados relevantes para os componentes filhos, como StartScreen, Game, e GameOver, dependendo do estágio atual.

<h2>StartScreen Component</h2>

Renderiza a tela inicial do jogo.
Mostra um botão para iniciar o jogo.

<h2>Game Component:</h2>

Lida com a lógica do jogo propriamente dita.

Mostra a palavra a ser adivinhada, a categoria, as letras adivinhadas, as letras erradas, o número de tentativas restantes e a pontuação.

Possui um campo para o usuário tentar adivinhar uma letra e um botão para verificar a letra.

<h2>GameOver Component</h2>

Renderiza a tela de fim de jogo.
Mostra um botão para reiniciar o jogo

  <h2>Lógica do Jogo</h2>

A função pickWordAndCategory seleciona uma categoria aleatória e uma palavra aleatória dessa categoria para o jogo.

A função startGame inicializa o jogo com a palavra escolhida e a categoria correspondente.

A função verifyLetter parece ser chamada quando o usuário tenta adivinhar uma letra.

A função retryGame é chamada quando o jogo precisa ser reiniciado após o término.
  
