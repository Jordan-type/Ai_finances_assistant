"use server";

import { ChatCompletionMessage } from "./chat-completion-message.interface";

export default async function createChatCompletion(messages: ChatCompletionMessage[]) {
  try {
    console.log(`${process.env.API_URL}/openai/chatCompletion`)
    const response = await fetch(`${process.env.API_URL}/openai/chatCompletion`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messages,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to create chat completion");
    }

    const data = await response.json();
    if (!data.choices || !data.choices[0]?.message) {
      throw new Error('Invalid response format: missing choices or message');
    }

    return data;
  } catch (error) {
    console.log("Error creating chat completion:", error);
  }
}
