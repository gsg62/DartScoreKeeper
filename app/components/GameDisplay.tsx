import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Pressable,
  Keyboard,
  ScrollView,
} from "react-native"
import { Player } from "../types/player"
import { Game } from "../types/game"
import { Fragment, useLayoutEffect, useState } from "react"
import { styles } from "../styles/style"
import { useNavigation } from "expo-router"

type GameDisplayProps = {
  players: Player[]
  game: Game
  controller: any
  setRestartModalVisible: React.Dispatch<React.SetStateAction<boolean>>
}

export default function GameDisplay({
  players,
  game,
  controller,
  setRestartModalVisible,
}: GameDisplayProps) {
  const navigation = useNavigation()

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Current Game",
    })
  }, [navigation])

  const [currentPlayer, setCurrentPlayer] = useState<Player>(players[0])
  const [currentScore, setCurrentScore] = useState<number | null>()

  const nextPlayer = () => {
    if (currentPlayer.id < players.length) {
      return players[currentPlayer.id]
    } else {
      return players[0]
    }
  }

  const previousPlayer = () => {
    if (players.length === 2) {
      if (currentPlayer.id === 1) {
        return players[1]
      } else {
        return players[0]
      }
    } else if (currentPlayer.id === 1) {
      return players[players.length - 1]
    } else {
      return players[currentPlayer.id - 2]
    }
  }

  const gameHasStarted = () => {
    return (
      currentPlayer.id === 1 &&
      players.every((player) => player.scores.length < 1)
    )
  }

  const endTurn = () => {
    controller.addScore(currentScore, currentPlayer.id)
    setCurrentPlayer(nextPlayer())
    setCurrentScore(0)
  }

  const undoLastTurn = () => {
    if (gameHasStarted()) {
      const prevPlayer = previousPlayer()
      controller.removeLastScore(prevPlayer.id)
      const playerWithRemovedScore = players.find(
        (player) => player.id === prevPlayer.id
      )
      setCurrentPlayer(
        playerWithRemovedScore ? playerWithRemovedScore : prevPlayer
      )
    }
  }

  const restartGame = () => {
    // controller.restartGame()
    setRestartModalVisible(true)
  }

  return (
    <Pressable onPress={Keyboard.dismiss}>
      <ScrollView
        style={styles.scrollViewStyle}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.mainContainer}>
          <Text style={styles.titleText}>Scores:</Text>
          {players.map((player: Player) => (
            <Fragment key={player.id}>
              <PlayerScoreDisplay player={player} game={game} />
            </Fragment>
          ))}
          <View>
            <Text style={styles.currentPlayerText}>
              Current Player: {currentPlayer.name}
            </Text>
            <TextInput
              style={styles.scoreInput}
              onChangeText={(text) => setCurrentScore(Number(text))}
              value={currentScore?.toString() || ""}
              keyboardType="numeric"
              placeholder="Enter Score ..."
              placeholderTextColor="#e0e0e0"
              textAlign="center"
            />
            <TouchableOpacity style={styles.gameControlsBtn} onPress={endTurn}>
              <Text style={styles.btnText}>Next</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.gameControlsBtn}
              onPress={undoLastTurn}
              disabled={gameHasStarted()}
            >
              <Text style={styles.btnText}>Undo Last Turn</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.gameControlsBtn}
              onPress={restartGame}
            >
              <Text style={styles.btnText}>Restart Game</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </Pressable>
  )
}

type ScoreDisplayProps = {
  player: Player
  game: Game
}

function PlayerScoreDisplay({ player, game }: ScoreDisplayProps) {
  const totalScore = (scores: number[]) => {
    if (scores[0]) {
      return (
        game.winningScore -
        scores.reduce((accumulator, currentValue) => {
          return accumulator + currentValue
        }, 0)
      )
    } else return game.winningScore
  }
  return (
    <View style={styles.playerDisplayContainer}>
      <Text style={styles.playerDisplayText}>{player.name}:</Text>
      <Text style={styles.playerDisplayText}>{totalScore(player.scores)}</Text>
    </View>
  )
}
