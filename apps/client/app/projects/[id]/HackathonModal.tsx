"use client";

import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { PlusCircle, X } from "lucide-react";

import CustomModal from "@/components/CustomModal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage, } from "@/components/ui/form";

import { hackathonSchema, HackathonFormData } from "@/lib/schemas";
import { useCreateHackathonMutation } from "@/lib/api/projects.api";


const HackathonModal: FC<HackathonModalProps> = ({ isOpen, onClose }) => {
  const [createHackathon] = useCreateHackathonMutation();
  const [loading, setLoading] = useState(false);

  const form = useForm<HackathonFormData>({
    resolver: zodResolver(hackathonSchema),
    defaultValues: {
      title: "",
      description: "",
      theme: "",
      technologies: "",
      startDate: "",
      endDate: "",
    },
  });

  const onSubmit = async (data: HackathonFormData) => {
    setLoading(true);
    
    // split comma‑lists into true string[] arrays
    const payload = {
        ...data,
        theme: data.theme.split(",").map((t) => t.trim()).filter(Boolean),
        technologies: data.technologies.split(",").map((t) => t.trim()).filter(Boolean),
        startDate: new Date(data.startDate),
        endDate: new Date(data.endDate),
    };

    try {
      await createHackathon(payload).unwrap();
      toast.success("Hackathon created!");
      form.reset();
      onClose();
    } catch {
      toast.error("Failed to create hackathon");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <CustomModal isOpen={isOpen} onClose={onClose}>
      <div className="p-6 bg-white dark:bg-zinc-900 rounded-lg max-w-md mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Create Hackathon</h2>
          <button onClick={onClose} className="hover:text-red-500">
            <X className="w-6 h-6" />
          </button>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-5"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Hackathon title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description (optional)</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Brief description" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="theme"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Themes</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Comma-separated (e.g. DeFi, NFT)"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="technologies"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Technologies</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Comma-separated (e.g. Solidity, React)"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Start Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="endDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>End Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex justify-end gap-4 pt-4">
              <Button
                variant="outline"
                onClick={() => form.reset()}
                disabled={loading}
              >
                Clear
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? "Creating…" : (
                  <>
                    <PlusCircle className="w-5 h-5 mr-2" />
                    Create Hackathon
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

export default HackathonModal;
