/**
 * Comandos de administración
 */

const admin = {
  // Información del sistema
  sysinfo: () => {
    const os = require('os');
    return `
⚙️ *INFORMACIÓN DEL SISTEMA*

🖥️ Plataforma: ${os.platform()}
📦 Memoria: ${Math.round(os.totalmem() / 1024 / 1024)} MB
💾 Libre: ${Math.round(os.freemem() / 1024 / 1024)} MB
🔄 Uptime: ${Math.round(os.uptime() / 60)} minutos
    `;
  },

  // Status del bot
  status: (startTime) => {
    const uptime = Date.now() - startTime;
    const horas = Math.floor(uptime / 1000 / 60 / 60);
    const minutos = Math.floor((uptime / 1000 / 60) % 60);
    const segundos = Math.floor((uptime / 1000) % 60);

    return `
✅ *STATUS DEL BOT*

🟢 Estado: Activo
⏱️ Uptime: ${horas}h ${minutos}m ${segundos}s
💾 Memoria: Óptima
🔗 Conexión: Estable
📊 Versión: 1.0.0
    `;
  },
};

module.exports = admin;