const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('./db');
const { authMiddleware } = require('./auth');

const app = express();
const PORT = process.env.PORT || 4000;
const JWT_SECRET = process.env.JWT_SECRET || 'nemazing-dev-secret-change-me';

app.use(cors());
app.use(express.json());

// ---------- Auth ----------
app.post('/api/register', (req, res) => {
  const { nickname, password } = req.body || {};
  if (!nickname || !password) {
    return res.status(400).json({ error: 'Nickname и пароль обязательны' });
  }
  if (String(nickname).length < 3) {
    return res.status(400).json({ error: 'Никнейм минимум 3 символа' });
  }
  if (db.userByNickname(nickname)) {
    return res.status(409).json({ error: 'Никнейм уже занят' });
  }
  const id = db.createUser(nickname, password);
  const token = jwt.sign({ id, nickname }, JWT_SECRET, { expiresIn: '7d' });
  res.json({ token, user: db.publicUser(id) });
});

app.post('/api/login', (req, res) => {
  const { nickname, password } = req.body || {};
  const user = db.userByNickname(nickname);
  if (!user || !bcrypt.compareSync(String(password || ''), user.passwordHash)) {
    return res.status(401).json({ error: 'Неверный никнейм или пароль' });
  }
  const token = jwt.sign({ id: user.id, nickname: user.nickname }, JWT_SECRET, { expiresIn: '7d' });
  res.json({ token, user: db.publicUser(user.id) });
});

// ---------- Protected ----------
app.get('/api/me', authMiddleware(JWT_SECRET), (req, res) => {
  res.json({ user: db.publicUser(req.user.id) });
});

app.post('/api/balance/add', authMiddleware(JWT_SECRET), (req, res) => {
  const amount = Number(req.body && req.body.amount);
  if (!Number.isFinite(amount) || amount <= 0) {
    return res.status(400).json({ error: 'Некорректная сумма' });
  }
  const balance = db.addBalance(req.user.id, amount);
  res.json({ balance });
});

app.post('/api/balance/subtract', authMiddleware(JWT_SECRET), (req, res) => {
  const amount = Number(req.body && req.body.amount);
  if (!Number.isFinite(amount) || amount <= 0) {
    return res.status(400).json({ error: 'Некорректная сумма' });
  }
  const current = db.userById(req.user.id).balance;
  if (current < amount) {
    return res.status(400).json({ error: 'Недостаточно NMZ' });
  }
  const balance = db.addBalance(req.user.id, -amount);
  res.json({ balance });
});

app.get('/api/inventory', authMiddleware(JWT_SECRET), (req, res) => {
  res.json({ items: db.getInventory(req.user.id) });
});

app.post('/api/inventory/sell', authMiddleware(JWT_SECRET), (req, res) => {
  const itemId = Number(req.body && req.body.itemId);
  const item = db.removeInventoryItem(req.user.id, itemId);
  if (!item) return res.status(404).json({ error: 'Предмет не найден' });
  const balance = db.addBalance(req.user.id, item.price);
  res.json({ balance, sold: item });
});

app.get('/api/complaints', authMiddleware(JWT_SECRET), (req, res) => {
  res.json({ items: db.getComplaints(req.user.id) });
});

app.post('/api/complaints', authMiddleware(JWT_SECRET), (req, res) => {
  const text = String((req.body && req.body.text) || '').trim();
  if (!text) return res.status(400).json({ error: 'Пустая жалоба' });
  const item = db.addComplaint(req.user.id, text);
  res.json({ item });
});

app.get('/api/health', (req, res) => res.json({ ok: true }));

app.listen(PORT, () => console.log(`Nemazing API listening on :${PORT}`));
