import QuantSignalModel from "../models/quant-signal"

const saveQuantSignal = async (data: any) => {
  try {
    if (!data) {
      throw new Error("No data provided to saveQuantSignal");
    }
    
    const saved = await QuantSignalModel.create(data)
    return saved
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error saving QuantSignal: ${error.message}`);
    } else {
      throw new Error("An unknown error occurred while saving the QuantSignal.");
    }
  }
}

const getLatestQuantSignals = async (limit = 10) => {
  try {
    if (limit <= 0) {
      throw new Error("Limit must be a positive number");
    }

    const signals = await QuantSignalModel.find().sort({ createdAt: -1 }).limit(limit)
    
    return signals
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error fetching latest QuantSignals: ${error.message}`);
    } else {
      throw new Error("An unknown error occurred while fetching the latest QuantSignals.");
    }
  }
}

const getQuantSignalById = async (id: string) => {
  try {
    if (!id) {
      throw new Error("No ID provided to getQuantSignalById");
    }

    const signal = await QuantSignalModel.findById(id)
    
    if (!signal) {
      throw new Error("QuantSignal not found")
    }

    return signal
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error fetching QuantSignal: ${error.message}`);
    } else {
      throw new Error("An unknown error occurred while fetching the QuantSignal.");
    }
  }
}

export {
  saveQuantSignal,
  getLatestQuantSignals,
  getQuantSignalById,
}
