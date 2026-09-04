import Golfer from "../models/Golfer.js";

export const getGolfers = async (req, res) => {
  try {
    const golfers = await Golfer.find().sort({
      createdAt: -1,
    });

    res.status(200).json(golfers);
  } catch (error) {
    res.status(500).json({
      message: "Failed to retrieve golfers",
      error: error.message,
    });
  }
};

export const createGolfer = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      handicap,
      dominantHand,
      goals,
    } = req.body;

    const golfer = await Golfer.create({
      firstName,
      lastName,
      email,
      handicap:
        handicap === "" || handicap === undefined
          ? null
          : handicap,
      dominantHand,
      goals,
    });

    res.status(201).json(golfer);
  } catch (error) {
    res.status(400).json({
      message: "Failed to create golfer",
      error: error.message,
    });
  }
};

export const getGolferById = async (req, res) => {
  try {
    const golfer = await Golfer.findById(req.params.id);

    if (!golfer) {
      return res.status(404).json({
        message: "Golfer not found",
      });
    }

    res.status(200).json(golfer);
  } catch (error) {
    res.status(400).json({
      message: "Invalid golfer ID",
      error: error.message,
    });
  }
};

export const updateGolfer = async (req, res) => {
  try {
    const golfer = await Golfer.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!golfer) {
      return res.status(404).json({
        message: "Golfer not found",
      });
    }

    res.status(200).json(golfer);
  } catch (error) {
    res.status(400).json({
      message: "Failed to update golfer",
      error: error.message,
    });
  }
};

export const deleteGolfer = async (req, res) => {
  try {
    const golfer = await Golfer.findByIdAndDelete(req.params.id);

    if (!golfer) {
      return res.status(404).json({
        message: "Golfer not found",
      });
    }

    res.status(200).json({
      message: "Golfer deleted successfully",
    });
  } catch (error) {
    res.status(400).json({
      message: "Failed to delete golfer",
      error: error.message,
    });
  }
};