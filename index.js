const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = 3400;
app.use(express.json());

app.use(require("./routes/groups.rout"));
app.use(require("./routes/students.route"));

mongoose
  .connect(
    "mongodb+srv://soNomad:222888ma@cluster0.9v9d232.mongodb.net/intocode_task",
    {}
  )
  .then(() => console.log("Успешно соединились с сервером MongoDB"))
  .catch(() => console.log("Ошибка при соединении с сервером MongoDB"));

app.listen(PORT, () => {
  console.log("Порт запущен по адресу http://localhost:" + PORT);
});
