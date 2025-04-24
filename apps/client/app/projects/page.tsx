"use client";

import { useEffect, useState } from "react";
import { CogIcon, PlusCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useGetAllProjectsQuery } from "@/lib/api/projects.api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ProjectCard from "@/components/ProjectCard";
import Loading from "@/components/Loading";
import ProjectModal from "./[id]/ProjectModal";
import HackathonModal from "./[id]/HackathonModal";

const ProjectsPage = () => {
  const router = useRouter();
  const { data, isLoading } = useGetAllProjectsQuery();
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isHackathonModalOpen, setIsHackathonModalOpen] = useState(false);

  const filteredProjects = data?.projects?.filter((project: Project) =>
    project.title.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  const handleGoToProject = (project: Project) => {
    console.log("Navigating to project:", project);
    router.push(`/projects/${project._id}`)
  }

  if (isLoading) return <Loading />;

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold">Hackathon Projects</h2>
        <div className="flex items-center gap-4">
          <Input
            placeholder="Search by title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-xs"
          />
          <Button onClick={() => setIsModalOpen(true)}>
            <PlusCircle className="w-4 h-4 mr-2" />
            Create Project
          </Button>
          <Button onClick={() => setIsHackathonModalOpen(true)} variant="secondary">
            <CogIcon className="w-4 h-4 mr-2" /> Create Hackathon
          </Button>
        </div>
      </div>

      {filteredProjects.length === 0 ? (
        <p className="text-muted-foreground">No projects found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProjects.map((project: Project, index: number) => (
            <ProjectCard
              key={project._id}
              project={project}
              index={index}
              onGoToProject={handleGoToProject}
            />
          ))}
        </div>
      )}
      
      <ProjectModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <HackathonModal isOpen={isHackathonModalOpen} onClose={() => setIsHackathonModalOpen(false)} />
    </div>
  );
};

export default ProjectsPage;
