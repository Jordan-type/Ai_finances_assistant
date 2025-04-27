import FundamentalSignalModel from "../models/fundamental-signal"

const saveFundamentalSignal = async (data: any) => {
  try {
    if (!data) {
      throw new Error("No data provided to saveFundamentalSignal")
    }

    const saved = await FundamentalSignalModel.create(data)
    return saved
  }
  catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error saving FundamentalSignal: ${error.message}`)
    } else {
      throw new Error("An unknown error occurred while saving the FundamentalSignal.")
    }
  }
}

const getLatestFundamentals = async (limit = 10) => {
  try {
    if (limit <= 0) {
      throw new Error("Limit must be a positive number")
    }

    const signals = await FundamentalSignalModel.find().sort({ createdAt: -1 }).limit(limit)

    return signals
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error fetching latest Fundamentals: ${error.message}`)
    } else {
      throw new Error("An unknown error occurred while fetching the latest Fundamentals.")
    }
  }
}

export {
  saveFundamentalSignal,
  getLatestFundamentals,
}
