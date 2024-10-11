import { Dispatch, Fragment, SetStateAction, useState } from "react"
import {
  Alert,
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native"
import { Player } from "../types/player"
import AntDesign from "@expo/vector-icons/AntDesign"
import { styles } from "../styles/style"
import { Game } from "../types/game"

type modalProps = {
  modalVisible: boolean
  setModalVisible: Dispatch<SetStateAction<boolean>>
  players: Player[]
  game: Game
  controller: any
}

export default function ConfigureGameModal({
  modalVisible,
  setModalVisible,
  players,
  game,
  controller,
}: modalProps) {
  const [playersToSave, setPlayersToSave] = useState<Player[]>(players)

  const addPlayer = () => {
    const newPlayer = {
      id: playersToSave.length + 1,
      name: "",
      scores: [],
    }
    setPlayersToSave([...playersToSave, newPlayer])
  }

  const removePlayer = () => {
    if (playersToSave.length > 1) {
      setPlayersToSave(playersToSave.slice(0, playersToSave.length - 1))
    }
  }

  const startNewGame = () => {
    controller.updatePlayers(playersToSave)
    controller.startGame()
    setModalVisible(false)
  }

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible)
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.titleText}>New Game</Text>

          <Divider />
          <ScrollView>
            <Text style={styles.subTitleText}>Game Settings</Text>
            <View style={styles.gameSettingContainer}>
              <Text style={styles.subSectionText}>Number of legs: </Text>
              <TouchableOpacity
                onPress={controller.decrementLegs}
                style={styles.btn}
              >
                <AntDesign name="minuscircle" size={18} color="#2885d1" />
              </TouchableOpacity>
              <Text style={styles.subSectionText}>{game.legs}</Text>
              <TouchableOpacity
                onPress={controller.incrementLegs}
                style={styles.btn}
              >
                <AntDesign name="pluscircle" size={18} color="#2885d1" />
              </TouchableOpacity>
            </View>
            <View style={styles.gameSettingContainer}>
              <Text style={styles.subSectionText}>Winning score: </Text>
              <TextInput
                style={styles.scoreInput}
                onChangeText={(text) => controller.updateWinningScore(text)}
                value={game.winningScore.toString()}
                keyboardType="numeric"
              />
            </View>

            <Divider />
            <Text style={styles.subTitleText}>Players</Text>
            {playersToSave.map((player: Player) => (
              <Fragment key={player.id}>
                <PlayerInput
                  player={player}
                  playersToSave={playersToSave}
                  setPlayersToSave={setPlayersToSave}
                />
              </Fragment>
            ))}
            <View style={styles.playerControlsContainer}>
              <TouchableOpacity
                onPress={removePlayer}
                style={styles.playerControlsBtn}
              >
                <AntDesign name="minus" size={24} color="#2885d1" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={addPlayer}
                style={styles.playerControlsBtn}
              >
                <AntDesign name="plus" size={24} color="#2885d1" />
              </TouchableOpacity>
            </View>
            <Divider />
            <TouchableOpacity onPress={startNewGame} style={styles.btn}>
              <AntDesign name="play" size={24} color="#2885d1" />
              <Text style={styles.btnText}> Start Game</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </Modal>
  )
}

type PlayerInputProps = {
  player: Player
  playersToSave: Player[]
  setPlayersToSave: Dispatch<SetStateAction<Player[]>>
}

function PlayerInput({
  player,
  playersToSave,
  setPlayersToSave,
}: PlayerInputProps) {
  return (
    <View style={styles.inputView}>
      <TextInput
        style={styles.playerInput}
        onChangeText={(text) => {
          setPlayersToSave(
            playersToSave.map((playerFromSaved: Player) => {
              if (player.id === playerFromSaved.id) {
                playerFromSaved.name = text
              }
              return playerFromSaved
            })
          )
        }}
        placeholder="Enter player name"
        placeholderTextColor="#c5c6c7"
        numberOfLines={1}
        textAlign="left"
        value={player.name}
      />
    </View>
  )
}

function Divider() {
  return (
    <Text style={{ color: "#e0e0e0", marginBottom: 15 }}>
      ____________________________________
    </Text>
  )
}
