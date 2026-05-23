const { default: makeWASocket, useMultiFileAuthState, DisconnectReason } = require('@whiskeysockets/baileys');
const { Boom } = require('@hapi/boom');
const pino = require('pino');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const logger = pino({ transport: { target: 'pino-pretty' } });

async function startBot() {
  try {
    const { state, saveCreds } = await useMultiFileAuthState('auth_info_baileys');

    const sock = makeWASocket({
      auth: state,
      logger: logger,
      printQRInTerminal: true,
    });

    sock.ev.on('connection.update', async (update) => {
      const { connection, lastDisconnect } = update;

      if (connection === 'close') {
        let isShouldReconnect = (lastDisconnect.error instanceof Boom)
          ? lastDisconnect.error.output.statusCode !== DisconnectReason.loggedOut
          : true;

        if (isShouldReconnect) {
          startBot();
        } else {
          console.log('Conexión cerrada. Por favor, escanea el código QR nuevamente.');
          process.exit(0);
        }
      } else if (connection === 'connecting') {
        console.log('🔄 Conectando...');
      } else if (connection === 'open') {
        console.log('\n✅ Bot conectado exitosamente');
        console.log('🤖 Bot: AlyaKujou');
        console.log('📌 Prefijo: !');
        console.log('\n✨ El bot está listo para recibir comandos\n');
      }
    });

    sock.ev.on('messages.upsert', async (m) => {
      const msg = m.messages[0];
      if (!msg.message || msg.key.fromMe) return;

      const messageText = msg.message.conversation || msg.message.extendedTextMessage?.text || '';
      const sender = msg.key.remoteJid;
      const senderName = msg.pushName || 'Usuario';

      console.log(`📨 Mensaje de ${senderName}: ${messageText}`);

      // Procesar comandos simples
      if (messageText === '!hola') {
        await sock.sendMessage(sender, { text: '¡Hola! 👋 Bienvenido al bot AlyaKujou' });
      } else if (messageText === '!menu') {
        await sock.sendMessage(sender, { text: '📱 Menú\n\n!hola - Saludo\n!info - Información\n!ayuda - Ayuda' });
      } else if (messageText === '!info') {
        await sock.sendMessage(sender, { text: '🤖 Bot AlyaKujou v1.0.0\n✅ Estado: Activo' });
      } else if (messageText === '!ayuda') {
        await sock.sendMessage(sender, { text: 'Escribe !menu para ver todos los comandos' });
      }
    });

    sock.ev.on('creds.update', saveCreds);
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.log('Reintentando en 5 segundos...');
    setTimeout(() => startBot(), 5000);
  }
}

console.log('\n🤖 Iniciando Bot AlyaKujou...\n');
startBot().catch((err) => {
  console.error('Error fatal:', err);
  process.exit(1);
});
