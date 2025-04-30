
import { useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface ImageCarouselProps {
  images: string[];
  title: string;
}

const ImageCarousel = ({ images, title }: ImageCarouselProps) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  return (
    <div className="mb-8">
      <Carousel className="w-full mb-4">
        <CarouselContent>
          {images.map((img, index) => (
            <CarouselItem key={index} className="basis-full">
              <div className="rounded-lg overflow-hidden h-96">
                <img 
                  src={img} 
                  alt={`${title} - image ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="-left-4" />
        <CarouselNext className="-right-4" />
      </Carousel>
      <div className="flex gap-2 overflow-auto py-2">
        {images.map((img, index) => (
          <div 
            key={index}
            className={`w-24 h-24 flex-shrink-0 rounded-md overflow-hidden border-2 cursor-pointer hover:opacity-75 transition-opacity ${
              index === activeImageIndex ? "border-eco-medium" : "border-transparent"
            }`}
            onClick={() => setActiveImageIndex(index)}
          >
            <img 
              src={img} 
              alt={`Thumbnail ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageCarousel;
