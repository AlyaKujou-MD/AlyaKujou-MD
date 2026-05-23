/**
 * Manejador de errores y logs
 */

const fs = require('fs');
const path = require('path');

const logsDir = path.join(__dirname, '../logs');

// Crear directorio de logs si no existe
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

function log(tipo, mensaje, datos = {}) {
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] [${tipo}] ${mensaje}`;

  console.log(logMessage, datos);

  // Guardar en archivo
  const logFile = path.join(logsDir, `${tipo}-${new Date().toISOString().split('T')[0]}.log`);
  fs.appendFileSync(logFile, logMessage + JSON.stringify(datos) + '\n');
}

function logError(mensaje, error) {
  log('ERROR', mensaje, { error: error.message, stack: error.stack });
}

function logInfo(mensaje, datos) {
  log('INFO', mensaje, datos);
}

function logWarn(mensaje, datos) {
  log('WARN', mensaje, datos);
}

function logSuccess(mensaje, datos) {
  log('SUCCESS', mensaje, datos);
}

module.exports = {
  logError,
  logInfo,
  logWarn,
  logSuccess,
};