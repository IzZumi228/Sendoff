"use server"

import { GoogleGenAI } from "@google/genai";



const apiKey = process.env.GOOGLE_GEMINI_API_KEY!
const ai = new GoogleGenAI({apiKey});


export default async function generateMissionDetails(missionType: string, missionLocation: string) {

    console.log("Mission Type", missionType , "Mission Locaion", missionLocation)

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
