const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const {title, techs, url} = request.body;

  const repository = {id: uuid(),  title, techs, url, likes: 0};

  repositories.push(repository);
  
  return response.json(repository);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const {title, techs, url} = request.body;

  const repositoryIndex = repositories.findIndex(repository => repository.id === id);

  if (repositoryIndex < 0) {
    return response.status(400).json({error : 'Repositorio não encontrado'});
  }

  const repository = {...repositories[repositoryIndex], id, title, techs, url};
  repositories[repositoryIndex] = repository;

  return response.json(repository)

});

app.delete("/repositories/:id", (request, response) => {
  const {id} = request.params;
  const repositoryIndex = repositories.findIndex(repository => repository.id === id);

  if (repositoryIndex < 0) {
    return response.status(400).json({error : 'Projeto não encontrado'});
  }

  repositories.splice(repositoryIndex, 1);

  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  const repositoryIndex = repositories.findIndex(repository => repository.id === id);

  if (repositoryIndex < 0) {
    return response.status(400).json({error : 'Repositorio não encontrado'});
  }
  const { likes } = repositories[repositoryIndex];

  const repository = {...repositories[repositoryIndex], likes: likes +1};
  repositories[repositoryIndex] = repository;

  return response.json(repository)
});


module.exports = app;
