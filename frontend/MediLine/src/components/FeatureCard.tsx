
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface FeatureCardProps {
  title: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
  imageUrl?: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  children,
  icon,
  className,
  imageUrl,
}) => {
  return (
    <Card className={cn("feature-card h-full overflow-hidden", className)}>
      <CardHeader className="pb-2">
        {icon && <div className="mb-2 text-medical-primary">{icon}</div>}
        <CardTitle className="text-xl font-semibold text-medical-primary">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {children}
        {imageUrl && (
          <div className="mt-4">
            <img
              src={imageUrl}
              alt={title}
              className="rounded-lg w-full h-auto object-cover"
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default FeatureCard;
