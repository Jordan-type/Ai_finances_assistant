import FundStrategyModel from "../models/fund-strategy"

const saveFundStrategy = async (data: any) => {
  try {
    const saved = await FundStrategyModel.create(data)
    return saved
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error saving FundStrategy: ${error.message}`)
    } else {
      throw new Error("An unknown error occurred while saving the FundStrategy.")
    }
  }
}

const getActiveStrategies = async () => {
  try {
    const strategies = await FundStrategyModel.find({ isActive: true }).sort({ createdAt: -1 })
    return strategies
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error fetching active FundStrategies: ${error.message}`)
    } else {
      throw new Error("An unknown error occurred while fetching the active FundStrategies.")
    }
  }
}

export {
  saveFundStrategy,
  getActiveStrategies,
}
