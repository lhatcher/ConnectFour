import express from 'express';
import prompt from 'prompt';
import colors from 'colors';

import ConnectFour from './ConnectFour/main.js';

const app = express();

app.listen(3000, () => {
  // console.log('Game server running at http://127.0.0.1:3000/');
});

// prompt.get(['name'], (err, results) => {
//   console.log(colors.cyan(results.name));
// });
