const cors = require("cors");
const corsOptions = {
  origin: "https://ricettariosmart.netlify.app", // Sostituisci con il tuo dominio Netlify
  //origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  optionsSuccessStatus: 200, // Per browser legacy che non supportano CORS
};

const corsMiddleware = cors(corsOptions);
module.exports = corsMiddleware;
