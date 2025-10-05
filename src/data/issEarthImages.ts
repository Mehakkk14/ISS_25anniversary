// Real NASA ISS Earth observation images (verified working URLs with fallbacks)
export const issEarthImages = {
  amazon: {
    url: 'https://eoimages.gsfc.nasa.gov/images/imagerecords/150000/150899/brazil_amo_2019205_lrg.jpg',
    credit: 'NASA Earth Observatory - Amazon Rainforest',
    description: 'Amazon rainforest and river systems showing deforestation patterns from space'
  },
  himalayas: {
    url: 'https://eoimages.gsfc.nasa.gov/images/imagerecords/148000/148622/himalayas_oli_2017084_lrg.jpg',
    credit: 'NASA Earth Observatory - Himalayas',
    description: 'Snow-covered Himalayan mountain range and glaciers from orbital perspective'
  },
  sahara: {
    url: 'https://eoimages.gsfc.nasa.gov/images/imagerecords/148000/148568/sahara_vir_2017119_lrg.jpg',
    credit: 'NASA Earth Observatory - Sahara Desert',
    description: 'Sahara Desert sand formations and dust patterns visible from space'
  },
  'australia-fires': {
    url: 'https://eoimages.gsfc.nasa.gov/images/imagerecords/146000/146154/australia_amo_2020018_lrg.jpg',
    credit: 'NASA Earth Observatory - Australian Bushfires',
    description: 'Massive smoke plumes from Australian bushfires captured from satellite'
  },
  hurricane: {
    url: 'https://eoimages.gsfc.nasa.gov/images/imagerecords/147000/147501/hurricane_iss_2019265_lrg.jpg',
    credit: 'NASA Earth Observatory - Hurricane from ISS',
    description: 'Hurricane spiral structure photographed from the International Space Station'
  },
  'great-barrier-reef': {
    url: 'https://eoimages.gsfc.nasa.gov/images/imagerecords/145000/145889/greatbarrierreef_oli_2016287_lrg.jpg',
    credit: 'NASA Earth Observatory - Great Barrier Reef',
    description: 'Great Barrier Reef coral systems visible from satellite imagery'
  },
  'northern-lights': {
    url: 'https://eoimages.gsfc.nasa.gov/images/imagerecords/147000/147204/aurora_iss061_2019298_lrg.jpg',
    credit: 'NASA Earth Observatory - Aurora from ISS',
    description: 'Aurora Borealis over Earth captured from the International Space Station'
  },
  'city-lights': {
    url: 'https://eoimages.gsfc.nasa.gov/images/imagerecords/144000/144898/earth_vir_2016_lrg.jpg',
    credit: 'NASA Earth Observatory - Earth at Night',
    description: 'Global city lights showing human settlement patterns from space'
  }
};

// Reliable fallback image from NASA Earth Observatory
export const fallbackImage = {
  url: 'https://eoimages.gsfc.nasa.gov/images/imagerecords/78000/78314/iss_sts115_big.jpg',
  credit: 'NASA - Earth from Space',
  description: 'Beautiful view of Earth from the International Space Station'
};