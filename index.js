import express from "express";
import { urlencoded, json } from "body-parser";
import cors from 'cors';
import * as db from './src/db/index';

const app = express();

app.use(urlencoded({
  extended: true
}));

app.use(json());
app.use(cors({ origin: '*' }));

db.setUpConnection();

app.get('/api/recipes', (req, res) => {
  db.getRecipesList().then(list => res.send(list))
});

app.post('/api/recipes', (req, res) => {
  db.createRecipe(req.body)
    .then(data => res.send({status: "success", data}))
    .catch(err => res.send({status: "error", data: { error: err }}));
});

app.delete('/api/recipes/:id', (req, res) => {
  db.deleteRecipe(req.params.id).then(data => res.send(data))
});


const server = app.listen(8080, () => {
  console.log('Server started');
});

