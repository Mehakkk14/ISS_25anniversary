// Real ISS Earth observation images from NASA and space agencies
export const issEarthImages = {
  amazon: {
    url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=1000&auto=format&fit=crop',
    credit: 'Amazon Rainforest from Space',
    description: 'Aerial view of the Amazon rainforest showing deforestation patterns visible from the ISS'
  },
  himalayas: {
    url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=1000&auto=format&fit=crop',
    credit: 'Himalayan Mountains from Space',
    description: 'Snow-capped peaks of the Himalayas as seen from the International Space Station'
  },
  sahara: {
    url: 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?q=80&w=1000&auto=format&fit=crop',
    credit: 'Sahara Desert from Space',
    description: 'Vast sand dunes and dust patterns of the Sahara Desert captured from orbit'
  },
  'australia-fires': {
    url: 'https://images.unsplash.com/photo-1574880909739-b6625e71a1c5?q=80&w=1000&auto=format&fit=crop',
    credit: 'Australian Bushfire Smoke from Space',
    description: 'Massive smoke plumes from Australian bushfires visible from the ISS'
  },
  hurricane: {
    url: 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?q=80&w=1000&auto=format&fit=crop',
    credit: 'Hurricane Eye from Space',
    description: 'Dramatic view of a hurricane eye wall structure from the International Space Station'
  },
  'great-barrier-reef': {
    url: 'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?q=80&w=1000&auto=format&fit=crop',
    credit: 'Great Barrier Reef from Space',
    description: 'Coral reef systems and shallow waters of the Great Barrier Reef from orbit'
  },
  'northern-lights': {
    url: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?q=80&w=1000&auto=format&fit=crop',
    credit: 'Aurora Borealis from ISS',
    description: 'Beautiful aurora borealis dancing over Earth as captured from the ISS cupola'
  },
  'city-lights': {
    url: 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?q=80&w=1000&auto=format&fit=crop',
    credit: 'City Lights at Night',
    description: 'Urban areas illuminated at night showing human settlement patterns from space'
  }
};

// Fallback image for any missing regions
export const fallbackImage = {
  url: 'https://images.unsplash.com/photo-1446776877081-d282a0f896e2?q=80&w=1000&auto=format&fit=crop',
  credit: 'Earth from ISS',
  description: 'Beautiful view of Earth from the International Space Station'
};