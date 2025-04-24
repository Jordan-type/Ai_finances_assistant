import * as z from "zod";

// ────────────────────────────────────────────────────────────────
// Schema for a project
// ────────────────────────────────────────────────────────────────

export const projectSchema = z.object({
    title: z.string().min(10, "Title must be at least 10 characters").max(50, "Title must not exceed 50 characters"),
    shortDescription: z.string().min(50, "Short description must be at least 50 characters").max(150, "Short description must not exceed 150 characters"),
    longDescription: z.string().min(100, "Long description must be at least 100 characters").max(2500, "Long description must not exceed 2500 characters"),
    githubLink: z.string().url("GitHub link must be a valid URL").optional().or(z.literal("")),
    demoLink: z.string().url("Demo link must be a valid URL").optional().or(z.literal("")),
});

export type ProjectFormData = z.infer<typeof projectSchema>;


// ────────────────────────────────────────────────────────────────
// Schema for a hackathon
// ────────────────────────────────────────────────────────────────

export const hackathonSchema = z.object({
    title: z.string().min(1, 'Title is required'),
    description: z.string().optional(),
    theme: z.string().min(1, "At least one theme is required"),
    technologies: z.string().min(1, "At least one technology is required"),
    startDate: z.string().refine((d) => !isNaN(Date.parse(d)), "Invalid start date"),
    endDate: z.string().refine((d) => !isNaN(Date.parse(d)), "Invalid end date"),
});
  
export type HackathonFormData = z.infer<typeof hackathonSchema>;