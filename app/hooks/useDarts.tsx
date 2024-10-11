import { useState } from "react"
import { Player, newPlayer } from "../types/player"
import { Game, newGame } from "../types/game"

const useDarts = () => {
  // used for testing:
  const testGame: Game = {
    id: 1,
    legs: 1,
    winningScore: 501,
    startDate: new Date(),
    initiated: true,
  }
  const testPlayers = [
    {
      id: 1,
      name: "greg",
      scores: [],
    },
    {
      id: 2,
      name: "liam",
      scores: [],
    },
    {
      id: 3,
      name: "miles",
      scores: [],
    },
  ]

  // const [players, setPlayers] = useState<Player[]>(testPlayers)
  // const [game, setGame] = useState<Game>(testGame)

  const [players, setPlayers] = useState<Player[]>([newPlayer])
  const [game, setGame] = useState<Game>(newGame)

  const controller = {
    updatePlayers: (playersToSave: Player[]) => {
      setPlayers(playersToSave)
    },
    addScore: async (newScore: number, playerID: number) => {
      // players.find((player: Player) => player.id === playerID).score
      setPlayers((prevPlayers: Player[]) => {
        return prevPlayers.map((player: Player) => {
          if (player.id === playerID) {
            return { ...player, scores: [...player.scores, newScore] }
          } else {
            return player
          }
        })
      })
    },
    incrementLegs: () => {
      setGame({ ...game, legs: (game.legs += 1) })
    },
    decrementLegs: () => {
      setGame({ ...game, legs: (game.legs -= 1) })
    },
    updateWinningScore: (newScore: string) => {
      setGame({ ...game, winningScore: Number(newScore) })
    },
    startGame: () => {
      setGame({ ...game, initiated: true })
    },
    restartGame: () => {
      setPlayers(
        players.map((player: Player) => {
          return { ...player, scores: [] }
        })
      )
    },
    removeLastScore: (playerID: number) => {
      console.log("playerID:", playerID)
      setPlayers(
        players.map((player: Player) => {
          if (player.id === playerID) {
            return { ...player, scores: player.scores.slice(0, -1) }
          } else {
            return player
          }
        })
      )
    },
  }

  return {
    players,
    game,
    controller,
  }
}

export default useDarts
