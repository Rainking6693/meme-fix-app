# MemeFixApp

Turn your bad spending decisions into good memes! This web app generates hilarious memes based on your questionable expenses using AI.

## Features

- Enter any expense description (e.g., "I spent $500 on coffee")
- AI generates a funny, PG-rated caption roasting your spending
- Creates a meme using the popular "Distracted Boyfriend" template
- Download your meme to share with friends
- Clean, mobile-responsive design

## Tech Stack

- **Frontend**: React + Vite
- **Styling**: Custom CSS with gradient effects
- **Backend**: Netlify Functions (serverless)
- **APIs**: 
  - OpenAI GPT-4o-mini for caption generation
  - Imgflip API for meme creation

## Local Development

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- OpenAI API key
- Imgflip account (free)

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/meme-fix-app.git
   cd meme-fix-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` with your credentials:
   ```
   OPENAI_API_KEY=your_openai_api_key_here
   IMGFLIP_USERNAME=your_imgflip_username
   IMGFLIP_PASSWORD=your_imgflip_password
   ```

   **Getting API Keys:**
   - OpenAI: Sign up at [platform.openai.com](https://platform.openai.com) and create an API key
   - Imgflip: Create a free account at [imgflip.com](https://imgflip.com/signup)

4. **Run the development server**
   ```bash
   npm run dev
   ```
   
   The app will be available at `http://localhost:5173`

5. **Test with Netlify CLI (optional)**
   
   To test the Netlify Functions locally:
   ```bash
   npm run netlify
   ```
   
   This will run at `http://localhost:8888`

## Deployment to Netlify

### Option 1: Deploy via GitHub

1. Push your code to GitHub
2. Connect your GitHub repo to Netlify
3. Netlify will auto-detect the configuration from `netlify.toml`
4. Add environment variables in Netlify dashboard:
   - Go to Site Settings > Environment Variables
   - Add `OPENAI_API_KEY`, `IMGFLIP_USERNAME`, `IMGFLIP_PASSWORD`
5. Deploy!

### Option 2: Deploy via Netlify CLI

1. Install Netlify CLI globally:
   ```bash
   npm install -g netlify-cli
   ```

2. Login to Netlify:
   ```bash
   netlify login
   ```

3. Initialize and deploy:
   ```bash
   netlify init
   netlify deploy --prod
   ```

4. Set environment variables:
   ```bash
   netlify env:set OPENAI_API_KEY your_key_here
   netlify env:set IMGFLIP_USERNAME your_username
   netlify env:set IMGFLIP_PASSWORD your_password
   ```

## Project Structure

```
meme-fix-app/
├── netlify.toml          # Netlify configuration
├── package.json          # Dependencies and scripts
├── vite.config.js        # Vite configuration
├── index.html            # HTML entry point
├── .env.example          # Environment variables template
├── src/
│   ├── App.jsx           # Main app component
│   ├── main.jsx          # React entry point
│   ├── components/
│   │   ├── MemeForm.jsx  # Expense input form
│   │   └── MemeDisplay.jsx # Meme display with download
│   └── styles.css        # App styling
└── netlify/
    └── functions/
        └── generateMeme.js # Serverless API endpoint
```

## API Endpoints

### POST `/api/generateMeme`

Generates a meme based on the expense description.

**Request Body:**
```json
{
  "expense": "I spent $500 on coffee"
}
```

**Response:**
```json
{
  "caption": "When your coffee budget could fund a vacation",
  "url": "https://i.imgflip.com/xxxxxx.jpg"
}
```

## Troubleshooting

### Common Issues

1. **"Server configuration error"**
   - Check that all environment variables are set correctly
   - Verify your API keys are valid

2. **Meme not displaying**
   - Ensure Imgflip credentials are correct
   - Check browser console for CORS errors

3. **Build fails on Netlify**
   - Verify Node version compatibility
   - Check build logs for missing dependencies

4. **Function timeout**
   - OpenAI API might be slow; function has 10s timeout
   - Consider implementing retry logic

## Contributing

Pull requests are welcome! Please feel free to submit issues and enhancement requests.

## License

MIT

## Credits

- Meme templates provided by [Imgflip](https://imgflip.com)
- AI captions powered by [OpenAI](https://openai.com)
- Built with [React](https://react.dev) and [Vite](https://vite.dev)