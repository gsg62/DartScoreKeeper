export type Game = {
  id: number
  legs: number
  winningScore: number
  startDate: Date
  initiated: boolean
}

// default settings
export const newGame: Game = {
  id: 1,
  legs: 1,
  winningScore: 501,
  startDate: new Date(),
  initiated: false,
}


