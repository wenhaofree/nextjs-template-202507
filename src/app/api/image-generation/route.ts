import { NextRequest, NextResponse } from 'next/server';
import { openai } from '@ai-sdk/openai';

// Allow longer processing time for image generation
export const maxDuration = 60;

export async function POST(req: NextRequest) {
  try {
    const { prompt, style = 'realistic', size = '1024x1024', quality = 'standard' } = await req.json();

    // Validate input
    if (!prompt || typeof prompt !== 'string') {
      return NextResponse.json(
        { 
          error: 'Prompt is required and must be a string',
          example: { prompt: 'A beautiful sunset over mountains' }
        },
        { status: 400 }
      );
    }

    if (prompt.length > 1000) {
      return NextResponse.json(
        { 
          error: 'Prompt is too long. Maximum length is 1000 characters.',
          currentLength: prompt.length
        },
        { status: 400 }
      );
    }

    // Validate size
    const validSizes = ['1024x1024', '1024x1792', '1792x1024'];
    if (!validSizes.includes(size)) {
      return NextResponse.json(
        { 
          error: 'Invalid size. Must be one of: ' + validSizes.join(', '),
          validSizes
        },
        { status: 400 }
      );
    }

    // For demo purposes, return a mock response if no OpenAI API key is provided
    if (!process.env.OPENAI_API_KEY) {
      // Simulate processing time
      await new Promise(resolve => setTimeout(resolve, 2000));

      return NextResponse.json({
        success: true,
        imageUrl: `https://picsum.photos/${size.replace('x', '/')}?random=${Date.now()}`,
        prompt,
        style,
        size,
        demo: true,
        message: 'This is a demo image. Configure OPENAI_API_KEY to generate real AI images.',
        suggestion: 'Add OPENAI_API_KEY to your environment variables to enable real image generation.'
      });
    }

    // Enhance prompt based on style
    const enhancedPrompt = enhancePromptWithStyle(prompt, style);

    try {
      // Use OpenAI DALL-E 3 for image generation
      const response = await fetch('https://api.openai.com/v1/images/generations', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'dall-e-3',
          prompt: enhancedPrompt,
          n: 1,
          size: size as '1024x1024' | '1024x1792' | '1792x1024',
          quality: quality as 'standard' | 'hd',
          response_format: 'url'
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || 'Failed to generate image');
      }

      const data = await response.json();
      const imageUrl = data.data[0]?.url;

      if (!imageUrl) {
        throw new Error('No image URL returned from OpenAI');
      }

      return NextResponse.json({
        success: true,
        imageUrl,
        prompt: enhancedPrompt,
        originalPrompt: prompt,
        style,
        size,
        quality,
        revisedPrompt: data.data[0]?.revised_prompt
      });

    } catch (openaiError) {
      console.error('OpenAI API error:', openaiError);
      
      // Return a more user-friendly error
      return NextResponse.json(
        {
          error: 'Failed to generate image with OpenAI',
          details: openaiError instanceof Error ? openaiError.message : 'Unknown OpenAI error',
          suggestion: 'Please check your OpenAI API key and try again.'
        },
        { status: 500 }
      );
    }

  } catch (error) {
    console.error('Image generation error:', error);
    
    return NextResponse.json(
      {
        error: 'An error occurred while generating the image',
        details: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}

// Helper function to enhance prompts based on style
function enhancePromptWithStyle(prompt: string, style: string): string {
  const styleEnhancements = {
    realistic: 'photorealistic, high detail, professional photography',
    artistic: 'artistic style, painterly, creative interpretation',
    cartoon: 'cartoon style, animated, colorful, playful',
    abstract: 'abstract art, geometric shapes, modern art style',
    vintage: 'vintage style, retro aesthetic, aged look',
    minimalist: 'minimalist design, clean lines, simple composition'
  };

  const enhancement = styleEnhancements[style as keyof typeof styleEnhancements] || '';
  
  if (enhancement) {
    return `${prompt}, ${enhancement}`;
  }
  
  return prompt;
}

// GET endpoint for checking API status
export async function GET() {
  return NextResponse.json({
    status: 'Image Generation API is running',
    hasApiKey: !!process.env.OPENAI_API_KEY,
    supportedSizes: ['1024x1024', '1024x1792', '1792x1024'],
    supportedStyles: ['realistic', 'artistic', 'cartoon', 'abstract', 'vintage', 'minimalist'],
    maxPromptLength: 1000,
    model: 'dall-e-3'
  });
}
