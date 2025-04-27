import TraderBehaviorSignalModel from "../models/trader-behavior-signal"

const saveTraderBehaviorSignal = async (data: any) => {
  try {
  if (!data) {
    throw new Error("No data provided to saveTraderBehaviorSignal")
  }
  const saved = await TraderBehaviorSignalModel.create(data)
  return saved

} catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error saving TraderBehaviorSignal: ${error.message}`)
    } else {
      throw new Error("An unknown error occurred while saving the TraderBehaviorSignal.")
    }
  }

}

const getRecentTraderSignals = async (limit = 10) => {
  try {
    if (limit <= 0) { 
      throw new Error("Limit must be a positive number")
    }
    const signals = await TraderBehaviorSignalModel.find().sort({ createdAt: -1 }).limit(limit)
    
    return signals
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error fetching recent TraderBehaviorSignals: ${error.message}`)
    } else {
      throw new Error("An unknown error occurred while fetching the recent TraderBehaviorSignals.")
    }
  }
}

export {
  saveTraderBehaviorSignal,
  getRecentTraderSignals,
}

