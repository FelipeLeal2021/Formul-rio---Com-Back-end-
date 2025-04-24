require('dotenv').config(); // Carrega variáveis do arquivo .env

const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middlewares
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Rota para receber os dados do formulário e enviar e-mail
app.post('/enviar-email', async (req, res) => {
  const { nome, email, endereco, cidade, estado, cep } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER,
    subject: 'Novo Formulário Recebido',
    text: `
      Nome: ${nome}
      E-mail: ${email}
      Endereço: ${endereco}
      Cidade: ${cidade}
      Estado: ${estado}
      CEP: ${cep}
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'E-mail enviado com sucesso!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao enviar e-mail.' });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Servidor rodando em http://localhost:${PORT}`);
});
