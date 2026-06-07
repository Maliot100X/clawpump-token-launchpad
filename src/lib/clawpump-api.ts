// ClawPump API integration
import { CLAWPUMP_API } from "../lib/solana";

export interface LaunchTokenParams {
  name: string;
  symbol: string;
  imageUrl: string;
  agentId: string;
}

export interface LaunchResponse {
  success: boolean;
  mint?: string;
  error?: string;
}

export async function launchToken(params: LaunchTokenParams): Promise<LaunchResponse> {
  try {
    const response = await fetch(`${CLAWPUMP_API}/api/launch`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    });
    
    const data = await response.json();
    return data;
  } catch (error) {
    return { success: false, error: String(error) };
  }
}

export async function getLaunches() {
  try {
    const response = await fetch(`${CLAWPUMP_API}/api/launches`);
    return await response.json();
  } catch (error) {
    return { launches: [] };
  }
}

export async function getTreasury() {
  try {
    const response = await fetch(`${CLAWPUMP_API}/api/treasury`);
    return await response.json();
  } catch (error) {
    return null;
  }
}
