declare global {
  interface ChatCompletionMessage {
    role: string;
    content: string;
  }

  interface CustomFixedModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
  }

  interface ProjectModalProps {
    isOpen: boolean;
    onClose: () => void;
  }

  type ProjectCardProps = {
    project: Project;
    onGoToProject: (project: Project) => void;
    index?: number | null;
  };

  type QuestionAnswer = {
    question: string;
    answer: string;
  };
  
  type ChatMessage = {
    input: string;
    output: string;
    _id?: string;
  };

  type Project = {
    _id: string;
    title: string;
    teamName?: string;
    teamMembers?: string[];

    shortDescription: string;
    longDescription: string;
    githubLink: string;
    demoLink?: string;
    submissionTime?: Date;
  
    marketAgentAnalysis?: QuestionAnswer[];
    codeAgentAnalysis?: QuestionAnswer[];
    chatHistory?: ChatMessage[];
  
    theme?: string;
    isReviewed: boolean;
  };

  // The Hackathon type is used to represent a hackathon event.

  interface HackathonModalProps {
    isOpen: boolean;
    onClose: () => void;
  }

  type Hackathon = {
    _id: string;
    name: string;
    description: string;
    startDate: Date;
    endDate: Date;
    location?: string; // Optional location field
    isActive: boolean;
  };

}

export {};
