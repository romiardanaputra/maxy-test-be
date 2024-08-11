import express from "express";
const router = express.Router();
let posts = [
  { id: 1, title: "post 1", body: "this is post 1" },
  { id: 2, title: "post 2", body: "this is post 2" },
  { id: 3, title: "post 3", body: "this is post 3" },
];

router.get("/", (req, res) => {
  console.log(req.query);
  let limit = parseInt(req.query.limit);
  if (!isNaN(limit) && limit > 0) {
    posts = posts.slice(0, limit);
    res.json(posts);
  } else {
    res.json(posts);
  }
});

router.get("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  res.json(posts.filter((post) => post.id === id));
});

export default router;
