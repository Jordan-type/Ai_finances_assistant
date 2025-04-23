import Hackathon from "../models/hackathon";

const createHackathon = async (data: any) => {
  try {
  const hackathon = new Hackathon(data);
  return await hackathon.save();
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error creating hackathon: ${error.message}`);
    } else {
      throw new Error("An unknown error occurred while creating the hackathon.");
    }
  }
};

const getHackathonById = async (id: string) => {
    try {
      const hackathon = await Hackathon.findById(id);
      if (!hackathon) {
        throw new Error("Hackathon not found");
      }
      return hackathon;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error fetching hackathon: ${error.message}`);
      } else {
        throw new Error("An unknown error occurred while fetching the hackathon.");
      }   
    }
};

const getAllHackathons = async () => {
  try {
    const hackathons = await Hackathon.find().sort({ startDate: -1 });
    return hackathons;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error fetching hackathons: ${error.message}`);
    } else {
      throw new Error("An unknown error occurred while fetching the hackathons.");
    }
  }
};

const getLatestHackathon = async () => {
  try{
    const hackathon = await Hackathon.findOne().sort({ startDate: -1 });
    if (!hackathon) {
      throw new Error("No hackathons found");
    }
    return hackathon;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error fetching latest hackathon: ${error.message}`);
    }
    else {
      throw new Error("An unknown error occurred while fetching the latest hackathon.");
    }
  }
};

export {
  createHackathon,
  getHackathonById,
  getAllHackathons,
  getLatestHackathon,
}
