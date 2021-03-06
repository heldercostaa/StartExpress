const express = require("express");
const cors = require("cors");

const { uuid, isUuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

function logRequests(req, res, next) {
  const { method, url } = req;

  const logLabel = `[${method.toUpperCase()}] ${url}`;

  console.time(logLabel);

  next();

  console.timeEnd(logLabel);
}

function validateId(req, res, next) {
  const { id } = req.params;

  if (!isUuid(id))
    return res.status(400).json({ error: "Invalid repository id." });

  next();
}

app.use(logRequests);
app.use("/repositories/:id", validateId);

app.get("/repositories", (req, res) => {
  const { title, url, tech } = req.query;

  const results = repositories.filter((repo) => {
    let hasTitle = true;
    let hasUrl = true;
    let hasTech = true;

    if (title) hasTitle = repo.title.includes(title);
    if (url) hasUrl = repo.url.includes(url);
    if (tech) hasTech = repo.techs.includes(tech);

    return hasTitle && hasUrl && hasTech;
  });

  return res.json(results);
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

  const repoIdx = repositories.findIndex((repo) => repo.id === id);
  if (repoIdx < 0)
    return res.status(400).json({ error: "Repository not found." });

  const repository = repositories[repoIdx];

  if (title) repository.title = title;
  if (url) repository.url = url;
  if (techs) repository.techs = techs;

  repositories[repoIdx] = repository;

  return res.json(repository);
});

app.delete("/repositories/:id", (req, res) => {
  const { id } = req.params;

  const repoIdx = repositories.findIndex((repo) => repo.id === id);
  if (repoIdx < 0)
    return res.status(400).json({ error: "Repository not found." });

  repositories.splice(repoIdx, 1);

  return res.status(204).send();
});

app.post("/repositories/:id/like", (req, res) => {
  const { id } = req.params;

  const repoIdx = repositories.findIndex((repo) => repo.id === id);
  if (repoIdx < 0)
    return res.status(400).json({ error: "Repository not found." });

  const repository = repositories[repoIdx];
  repository.likes += 1;

  return res.json(repository);
});

module.exports = app;
