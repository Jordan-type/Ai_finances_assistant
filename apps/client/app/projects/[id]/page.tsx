"use client";

import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useGetProjectByIdQuery, useUpdateReviewStatusMutation } from "@/lib/api/projects.api";
import { useRunChatAgentMutation } from "@/lib/api/agents.api";
import { ArrowLeft, ArrowUpRight, CheckCircle, XCircle } from "lucide-react";

const ProjectDetailsPage = () => {
  const params = useParams();
  const id = params.id as string
  const { data: project, isLoading } = useGetProjectByIdQuery(id);
  const [toggleReview] = useUpdateReviewStatusMutation();
  const [runChatAgent] = useRunChatAgentMutation();

  const [chatInput, setChatInput] = useState("");
  const [chatHistory, setChatHistory] = useState<{ input: string; output: string }[]>([]);
  const [isChatLoading, setIsChatLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  console.log("chatHistory", project?.chatHistory);

  useEffect(() => {
    if (!isLoading && project) {
      console.log("✅ Loaded project:", project);
      
    }
  }, [isLoading, project, chatHistory]);
  
  const handleSendChat = async () => {
    if (!chatInput || isChatLoading) return;
    setIsChatLoading(true);

    const response = await runChatAgent({ 
      projectId: id, 
      question: chatInput, 
      chatHistory: project?.chatHistory || [], 
      repoUrl: project?.githubLink,
      projectMeta: {
        idea: project?.shortDescription,
        theme: project?.theme,
        technologies: [],
      },  
    }).unwrap();

    setChatHistory(response.chatHistory);
    setChatInput("");
    setIsChatLoading(false);

    setTimeout(() => scrollRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
  };

  const handleToggleReview = async () => {
    await toggleReview({ project_id: id, isReviewed: !project?.isReviewed }).unwrap();
  };

  if (isLoading || !project) return <div className="p-6">Loading project details...</div>;

  return (
<div className="max-w-7xl mx-auto p-6 space-y-8">
      <div className="flex justify-between items-center">
        <Button variant="ghost" size="sm" onClick={() => history.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

        <Button variant="outline" onClick={handleToggleReview}>
          {project.isReviewed ? (
            <>
              <XCircle className="mr-2 h-4 w-4 text-red-500" />
              Unreview
            </>
          ) : (
            <>
              <CheckCircle className="mr-2 h-4 w-4 text-green-600" />
              Mark as Reviewed
            </>
          )}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* LEFT COLUMN */}
        <div className="col-span-2 space-y-8">
          <div>
            <h2 className="text-xl font-semibold">Project Details</h2>
            <Separator className="my-2" />
            <div>
              <strong className="text-muted-foreground block">Title</strong>
              <p>{project.title}</p>
            </div>
            <div>
              <strong className="text-muted-foreground block">Short Description</strong>
              <p>{project.shortDescription}</p>
            </div>
            <div>
              <strong className="text-muted-foreground block">Long Description</strong>
              <p className="text-sm text-muted-foreground whitespace-pre-wrap">{project.longDescription}</p>
            </div>
            <div>
              <strong className="text-muted-foreground block">Theme</strong>
              <Badge variant="outline">{project.theme}</Badge>
            </div>
            <div className="flex gap-2 pt-2">
              {project.githubLink && (
                <Button size="icon" asChild variant="outline">
                  <a href={project.githubLink} target="_blank">
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                </Button>
              )}
              {project.demoLink && (
                <Button size="icon" asChild variant="outline">
                  <a href={project.demoLink} target="_blank">
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                </Button>
              )}
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-primary">Market Analysis</h2>
            <Separator className="my-2" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {project.marketAgentAnalysis?.map((entry, idx) => (
                <div key={idx} className="bg-muted p-4 rounded shadow-sm">
                  <strong className="block text-sm text-muted-foreground">{entry.question}</strong>
                  <p className="text-sm mt-2">{entry.answer}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-primary">Code Analysis</h2>
            <Separator className="my-2" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {project.codeAgentAnalysis?.map((entry, idx) => (
                <div key={idx} className="bg-muted p-4 rounded shadow-sm">
                  <strong className="block text-sm text-muted-foreground">{entry.question}</strong>
                  <p className="text-sm mt-2">{entry.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN - CHAT */}
        <div className="col-span-1 space-y-6">
          <h2 className="text-lg font-semibold text-primary">Chat with J</h2>
          <Separator className="my-2" />

          <ScrollArea className="h-[28rem] border rounded-md p-3 space-y-4">
            {Array.isArray(project.chatHistory) && project.chatHistory.map((chat, idx) => (
              <div key={chat._id || idx}>
                <p className="text-sm font-medium text-muted-foreground">You:</p>
                <p className="text-sm mb-2">{chat.input}</p>
                <p className="text-sm font-medium text-purple-600">J:</p>
                <p className="text-sm">{chat.output}</p>
                <Separator className="my-2" />
              </div>
            ))}
            <div ref={scrollRef} />
          </ScrollArea>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendChat();
            }}
            className="flex gap-2"
          >
            <Input
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder="Ask J something..."
            />
            <Button type="submit" disabled={isChatLoading}>
              {isChatLoading ? "Sending..." : "Send"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailsPage;
