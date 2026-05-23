import { findNotificationsByUser } from "./notifications.model.js";
import { parsePagination, buildPagination } from "../core/pagination.js";

// GET /api/notifications
export const getMyNotifications = async (req, res) => {
  try {
    const { page, limit, offset } = parsePagination(req.query);
    const { rows, total } = await findNotificationsByUser(req.user.id, { limit, offset });

    res.status(200).json({
      message: "Notifications retrieved successfully",
      pagination: buildPagination(total, page, limit),
      notifications: rows,
    });
  } catch (error) {
    console.error("Get notifications error:", error.message);
    res.status(500).json({ message: "Server error getting notifications" });
  }
};
