exports.handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' }),
    }
  }

  try {
    const { expense } = JSON.parse(event.body)
    
    if (!expense) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Expense description is required' }),
      }
    }

    const OPENAI_API_KEY = process.env.OPENAI_API_KEY
    const IMGFLIP_USERNAME = process.env.IMGFLIP_USERNAME
    const IMGFLIP_PASSWORD = process.env.IMGFLIP_PASSWORD
    
    if (!OPENAI_API_KEY || !IMGFLIP_USERNAME || !IMGFLIP_PASSWORD) {
      console.error('Missing required environment variables')
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Server configuration error' }),
      }
    }

    // Generate caption with OpenAI
    const openaiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: 'You are a funny, witty meme caption writer. Create short, PG-rated captions that playfully roast bad spending decisions. Keep it light and humorous, never mean-spirited. Maximum 60 characters.'
          },
          {
            role: 'user',
            content: `Write a funny meme caption roasting this expense: "${expense}"`
          }
        ],
        max_tokens: 60,
        temperature: 0.8,
      }),
    })

    if (!openaiResponse.ok) {
      const error = await openaiResponse.text()
      console.error('OpenAI API error:', error)
      throw new Error('Failed to generate caption')
    }

    const openaiData = await openaiResponse.json()
    const caption = openaiData.choices[0].message.content.trim()

    // Create meme with Imgflip
    const imgflipParams = new URLSearchParams({
      template_id: '112126428', // Distracted Boyfriend meme
      username: IMGFLIP_USERNAME,
      password: IMGFLIP_PASSWORD,
      text0: caption.split('|')[0] || caption, // Top text
      text1: caption.split('|')[1] || '', // Bottom text (if caption contains |)
    })

    const imgflipResponse = await fetch('https://api.imgflip.com/caption_image', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: imgflipParams.toString(),
    })

    if (!imgflipResponse.ok) {
      const error = await imgflipResponse.text()
      console.error('Imgflip API error:', error)
      throw new Error('Failed to create meme image')
    }

    const imgflipData = await imgflipResponse.json()
    
    if (!imgflipData.success) {
      console.error('Imgflip error:', imgflipData.error_message)
      throw new Error(imgflipData.error_message || 'Failed to create meme')
    }

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        caption: caption,
        url: imgflipData.data.url,
      }),
    }
  } catch (error) {
    console.error('Function error:', error)
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        error: error.message || 'Failed to generate meme' 
      }),
    }
  }
}