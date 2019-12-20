import { Request, Response } from "express";

import Post from "./Post";

const posts = {
  create: (req: Request, res: Response) => {
    if (!req.body) {
      return res.sendStatus(400).send({
        message: "Post content can not be empty"
      });
    }

    const post = new Post({
      title: req.body.title || "No Post Title",
      body: req.body.body,
      userId: req.body.userId,
      id: req.body.id
    });

    // Save Post
    post
      .save()
      .then(data => {
        res.send(data);
      })
      .catch(error =>
        res.sendStatus(500).send({
          message: error.message
        })
      );
  },
  // Find All

  findAll: (req: Request, res: Response) => {
    Post.find()
      .then(posts => res.send(posts))
      .catch(err =>
        res.sendStatus(404).send({
          message: err.message || "something went wrong!"
        })
      );
  },
  // find by single post
  findOne: (req: Request, res: Response) => {
    Post.findById(req.params.id)
      .then(post => {
        if (!post) {
          return res.sendStatus(404).send({
            message: `Post not found with id: ${req.params.id}`
          });
        }
        res.send(post);
      })
      .catch(err => {
        if (err.kind === "ObjectId") {
          return res.sendStatus(404).send({
            message: `Post not found with id: ${req.params.id}`
          });
        }
        return res.sendStatus(500).send({
          message: "Something went wrong"
        });
      });
  },

  // update single Post

  update: (req: Request, res: Response) => {
    if (!req.body) {
      return res.sendStatus(400).send({
        message: "Post content should not be empty"
      });
    }
    const { title, body, userId } = req.body;
    Post.findByIdAndUpdate(
      req.params.id,
      {
        title,
        body: body ? body : `You have to provide body`,
        userId: userId ? userId : "1"
      },
      { new: true }
    )
      .then(post =>
        !post
          ? res.sendStatus(404).send({
              message: "Post not found with id " + req.body.id
            })
          : res.send(post)
      )
      .catch(err =>
        err.kind === "ObjectId"
          ? res.sendStatus(404).send({
              message: `Post not found with id ${req.body.id}`
            })
          : res.sendStatus(500).send({
              message: `Something went wrong updating post with id ${req.body.id}`
            })
      );
  },
  // delete post

  deleteOne: (req: Request, res: Response) => {
    Post.findByIdAndRemove(req.params.id)
      .then(post =>
        !post
          ? res.sendStatus(404).send({
              message: `Post not found with id (${req.body.id})`
            })
          : res.send({ message: "Post deleted successfully" })
      )
      .catch(err => {
        if (err.kind === "ObjectId" || err.name === "NotFound") {
          return res.sendStatus(404).send({
            message: "Error: post not found with id " + req.params.id
          });
        }
        return res.sendStatus(500).send({
          message: "Error: Could not delete post with id " + req.params.id
        });
      });
  },
  // ! Delete All records []
  deleteAll: (req: Request, res: Response) => {
    Post.deleteMany({})
      .then(data =>
        data
          ? res.send(data)
          : res.sendStatus(400).send({
              message: `couldn't load data`
            })
      )
      .catch(err => console.log());
  }
};
export default posts;
