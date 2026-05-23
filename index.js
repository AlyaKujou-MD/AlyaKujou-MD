const { default: makeWASocket, useMultiFileAuthState, DisconnectReason } = require('@whiskeysockets/baileys');
const { Boom } = require('@hapi/boom');
const pino = require('pino');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const logger = pino({ transport: { target: 'pino-pretty' } });

async function startBot() {
  const { state, saveCreds } = await useMultiFileAuthState('auth_info_baileys');

  const sock = makeWASocket({
    auth: state,
    logger: logger,
    printQRInTerminal: true,
  });

  sock.ev.on('connection.update', async (update) => {
    const { connection, lastDisconnect, qr } = update;

    if (connection === 'close') {
      let isShouldReconnect = (lastDisconnect.error instanceof Boom)
        ? lastDisconnect.error.output.statusCode !== DisconnectReason.loggedOut
        : true;

      if (isShouldReconnect) {
        startBot();
      } else {
        console.log('Conexión cerrada. Por favor, escanea el código QR nuevamente.');
      }
    } else if (connection === 'connecting') {
      console.log('Conectando...');
    } else if (connection === 'open') {
      console.log('✅ Bot conectado exitosamente');
    }
  });

  sock.ev.on('messages.upsert', async (m) => {
    const msg = m.messages[0];
    if (!msg.message) return;

    const messageText = msg.message.conversation || msg.message.extendedTextMessage?.text || '';
    const sender = msg.key.remoteJid;
    const isGroupMsg = sender.endsWith('@g.us');

    console.log(`📨 Mensaje de ${sender}: ${messageText}`);

    // Importar el menú
    const { handleCommand } = require('./menu/menu');
    await handleCommand(sock, sender, messageText, isGroupMsg);
  });

  sock.ev.on('creds.update', saveCreds);
}

startBot().catch((err) => {
  console.error('Error al iniciar el bot:', err);
  process.exit(1);
});