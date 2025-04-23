"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { PlusCircle, X } from "lucide-react";

import CustomModal from "@/components/CustomModal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormItem, FormControl, FormLabel, FormMessage, FormField } from "@/components/ui/form";

import { projectSchema, ProjectFormData } from "@/lib/schemas";
import { useCreateProjectMutation } from "@/lib/api/projects.api";

const ProjectModal: React.FC<ProjectModalProps> = ({ isOpen, onClose }) => {

  const [createProject] = useCreateProjectMutation();
  const [loading, setLoading] = useState(false);

  const methods = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      title: "",
      shortDescription: "",
      longDescription: "",
      githubLink: "",
      demoLink: "",
    },
  });

  const clearForm = () => {
    methods.reset();
  };

  const onSubmit = async (data: ProjectFormData) => {
    try {
      setLoading(true);
      console.log("Submitting project:", data);
      await createProject(data).unwrap();
      console.log("Project submitted successfully!");
      
      toast.success("Project submitted!");
      onClose();
      clearForm();
    } catch (error) {
      console.error("Submission failed:", error);
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <CustomModal isOpen={isOpen} onClose={onClose}>
      <div className="p-6 bg-white dark:bg-zinc-900 rounded-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Add Project</h2>
          <button onClick={onClose} className="hover:text-red-500 transition">
            <X className="w-6 h-6" />
          </button>
        </div>

        <Form {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={methods.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Project title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={methods.control}
              name="shortDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Short Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Short summary" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={methods.control}
              name="longDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Long Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Detailed explanation" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={methods.control}
                name="githubLink"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>GitHub Link</FormLabel>
                    <FormControl>
                      <Input placeholder="https://github.com/project" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={methods.control}
                name="demoLink"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Live Demo</FormLabel>
                    <FormControl>
                      <Input placeholder="https://demo.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex justify-end gap-4 pt-4">
              <Button type="button" variant="outline" onClick={clearForm}>
                Clear
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? "Submitting..." : (
                  <>
                    <PlusCircle className="w-5 h-5 mr-2" />
                    Submit Project
                  </>
                )}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </CustomModal>
  );
};

export default ProjectModal;
