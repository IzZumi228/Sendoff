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


export async function generateMissionEndMessage(successRate: number, hero: string,) {


  const roll = Math.random() * 100;

  const missionStatus = roll <= successRate ? "Success!"  : "Fail";
  console.log("GOT A HERO", hero)
  

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Your are helper in Hero Dispatch game. Your task is to generate ending message of the mission. 
    The success rate was ${successRate}
    The mission status was ${missionStatus}
    The hero sent to the job was ${hero}
    Generate short summary of what happened, 
    ALWAYS AT THE END OF THE SUMMARY INCLUDE Casualties info, and damage cost.
    Do not change the word, it should be strictly 
    
    Casualties: 2
    Damage Cost: $34,700 


    Do not generate anything else. NO headers, 
    NO P.S, NO Options, one, short-medium summary of events.
    `,
  });

  console.log("mission summar: ", response.text)
  return response.text;
}
