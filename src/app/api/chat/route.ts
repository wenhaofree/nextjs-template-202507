import { openai } from '@ai-sdk/openai';
import { streamText, tool, convertToCoreMessages } from 'ai';
import { z } from 'zod';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { messages, model = 'gpt-4o-mini' } = await req.json();

    // Validate messages
    if (!messages || !Array.isArray(messages)) {
      return new Response(
        JSON.stringify({ error: 'Messages array is required' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // For demo purposes, we'll use a mock response if no OpenAI API key is provided
    if (!process.env.OPENAI_API_KEY) {
      return new Response(
        JSON.stringify({
          error: 'OpenAI API key not configured. This is a demo response.',
          demo: true,
          suggestion: 'Add OPENAI_API_KEY to your environment variables to enable real ChatGPT functionality.'
        }),
        {
          status: 200,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    }

    // Convert UI messages to core messages if needed
    const modelMessages = convertToCoreMessages(messages);

    const result = await streamText({
      model: openai(model),
      system: `You are ChatGPT, a helpful AI assistant created by OpenAI. You are knowledgeable, friendly, and aim to provide accurate and helpful responses. You can:
      - Answer questions on a wide variety of topics
      - Help with analysis and problem-solving
      - Assist with creative tasks like writing and brainstorming
      - Use tools when available to provide more accurate information

      Always be honest about your limitations and suggest when users might need to consult other sources for specialized information.`,
      messages: modelMessages,
      tools: {
        weather: tool({
          description: 'Get current weather information for a specific location',
          parameters: z.object({
            location: z.string().describe('The city and country/state to get weather for (e.g., "San Francisco, CA")'),
          }),
          execute: async ({ location }) => {
            // Mock weather data for demo - in production, integrate with a real weather API
            const conditions = ['Sunny', 'Cloudy', 'Rainy', 'Partly Cloudy', 'Overcast'];
            const temperature = Math.round(Math.random() * (90 - 32) + 32);
            const condition = conditions[Math.floor(Math.random() * conditions.length)];

            return {
              location,
              temperature,
              condition,
              humidity: `${Math.round(Math.random() * 40 + 40)}%`,
              windSpeed: `${Math.round(Math.random() * 20 + 5)} mph`,
              description: `Current weather in ${location}: ${temperature}°F, ${condition}`,
            };
          },
        }),
        calculator: tool({
          description: 'Perform mathematical calculations and solve math problems',
          parameters: z.object({
            expression: z.string().describe('The mathematical expression to evaluate (e.g., "2 + 2", "sqrt(16)", "sin(30)")'),
          }),
          execute: async ({ expression }) => {
            try {
              // Enhanced calculator for demo - in production, use a proper math parser like mathjs
              let cleanExpression = expression
                .replace(/[^0-9+\-*/().sqrt\s]/g, '')
                .replace(/sqrt\(/g, 'Math.sqrt(');

              const result = eval(cleanExpression);
              return {
                expression,
                result: result.toString(),
                explanation: `The result of ${expression} is ${result}`,
              };
            } catch (error) {
              return {
                expression,
                error: 'Invalid mathematical expression. Please use basic arithmetic operators (+, -, *, /) and functions like sqrt().',
                suggestion: 'Try expressions like "2 + 2", "10 * 5", or "sqrt(16)"',
              };
            }
          },
        }),
        search: tool({
          description: 'Search for current information and recent events',
          parameters: z.object({
            query: z.string().describe('The search query to find information about'),
          }),
          execute: async ({ query }) => {
            // Mock search results for demo - in production, integrate with a real search API
            const mockResults = [
              {
                title: `Latest information about "${query}"`,
                snippet: `This is a demo search result for ${query}. In a real implementation, this would connect to a search API like Google, Bing, or a specialized knowledge base.`,
                url: 'https://example.com/search',
                relevance: 'high'
              },
              {
                title: `${query} - Recent Updates`,
                snippet: `Recent developments and news related to ${query}. This would contain real-time information in a production environment.`,
                url: 'https://example.com/news',
                relevance: 'medium'
              }
            ];

            return {
              query,
              results: mockResults,
              totalResults: mockResults.length,
              searchTime: '0.1 seconds',
              note: 'This is a demo search. Real implementation would provide current information.'
            };
          },
        }),

        codeAnalysis: tool({
          description: 'Analyze, review, or explain code snippets',
          parameters: z.object({
            code: z.string().describe('The code snippet to analyze'),
            language: z.string().optional().describe('Programming language (e.g., javascript, python, typescript)'),
            task: z.enum(['explain', 'review', 'optimize', 'debug']).describe('What to do with the code'),
          }),
          execute: async ({ code, language = 'unknown', task }) => {
            // Mock code analysis for demo
            const analysis = {
              explain: `This ${language} code snippet appears to: [Code explanation would go here]`,
              review: `Code review for ${language}: [Detailed review would go here]`,
              optimize: `Optimization suggestions for ${language}: [Optimization tips would go here]`,
              debug: `Potential issues in ${language} code: [Debug information would go here]`
            };

            return {
              code,
              language,
              task,
              analysis: analysis[task],
              suggestions: [
                'Consider adding error handling',
                'Add type annotations for better code clarity',
                'Consider performance implications'
              ],
              note: 'This is a demo analysis. Real implementation would provide detailed code insights.'
            };
          },
        }),
      },
      maxSteps: 5,
      temperature: 0.7,
      maxTokens: 2000,
    });

    return result.toDataStreamResponse();
  } catch (error) {
    console.error('Chat API error:', error);
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
