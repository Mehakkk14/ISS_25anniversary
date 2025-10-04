import { useState } from 'react';

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  // Placeholder images - these would be real ISS images in production
  const images = [
    {
      url: 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=800&h=600&fit=crop',
      title: 'ISS in Orbit',
      description: 'The International Space Station orbiting Earth',
    },
    {
      url: 'https://images.unsplash.com/photo-1581822261290-991b38693d1b?w=800&h=600&fit=crop',
      title: 'Earth from Space',
      description: 'Stunning view of Earth from the ISS',
    },
    {
      url: 'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?w=800&h=600&fit=crop',
      title: 'Astronaut EVA',
      description: 'Astronaut performing extravehicular activity',
    },
    {
      url: 'https://images.unsplash.com/photo-1454789548928-9efd52dc4031?w=800&h=600&fit=crop',
      title: 'Cupola Module',
      description: 'View from the ISS Cupola observation module',
    },
    {
      url: 'https://images.unsplash.com/photo-1516339901601-2e1b62dc0c45?w=800&h=600&fit=crop',
      title: 'Interior View',
      description: 'Inside the International Space Station',
    },
    {
      url: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=800&h=600&fit=crop',
      title: 'Night Pass',
      description: 'ISS passing over Earth at night',
    },
  ];

  return (
    <section id="gallery" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Gallery
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A visual journey through 25 years of remarkable moments aboard the ISS.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((image, index) => (
            <div
              key={index}
              onClick={() => setSelectedImage(index)}
              className="relative group cursor-pointer overflow-hidden rounded-lg border border-border hover:border-primary/50 transition-all duration-300"
            >
              <img
                src={image.url}
                alt={image.title}
                className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-lg font-semibold text-foreground mb-1">
                    {image.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">{image.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
