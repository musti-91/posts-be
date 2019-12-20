import posts from "./controller/";

export const routes = (app: any) => {
  // create  a new Post
  app.post("/blog-posts", posts.create);

  // Retrieve All Posts
  app.get("/blog-posts", posts.findAll);

  // // Retrieve with filter data
  // app.get('/blog-posts/title=')

  // retrieve one
  app.get("/blog-posts/:id", posts.findOne);

  // update one
  app.put("/blog-posts/:id", posts.update);

  // delete one
  app.delete("/blog-posts/:id", posts.deleteOne);

  //! Delete All [not required]
  app.delete("/blog-posts/", posts.deleteAll);
};
