const keywordResponses = {
  hola: "¡Hola! ¿En qué puedo ayudarte hoy?",
  precio: "Puedo ayudarte con la cotización de nuestros productos. ¿Qué producto te interesa?",
  producto: "Tenemos una amplia variedad de productos. ¿En qué categoría estás interesado?",
  ayuda: "Nuestro equipo de soporte estará encantado de ayudarte. ¿Cuál es tu consulta?",
  pedidos: "Para consultar el estado de tu pedido o información de envío, por favor proporciona tu número de pedido.",
};

function generateBotResponse(userMessage) {
  for (const keyword in keywordResponses) {
    if (userMessage.includes(keyword)) {
      return keywordResponses[keyword];
    }
  }

  return "Lo siento, no puedo entender tu mensaje en este momento. Por favor, intenta nuevamente más tarde o contáctanos directamente.";
}

module.exports = {
  generateBotResponse,
};
