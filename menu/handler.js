/**
 * Sistema mejorado de menú
 * Integrado con el nuevo gestor de comandos
 */

const commands = require('./commands');
const config = require('../config/config');
const db = require('../database/db');
const { logInfo, logError } = require('../utils/logger');

async function handleCommand(sock, sender, messageText, isGroupMsg) {
  try {
    // Incrementar contador de mensajes
    db.incrementMensajes();

    // Extraer comando y argumentos
    const args = messageText.trim().split(/\s+/);
    const commandName = args[0].toLowerCase().replace(config.BOT_PREFIX, '');
    const commandArgs = args.slice(1);

    // Si no comienza con el prefijo, ignorar
    if (!messageText.startsWith(config.BOT_PREFIX)) {
      return;
    }

    // Verificar si el comando existe
    if (!commands[commandName]) {
      await sock.sendMessage(sender, {
        text: `${config.MESSAGES.UNKNOWN_COMMAND}\n\nEscribe !menu para ver los comandos disponibles.`,
      });
      return;
    }

    // Ejecutar comando
    logInfo('Comando ejecutado', {
      usuario: sender,
      comando: commandName,
      argumentos: commandArgs,
    });

    db.incrementComandos();

    const response = await commands[commandName].execute(
      sock,
      sender,
      commandArgs
    );

    // Enviar respuesta
    if (response) {
      await sock.sendMessage(sender, { text: response });
    }
  } catch (error) {
    logError('Error al procesar comando', error);
    await sock.sendMessage(sender, {
      text: `${config.MESSAGES.ERROR}\n\nPor favor, intenta de nuevo.`,
    });
  }
}

module.exports = { handleCommand };