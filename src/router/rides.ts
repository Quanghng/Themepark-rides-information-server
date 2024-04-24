import express from "express";

import { fetchRides, getRideStatus, getParkForHeight, getMostThrillingRides } from '../controller/index.ts'; // Import fetchData function

export default (router: express.Router) => {
  router.get('/fetchRides', fetchRides);
  router.get('/getRideStatus/:rideName', getRideStatus);
  router.get('/getParkForHeight/:height', getParkForHeight);
  router.get('/getMostThrillingRides', getMostThrillingRides);

}