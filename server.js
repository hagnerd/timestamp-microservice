const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors({ optionSuccessStatus: 200 })); // some legacy browsers choke on 204

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/views/index.html`);
});

app.get('/api/hello', (req, res) => {
  res.json({ greeting: 'hello API' });
});

app.get('/api/timestamp/', (req, res) => {
  const unix = new Date().getTime();
  const utc = new Date(unix).toUTCString();

  res.json({
    unix,
    utc,
  });
});

app.get('/api/timestamp/:date_string', (req, res) => {
  let unix;
  let utc;

  unix = new Date(req.params.date_string).getTime();
  utc = new Date(req.params.date_string).toUTCString();

  res.json({
    unix: unix,
    utc: utc,
  });
});

const listener = app.listen(process.env.PORT || 3000, () =>
  console.log(`Your app is listening on PORT ${listener.address().port}`)
);
