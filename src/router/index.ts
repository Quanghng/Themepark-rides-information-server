import express from "express";
import rides from "./rides";

const router = express.Router();

export default (): express.Router => {
  rides(router);
  return router;
}