import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message, programmingLanguage = 'General Programming', conversationHistory = [] } = await req.json();

    console.log('Received request:', { message, programmingLanguage, historyLength: conversationHistory.length });

    if (!openAIApiKey) {
      console.error('OpenAI API key not configured');
      throw new Error('OpenAI API key not configured');
    }

    // Build conversation context
    const messages = [
      {
        role: 'system',
        content: `You are a helpful ${programmingLanguage} programming assistant. You are knowledgeable about programming concepts, best practices, debugging, and code optimization. 

        Your personality:
        - Friendly, patient, and encouraging
        - Clear and concise explanations
        - Provide practical examples
        - Help users learn step by step
        - Encourage best practices

        Guidelines:
        - Always provide accurate information
        - If you're unsure, say so
        - Offer to help with related topics
        - Use code examples when appropriate
        - Explain complex concepts in simple terms
        - Be supportive of learners at all levels

        Focus areas for ${programmingLanguage}:
        - Syntax and language features
        - Best practices and conventions
        - Common pitfalls and how to avoid them
        - Debugging techniques
        - Performance optimization
        - Code organization and structure
        - Popular frameworks and libraries
        - Real-world applications`
      }
    ];

    // Add conversation history
    conversationHistory.forEach((msg: any) => {
      messages.push({
        role: msg.role,
        content: msg.content
      });
    });

    // Add current message
    messages.push({
      role: 'user',
      content: message
    });

    console.log('Calling OpenAI API with model: gpt-4o-mini');

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: messages,
        max_tokens: 1000,
        temperature: 0.7,
        presence_penalty: 0.1,
        frequency_penalty: 0.1
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('OpenAI API error:', errorData);
      throw new Error(`OpenAI API error: ${response.status} - ${errorData.error?.message || 'Unknown error'}`);
    }

    const data = await response.json();
    console.log('OpenAI API response received successfully');
    
    const assistantResponse = data.choices[0]?.message?.content || 'I apologize, but I encountered an error processing your request.';

    return new Response(JSON.stringify({ response: assistantResponse }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in chat-assistant function:', error);
    return new Response(JSON.stringify({ 
      error: 'Internal server error',
      message: error.message 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});