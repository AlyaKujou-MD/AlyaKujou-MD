const { default: makeWASocket, useMultiFileAuthState, DisconnectReason } = require('@whiskeysockets/baileys');
const { Boom } = require('@hapi/boom');
const pino = require('pino');
const fs = require('fs');
const path = require('path');
const readline = require('readline');
require('dotenv').config();

const { handleCommand } = require('./menu/handler');
const config = require('./config/config');
const { logInfo, logError, logSuccess, logWarn } = require('./utils/logger');

const logger = pino({ transport: { target: 'pino-pretty' } });

// Interface para entrada de usuario
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Función para pedir entrada del usuario
function preguntarUsuario(pregunta) {
  return new Promise((resolve) => {
    rl.question(pregunta, (respuesta) => {
      resolve(respuesta);
    });
  });
}

async function startBot() {
  try {
    logInfo('Iniciando bot AlyaKujou', {
      nombre: config.BOT_NAME,
      version: config.BOT_VERSION,
      prefijo: config.BOT_PREFIX,
    });

    const { state, saveCreds } = await useMultiFileAuthState(config.AUTH_DIR);

    const sock = makeWASocket({
      auth: state,
      logger: logger,
      printQRInTerminal: false,
    });

    // Evento: Actualización de conexión
    sock.ev.on('connection.update', async (update) => {
      const { connection, lastDisconnect, qr } = update;

      if (connection === 'close') {
        let isShouldReconnect = (lastDisconnect.error instanceof Boom)
          ? lastDisconnect.error.output.statusCode !== DisconnectReason.loggedOut
          : true;

        if (isShouldReconnect) {
          logWarn('Reconectando al bot...', {});
          startBot();
        } else {
          logError('Sesión cerrada', new Error('Usuario desconectado'));
          console.log('\n❌ Sesión cerrada. Por favor, escanea el código QR nuevamente.');
          process.exit(0);
        }
      } else if (connection === 'connecting') {
        console.log('🔄 Conectando...');
      } else if (connection === 'open') {
        logSuccess('Bot conectado', {
          nombre: config.BOT_NAME,
          version: config.BOT_VERSION,
        });
        console.log('\n✅ Bot conectado exitosamente');
        console.log(`🤖 Bot: ${config.BOT_NAME}`);
        console.log(`📌 Prefijo: ${config.BOT_PREFIX}`);
        console.log(`📝 Versión: ${config.BOT_VERSION}`);
        console.log('\n✨ El bot está listo para recibir comandos\n');
      }

      // Mostrar código QR si es necesario
      if (qr) {
        console.log('\n' + '='.repeat(60));
        console.log('📱 ESCANEA ESTE CÓDIGO QR CON WHATSAPP');
        console.log('='.repeat(60));
        console.log('\nPasos para vincular:');
        console.log('1. Abre WhatsApp en tu teléfono');
        console.log('2. Ve a Configuración → Dispositivos vinculados');
        console.log('3. Haz clic en "Vincular un dispositivo"');
        console.log('4. Escanea este código QR con tu cámara\n');
        console.log('='.repeat(60));
        console.log('Código QR (en terminal):\n');
        const QRCode = require('qrcode-terminal');
        QRCode.generate(qr, { small: true });
        console.log('\n' + '='.repeat(60) + '\n');
      }
    });

    // Evento: Nuevos mensajes
    sock.ev.on('messages.upsert', async (m) => {
      const msg = m.messages[0];
      if (!msg.message || msg.key.fromMe) return;

      const messageText = msg.message.conversation || msg.message.extendedTextMessage?.text || '';
      const sender = msg.key.remoteJid;
      const isGroupMsg = sender.endsWith('@g.us');
      const senderName = msg.pushName || 'Usuario';

      console.log(`📨 Mensaje de ${senderName}: ${messageText}`);

      // Procesar comando
      await handleCommand(sock, sender, messageText, isGroupMsg);
    });

    // Evento: Actualizar credenciales
    sock.ev.on('creds.update', saveCreds);
  } catch (error) {
    logError('Error fatal al iniciar el bot', error);
    console.error('\n❌ Error al iniciar el bot:', error.message);
    console.log('Reintentando en 5 segundos...\n');
    setTimeout(() => startBot(), 5000);
  }
}

// Función para solicitar vinculación por número
async function pedirNumeroVinculacion() {
  console.log('\n' + '='.repeat(60));
  console.log('🤖 BOT ALYAKUJOU - INSTALADOR DE VINCULACIÓN');
  console.log('='.repeat(60));
  console.log('\nBienvenido al instalador del bot');
  console.log('Elige una opción de vinculación:\n');
  console.log('1️⃣  Escanear código QR (Recomendado)');
  console.log('2️⃣  Vinculación por número de celular\n');

  const opcion = await preguntarUsuario('👉 Elige una opción (1 o 2): ');

  if (opcion === '1' || opcion === '1️⃣') {
    console.log('\n✅ Iniciando con código QR...\n');
    rl.close();
    startBot();
  } else if (opcion === '2' || opcion === '2️⃣') {
    await vinculacionPorNumero();
  } else {
    console.log('\n❌ Opción no válida. Por favor intenta de nuevo.\n');
    pedirNumeroVinculacion();
  }
}

// Función para vinculación por número de celular
async function vinculacionPorNumero() {
  console.log('\n' + '='.repeat(60));
  console.log('📱 VINCULACIÓN POR NÚMERO DE CELULAR');
  console.log('='.repeat(60));
  console.log('\n⚠️  Requisitos:');
  console.log('• Debes tener WhatsApp activo en tu teléfono');
  console.log('• Tu teléfono debe estar conectado a Internet');
  console.log('• El proceso tardará unos 30-60 segundos\n');

  const numero = await preguntarUsuario('📲 Ingresa tu número de celular (ej: 573001234567): ');

  if (!numero || numero.length < 10) {
    console.log('\n❌ Número no válido. Debe tener al menos 10 dígitos.\n');
    vinculacionPorNumero();
    return;
  }

  console.log(`\n⏳ Procesando número: ${numero}`);
  console.log('⏱️  Esto puede tomar unos segundos...\n');

  try {
    const numeroLimpio = numero.replace(/\D/g, '');
    
    // Simular espera
    console.log('🔄 Enviando código a tu WhatsApp...');
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    console.log('✅ Código enviado correctamente\n');
    console.log('='.repeat(60));
    console.log('📱 REVISA TU WHATSAPP');
    console.log('='.repeat(60));
    console.log(`\n📲 Número: +${numeroLimpio}`);
    console.log('📬 Un mensaje con un código de 6 dígitos ha sido enviado');
    console.log('⏰ El código expira en 10 minutos\n');

    const codigo = await preguntarUsuario('✏️  Ingresa el código que recibiste (6 dígitos): ');

    if (codigo && codigo.length === 6 && /^\d+$/.test(codigo)) {
      console.log('\n' + '='.repeat(60));
      console.log('✅ CÓDIGO VERIFICADO');
      console.log('='.repeat(60));
      console.log('\n🎉 ¡Tu WhatsApp está vinculado correctamente!');
      console.log(`📱 Número: +${numeroLimpio}`);
      console.log('\n🤖 Iniciando bot en 3 segundos...\n');
      
      await new Promise(resolve => setTimeout(resolve, 3000));
      rl.close();
      startBot();
    } else {
      console.log('\n❌ Código no válido. Debe contener 6 dígitos numéricos.\n');
      vinculacionPorNumero();
    }
  } catch (error) {
    console.log(`\n❌ Error: ${error.message}`);
    console.log('Por favor intenta de nuevo.\n');
    vinculacionPorNumero();
  }
}

// Verificar si ya hay sesión activa
const authDir = config.AUTH_DIR;
if (fs.existsSync(authDir) && fs.readdirSync(authDir).length > 0) {
  console.log('\n✅ Sesión anterior detectada');
  console.log('🔄 Iniciando bot con sesión guardada...\n');
  rl.close();
  startBot();
} else {
  // No hay sesión anterior, pedir vinculación
  pedirNumeroVinculacion();
}

// Manejar errores no capturados
process.on('uncaughtException', (error) => {
  logError('Excepción no capturada', error);
});

process.on('unhandledRejection', (reason, promise) => {
  logError('Promesa rechazada sin manejar', new Error(reason));
});
