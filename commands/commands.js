/**
 * Sistema de comandos centralizado
 * Todos los comandos en un solo lugar
 */

const utilities = require('../utils/utilities');
const admin = require('./admin');
const entertainment = require('./entertainment');
const config = require('../config/config');
const db = require('../database/db');

const commands = {
  // Información
  hola: {
    description: 'Saludo del bot',
    execute: async (sock, sender, args) => {
      return '¡Hola! 👋 Bienvenido al bot AlyaKujou. Escribe !menu para ver los comandos.';
    },
  },

  menu: {
    description: 'Menú principal',
    execute: async (sock, sender, args) => {
      return `
╔════════════════════════════════════════╗
║   🤖 BOT ALYAKUJOU - MENÚ 🤖   ║
╚════════════════════════════════════════╝

📌 *CATEGORÍAS:*

1️⃣  !info - Información del bot
2️⃣  !utiles - Comandos útiles
3️⃣  !juegos - Juegos y entretenimiento
4️⃣  !admin - Comandos de administración
5️⃣  !contacto - Información de contacto

─────────────────────────────────────────

💡 *COMANDOS RÁPIDOS:*

⚡ !hora - Hora y fecha actual
🎲 !dado - Lanzar dado
🪙 !moneda - Lanzar moneda
😂 !chiste - Chiste aleatorio
🎯 !aleatorio [min] [max] - Número aleatorio

─────────────────────────────────────────

> Escribe !comandos para ver lista completa
      `;
    },
  },

  info: {
    description: 'Información del bot',
    execute: async (sock, sender, args) => {
      return `
╔════════════════════════════════════════╗
║      ℹ️ INFORMACIÓN DEL BOT ℹ️      ║
╚════════════════════════════════════════╝

🤖 *NOMBRE:* ${config.BOT_NAME}
📦 *VERSIÓN:* ${config.BOT_VERSION}
✅ *ESTADO:* Activo
🌐 *PLATAFORMA:* WhatsApp
💻 *LENGUAJE:* Node.js
📚 *LIBRERÍA:* Baileys

─────────────────────────────────────────

✨ *CARACTERÍSTICAS:*

✓ Sistema de comandos
✓ Menú interactivo
✓ Respuestas automáticas
✓ Juegos y entretenimiento
✓ Herramientas útiles
✓ Sistema de base de datos

─────────────────────────────────────────

👨‍💻 *CREADOR:* AlyaKujou-MD
🔗 *GITHUB:* github.com/AlyaKujou-MD

> Escribe !menu para volver
      `;
    },
  },

  utiles: {
    description: 'Menú de comandos útiles',
    execute: async (sock, sender, args) => {
      return `
╔════════════════════════════════════════╗
║     🔧 COMANDOS ÚTILES 🔧     ║
╚════════════════════════════════════════╝

⏰ !hora - Hora y fecha
🧮 !calcular [operación] - Calculadora
🎲 !dado - Lanzar dado
🪙 !moneda - Lanzar moneda
🎯 !aleatorio [min] [max] - Número aleatorio
🌤️  !clima - Clima simulado
😂 !chiste - Chiste del día
🎱 !pregunta - Bola mágica
🔄 !invertir [texto] - Invertir texto
📢 !mayuscula [texto] - Convertir a mayúsculas
📝 !minuscula [texto] - Convertir a minúsculas

─────────────────────────────────────────

📝 *EJEMPLOS:*

!calcular 5+5
!aleatorio 1 100
!invertir hola mundo
!mayuscula bienvenido

> Escribe !menu para volver
      `;
    },
  },

  juegos: {
    description: 'Menú de juegos',
    execute: async (sock, sender, args) => {
      return `
╔════════════════════════════════════════╗
║    🎮 JUEGOS Y ENTRETENIMIENTO 🎮    ║
╚════════════════════════════════════════╝

🎮 !rpg - Aventura RPG
🧠 !trivia - Trivia
🧩 !adivinanza - Adivinanza
😂 !chiste - Chiste
🎱 !pregunta - Bola mágica

─────────────────────────────────────────

🎯 *PRÓXIMAS ACTUALIZACIONES:*

🃏 Póker
🎯 Piedra, papel, tijera
🎲 Ruleta rusa
📊 Carreras de caballos

> Escribe !menu para volver
      `;
    },
  },

  admin: {
    description: 'Menú administrativo',
    execute: async (sock, sender, args) => {
      return admin.status(Date.now());
    },
  },

  ayuda: {
    description: 'Obtener ayuda',
    execute: async (sock, sender, args) => {
      return `
╔════════════════════════════════════════╗
║        📖 AYUDA Y SOPORTE 📖        ║
╚════════════════════════════════════════╝

❓ *¿CÓMO USAR EL BOT?*

1. Los comandos comienzan con *${config.BOT_PREFIX}*
2. Escribe el comando sin paréntesis
3. El bot responderá automáticamente

📝 *EJEMPLOS:*

• !hola → El bot te saluda
• !info → Información
• !menu → Menú principal
• !ayuda → Esta ayuda

⚠️  *IMPORTANTE:*

✓ Los comandos son sensibles a mayúsculas
✓ Usa ${config.BOT_PREFIX} para activar comandos
✓ Espera la respuesta del bot

🔧 *PROBLEMAS:*

Si tienes problemas:
1. Verifica la sintaxis del comando
2. Intenta !menu para ver opciones
3. Contacta con soporte: !soporte

> Escribe !menu para volver
      `;
    },
  },

  creador: {
    description: 'Información del creador',
    execute: async (sock, sender, args) => {
      return `
╔════════════════════════════════════════╗
║     👨‍💻 CREADOR - INFO 👨‍💻     ║
╚════════════════════════════════════════╝

👤 *NOMBRE:* AlyaKujou-MD
🌐 *GITHUB:* github.com/AlyaKujou-MD
📱 *PLATAFORMA:* GitHub

─────────────────────────────────────────

💪 *PROYECTOS:*

🤖 Bot WhatsApp AlyaKujou
📦 Más proyectos en desarrollo

─────────────────────────────────────────

🙏 *AGRADECIMIENTOS:*

✓ Gracias por usar nuestro bot
✓ Sígueme en GitHub
✓ Contribuye al proyecto

> Escribe !menu para volver
      `;
    },
  },

  comandos: {
    description: 'Lista completa de comandos',
    execute: async (sock, sender, args) => {
      return `
╔════════════════════════════════════════╗
║     📋 LISTA COMPLETA 📋     ║
╚════════════════════════════════════════╝

🔤 INFORMACIÓN:
!menu, !info, !ayuda, !hola, !creador

🔧 ÚTILES:
!hora, !calcular, !dado, !moneda, !aleatorio
!clima, !chiste, !pregunta, !invertir
!mayuscula, !minuscula

🎮 JUEGOS:
!rpg, !trivia, !adivinanza, !pregunta

⚙️ ADMIN:
!status, !sysinfo, !ping, !estado, !link
!contacto, !soporte

─────────────────────────────────────────

💡 *PRÓXIMAS ACTUALIZACIONES:*

🔄 Más comandos
🎮 Más juegos
📊 Estadísticas
🔐 Sistema de permisos

> Escribe !menu para volver
      `;
    },
  },

  // Comandos simples
  ping: {
    description: 'Verificar latencia',
    execute: async (sock, sender, args) => {
      return '🏓 Pong! El bot está respondiendo correctamente.';
    },
  },

  estado: {
    description: 'Estado del bot',
    execute: async (sock, sender, args) => {
      const stats = db.getStats();
      return `
✅ *ESTADO DEL BOT*

• Estado: Activo ✓
• Conexión: Estable ✓
• Respuesta: Óptima ✓
• Versión: ${config.BOT_VERSION}
• Mensajes procesados: ${stats.totalMensajes}
• Comandos ejecutados: ${stats.totalComandos}
      `;
    },
  },

  link: {
    description: 'Link del repositorio',
    execute: async (sock, sender, args) => {
      return `
🔗 *REPOSITORIO:*

https://github.com/AlyaKujou-MD/AlyaKujou-MD

¡Sígueme en GitHub!
      `;
    },
  },

  soporte: {
    description: 'Contacto de soporte',
    execute: async (sock, sender, args) => {
      return `
📞 *SOPORTE:*

Para reportar errores o sugerencias:

🌐 GitHub: github.com/AlyaKujou-MD
📧 Issues: Crea un issue en el repositorio

¡Estoy para ayudarte!
      `;
    },
  },

  contacto: {
    description: 'Información de contacto',
    execute: async (sock, sender, args) => {
      return `
📬 *CONTACTO:*

🤖 Bot: AlyaKujou WhatsApp Bot
👤 Creador: AlyaKujou-MD
🌐 GitHub: github.com/AlyaKujou-MD
📱 WhatsApp: Usa este bot para contactar

¡Te ayudaré con lo que necesites!
      `;
    },
  },

  // Comandos de utilidad con argumentos
  hora: {
    description: 'Hora y fecha actual',
    execute: async (sock, sender, args) => utilities.hora(),
  },

  calcular: {
    description: 'Calculadora',
    execute: async (sock, sender, args) => {
      return utilities.calcular(args.join(''));
    },
  },

  dado: {
    description: 'Lanzar dado',
    execute: async (sock, sender, args) => utilities.dado(),
  },

  moneda: {
    description: 'Lanzar moneda',
    execute: async (sock, sender, args) => utilities.moneda(),
  },

  aleatorio: {
    description: 'Número aleatorio',
    execute: async (sock, sender, args) => {
      const min = parseInt(args[0]);
      const max = parseInt(args[1]);
      return utilities.aleatorio(min, max);
    },
  },

  clima: {
    description: 'Clima simulado',
    execute: async (sock, sender, args) => utilities.clima(),
  },

  chiste: {
    description: 'Chiste del día',
    execute: async (sock, sender, args) => utilities.chiste(),
  },

  pregunta: {
    description: 'Bola mágica',
    execute: async (sock, sender, args) => utilities.pregunta(),
  },

  invertir: {
    description: 'Invertir texto',
    execute: async (sock, sender, args) => {
      return utilities.invertir(args.join(' '));
    },
  },

  mayuscula: {
    description: 'Convertir a mayúsculas',
    execute: async (sock, sender, args) => {
      return utilities.mayuscula(args.join(' '));
    },
  },

  minuscula: {
    description: 'Convertir a minúsculas',
    execute: async (sock, sender, args) => {
      return utilities.minuscula(args.join(' '));
    },
  },

  // Juegos
  rpg: {
    description: 'Aventura RPG',
    execute: async (sock, sender, args) => entertainment.rpg(),
  },

  trivia: {
    description: 'Trivia',
    execute: async (sock, sender, args) => entertainment.trivia(),
  },

  adivinanza: {
    description: 'Adivinanza',
    execute: async (sock, sender, args) => entertainment.adivinanza(),
  },

  sysinfo: {
    description: 'Información del sistema',
    execute: async (sock, sender, args) => admin.sysinfo(),
  },
};

module.exports = commands;