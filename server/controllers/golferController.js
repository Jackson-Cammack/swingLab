import Golfer from "../models/Golfer.js";

export async function getGolfers(req, res, next) {
  try {
    const golfers = await Golfer.find().sort({ createdAt: -1 });
    res.json(golfers);
  } catch (err) {
    next(err);
  }
}

export async function createGolfer(req, res, next) {
  try {
    const { firstName, lastName, email } = req.body;
    const golfer = await Golfer.create({ firstName, lastName, email });
    res.status(201).json(golfer);
  } catch (err) {
    next(err);
  }
}

export async function getGolferById(req, res, next) {
  try {
    const golfer = await Golfer.findById(req.params.id);

    if (!golfer) {
      return res.status(404).json({ message: "Golfer not found" });
    }

    res.json(golfer);
  } catch (err) {
    next(err);
  }
}

export async function updateGolfer(req, res, next) {
  try {
    const { firstName, lastName, email } = req.body;
    const golfer = await Golfer.findByIdAndUpdate(
      req.params.id,
      { firstName, lastName, email },
      { new: true, runValidators: true }
    );

    if (!golfer) {
      return res.status(404).json({ message: "Golfer not found" });
    }

    res.json(golfer);
  } catch (err) {
    next(err);
  }
}

export async function deleteGolfer(req, res, next) {
  try {
    const golfer = await Golfer.findByIdAndDelete(req.params.id);

    if (!golfer) {
      return res.status(404).json({ message: "Golfer not found" });
    }

    res.status(204).end();
  } catch (err) {
    next(err);
  }
}
