/**
 * Comandos de entretenimiento
 */

const entertainment = {
  // RPG - Aventura simple
  rpg: () => {
    const aventura = [
      '⚔️ Encuentras un goblin salvaje!',
      '🏰 Descubres un castillo antiguo',
      '💎 Encuentras un cofre de tesoro',
      '👹 Se te aparece un dragón',
      '🗡️ Encuentras una espada mágica',
    ];
    return `🎮 *AVENTURA RPG*\n\n${aventura[Math.floor(Math.random() * aventura.length)]}\n\n¿Qué haces?`;
  },

  // Trivia
  trivia: () => {
    const preguntas = [
      {
        pregunta: '¿Cuál es la capital de Francia?',
        respuesta: 'París',
      },
      {
        pregunta: '¿Cuántos continentes hay?',
        respuesta: '7',
      },
      {
        pregunta: '¿En qué año se inventó internet?',
        respuesta: '1960s',
      },
    ];
    const p = preguntas[Math.floor(Math.random() * preguntas.length)];
    return `🧠 *TRIVIA*\n\n${p.pregunta}\n\nPista: ${p.respuesta.substring(0, 2)}...`;
  },

  // Adivinanza
  adivinanza: () => {
    const adivinanzas = [
      {
        pregunta: 'Tengo ciudades pero no casas, bosques pero no árboles, ¿qué soy?',
        respuesta: 'Un mapa',
      },
      {
        pregunta: 'Cuanto más tomo, más me dejo, ¿qué soy?',
        respuesta: 'Pasos',
      },
      {
        pregunta: 'No tengo ojos pero puedo ver, ¿qué soy?',
        respuesta: 'Un espejo',
      },
    ];
    const a = adivinanzas[Math.floor(Math.random() * adivinanzas.length)];
    return `🧩 *ADIVINANZA*\n\n${a.pregunta}\n\nEscribe tu respuesta :D`;
  },
};

module.exports = entertainment;