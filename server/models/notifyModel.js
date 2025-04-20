
class Notification {
  constructor(id, fromUserId, toUserId, message) {
    this.id = id;
    this.fromUserId = fromUserId;
    this.toUserId = toUserId;
    this.message = message;
    this.read = false;
    this.createdAt = new Date().toISOString();
  }
}

module.exports = Notification;
