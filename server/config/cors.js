const cors = require("cors");
const corsOptions = {
  origin: "https://astounding-madeleine-5192af.netlify.app/", // Sostituisci con il tuo dominio Netlify
  optionsSuccessStatus: 200, // Per browser legacy che non supportano CORS
};

app.use(cors(corsOptions));
