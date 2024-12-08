const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());

app.get('/proxy/v1', async (req, res) => {
    try {
      res.status(200).send({ message: 'Proxy GET endpoint funcionando correctamente' });
    } catch (error) {
      console.error(error.message);
      res.status(500).send({ error: 'Error al procesar la solicitud GET' });
    }
  });
  

app.post('/proxy', async (req, res) => {
  try {
    const response = await axios.post('https://your-api.amazonaws.com/endpoint', req.body, {
      headers: req.headers, // Pasar encabezados si son necesarios
    });
    res.status(response.status).send(response.data);
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ error: 'Error al reenviar la solicitud' });
  }
});

const PORT = 80;
app.listen(PORT, () => console.log(`Proxy listening on port ${PORT}`));
