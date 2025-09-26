import 'dotenv/config';
import fetch from 'node-fetch';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function handler(event, context) {
  try {
    // 1. Parse user input
    const body = JSON.parse(event.body || '{}');
    const expense = body.expense || "an unnecessary expense";

    // 2. Ask GPT to create a funny caption
    const gptResponse = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: `Write a short, funny, PG-rated meme caption roasting someone for: ${expense}. Make it snappy.`,
        },
      ],
      max_tokens: 40,
      temperature: 0.9,
    });

    const caption = gptResponse.choices[0].message.content.trim();

    // 3. Call Imgflip API to generate meme
    const memeResponse = await fetch("https://api.imgflip.com/caption_image", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        template_id: "112126428", // Distracted Boyfriend meme
        username: process.env.IMGFLIP_USERNAME,
        password: process.env.IMGFLIP_PASSWORD,
        text0: caption,
        text1: "",
      }),
    });

    const data = await memeResponse.json();

    if (!data.success) {
      throw new Error(data.error_message || "Failed to generate meme");
    }

    // 4. Return caption + meme URL
    return {
      statusCode: 200,
      body: JSON.stringify({
        caption,
        url: data.data.url,
      }),
    };
  } catch (err) {
    console.error("Error in generateMeme function:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
}
