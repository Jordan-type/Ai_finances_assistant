import SentimentSignalModel from "../models/sentiment-signal"

const saveSentimentSignal = async (data: any) => {
  try {
    if (!data) {
      throw new Error("No data provided to saveSentimentSignal")
    }
  
  const saved = await SentimentSignalModel.create(data)
  return saved
} catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error saving SentimentSignal: ${error.message}`)
    } else {
      throw new Error("An unknown error occurred while saving the SentimentSignal.")
    }
  }
}

const getLatestSentimentSignals = async (limit = 10) => {
  try {
    if (limit <= 0) {
      throw new Error("Limit must be a positive number")
    }

    const signals = await SentimentSignalModel.find().sort({ createdAt: -1 }).limit(limit)
    return signals
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error fetching latest SentimentSignals: ${error.message}`)
    } else {
      throw new Error("An unknown error occurred while fetching the latest SentimentSignals.")
    }
  }
}

export {
  saveSentimentSignal,
  getLatestSentimentSignals,
}
