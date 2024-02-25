const app = require('./app');

// Define the port on which the server will listen
const PORT = 3000;

// Start the server and listen on the specified port
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
