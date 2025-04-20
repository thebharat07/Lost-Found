const fs = require('fs');
const path = require('path');

const ITEMS_FILE = path.join(__dirname, '../data/items.json');
const NOTIFICATIONS_FILE = path.join(__dirname, '../data/notifications.json');

const readData = (file) => fs.existsSync(file) ? JSON.parse(fs.readFileSync(file)) : [];
const writeData = (file, data) => fs.writeFileSync(file, JSON.stringify(data, null, 2));

exports.postItem = (req, res) => {
  const { title, description, category, location, imageUrl, type } = req.body;

  const items = readData(ITEMS_FILE);
  const newItem = {
    id: Date.now(),
    userId: req.user.id,
    title,
    description,
    category,
    location,
    imageUrl,
    type,
    date: new Date().toISOString()
  };

  items.push(newItem);
  writeData(ITEMS_FILE, items);

  res.status(201).json({ message: 'Item posted successfully', item: newItem });
};

exports.postFoundItem = (req, res) => {
  const { title, category, location } = req.body;

  const items = readData(ITEMS_FILE);
  const lostItems = items.filter(item => item.type === 'lost');

  const matchedItems = lostItems.filter(item =>
    item.category.toLowerCase() === category.toLowerCase() &&
    item.location.toLowerCase() === location.toLowerCase()
  );

  if (matchedItems.length > 0) {
    return res.status(200).json({ matched: true, items: matchedItems });
  } else {
    return res.status(200).json({ matched: false, message: 'No matching lost items found.' });
  }
};


exports.getAllItems = (req, res) => {
  const items = readData(ITEMS_FILE);
  res.json(items);
};

exports.getUserItems = (req, res) => {
  const items = readData(ITEMS_FILE);
  const userItems = items.filter(item => item.userId === req.user.id);
  res.json(userItems);
};

exports.notifyUser = (req, res) => {
  const { itemId } = req.params;
  const items = readData(ITEMS_FILE);
  const item = items.find(i => i.id == itemId);

  if (!item) return res.status(404).json({ message: 'Item not found' });

  const notifications = readData(NOTIFICATIONS_FILE);
  const newNotification = {
    id: Date.now(),
    fromUserId: req.user.id,
    toUserId: item.userId,
    itemId: item.id,
    message: `Your item "${item.title}" may have been found.`,
    date: new Date().toISOString(),
    read: false
  };

  notifications.push(newNotification);
  writeData(NOTIFICATIONS_FILE, notifications);

  res.status(200).json({ message: 'User notified successfully' });
};
