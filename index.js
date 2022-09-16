const express = require("express");
const app = express();
const PORT = 4001;
const cors = require("cors");
const fetch = require("node-fetch");
app.use(cors());
app.use(express.json());

app.post("/exchange", (req, res) => {
  const inputNumValues = req.body.getAmountValues;
  const inputFromValues = req.body.selectFromValues;
  const inputTOValues = req.body.selectToValues;

  console.log(inputNumValues, inputFromValues, inputNumValues);
  fetch(
    `https://currency-exchange.p.rapidapi.com/exchange?from=${inputFromValues}&to=${inputTOValues}&q=${inputNumValues}`,
    {
      method: "GET",
      headers: {
        "x-rapidapi-host": "currency-exchange.p.rapidapi.com",
        "x-rapidapi-key": "9c9d742a39mshcd42f17297be0c0p13f38ajsn161b5fd148b5",
      },
    }
  )
    // .then(response => {
    //     console.log(response);
    //   })
    //   .catch(err => {
    //     console.error(err);
    //   });

    .then((res) => res.json())
    .then((data) => res.json(Math.round(data * inputNumValues) ));
});

app.listen(PORT, () => {
  console.log(`server is running at http://localhost:${PORT}`);
});
