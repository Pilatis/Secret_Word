import React from 'react'
import './GameOver.css'

const GameOver = ({ retryGame, score }) => {
  return (
    <div className='game_over'>
      <h1>Fim de Jogo</h1>
      <h2>A sua Pontuação foi: {score}</h2>
      <button onClick={retryGame}>Jogar de Novo</button>  
    </div>
  )
}

export default GameOver