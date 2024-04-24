export interface RidesData {
  coaster_name: string;
  length: string;
  speed: string;
  location: string;
  status: string;
  opening_date: string;
  type: string;
  manufacturer: string;
  height_restriction: string;
  model: string;
  height: string;
  inversions: string;
  lift_launch_system: string;
  cost: string;
  trains: string;
  park_section: string;
  duration: string;
  capacity: string;
  g_force: number;
  designer: string;
  max_vertical_angle: string;
  drop: string;
  soft_opening_date: string;
  fast_lane_available: string;
  replaced: string;
  track_layout: string;
  fastrack_available: string;
  closing_date: string;
  opened: string;
  replaced_by: string;
  website: string;
  flash_pass_available: string;
  must_transfer_from_wheelchair: string;
  theme: string;
  single_rider_line_available: string;
  restraint_style: string;
  acceleration: string;
  restraints: string;
  name: string;
  year_introduced: number;
  latitude: number;
  longitude: number;
  type_main: string;
  opening_date_clean: string;
  speed1: string;
  speed2: string;
  speed1_value: number;
  speed1_unit: string;
  speed_mph: number;
  height_value: number;
  height_unit: string;
  height_ft: string;
  inversions_clean: number;
  gforce_clean: number;
}

export interface Rides {
  rides: RidesData[];
}

const url = 'https://gist.githubusercontent.com/Jurollet/12470631232f30a81ace67add5bf839a/raw/3c514d9618b98e58a870bb2f0f01fbe3221e03f5/rides.json'

// Return Promise object for asynchronous operations
export function fetchData(): Promise<Rides> {
  return new Promise((resolve, reject) => {
    // Dynamically import node-fetch
    import('node-fetch')
    .then(({ default: fetch }) => {
      // Make HTTP GET request
      let settings = { method: "Get" };
      fetch(url, settings)
        .then((res) => res.json())
        .then((json: Rides) => {
          resolve(json);
        })
        .catch((error: Error) => { 
          reject(error);
        });
    })
    .catch((error: Error) => {
      reject(error);
    });
  });
}


export type { RidesData as RidesDataType }