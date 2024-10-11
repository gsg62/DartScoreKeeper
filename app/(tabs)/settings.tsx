import { View, Text, Button } from "react-native"

export default function Settings() {
  const restartGame = () => {
    // restart game
  }
  const addPlayer = () => {
    // restart game
  }
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      {/* <Text>Settings Screen</Text> */}
      <Button title="Restart Game" onPress={() => restartGame()} />
      <Button title="Add Player" onPress={() => addPlayer()} />
    </View>
  )
}
