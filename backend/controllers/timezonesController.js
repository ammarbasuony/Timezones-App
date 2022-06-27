// Model
import { Timezone, User } from "../models/index.js";

// Function
import { isEmpty, isRecordExists } from "../helpers/functions.js";

export const index = async (req, res) => {
  try {
    const timezones = await Timezone.findAll();

    res.json({ success: true, data: timezones });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const getByUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const timezones = await Timezone.findAll({
      where: { userId },
    });

    res.json({ success: true, data: timezones });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const getById = async (req, res) => {
  const { id } = req.params;

  try {
    const timezone = await Timezone.findOne({
      where: {
        id,
      },
    });

    if (!timezone)
      return res
        .status(404)
        .json({ success: false, message: "Timezone not exists" });

    res.json({ success: true, data: timezone });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const createTimezone = async (req, res) => {
  const data = req.body;

  try {
    if (isEmpty(Timezone.rawAttributes, data))
      return res
        .status(400)
        .json({ success: false, message: "All attributes are required" });

    if (!(await isRecordExists(User, { id: data.userId })))
      return res
        .status(400)
        .json({ success: false, message: "User not exists" });

    const timezone = await Timezone.create(data);

    res.json({ success: true, data: timezone });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const updateTimezone = async (req, res) => {
  const { id } = req.params;
  const data = req.body;

  try {
    const timezone = await Timezone.findOne({
      where: {
        id,
      },
    });

    if (!timezone)
      return res
        .status(404)
        .json({ success: false, message: "Timezone not exists" });

    const updatedTimezone = await timezone.update(data);

    res.json({ success: true, data: updatedTimezone });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const deleteTimezone = async (req, res) => {
  const { id } = req.params;

  try {
    const timezone = await Timezone.destroy({
      where: {
        id,
      },
    });

    if (!timezone) {
      res.status(404).json({ success: false, message: "Timzone not exists" });
      return;
    }

    res.json({ success: true, message: "Timzone deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
