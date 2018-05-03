import express from "express";
import { urlencoded, json } from "body-parser";
import cors from 'cors';
import * as db from './src/db/index';
import path from 'path';

const app = express();

app.use(urlencoded({
  extended: true
}));
app.use(json());
app.use(cors({ origin: '*' }));

app.use(express.static(__dirname + '/public'));

db.setUpConnection();

app.get('/api/recipes/:page?', async (req, res) => {
  const { page } = req.params;

  if (!+page || page < 0)
    return db.getRecipesList(1)
           .then(data => res.send(data));
  
  return db.getRecipesList(+page).then(list => res.send(list));
});

app.get('/api/recipes/:id/show', (req, res) => {
  db.getRecipe(req.params.id)
  .then(recipe => res.send({status: "success", data: recipe}))
  .catch(err => res.send({status: "error", error: err}));
});

app.get('/api/recipes/:id/versions', async (req, res) => {
  const versions = await db.getRecipeVersions(req.params.id);
  res.send(versions)
});

app.post('/api/recipes', (req, res) => {
  db.createRecipe(req.body)
    .then(data => res.send({status: "success", data}))
    .catch(err => res.send({status: "error", error: parseErrors(err)}));
});

app.delete('/api/recipes/:id', (req, res) => {
  db.deleteRecipe(req.params.id).then(data => res.send(data))
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/public/index.html'));
});

const server = app.listen(8080, () => {
  console.log('Server started');
});

