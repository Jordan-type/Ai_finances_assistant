"use client";

import { useState } from "react";
import { CopyIcon, ThumbsDownIcon, ThumbsUpIcon } from "lucide-react";
import { toast } from "sonner";

import { useCreateChatCompletionMutation } from "@/lib/api/chat.api";
import { MultimodalInput } from "@/components/multimodal-input";
import { Button } from "@/components/ui/button";


export default function Home() {
  const [messages, setMessages] = useState<ChatCompletionMessage[]>([]);


  const [createChatCompletion] = useCreateChatCompletionMutation();

  const handleMessage = async (message: string) => {
    const updatedMessages: ChatCompletionMessage[] = [
      ...messages,
      {
        role: "user",
        content: message,
      },
    ];

    setMessages(updatedMessages);

    try {
      const response = await createChatCompletion({messages}).unwrap();
      const assitantMessage = response.choices?.[0]?.message;
      console.log("Assistant response:", assitantMessage);


      if (assitantMessage) {
        setMessages([...updatedMessages, assitantMessage]);
      } else {
        toast.error('Failed to get a response from the assistant.');
      }
    } catch (error) {
      toast.error('An error occurred while sending the message.');
      console.error('Error in handleMessage:', error);
    }
  };

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Chat Area */}
      <main className="flex-1 overflow-auto p-4">
        <div className="max-w-3xl mx-auto">
          {messages.length === 0 ? (
            <div className="text-center text-muted-foreground">
              <p>Start a conversation by sending a message below.</p>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={
                    message.role === 'user' ? 'flex justify-end' : 'flex justify-start'
                  }
                >
                  <div
                    className={
                      message.role === 'user'
                        ? 'rounded-lg bg-white text-black p-3 max-w-md shadow-sm'
                        : 'rounded-lg bg-secondary text-secondary-foreground p-3 max-w-md shadow-sm'
                    }
                  >
                    <p>{message.content || 'No response from the assistant.'}</p>
                    {message.role === 'assistant' && (
                      <div className="flex gap-2 mt-2">
                        <Button variant="outline" size="icon">
                          <CopyIcon className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="icon">
                          <ThumbsUpIcon className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="icon">
                          <ThumbsDownIcon className="w-4 h-4" />
                        </Button>
                        <p className="text-xs text-gray-500">
                          {new Date().toLocaleTimeString()}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      
      {/* Input Area */}
      <div className="p-4">
        <div className="max-w-3xl mx-auto">
          <MultimodalInput chatId="1" onSubmit={handleMessage} />
        </div>
      </div>
    </div>
  );
}
