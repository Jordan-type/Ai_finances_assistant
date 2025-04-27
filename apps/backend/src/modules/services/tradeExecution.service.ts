import TradeExecutionModel from "../models/trade-execution"

const saveTradeExecution = async (data: any) => {
  try {
    if (!data) {
      throw new Error("No data provided to saveTradeExecution")
    }

    const saved = await TradeExecutionModel.create(data)
    return saved
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error saving TradeExecution: ${error.message}`)
    } else {
      throw new Error("An unknown error occurred while saving the TradeExecution.")
    }
  }
}

const getTradeHistory = async (walletAddress: string) => {
  try {
    if (!walletAddress) {
      throw new Error("No wallet address provided to getTradeHistory")
    }

    const history = await TradeExecutionModel.find({ walletAddress }).sort({ executedAt: -1 })
    return history
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error fetching trade history: ${error.message}`)
    } else {
      throw new Error("An unknown error occurred while fetching the trade history.")
    }
  }
}

export { 
  saveTradeExecution, 
  getTradeHistory
} 
