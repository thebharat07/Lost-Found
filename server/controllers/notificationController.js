const fs = require('fs');
const path = require('path');

const NOTIFICATIONS_FILE = path.join(__dirname, '../data/notifications.json');

// Helpers
const readData = () =>
  fs.existsSync(NOTIFICATIONS_FILE)
    ? JSON.parse(fs.readFileSync(NOTIFICATIONS_FILE))
    : [];

const writeData = (data) =>
  fs.writeFileSync(NOTIFICATIONS_FILE, JSON.stringify(data, null, 2));

// Get notifications for the logged-in user
exports.getNotifications = (req, res) => {
  const allNotifications = readData();
  const userNotifications = allNotifications.filter(n => n.toUserId === req.user.id);
  res.json(userNotifications);
};

// Mark a notification as read
exports.markAsRead = (req, res) => {
  const { notificationId } = req.params;
  const notifications = readData();

  const notification = notifications.find(n => n.id == notificationId && n.toUserId === req.user.id);
  if (!notification) {
    return res.status(404).json({ message: 'Notification not found' });
  }

  notification.read = true;
  writeData(notifications);
  res.json({ message: 'Marked as read' });
};
