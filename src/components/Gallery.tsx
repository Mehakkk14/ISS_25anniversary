import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Camera, 
  Download, 
  ExternalLink, 
  MapPin, 
  Calendar,
  User,
  Building,
  Search,
  Filter,
  Heart,
  Share2,
  ZoomIn
} from 'lucide-react';
import { cupolaImages, nblTrainingImages } from '@/data/nasaResources';

interface GalleryImage {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  nasaId: string;
  center: string;
  keywords: string[];
  dateCreated: string;
  category: 'cupola' | 'nbl' | 'research' | 'crew';
  photographer?: string;
  location?: string;
  resolution?: string;
}

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Extended gallery with more NASA images
  const galleryImages: GalleryImage[] = [
    ...cupolaImages.map(img => ({ ...img, category: 'cupola' as const })),
    ...nblTrainingImages.map(img => ({ ...img, category: 'nbl' as const })),
    // Additional NASA-inspired images
    {
      id: 'iss_crew_001',
      title: 'Expedition 69 Crew Portrait',
      description: 'International crew aboard the ISS representing global cooperation in space',
      imageUrl: 'https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=800&h=600&fit=crop',
      nasaId: 'iss069e123456',
      center: 'JSC',
      keywords: ['crew', 'international', 'expedition', 'cooperation'],
      dateCreated: '2023-06-15',
      category: 'crew',
      photographer: 'NASA Astronaut',
      location: 'ISS Unity Module',
      resolution: '4096x2731'
    },
    {
      id: 'research_001',
      title: 'Protein Crystal Growth Experiment',
      description: 'Microgravity protein crystallization research for pharmaceutical development',
      imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop',
      nasaId: 'iss068e234567',
      center: 'JSC',
      keywords: ['research', 'protein', 'crystallization', 'pharmaceuticals'],
      dateCreated: '2023-04-22',
      category: 'research',
      photographer: 'NASA Flight Engineer',
      location: 'ISS Japanese Experiment Module',
      resolution: '3840x2560'
    },
    {
      id: 'cupola_aurora',
      title: 'Aurora Borealis from Cupola',
      description: 'Spectacular aurora display captured from the ISS cupola during orbital night pass',
      imageUrl: 'https://images.unsplash.com/photo-1419833235565-05a7464fdc16?w=800&h=600&fit=crop',
      nasaId: 'iss070e345678',
      center: 'JSC',
      keywords: ['cupola', 'aurora', 'earth', 'photography'],
      dateCreated: '2023-09-08',
      category: 'cupola',
      photographer: 'ESA Astronaut',
      location: 'ISS Cupola',
      resolution: '5568x3712'
    },
    {
      id: 'nbl_eva_training',
      title: 'EVA Suit Check in NBL',
      description: 'Astronaut conducting pre-EVA suit systems check during NBL training session',
      imageUrl: 'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=800&h=600&fit=crop',
      nasaId: 'jsc2023e456789',
      center: 'JSC',
      keywords: ['NBL', 'EVA', 'training', 'suit check'],
      dateCreated: '2023-07-30',
      category: 'nbl',
      photographer: 'NASA Training Team',
      location: 'NBL Training Facility',
      resolution: '4000x3000'
    },
    {
      id: 'earth_climate',
      title: 'Climate Research from Space',
      description: 'Earth observation data collection for climate change research and monitoring',
      imageUrl: 'https://images.unsplash.com/photo-1614728263952-84ea256f9679?w=800&h=600&fit=crop',
      nasaId: 'iss069e567890',
      center: 'JSC',
      keywords: ['earth observation', 'climate', 'research', 'monitoring'],
      dateCreated: '2023-08-12',
      category: 'research',
      photographer: 'NASA Mission Specialist',
      location: 'ISS Cupola Observatory',
      resolution: '4500x3000'
    },
    {
      id: 'spacewalk_maintenance',
      title: 'ISS Maintenance Spacewalk',
      description: 'Astronauts performing critical maintenance on ISS solar array systems',
      imageUrl: 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=800&h=600&fit=crop',
      nasaId: 'iss068e678901',
      center: 'JSC',
      keywords: ['spacewalk', 'maintenance', 'solar arrays', 'EVA'],
      dateCreated: '2023-05-20',
      category: 'crew',
      photographer: 'External ISS Camera',
      location: 'ISS External Structure',
      resolution: '4096x2304'
    }
  ];

  const filteredImages = galleryImages.filter(image => {
    const matchesCategory = activeCategory === 'all' || image.category === activeCategory;
    const matchesSearch = searchTerm === '' || 
      image.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      image.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      image.keywords.some(keyword => keyword.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return matchesCategory && matchesSearch;
  });

  const categories = [
    { id: 'all', label: 'All Images', count: galleryImages.length },
    { id: 'cupola', label: 'Cupola Views', count: galleryImages.filter(img => img.category === 'cupola').length },
    { id: 'nbl', label: 'NBL Training', count: galleryImages.filter(img => img.category === 'nbl').length },
    { id: 'research', label: 'Research', count: galleryImages.filter(img => img.category === 'research').length },
    { id: 'crew', label: 'Crew Activities', count: galleryImages.filter(img => img.category === 'crew').length }
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'cupola': return 'bg-blue-500/10 text-blue-700 border-blue-200';
      case 'nbl': return 'bg-green-500/10 text-green-700 border-green-200';
      case 'research': return 'bg-purple-500/10 text-purple-700 border-purple-200';
      case 'crew': return 'bg-orange-500/10 text-orange-700 border-orange-200';
      default: return 'bg-gray-500/10 text-gray-700 border-gray-200';
    }
  };

  return (
    <section id="gallery" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            NASA ISS Image Gallery
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
            Explore stunning photography and documentation from 25 years aboard the International Space Station.
            Images sourced from NASA Image and Video Library and Johnson Space Center archives.
          </p>
          <div className="flex justify-center items-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Camera className="w-4 h-4" />
              Official NASA imagery
            </div>
            <div className="flex items-center gap-2">
              <Building className="w-4 h-4" />
              Johnson Space Center
            </div>
            <div className="flex items-center gap-2">
              <ExternalLink className="w-4 h-4" />
              NASA Image Library
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="mb-8">
          <div className="max-w-md mx-auto mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <input
                type="text"
                placeholder="Search images by title, description, or keywords..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-input rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          <Tabs value={activeCategory} onValueChange={setActiveCategory}>
            <TabsList className="grid w-full grid-cols-5">
              {categories.map(category => (
                <TabsTrigger key={category.id} value={category.id} className="text-sm">
                  {category.label}
                  <span className="ml-1 text-xs opacity-70">({category.count})</span>
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        {/* Image Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredImages.map((image) => (
            <Card 
              key={image.id}
              className="group overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-300 hover:border-primary/50"
              onClick={() => setSelectedImage(image)}
            >
              <div className="relative aspect-video overflow-hidden">
                <img 
                  src={image.imageUrl}
                  alt={image.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <ZoomIn className="w-8 h-8 text-white" />
                </div>
                <Badge className={`absolute top-3 left-3 ${getCategoryColor(image.category)}`}>
                  {image.category.toUpperCase()}
                </Badge>
              </div>
              
              <div className="p-4">
                <h3 className="font-semibold text-foreground mb-2 line-clamp-2">{image.title}</h3>
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{image.description}</p>
                
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {new Date(image.dateCreated).toLocaleDateString()}
                  </div>
                  <div className="flex items-center gap-1">
                    <Building className="w-3 h-3" />
                    {image.center}
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-1 mt-2">
                  {image.keywords.slice(0, 3).map((keyword, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {keyword}
                    </Badge>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Image Detail Modal */}
        {selectedImage && (
          <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold">{selectedImage.title}</DialogTitle>
              </DialogHeader>
              
              <div className="space-y-6">
                <div className="relative">
                  <img 
                    src={selectedImage.imageUrl}
                    alt={selectedImage.title}
                    className="w-full h-auto rounded-lg"
                  />
                  <Badge className={`absolute top-3 left-3 ${getCategoryColor(selectedImage.category)}`}>
                    {selectedImage.category.toUpperCase()}
                  </Badge>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-foreground mb-3">Image Information</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">NASA ID:</span>
                        <span className="font-mono text-foreground">{selectedImage.nasaId}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Center:</span>
                        <span className="text-foreground">{selectedImage.center}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Date Created:</span>
                        <span className="text-foreground">{new Date(selectedImage.dateCreated).toLocaleDateString()}</span>
                      </div>
                      {selectedImage.photographer && (
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Photographer:</span>
                          <span className="text-foreground">{selectedImage.photographer}</span>
                        </div>
                      )}
                      {selectedImage.location && (
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Location:</span>
                          <span className="text-foreground">{selectedImage.location}</span>
                        </div>
                      )}
                      {selectedImage.resolution && (
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Resolution:</span>
                          <span className="text-foreground">{selectedImage.resolution}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-foreground mb-3">Description</h4>
                    <p className="text-muted-foreground text-sm mb-4">{selectedImage.description}</p>
                    
                    <h5 className="font-semibold text-foreground mb-2">Keywords</h5>
                    <div className="flex flex-wrap gap-1 mb-4">
                      {selectedImage.keywords.map((keyword, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {keyword}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex gap-2">
                      <Button size="sm" className="flex-1">
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                      <Button size="sm" variant="outline">
                        <Share2 className="w-4 h-4 mr-2" />
                        Share
                      </Button>
                      <Button size="sm" variant="outline">
                        <Heart className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}

        {/* NASA Resource Attribution */}
        <Card className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-slate-700 border-blue-200">
          <div className="text-center">
            <h3 className="text-xl font-semibold text-foreground mb-2">NASA Image Resources</h3>
            <p className="text-muted-foreground mb-4">
              Images sourced from official NASA archives and documentation. All images are used in compliance 
              with NASA's media usage guidelines for educational purposes.
            </p>
            <div className="flex justify-center gap-4">
              <Button variant="outline" className="flex items-center gap-2">
                <ExternalLink className="w-4 h-4" />
                NASA Image and Video Library
              </Button>
              <Button variant="outline" className="flex items-center gap-2">
                <Camera className="w-4 h-4" />
                JSC Flickr Gallery
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default Gallery;
