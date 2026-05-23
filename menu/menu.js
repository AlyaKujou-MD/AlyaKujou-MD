/**
 * Sistema de Menú del Bot AlyaKujou
 * Gestiona los comandos y respuestas del bot
 */

const menu = {
  principal: () => {
    return `
╔════════════════════════════════╗
║   🤖 BOT ALYAKUJOU - MENÚ 🤖   ║
╚════════════════════════════════╝

📌 *COMANDOS PRINCIPALES:*

1️⃣  !hola - Saludo del bot
2️⃣  !menu - Mostrar este menú
3️⃣  !ayuda - Obtener ayuda
4️⃣  !info - Información del bot
5️⃣  !ping - Verificar latencia
6️⃣  !creador - Información del creador

─────────────────────────────────

📌 *COMANDOS DE UTILIDAD:*

🔗 !link - Obtener link del bot
📋 !estado - Estado del bot
⚙️  !configurar - Configuración

─────────────────────────────────

💬 Escribe !comandos para ver más opciones

> Usa un comando para continuar...
    `;
  },

  ayuda: () => {
    return `
╔════════════════════════════════╗
║        📖 AYUDA - BOT 📖        ║
╚════════════════════════════════╝

❓ *¿CÓMO USAR EL BOT?*

1. Los comandos comienzan con *!*
2. Escribe el comando sin paréntesis
3. El bot responderá automáticamente

📝 *EJEMPLOS:*

• !hola → El bot te saluda
• !info → Ver información
• !menu → Mostrar menú
• !ayuda → Esta ayuda

⚠️  *IMPORTANTE:*

✓ Los comandos son sensibles a mayúsculas
✓ Usa ! para activar comandos
✓ Espera la respuesta del bot

🔔 *¿PROBLEMAS?*

Escribe: !soporte

─────────────────────────────────

> Intenta con !menu para ver opciones
    `;
  },

  info: () => {
    return `
╔════════════════════════════════╗
║       ℹ️  INFORMACIÓN BOT ℹ️      ║
╚════════════════════════════════╝

🤖 *NOMBRE:* AlyaKujou Bot
📦 *VERSIÓN:* 1.0.0
⚡ *ESTADO:* ✅ Activo
🛠️  *PLATAFORMA:* WhatsApp
💾 *LENGUAJE:* Node.js
📚 *LIBRERÍA:* Baileys

─────────────────────────────────

✨ *CARACTERÍSTICAS:*

✓ Sistema de comandos
✓ Menú interactivo
✓ Respuestas automáticas
✓ Soporte en tiempo real

─────────────────────────────────

👨‍💻 *CREADOR:* AlyaKujou
🌐 *GITHUB:* AlyaKujou-MD

> Escribe !menu para ir al menú principal
    `;
  },

  creador: () => {
    return `
╔════════════════════════════════╗
║       👨‍💻 CREADOR - INFO 👨‍💻       ║
╚════════════════════════════════╝

👤 *NOMBRE:* AlyaKujou-MD
🌐 *GITHUB:* github.com/AlyaKujou-MD
📱 *PLATFORM:* GitHub

─────────────────────────────────

💪 *PROYECTOS:*

🤖 Bot WhatsApp AlyaKujou
📦 Más proyectos en desarrollo

─────────────────────────────────

🙏 *AGRADECIMIENTOS:*

✓ Gracias por usar nuestro bot
✓ Sígueme en GitHub
✓ Contribuye al proyecto

> Escribe !menu para volver
    `;
  },

  comandos: () => {
    return `
╔════════════════════════════════╗
║       📋 LISTA COMPLETA 📋      ║
╚════════════════════════════════╝

🎯 *COMANDOS DISPONIBLES:*

• !menu - Menú principal
• !ayuda - Obtener ayuda
• !info - Información del bot
• !hola - Saludo
• !ping - Verificar latencia
• !creador - Info del creador
• !comandos - Esta lista
• !estado - Estado del bot
• !link - Link del repositorio

─────────────────────────────────

💡 *PRÓXIMAS ACTUALIZACIONES:*

🔄 Más comandos
🎮 Juegos
📊 Estadísticas
🎵 Música

─────────────────────────────────

> Escribe un comando para continuar
    `;
  }
};

// Función para manejar comandos
async function handleCommand(sock, sender, messageText, isGroupMsg) {
  const command = messageText.toLowerCase().trim();

  try {
    // Comando: !hola
    if (command === '!hola') {
      await sock.sendMessage(sender, {
        text: '¡Hola! 👋 Bienvenido al bot AlyaKujou. Escribe !menu para ver los comandos disponibles.',
      });
    }
    // Comando: !menu
    else if (command === '!menu') {
      await sock.sendMessage(sender, {
        text: menu.principal(),
      });
    }
    // Comando: !ayuda
    else if (command === '!ayuda') {
      await sock.sendMessage(sender, {
        text: menu.ayuda(),
      });
    }
    // Comando: !info
    else if (command === '!info') {
      await sock.sendMessage(sender, {
        text: menu.info(),
      });
    }
    // Comando: !creador
    else if (command === '!creador') {
      await sock.sendMessage(sender, {
        text: menu.creador(),
      });
    }
    // Comando: !comandos
    else if (command === '!comandos') {
      await sock.sendMessage(sender, {
        text: menu.comandos(),
      });
    }
    // Comando: !ping
    else if (command === '!ping') {
      await sock.sendMessage(sender, {
        text: '🏓 Pong! El bot está respondiendo correctamente.',
      });
    }
    // Comando: !estado
    else if (command === '!estado') {
      await sock.sendMessage(sender, {
        text: '✅ *ESTADO DEL BOT:*\n\n• Estado: Activo\n• Conexión: Estable\n• Respuesta: Óptima\n• Versión: 1.0.0',
      });
    }
    // Comando: !link
    else if (command === '!link') {
      await sock.sendMessage(sender, {
        text: '🔗 *REPOSITORIO:*\n\nhttps://github.com/AlyaKujou-MD/AlyaKujou-MD\n\n¡Sígueme en GitHub!',
      });
    }
    // Comando: !soporte
    else if (command === '!soporte') {
      await sock.sendMessage(sender, {
        text: '📞 *SOPORTE:*\n\nPara reportar errores o sugerencias, contáctame en GitHub.\n\n¡Estoy para ayudarte!',
      });
    }
  } catch (error) {
    console.error('Error al procesar comando:', error);
    await sock.sendMessage(sender, {
      text: '❌ Ocurrió un error al procesar tu comando. Intenta de nuevo.',
    });
  }
}

module.exports = { menu, handleCommand };