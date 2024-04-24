import { Request, Response } from 'express';
import * as controller from '../../controller'; 
import { Rides } from '../../utils/dataParser.ts'
import { IMostThrillingRides, IParkWithHeightRestr, IRideStatus } from 'helper/index.ts';

// Mock data to be returned by fetchData
const mockRides = {
  rides: [
    {
      coaster_name: "Mock Coaster",
      height: "50 ft (15 m)",
      height_value: 50,
      speed: "10 mph (16 km/h)",
      height_restriction: "46 in (117 cm)",
      park_section: "Mock Park",
      speed1: "10 mph",
      speed1_value: 10,
      status: "Operating",
      // ...and other 
    },
    {
      coaster_name: "Mock Coaster 2",
      height: "70 ft (21 m)",
      height_value: 70,
      speed: "6 mph (9.7 km/h)",
      height_restriction: "48 in (122 cm)",
      park_section: "Mock Park",
      speed1: "6 mph",
      speed1_value: 6,
      status: "Operating",
      // ...and other 
    }
  ]
} as Rides;

// Mock data to be returned by getRideStatusHelper
const mockRideStatus: IRideStatus = {
  Ride: 'Mock Coaster',
  Status: 'Operating'
}

// Mock data to be returned by getParkForHeightHelper
const mockParkForHeight: IParkWithHeightRestr = {
  Park: 'Mock Park',
  NumberOfRides: 1
}

// Mock data to be returned by getMostThrillingRidesHelper
const mockMostThrillingRides: IMostThrillingRides = {
  HighestRide: {Ride: 'Mock Coaster 2', Height: "70 ft (21 m)"},
  FastestRide: {Ride: 'Mock Coaster', Speed: "10 mph (16 km/h)"},
}

// Mock fetchData function
jest.mock('../../utils/dataParser.ts', () => ({
  fetchData: jest.fn(() => Promise.resolve(mockRides)),
}));



describe('fetchRides', () => {
  it('should respond with data fetched from fetchData', async() => {
    const req = {} as Request;
    const res = {
      status: jest.fn().mockReturnThis(), 
      json: jest.fn(),
      sendStatus: jest.fn(),
    } as unknown as Response

    await controller.fetchRides(req, res);

    expect(res.json).toHaveBeenCalledWith(mockRides);
  });
})

describe('getRideStatus', () => {
  it('should respond with ride status for the requested ride', async() => {
    const req = { params: {rideName: 'Mock Coaster'} } as unknown as Request;
    const res = {
      status: jest.fn().mockReturnThis(), 
      json: jest.fn(),
      sendStatus: jest.fn(),
    } as unknown as Response;

    await controller.getRideStatus(req, res);

    expect(res.json).toHaveBeenCalledWith(mockRideStatus);
  })
})

describe('getParkForHeight', () => {
  it('should respond with park with the most amount of rides available for the requested height', async() => {
    const req = { params: {height: 120} } as unknown as Request;
    const res = {
      status: jest.fn().mockReturnThis(), 
      json: jest.fn(),
      sendStatus: jest.fn(),
    } as unknown as Response;

    await controller.getParkForHeight(req, res);

    expect(res.json).toHaveBeenCalledWith(mockParkForHeight);
  })
})

describe('getMostThrillingRides',() => {
  it('should respond with the highest ride and the fastest ride', async() => {
    const req = {} as Request;
    const res = {
      status: jest.fn().mockReturnThis(), 
      json: jest.fn(),
      sendStatus: jest.fn(),
    } as unknown as Response;

    await controller.getMostThrillingRides(req, res);

    expect(res.json).toHaveBeenCalledWith(mockMostThrillingRides);
  })
})