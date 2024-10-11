import { StyleSheet } from "react-native"

export const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  btn: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
  },
  gameControlsBtn: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    margin: 20
  },
  btnText: {
    fontSize: 20,
    color: "#2885d1",
  },
  icn: {
    marginRight: 5,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    margin: 10,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: "80%",
  },
  titleText: {
    fontSize: 24,
  },
  subTitleText: {
    fontSize: 18,
    margin: 10,
  },
  subSectionText: {
    fontSize: 18,
    margin: 10,
    fontWeight: "200",
  },
  playerInput: {
    fontSize: 18,
    width: "70%",
    fontWeight: "200",
  },
  scoreInput: {
    fontSize: 18,
  },
  inputView: {
    flexDirection: "row",
    justifyContent: "flex-start",
    margin: 10,
  },
  inputBtnText: {
    fontSize: 16,
    color: "#2885d1",
  },
  gameSettingContainer: {
    flexDirection: "row",
  },
  playerDisplayText: {
    fontSize: 18,
  },
  playerDisplayContainer: {
    margin: 10,
  },
  playerControlsContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  playerControlsBtn: {
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
    width: "auto",
  },
  currentPlayerText: {
    fontSize: 24,
    margin: 20,
  },
  scrollViewStyle: {
    margin: 10,
  },
  btnContainer: {
    flexDirection: "row",
  },
  restartBtn: {
    alignItems: "center",
    margin: 10,
    width: "50%",
  },
  restartBtnText: {
    fontSize: 18,
    margin: 10,
    color: "#2885d1",
  },
})
