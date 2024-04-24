import express from 'express'

import { fetchData, Rides } from '../utils/dataParser.ts';
import { IMostThrillingRides, IParkWithHeightRestr, IRideStatus, getMostThrillingRidesHelper, getParkForHeightHelper, getRideStatusHelper } from '../helper/index.ts';

export const fetchRides = async (req: express.Request, res: express.Response) => {
  try {
    console.log("Starting fetchRides...");
    const data: Rides = await fetchData();
    console.log('Finished fetching data'); 

    console.log("Finishing fetchRides...");
    return res.status(200).json(data);
  } catch(error: unknown) {
    console.log(error);
    return res.sendStatus(400);
  } 
}

export const getRideStatus = async (req: express.Request, res: express.Response) => {
  try {
    console.log("Starting getRideStatus...");
    const reqRide: string = req.params.rideName;
    const data: Rides = await fetchData(); 
    console.log('Finished fetching data'); 

    const rideStatus: IRideStatus = getRideStatusHelper(data, reqRide);
    console.log("Finishing getRideStatus...");
    
    if (rideStatus !== null) {
      return res.status(200).json(rideStatus);
    } else {
      return res.status(404).json({ error: 'Ride not found!' });
    }
  } catch(error: unknown) {
    console.log(error);
    return res.sendStatus(400);
  }
}

export const getParkForHeight = async (req: express.Request, res: express.Response) => {
  try {
    console.log("Starting getParkForHeight...");
    const reqHeight: number = parseInt(req.params.height);
    const data: Rides = await fetchData(); 
    console.log('Finished fetching data'); 

    const park: IParkWithHeightRestr = getParkForHeightHelper(data, reqHeight);
    console.log("Finishing getParkForHeight...");
    if (park !== null) {
      return res.status(200).json(park);
    } else {
      return res.status(404).send('Park not found!');
    }

  } catch(error: unknown) {
    console.log(error);
    return res.sendStatus(400);
  }
}

export const getMostThrillingRides = async (req: express.Request, res: express.Response) => {
  try {
    console.log("Starting getMostThrillingRides...");
    const data: Rides = await fetchData(); 
    console.log('Finished fetching data'); 

    const mostThrillingRides: IMostThrillingRides = getMostThrillingRidesHelper(data);
    console.log("Finishing getMostThrillingRides...");
    
    return res.status(200).json(mostThrillingRides);
  } catch(error: unknown) {
    console.log(error);
    return res.sendStatus(400);
  }
}
