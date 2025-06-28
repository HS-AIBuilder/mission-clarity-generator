interface MissionInput {
  missionFocus: string;
  audience: string;
  vision: string;
  values: string;
}

interface MissionOutput {
  mission: string;
  tagline: string;
}

export async function generateMissionClarity(input: MissionInput): Promise<MissionOutput> {
  const prompt = `
    Please help create a mission statement and tagline based on the following information:
    
    Mission Focus: ${input.missionFocus}
    Target Audience: ${input.audience}
    Vision: ${input.vision}
    Core Values: ${input.values}

    Please provide:
    1. A clear, impactful 1-2 sentence mission statement that incorporates the focus, audience, vision, and values.
    2. A memorable six-word tagline that captures the essence.

    Format your response exactly like this:
    Mission: [Your mission statement here]
    Tagline: [Your six-word tagline here]
  `;

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'You are a professional mission statement writer who creates clear, concise, and impactful mission statements and taglines.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 200
      })
    });

    if (!response.ok) {
      throw new Error(`API call failed: ${response.status}`);
    }

    const data = await response.json();
    const generatedText = data.choices[0].message.content;

    // Parse the response into mission and tagline
    const missionMatch = generatedText.match(/Mission: (.*?)(?=\n|$)/);
    const taglineMatch = generatedText.match(/Tagline: (.*?)(?=\n|$)/);

    if (!missionMatch || !taglineMatch) {
      console.error('Failed to parse API response:', generatedText);
      throw new Error('Invalid API response format');
    }

    return {
      mission: missionMatch[1].trim(),
      tagline: taglineMatch[1].trim()
    };

  } catch (error) {
    // Log the error for debugging
    console.error('Error generating mission clarity:', error);

    // Provide a meaningful fallback
    return {
      mission: `We aim to ${input.missionFocus} for ${input.audience} through ${input.vision}, guided by our values of ${input.values}.`,
      tagline: `Empowering ${input.audience} through ${input.missionFocus.split(' ').slice(0, 4).join(' ')}`
    };
  }
} 