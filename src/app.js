const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (req, res) => {
  return res.json(repositories);
});

app.post("/repositories", (req, res) => {
  const { title, url, techs } = req.body;

  if (!(title && url && techs))
    return res.status(400).json({ error: "Missing required params." });

  const repository = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0,
  };

  repositories.push(repository);

  return res.json(repository);
});

app.put("/repositories/:id", (req, res) => {
  const { id } = req.params;
  const { title, url, techs } = req.body;

  if (!(id && title && url && techs))
    return res.status(400).json({ error: "Missing required param." });

  const repoIdx = repositories.findIndex((repo) => repo.id === id);
  if (repoIdx < 0)
    return res.status(400).json({ error: "Repository not found." });

  const likes = repositories[repoIdx].likes;
  const repository = {
    id,
    title,
    url,
    techs,
    likes,
  };

  repositories[repoIdx] = repository;

  return res.json(repository);
});

app.delete("/repositories/:id", (req, res) => {
  const { id } = req.params;
  if (!id) return res.status(400).json({ error: "Missing required param." });

  const repoIdx = repositories.findIndex((repo) => repo.id === id);
  if (repoIdx < 0)
    return res.status(400).json({ error: "Repository not found." });

  repositories.splice(repoIdx, 1);

  return res.status(204).send();
});

app.post("/repositories/:id/like", (req, res) => {
  const { id } = req.params;
  if (!id) return res.status(400).json({ error: "Missing required param." });

  const repoIdx = repositories.findIndex((repo) => repo.id === id);
  if (repoIdx < 0)
    return res.status(400).json({ error: "Repository not found." });

  repositories[repoIdx].likes += 1;

  const likes = repositories[repoIdx].likes;
  return res.json(likes);
});

module.exports = app;
