// Real estate themed background images (Unsplash - royalty free)
const backgroundImages = [
  "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1920&h=1080&fit=crop", // Luxury modern home
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&h=1080&fit=crop", // Modern house exterior
  "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1920&h=1080&fit=crop", // Apartment building
  "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1920&h=1080&fit=crop", // Luxury villa
  "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1920&h=1080&fit=crop", // Modern interior
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&h=1080&fit=crop", // Skyline view
  "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&h=1080&fit=crop", // House with pool
  "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1920&h=1080&fit=crop", // Beach house
  "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=1920&h=1080&fit=crop", // Modern office building
  "https://images.unsplash.com/photo-1600210492493-0946911123ea?w=1920&h=1080&fit=crop", // Luxury apartment
  "https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=1920&h=1080&fit=crop", // Rooftop view
  "https://images.unsplash.com/photo-1600607687920-4e2a5cf821b4?w=1920&h=1080&fit=crop", // City skyline
  "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1920&h=1080&fit=crop", // Suburban home
  "https://images.unsplash.com/photo-1600210491892-d06b3f2bf7f6?w=1920&h=1080&fit=crop", // Modern architecture
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&h=1080&fit=crop" // Contemporary house
];

// Get random image (changes on each refresh)
export const getRandomBackground = () => {
  const randomIndex = Math.floor(Math.random() * backgroundImages.length);
  return backgroundImages[randomIndex];
};

export default backgroundImages;