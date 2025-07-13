import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { prompt, model = 'gpt-4o-mini', temperature = 0.7, maxTokens = 1000 } = await req.json();

    if (!prompt || typeof prompt !== 'string') {
      return new Response(
        JSON.stringify({
          error: 'Prompt is required and must be a string',
          example: { prompt: 'Write a short story about...' }
        }),
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    }

    if (prompt.length > 4000) {
      return new Response(
        JSON.stringify({
          error: 'Prompt is too long. Maximum length is 4000 characters.',
          currentLength: prompt.length
        }),
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    }

    // For demo purposes, we'll use a mock response if no OpenAI API key is provided
    if (!process.env.OPENAI_API_KEY) {
      // Create a mock streaming response
      const encoder = new TextEncoder();
      const stream = new ReadableStream({
        start(controller) {
          const mockResponse = `This is a demo completion for: "${prompt}"\n\nIn a real implementation, this would connect to an AI model and generate relevant content based on your prompt. The response would be streamed in real-time for a better user experience.\n\nTo enable real AI functionality, please configure your OpenAI API key in the environment variables.`;
          
          // Simulate streaming by sending chunks
          const words = mockResponse.split(' ');
          let index = 0;
          
          const sendChunk = () => {
            if (index < words.length) {
              const chunk = words[index] + ' ';
              controller.enqueue(encoder.encode(`data: ${JSON.stringify({ content: chunk })}\n\n`));
              index++;
              setTimeout(sendChunk, 50); // Simulate typing delay
            } else {
              controller.enqueue(encoder.encode('data: [DONE]\n\n'));
              controller.close();
            }
          };
          
          sendChunk();
        },
      });

      return new Response(stream, {
        headers: {
          'Content-Type': 'text/plain; charset=utf-8',
          'Cache-Control': 'no-cache',
          'Connection': 'keep-alive',
        },
      });
    }

    const result = await streamText({
      model: openai(model),
      prompt,
      system: `You are a helpful AI assistant powered by ChatGPT. Provide clear, concise, and helpful responses.

      Guidelines:
      - Be accurate and informative
      - Use a friendly and professional tone
      - Structure your responses clearly
      - Provide examples when helpful
      - Acknowledge limitations when appropriate`,
      temperature,
      maxTokens,
    });

    return result.toDataStreamResponse();
  } catch (error) {
    console.error('Completion API error:', error);
    return new Response(
      JSON.stringify({
        error: 'An error occurred while processing your request.',
        details: error instanceof Error ? error.message : 'Unknown error'
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
}
