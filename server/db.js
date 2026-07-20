const path = require('path');
const fs = require('fs');
const bcrypt = require('bcryptjs');

const DB_PATH = process.env.DB_PATH || path.join(__dirname, 'nemazing.json');

try {
  fs.mkdirSync(path.dirname(DB_PATH), { recursive: true });
} catch (e) {
  /* ignore */
}

const DEFAULT_ITEMS = [
  { name: 'Автомобиль: Phoenix', icon: '🚗', price: 150 },
  { name: 'Дом: Вилла у озера', icon: '🏠', price: 400 },
  { name: 'Оружие: Компактный пистолет', icon: '🔫', price: 80 },
  { name: 'Одежда: Чёрная куртка', icon: '🧥', price: 60 },
  { name: 'Питомец: Хаски', icon: '🐺', price: 120 },
];

let data = { users: [], seq: 1 };
if (fs.existsSync(DB_PATH)) {
  try {
    data = JSON.parse(fs.readFileSync(DB_PATH, 'utf8'));
  } catch {
    /* corrupted, start fresh */
  }
}
if (!data.users) data.users = [];
if (!data.seq) data.seq = 1;

function persist() {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
}

function createUser(nickname, password) {
  const hash = bcrypt.hashSync(String(password), 10);
  const id = data.seq++;
  data.users.push({
    id,
    nickname,
    passwordHash: hash,
    balance: 1000,
    inventory: DEFAULT_ITEMS.map((it, i) => ({ id: i + 1, ...it })),
    complaints: [],
  });
  persist();
  return id;
}

function userByNickname(nickname) {
  return data.users.find((u) => u.nickname === nickname) || null;
}
function userById(id) {
  return data.users.find((u) => u.id === id) || null;
}
function publicUser(id) {
  const u = userById(id);
  if (!u) return null;
  return { id: u.id, nickname: u.nickname, balance: u.balance };
}

function addBalance(id, delta) {
  const u = userById(id);
  u.balance = Math.max(0, u.balance + delta);
  persist();
  return u.balance;
}

function getInventory(userId) {
  const u = userById(userId);
  return u ? u.inventory : [];
}

function removeInventoryItem(userId, itemId) {
  const u = userById(userId);
  if (!u) return null;
  const idx = u.inventory.findIndex((i) => i.id === itemId);
  if (idx === -1) return null;
  const [item] = u.inventory.splice(idx, 1);
  persist();
  return item;
}

function getComplaints(userId) {
  const u = userById(userId);
  return u ? u.complaints : [];
}

function addComplaint(userId, text) {
  const u = userById(userId);
  const item = { id: (u.complaints[0]?.id || 0) + 1, text, createdAt: new Date().toISOString() };
  u.complaints.unshift(item);
  persist();
  return item;
}

module.exports = {
  createUser,
  userByNickname,
  userById,
  publicUser,
  addBalance,
  getInventory,
  removeInventoryItem,
  getComplaints,
  addComplaint,
};
