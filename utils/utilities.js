/**
 * Comandos de utilidad del bot
 */

const utilities = {
  // Comando: hora
  hora: () => {
    const ahora = new Date();
    const hora = ahora.toLocaleString('es-ES', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
    const fecha = ahora.toLocaleString('es-ES', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });

    return `⏰ *HORA Y FECHA*

🕐 Hora: ${hora}
📅 Fecha: ${fecha}`;
  },

  // Comando: calculadora
  calcular: (expresion) => {
    try {
      const resultado = Function('"use strict"; return (' + expresion + ')')();
      return `🧮 *CALCULADORA*

Operación: ${expresion}
Resultado: ${resultado}`;
    } catch (error) {
      return '❌ Error en la operación. Verifica la expresión.';
    }
  },

  // Comando: dado
  dado: () => {
    const resultado = Math.floor(Math.random() * 6) + 1;
    const dados = ['🎲', '🎲', '🎲', '🎲', '🎲', '🎲'];
    return `🎲 *LANZAR DADO*

Resultado: ${dados[resultado - 1]} ${resultado}`;
  },

  // Comando: moneda
  moneda: () => {
    const resultado = Math.random() < 0.5 ? 'Cara' : 'Cruz';
    const emoji = resultado === 'Cara' ? '🪙' : '🪙';
    return `${emoji} *LANZAR MONEDA*

Resultado: ${resultado}`;
  },

  // Comando: numero aleatorio
  aleatorio: (min, max) => {
    if (!min || !max) {
      return '❌ Uso: !aleatorio [min] [max]\nEjemplo: !aleatorio 1 100';
    }
    const numero = Math.floor(Math.random() * (max - min + 1)) + min;
    return `🎯 *NÚMERO ALEATORIO*

Rango: ${min} - ${max}
Resultado: ${numero}`;
  },

  // Comando: clima (simulado)
  clima: () => {
    const clima = ['Soleado ☀️', 'Nublado ☁️', 'Lluvioso 🌧️', 'Nevado ❄️', 'Ventoso 💨'];
    const temperatura = Math.floor(Math.random() * 35) + 5;
    return `🌤️ *CLIMA*

Clima: ${clima[Math.floor(Math.random() * clima.length)]}
Temperatura: ${temperatura}°C`;
  },

  // Comando: chiste
  chiste: () => {
    const chistes = [
      '¿Por qué los programadores prefieren el dark mode?\nPorque la luz atrae bugs 🐛',
      '¿Cuántos programadores se necesitan para cambiar un foco?\nNinguno, eso es trabajo de hardware 💡',
      '¿Por qué Java es como la política?\nPorque nadie entiende qué está pasando, pero todos pretenden que sí 🗳️',
      '¿Cómo se llama un programador de Rusia?\nVladimir Putin el código 🇷🇺',
      'Me encanta el debugging\nEspecialmente cuando encuentro el error en la línea que acabo de escribir 😅',
    ];
    return `😂 *CHISTE DEL DÍA*\n\n${chistes[Math.floor(Math.random() * chistes.length)]}`;
  },

  // Comando: pregunta
  pregunta: () => {
    const respuestas = [
      'Sí, definitivamente 👍',
      'No, de ninguna manera 👎',
      'Quizás, piénsalo bien 🤔',
      'Definitivamente no ❌',
      'Sin duda alguna ✅',
      'Mejor pregunta después ⏰',
      'Muy probable 📈',
      'Improbable 📉',
      'Pregúntale a otro 😄',
      'La respuesta está en tu corazón ❤️',
    ];
    return `🎱 *BOLA MÁGICA*\n\n${respuestas[Math.floor(Math.random() * respuestas.length)]}`;
  },

  // Comando: inversor de texto
  invertir: (texto) => {
    if (!texto) return '❌ Uso: !invertir [texto]';
    const invertido = texto.split('').reverse().join('');
    return `🔄 *INVERTIR TEXTO*\n\nOriginal: ${texto}\nInvertido: ${invertido}`;
  },

  // Comando: converter en mayuscula
  mayuscula: (texto) => {
    if (!texto) return '❌ Uso: !mayuscula [texto]';
    return `📢 *MAYÚSCULA*\n\n${texto.toUpperCase()}`;
  },

  // Comando: converter en minuscula
  minuscula: (texto) => {
    if (!texto) return '❌ Uso: !minuscula [texto]';
    return `📝 *MINÚSCULA*\n\n${texto.toLowerCase()}`;
  },
};

module.exports = utilities;