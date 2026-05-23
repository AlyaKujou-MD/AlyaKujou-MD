/**
 * Gestor de base de datos simple (usando JSON)
 */

const fs = require('fs');
const path = require('path');

const dbDir = path.join(__dirname, '../database');
const usersFile = path.join(dbDir, 'users.json');
const statsFile = path.join(dbDir, 'stats.json');

// Crear directorio de base de datos si no existe
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

// Inicializar archivos de base de datos
if (!fs.existsSync(usersFile)) {
  fs.writeFileSync(usersFile, JSON.stringify({}, null, 2));
}

if (!fs.existsSync(statsFile)) {
  fs.writeFileSync(statsFile, JSON.stringify({
    totalMensajes: 0,
    totalComandos: 0,
    usuariosActivos: 0,
  }, null, 2));
}

const database = {
  // Usuarios
  getUser: (userId) => {
    const users = JSON.parse(fs.readFileSync(usersFile, 'utf-8'));
    return users[userId] || null;
  },

  saveUser: (userId, userData) => {
    const users = JSON.parse(fs.readFileSync(usersFile, 'utf-8'));
    users[userId] = {
      ...users[userId],
      ...userData,
      lastSeen: new Date().toISOString(),
    };
    fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));
  },

  // Estadísticas
  getStats: () => {
    return JSON.parse(fs.readFileSync(statsFile, 'utf-8'));
  },

  updateStats: (newStats) => {
    fs.writeFileSync(statsFile, JSON.stringify(newStats, null, 2));
  },

  incrementMensajes: () => {
    const stats = database.getStats();
    stats.totalMensajes++;
    database.updateStats(stats);
  },

  incrementComandos: () => {
    const stats = database.getStats();
    stats.totalComandos++;
    database.updateStats(stats);
  },
};

module.exports = database;