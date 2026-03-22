"use server"

import { GoogleGenAI } from "@google/genai";



const apiKey = process.env.GOOGLE_GEMINI_API_KEY!
const ai = new GoogleGenAI({ apiKey });


export default async function generateMissionDetails(missionType: string, missionLocation: string) {

  console.log("Mission Type", missionType, "Mission Locaion", missionLocation)

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Your are helper in Hero Dispatch game. Your task is to generate descriptions for the missions. 
    Mission type is ${missionType} and the event should be set in ${missionLocation}. 
    Your descriptions should be short 
    and informative. Generate ONLY descriptions, no various options, no headers, footers, ONLY the description

    `,
  });

  console.log("response: ", response.text)
  return response.text;
}


export async function generateMissionEndMessage(
  missionStatus: string,
  sabotageStatus: boolean,
  hero: string,
  isVillain: boolean
) {
  const regularPrompt = `
You are a narrator in the Hero Dispatch game.
Generate a short dramatic mission summary for the following outcome.

Mission Status: ${missionStatus}
Character Sent: ${hero}
Character Type: ${isVillain ? "VILLAIN (selfish, ruthless, dangerous — cooperated for their own reasons)" : "HERO"}

Style rules:
- ONE short-to-medium paragraph. No headers, no lists, no dialogue.
- Comic-book narrator tone with slight exaggeration.
- If mission status is "Fail", the tone should feel grim and costly.
- If mission status is "Success", the tone should feel triumphant but acknowledge collateral damage.
- If the character is a villain, describe them as self-serving even in cooperation.
- Scale damage cost to the incident: downtown/city disasters = millions, suburban/park = hundreds of thousands, small venue (bar, restaurant, alley) = thousands.

End the summary EXACTLY with these two lines and nothing else after:

Casualties: [number]
Damage Cost: $[number with commas and appropriate scale]
`;

  const sabotagePrompt = `
You are a narrator in the Hero Dispatch game.
Generate a short dramatic mission summary. A villain was sent and deliberately sabotaged the mission from the inside.

Mission Status: ${missionStatus} (but sabotage made it worse regardless)
Character Sent: ${hero}
Character Type: VILLAIN — acted as a saboteur

Narrative rules:
- Describe the villain's deliberate betrayal: selfish actions, hidden agenda, or covert damage.
- The tone must feel dramatic, ironic, and slightly dark.
- If mission status was already "Fail", the result should feel catastrophic or disastrous.
- If mission status was "Success", the mission technically succeeded but the villain caused hidden damage or set something sinister in motion.
- Scale damage cost to the incident: downtown/city disasters = millions, suburban/park = hundreds of thousands, small venue (bar, restaurant, alley) = thousands. Sabotage should push the cost higher than a normal outcome.

Style rules:
- ONE short-to-medium paragraph. No headers, no lists, no dialogue.
- Comic-book narrator tone with dramatic irony and dark exaggeration.

End the summary EXACTLY with these two lines and nothing else after:

Casualties: [number]
Damage Cost: $[number with commas and appropriate scale]
`;

  const prompt = sabotageStatus ? sabotagePrompt : regularPrompt;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
  });

  console.log("mission summary: ", response.text);
  return response.text;
}