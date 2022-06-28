import { Op } from "sequelize";

// Model
import { Timezone, User } from "../models/index.js";

export const index = async (req, res) => {
  const TODAY_START = new Date().setHours(0, 0, 0, 0);

  try {
    const timezonesTotalCount = await Timezone.count(
      req.user.role === 2 ? {} : { where: { userId: req.user.id } }
    );
    const usersTotalCount = await User.count();
    const timezonesTodayCount = await Timezone.count({
      where: {
        ...(req.user.role !== 2 ? { userID: req.user.id } : {}),
        createdAt: {
          [Op.gte]: TODAY_START,
        },
      },
    });
    const usersTodayCount = await User.count({
      where: {
        ...(req.user.role !== 2 ? { id: req.user.id } : {}),
        createdAt: {
          [Op.gte]: TODAY_START,
        },
      },
    });

    const data = [
      ...(req.user.role !== 1
        ? [
            {
              name: "Timezones",
              total: timezonesTotalCount,
              today: timezonesTodayCount,
            },
          ]
        : []),
      ...(req.user.role !== 0
        ? [
            {
              name: "Users",
              total: usersTotalCount,
              today: usersTodayCount,
            },
          ]
        : []),
    ];

    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
