"use client";

import { FC } from "react";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardContent, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle, AlertCircle, ArrowUpRight } from "lucide-react";
import ordinal from "ordinal";


const ProjectCard = ({project, onGoToProject, index}: ProjectCardProps) => {


  return (
    <Card
      className="group cursor-pointer hover:shadow-md transition-all"
      onClick={() => onGoToProject(project)}
    >
      <CardHeader>
        <CardTitle className="text-lg font-semibold line-clamp-1">{project.title}</CardTitle>
      </CardHeader>

      <CardContent>
        <p className="text-sm text-muted-foreground line-clamp-4">{project.shortDescription}</p>
      </CardContent>

      <CardFooter className="flex justify-between items-center">
        <div className="flex items-center gap-2 text-sm">
          {project.isReviewed ? (
            <div className="flex items-center gap-1 text-purple-600">
              <CheckCircle className="w-4 h-4" />
              Reviewed
            </div>
          ) : (
            <div className="flex items-center gap-1 text-gray-400">
              <AlertCircle className="w-4 h-4" />
              Not Reviewed
            </div>
          )}

          {index !== null && (
            <Badge variant="outline" className="text-xs border-dashed">
              {ordinal(index!)} closest match
            </Badge>
          )}
        </div>

        <Button
          size="icon"
          variant="ghost"
          onClick={() => onGoToProject(project)}
        >
          <ArrowUpRight className="w-4 h-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProjectCard;
