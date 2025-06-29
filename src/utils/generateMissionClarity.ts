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
  // Demo mode - simulate API delay and generate placeholder response
  console.log('Demo Mode: Generating mission clarity for:', input);
  
  // Simulate API delay (1-3 seconds)
  await new Promise(resolve => setTimeout(resolve, Math.random() * 2000 + 1000));
  
  // Generate demo mission statement based on input
  const mission = `We empower ${input.audience} to achieve ${input.missionFocus} through ${input.vision}, while upholding our core values of ${input.values}. Our commitment drives meaningful impact and lasting change.`;
  
  // Generate demo tagline (aim for 6 words)
  const audienceWord = input.audience.split(' ')[0];
  const focusWords = input.missionFocus.split(' ').slice(0, 2).join(' ');
  const tagline = `Empowering ${audienceWord} Through ${focusWords} Excellence`;
  
  // Return demo response
  return {
    mission: mission,
    tagline: tagline
  };
} 