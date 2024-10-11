import { Text, TouchableOpacity, View } from "react-native"
import AntDesign from "@expo/vector-icons/AntDesign"
import { useState } from "react"
import ConfigureGameModal from "../components/ConfigureGameModal"
import { styles } from "../styles/style"
import GameDisplay from "../components/GameDisplay"
import useDarts from "../hooks/useDarts"
import RestartModal from "../components/RestartModal"

export default function Home() {
  const [configModalVisible, setConfigModalVisible] = useState(false)
  const [restartModalVisible, setRestartModalVisible] = useState(false)

  const { players, game, controller } = useDarts()

  const openConfigModal = () => {
    // open new game modal
    setConfigModalVisible(true)
  }

  return (
    <View style={styles.mainContainer}>
      {game.initiated ? (
        <GameDisplay
          players={players}
          game={game}
          controller={controller}
          setRestartModalVisible={setRestartModalVisible}
        />
      ) : (
        <TouchableOpacity style={styles.btn} onPress={() => openConfigModal()}>
          <AntDesign name="plus" size={22} color="#2885d1" style={styles.icn} />
          <Text style={styles.btnText}>Start New Game</Text>
        </TouchableOpacity>
      )}
      <ConfigureGameModal
        modalVisible={configModalVisible}
        setModalVisible={setConfigModalVisible}
        players={players}
        game={game}
        controller={controller}
      />
      <RestartModal
        modalVisible={restartModalVisible}
        setModalVisible={setRestartModalVisible}
        controller={controller}
      />
    </View>
  )
}
