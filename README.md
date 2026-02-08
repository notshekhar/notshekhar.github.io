# notshekhar.github.io

Personal portfolio website inspired by Ollama's clean, minimal design.

<p>&nbsp;<img align="center" src="https://github-readme-stats.vercel.app/api?username=notshekhar&show_icons=true&text_color=daf7dc&bg_color=151515" alt="notshekhar" /></p>

![](https://komarev.com/ghpvc/?username=notshekhar&label=Profile%20views&color=3e9077)

## Design Philosophy

- **Clean & Minimal**: Inspired by Ollama's model pages
- **Fast**: No heavy frameworks, vanilla JavaScript
- **Responsive**: Works on all screen sizes
- **Dark Mode**: Full dark/light theme support

## Tech Stack

- **Build Tool**: Vite (optional, for development)
- **CSS**: Vanilla CSS with CSS variables for theming
- **JavaScript**: Vanilla ES6+ modules
- **Fonts**: Inter, JetBrains Mono (Google Fonts)

## Project Structure

```
.
├── index.html          # Main HTML file
├── css/
│   └── style.css       # All styles
├── js/
│   ├── app.js          # Main application logic
│   ├── notshekhar.json # Projects data
│   └── talks.json      # Talks/articles data
├── assets/             # Static assets (images, fonts)
├── public/             # Public assets for Vite build
├── package.json        # NPM configuration
└── vite.config.js     # Vite configuration
```

## Development

### Option 1: Static Files (Simple)

Since this is a static site, you can simply open `index.html` in a browser or use any static file server:

```bash
# Python 3
python -m http.server 8000

# Node.js (npx serve)
npx serve .

# PHP
php -S localhost:8000
```

### Option 2: Vite (Recommended)

For development with hot module replacement:

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Features

### Projects Section
- Filter by category (All, ML, Full Stack, Frontend, Coding Challenges, Design)
- Real-time search
- Grouped by year
- Technology tags
- Direct links to GitHub and demos

### Talks Section
- Articles and video content
- Organized by year

### About Section
- Profile with bio
- Tech stack display
- Social links (GitHub, Twitter, LinkedIn, Email)

### UI/UX
- Clean header with navigation
- Search bar
- Theme toggle (dark/light)
- Smooth transitions
- Fully responsive

## Data Format

### Projects (notshekhar.json)

```json
[
  {
    "year": "2024",
    "data": [
      {
        "title": "Project Name",
        "url": "https://github.com/...",
        "date": "May 27, 2024",
        "type": "ml",
        "technologies": ["Next.js", "React"],
        "demo": "https://..."
      }
    ]
  }
]
```

Types: `ml` (Machine Learning), `bed` (Full Stack), `fed` (Frontend), `cc` (Coding Challenges), `ld` (Design)

### Talks (talks.json)

```json
[
  {
    "year": 2018,
    "data": [
      {
        "title": "Talk Title",
        "url": "https://...",
        "type": "article",
        "date": "Dec, 25 2018"
      }
    ]
  }
]
```

## Deployment

This site is configured for GitHub Pages:

1. Push to `main` branch
2. Enable GitHub Pages in repository settings
3. Select source: Deploy from branch → main → / (root)

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Social

<p align="center">
<a href="https://linkedin.com/in/notshekhar" target="blank"><img align="center" src="https://cdn.jsdelivr.net/npm/simple-icons@3.0.1/icons/linkedin.svg" alt="Shekhar Tyagi" height="25" width="25" /></a>
<a href="https://fb.com/notshekhar" target="blank"><img align="center" src="https://cdn.jsdelivr.net/npm/simple-icons@3.0.1/icons/facebook.svg" alt="Shekhar Tyagi" height="25" width="25" /></a>
<a href="https://instagram.com/notshekhar" target="blank"><img align="center" src="https://cdn.jsdelivr.net/npm/simple-icons@3.0.1/icons/instagram.svg" alt="Shekhar Tyagi" height="25" width="25" /></a>
</p>

## License

MIT
