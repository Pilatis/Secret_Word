//REACT
import { useCallback, useEffect, useState } from 'react'
//Data
import { wordsList } from './data/wordsList'
//COMPONENTS
import StartScreen from './Components/StartScreen/StartScreen'
import Game from './Components/Game/Game'
import GameOver from './Components/GameOver/GameOver'
//CSS
import './App.css'



const stages = [
  { id: 1, name: 'start' },
  { id: 2, name: 'game' },
  { id: 3, name: 'end' },
]

function App() {

  const [gameStage, setGameStage] = useState(stages[0].name)
  const [words] = useState(wordsList);

  const [pickedWord, setPickedWord] = useState('')
  const [pickedCategory, setPickedCategory] = useState('')//Categoria ha ser escolhida
  const [letters, setLetters] = useState([]);

  const [guesseLetters, setGuesseLetters] = useState([]);//letras adivinhadas
  const [wrongLetters, setWrongLetters] = useState([]);//letras erradas
  const [guesses, setGuesses] = useState(3);//tentativas
  const [score, setScore] = useState(0); //Pontuação



  const pickeWordAndCategory = useCallback(() => {
    //pick a random category
    const categories = Object.keys(words);
    const category =
      categories[Math.floor(Math.random() * Object.keys(categories).length)];//Embaralha a categoria

    //console.log(category);
    //pick a random word
    const word = words[category][Math.floor(Math.random() * words[category].length)];//Embaralha o item da categoria
    //console.log(category, word)

    return { word, category }
  }, [words]);


  //start the secret word game
  const startGame = useCallback(() => {
    //clear letters
    clearLettersStates();

    //pick word and pick category
    const { category, word } = pickeWordAndCategory();

    let wordLetters = word.split('');
    wordLetters = wordLetters.map((l) => l.toLowerCase())

    //console.log(word, category)
    //console.log(wordLetters)

    //fill state
    setPickedCategory(category)
    setPickedWord(word)
    setLetters(wordLetters)

    setGameStage(stages[1].name);
  }, [pickeWordAndCategory]);

  const verifyLetter = (letter) => {

    const normalizedLetter = letter.toLowerCase()//padronizar a letra que recebe do usuario

    //checar se a letra ja foi usada // 2 checagens //letras corretas e letras erradas
    if (guesseLetters.includes(normalizedLetter) || (wrongLetters.includes(normalizedLetter))) {
      return
    }

    if (letters.includes(normalizedLetter)) {
      setGuesseLetters((actualGuesseLetters) => [
        ...actualGuesseLetters,
        normalizedLetter
      ])
    } else {
      setWrongLetters((actualWrongLetters) => [
        ...actualWrongLetters,
        normalizedLetter
      ]);

      setGuesses((actualGuesse) => actualGuesse - 1)

    }
  };


  const clearLettersStates = () => {
    setGuesseLetters([]);
    setWrongLetters([])
  }

  useEffect(() => {//monitorar alg dado
    if (guesses <= 0) {
      //reset game
      clearLettersStates()

      setGameStage(stages[2].name)
    }

  }, [guesses])


  useEffect(() => {

    const uniqueLetters = [... new Set(letters)]

    //win condition
    if (guesseLetters.length === uniqueLetters.length && gameStage === stages[1].name) {
      setScore((actualScore) => actualScore += 100)

      //restart game
      startGame();
    }

    /* console.log(uniqueLetters)*/
  }, [guesseLetters, letters, startGame, gameStage])

  const retryGame = () => {
    setScore(0);
    setGuesses(3);

    setGameStage(stages[0].name)
  }



  return (
    <div className='container'>
      <div className="App">

        {gameStage === 'start' && (<StartScreen
          startGame={startGame}
          
        />)}
        {gameStage === 'game' && <Game
          verifyLetter={verifyLetter}
          pickedWord={pickedWord}
          pickedCategory={pickedCategory}
          pickeWordAndCategory={pickeWordAndCategory}
          letters={letters}
          guesseLetters={guesseLetters}
          wrongLetters={wrongLetters}
          guesses={guesses}
          score={score}
        />}
        {gameStage === 'end' && <GameOver retryGame={retryGame} score={score} />}

      </div>
    </div>
  )
}

export default App
