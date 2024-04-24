import { Rides, RidesDataType } from "utils/dataParser";

export interface IRideStatus {
  Ride: string,
  Status: string,
}

export interface IParkWithHeightRestr {
  Park: string,
  NumberOfRides: number,
}

export interface IMostThrillingRides {
  HighestRide: {Ride: string, Height: string},
  FastestRide: {Ride: string, Speed: string},
}

export function getRideStatusHelper(data: Rides, reqRide: string): IRideStatus {

  let resRide: string;
  let status: string;
  let rideExists = false;

  // Check if the coaster exists and if it's open
  data.rides?.forEach((ride: RidesDataType) => {
    if (ride.coaster_name === reqRide) {
      rideExists = true;
      resRide = ride.coaster_name;
      status = ride.status;
    }
  });

  if (rideExists) {
    return { Ride: resRide, Status: status };
  } else {
    return null;
  }
}

export function getParkForHeightHelper(data: Rides, reqHeight: number): IParkWithHeightRestr{
    let parksMap: Map<string, number> = new Map();

    data.rides?.forEach((ride: RidesDataType) => {
      if ((ride.park_section !== '') && (allowedHeight(ride.height_restriction, reqHeight))) {
        const currentCount = parksMap.get(ride.park_section);
        if (currentCount !== undefined) {
          parksMap.set(ride.park_section, currentCount + 1);
        } else {
          parksMap.set(ride.park_section, 1); // Initialize to 1 if not already in the map
        }
      }
    });

    // Compare the values in the hashmap to get the park with the highest number of available rides
    let nbRidesMax = -1;
    let resPark; 
    parksMap.forEach((nbRides, park) => {
      if (nbRides > nbRidesMax) {
        nbRidesMax = nbRides;
        resPark = park;
      }
    })

    if (nbRidesMax !== -1) {
      return {Park: resPark, NumberOfRides: nbRidesMax};
    } else {
      return null;
    }
}

export function getMostThrillingRidesHelper(data: Rides): IMostThrillingRides {
  let maxHeight = -1;
  let maxSpeed = -1;

  let highestRide: string;
  let fastestRide: string;

  let height: string;
  let speed: string;

  data.rides?.forEach((ride: RidesDataType) => {
    // Comparing height
    const rideHeight = ride.height_value;
    if (rideHeight > maxHeight) {
      maxHeight = rideHeight;
      highestRide = ride.coaster_name;
      height = ride.height;
    }
    // Comparing speed
    const rideSpeed = ride.speed1_value;
    if (rideSpeed > maxSpeed) {
      maxSpeed = rideSpeed;
      fastestRide = ride.coaster_name;
      speed = ride.speed;
    }
  })
  return {
    HighestRide: { Ride: highestRide, Height: height },
    FastestRide: { Ride: fastestRide, Speed: speed }
  }
}

export function allowedHeight(heightRestriction: string, reqHeight: number): boolean {
  if (heightRestriction === '') {
    return true;
  }

  // Find the index of the substring " cm)"
  const index = heightRestriction.indexOf(" cm)");

  if (index === -1){
    return false;
  }

  // Extract the number
  let value = '';
  for (let i = index - 1; i >= 0; i--) {
    if (heightRestriction[i] === '('){
      break;
    }
    value = heightRestriction[i] + value;
  }

  const valueHeightRestriction = parseInt(value.trim());

  return valueHeightRestriction < reqHeight;
}