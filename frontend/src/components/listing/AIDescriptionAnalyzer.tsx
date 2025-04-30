
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface AIDescriptionAnalyzerProps {
  description: string;
  keywords: string[];
}

interface StructuredDetails {
  summary: string;
  features: string[];
  materials?: string[];
  dimensions?: string;
  condition?: string;
  additionalInfo?: string[];
}

const AIDescriptionAnalyzer = ({ description, keywords }: AIDescriptionAnalyzerProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [structuredDetails, setStructuredDetails] = useState<StructuredDetails | null>(null);

  // Simulate AI processing of the description
  useEffect(() => {
    // Mock AI analysis process
    const analyzeDescription = () => {
      setIsLoading(true);
      
      // In a real implementation, this would call an AI service
      setTimeout(() => {
        // Extract features from description
        const features = [];
        if (description.toLowerCase().includes("drawer")) features.push("Storage drawers");
        if (description.toLowerCase().includes("solid")) features.push("Solid construction");
        if (description.toLowerCase().includes("cable")) features.push("Cable management");
        if (description.toLowerCase().includes("warm finish")) features.push("Warm finish");
        if (description.toLowerCase().includes("spacious")) features.push("Spacious work surface");
        
        // Extract materials
        const materials = [];
        if (description.toLowerCase().includes("oak")) materials.push("Oak");
        if (description.toLowerCase().includes("wood")) materials.push("Wood");
        
        // Extract dimensions
        const dimensionsMatch = description.match(/(\d+)cm\s*x\s*(\d+)cm\s*x\s*(\d+)cm/);
        const dimensions = dimensionsMatch ? `${dimensionsMatch[1]}cm × ${dimensionsMatch[2]}cm × ${dimensionsMatch[3]}cm` : undefined;
        
        // Extract condition
        const conditionMatch = description.match(/Condition:\s*([^.]+)/i);
        const condition = conditionMatch ? conditionMatch[1].trim() : "Good";
        
        // Generate summary
        const summary = description.split('.')[0] + '.';
        
        setStructuredDetails({
          summary,
          features: features.length > 0 ? features : ["Quality product", "Versatile design"],
          materials: materials.length > 0 ? materials : undefined,
          dimensions,
          condition,
          additionalInfo: keywords.map(k => k.charAt(0).toUpperCase() + k.slice(1))
        });
        
        setIsLoading(false);
      }, 1000);
    };
    
    if (description) {
      analyzeDescription();
    }
  }, [description, keywords]);

  if (isLoading) {
    return (
      <Card className="mt-8">
        <CardHeader>
          <CardTitle className="text-lg">
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 rounded-full bg-eco-medium animate-pulse"></div>
              AI Analysis in progress...
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="h-4 bg-muted/50 rounded animate-pulse"></div>
            <div className="h-4 bg-muted/50 rounded animate-pulse w-5/6"></div>
            <div className="h-4 bg-muted/50 rounded animate-pulse w-4/6"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!structuredDetails) return null;

  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle className="text-lg">
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 rounded-full bg-eco-medium"></div>
            AI-Powered Product Analysis
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <h4 className="font-medium text-sm text-muted-foreground mb-1">Product Summary</h4>
            <p>{structuredDetails.summary}</p>
          </div>
          
          <div>
            <h4 className="font-medium text-sm text-muted-foreground mb-2">Key Features</h4>
            <ul className="list-disc ml-5 space-y-1">
              {structuredDetails.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>
          
          <div className="grid grid-cols-2 gap-6">
            {structuredDetails.materials && (
              <div>
                <h4 className="font-medium text-sm text-muted-foreground mb-2">Materials</h4>
                <div className="flex flex-wrap gap-2">
                  {structuredDetails.materials.map((material, index) => (
                    <Badge key={index} variant="outline">{material}</Badge>
                  ))}
                </div>
              </div>
            )}
            
            {structuredDetails.dimensions && (
              <div>
                <h4 className="font-medium text-sm text-muted-foreground mb-2">Dimensions</h4>
                <p>{structuredDetails.dimensions}</p>
              </div>
            )}
          </div>
          
          {structuredDetails.condition && (
            <div>
              <h4 className="font-medium text-sm text-muted-foreground mb-2">Condition</h4>
              <Badge className="bg-green-100 text-green-800 hover:bg-green-200">{structuredDetails.condition}</Badge>
            </div>
          )}
          
          {structuredDetails.additionalInfo && structuredDetails.additionalInfo.length > 0 && (
            <div>
              <h4 className="font-medium text-sm text-muted-foreground mb-2">Tags</h4>
              <div className="flex flex-wrap gap-2">
                {structuredDetails.additionalInfo.map((info, index) => (
                  <Badge key={index} variant="outline">{info}</Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default AIDescriptionAnalyzer;
