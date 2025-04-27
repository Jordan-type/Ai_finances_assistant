import RiskReportModel from "../models/risk-report"

const saveRiskReport = async (data: any) => {
  try {
    if (!data) {
      throw new Error("No data provided to saveRiskReport")
    }

    const saved = await RiskReportModel.create(data)
    return saved
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error saving RiskReport: ${error.message}`)
    } else {
      throw new Error("An unknown error occurred while saving the RiskReport.")
    }
  }
}

const getLatestRiskReports = async (limit = 10) => {
  try {
    if (limit <= 0) {
      throw new Error("Limit must be a positive number")
    }

    const reports = await RiskReportModel.find().sort({ createdAt: -1 }).limit(limit)
    return reports
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error fetching latest RiskReports: ${error.message}`)
    } else {
      throw new Error("An unknown error occurred while fetching the latest RiskReports.")
    }
  }
}

export {
  saveRiskReport,
  getLatestRiskReports,
}
