import { Dispatch, SetStateAction } from "react"
import { Button, Modal, Text, TouchableOpacity, View } from "react-native"
import { styles } from "../styles/style"

type modalProps = {
  modalVisible: boolean
  setModalVisible: Dispatch<SetStateAction<boolean>>
  controller: any
}

export default function restartModalVisible({
  modalVisible,
  setModalVisible,
  controller,
}: modalProps) {
  const restartGame = () => {
    controller.restartGame()
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
          <Text style={styles.subTitleText}>
            Are you sure you want to restart?
          </Text>
          <View style={styles.btnContainer}>
            <TouchableOpacity
              style={styles.restartBtn}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.restartBtnText}>No</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.restartBtn} onPress={restartGame}>
              <Text style={styles.restartBtnText}>Yes</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  )
}
