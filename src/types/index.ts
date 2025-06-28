export interface FormData {
  missionFocus: string;
  audience: string;
  vision: string;
  values: string;
}

export interface MissionClarityResult {
  missionStatement: string;
  tagline: string;
}

export interface ApiResponse {
  success: boolean;
  data?: MissionClarityResult;
  error?: string;
} 