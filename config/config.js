/**
 * Configuración del bot
 */

require('dotenv').config();

const config = {
  // Información del bot
  BOT_NAME: process.env.BOT_NAME || 'AlyaKujou Bot',
  BOT_PREFIX: process.env.BOT_PREFIX || '!',
  BOT_VERSION: '1.0.0',

  // Configuración
  DEBUG: process.env.DEBUG === 'true' || false,
  AUTO_RESPONSE: process.env.AUTO_RESPONSE === 'true' || true,
  AUTO_RESPONSE_DELAY: 500, // ms

  // Rutas
  AUTH_DIR: './auth_info_baileys',
  LOG_DIR: './logs',

  // Mensajes predeterminados
  MESSAGES: {
    WELCOME: '¡Hola! 👋 Bienvenido al bot AlyaKujou',
    ERROR: '❌ Ocurrió un error procesando tu comando',
    UNKNOWN_COMMAND: '❓ Comando no reconocido. Escribe !menu para ver opciones',
    NOT_AUTHORIZED: '🔒 No tienes permisos para este comando',
  },
};

module.exports = config;