
import { useState, useEffect } from "react";
import { MapPin } from "lucide-react";

interface LocationMapProps {
  lat: number;
  lng: number;
  title: string;
  address: string;
  isNGO?: boolean;
  isRecycler?: boolean;
}

const LocationMap = ({ lat, lng, title, address, isNGO = false, isRecycler = false }: LocationMapProps) => {
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [isMapError, setIsMapError] = useState(false);

  useEffect(() => {
    // Simulate map loading with fallback error handling
    const timer = setTimeout(() => {
      try {
        setIsMapLoaded(true);
      } catch (e) {
        console.error("Map loading error:", e);
        setIsMapError(true);
      }
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  // Generate OpenStreetMap URL with better zoom and parameters
  const mapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${lng-0.02}%2C${lat-0.02}%2C${lng+0.02}%2C${lat+0.02}&amp;layer=mapnik&amp;marker=${lat}%2C${lng}`;
  const osmUrl = `https://www.openstreetmap.org/?mlat=${lat}&mlon=${lng}#map=16/${lat}/${lng}`;

  return (
    <div className="w-full space-y-3 animate-fade-in">
      <div className="flex items-start gap-2">
        <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
        <div>
          <p className="font-medium">{address}</p>
          <p className="text-sm text-muted-foreground">
            {isNGO ? "NGO Location • " : isRecycler ? "Recycler Location • " : ""}
            Approximate location shown
          </p>
        </div>
      </div>
      
      <div className="aspect-video rounded-md border overflow-hidden bg-muted/30 shadow-md hover:shadow-lg transition-all">
        {isMapLoaded && !isMapError ? (
          <div className="relative w-full h-full">
            <iframe 
              src={mapUrl}
              className="w-full h-full border-none"
              title={`Map showing location of ${title}`}
              loading="lazy"
              onError={() => setIsMapError(true)}
              sandbox="allow-scripts allow-same-origin"
            ></iframe>
            
            <div className="absolute bottom-0 left-0 right-0 bg-white/90 p-3 flex justify-between items-center">
              <div>
                <p className="font-medium text-sm">
                  {isNGO ? "📍 NGO: " : isRecycler ? "♻️ Recycler: " : ""}{title}
                </p>
                <p className="text-xs text-muted-foreground">{address}</p>
              </div>
              <a 
                href={osmUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-primary underline hover:text-primary-foreground bg-primary/10 px-2 py-1 rounded hover:bg-primary/20 transition-colors"
              >
                View on OpenStreetMap
              </a>
            </div>
          </div>
        ) : isMapError ? (
          <div className="h-full w-full bg-muted/30 flex items-center justify-center p-4">
            <div className="text-center">
              <p className="text-muted-foreground mb-2">Could not load the map</p>
              <a 
                href={osmUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-primary underline hover:text-primary-foreground bg-primary/10 px-4 py-2 rounded"
              >
                View on OpenStreetMap
              </a>
            </div>
          </div>
        ) : (
          <div className="h-full w-full bg-muted/30 flex items-center justify-center">
            <div className="animate-spin h-8 w-8 border-4 border-eco-medium border-t-transparent rounded-full"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LocationMap;
