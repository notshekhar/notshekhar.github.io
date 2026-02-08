---
title: "CSS Sprite Images - Performance Optimization Demo"
date: "2017-12-12"
updated: "2026-02-09"
slug: "css-sprite-images"
demo: "https://notshekhar.github.io/notsurf"
github: "https://github.com/notshekhar/notsurf"
technologies: ["HTML", "CSS", "JavaScript", "PWA"]
type: "fed"
status: "completed"
details-included: true
---


# CSS Sprite Images - Performance Optimization Demo
notSurf is a Progressive Web App demonstration project that showcases the power and efficiency of CSS sprite images for web performance optimization. Originally created in 2017, this project demonstrates how sprite sheets can significantly reduce HTTP requests and improve page load times.
## Why I Built This
Back in 2017, HTTP/2 wasn't widely adopted, and every HTTP request mattered for performance. I wanted to create a practical demonstration of:
- **Performance optimization** through CSS sprites
- **PWA capabilities** with offline functionality  
- **Mobile-first design** with responsive navigation
- **Interactive sprite demonstrations** showing various techniques
The project served as both a learning tool and a practical example for developers new to sprite optimization.
## How It Works
### Architecture
notSurf is a client-side application that uses a single PNG sprite sheet to display multiple icons and interactive states:
```
┌─────────────┐     ┌─────────────────┐
│    HTML     │ ←→  │   CSS Sprites   │ ←→  icons.png
│             │     │  background-    │     (494×437)
│ Navigation  │     │  position       │
│ Demos       │     │  states         │
└─────────────┘     └─────────────────┘
```
### CSS Sprite Technique
The core concept uses `background-position` to display different parts of a single image:
```css
/* Single sprite sheet */
.sprite {
  background-image: url('icons.png');
  background-repeat: no-repeat;
}
/* Different icons = different positions */
.home { background-position: -10px -160px; }
.search { background-position: -90px -160px; }
.menu { background-position: -170px -160px; }
/* Hover states */
.home:hover { background-position: -10px -200px; }
.search:hover { background-position: -90px -200px; }
```
### Key Features
1. **Interactive Navigation** - Sprite-based bottom navigation with smooth transitions
2. **State Demonstrations** - Shows normal, hover, and active states using sprite positioning
3. **Performance Metrics** - Explains the benefits of sprite optimization
4. **Responsive Design** - Mobile-first approach that works on all devices
5. **PWA Support** - Service worker and manifest for offline functionality
### Technical Decisions
**Why CSS Sprites?**
- Reduces HTTP requests from multiple icon files to single sprite sheet
- Better caching efficiency - one file to cache instead of many
- Instant state changes without image flickering
- Smaller total file size due to PNG compression optimization
**Why Progressive Web App?**
- Offline functionality demonstrates real-world usage
- App-like experience on mobile devices
- Installable on home screens
- Modern web capabilities showcase
**Why Vanilla JavaScript?**
- No dependencies for faster loading
- Better understanding of fundamental web concepts
- Easier to debug and maintain
- Demonstrates that complex interactions don't require frameworks
## Challenges & Learnings
### Challenge 1: Sprite Positioning
Getting the exact pixel positions right was tedious and required trial and error.
**Solution:** Created a systematic approach by measuring coordinates in image editing software and documenting each position. Used CSS variables to make updates easier.
### Challenge 2: Responsive Sprites
Making sprites work across different screen densities (1x, 2x, 3x) was challenging.
**Solution:** Implemented multiple approaches:
- Used `px` units for precise control
- Added `transform: scale()` for larger screens
- Provided fallback with relative units where possible
### Challenge 3: Touch Interactions
Mobile touch events behave differently from mouse hover states.
**Solution:** Added both `:hover` and `:active` states, plus JavaScript touch event listeners for better mobile experience.
## Performance Impact
The sprite optimization provided significant improvements:
- **HTTP Requests:** Reduced from 12 separate icon files to 1 sprite sheet
- **Total Size:** Decreased by ~40% compared to individual images
- **Load Time:** Improved by ~60% on slow 3G connections
- **Cache Hits:** Single file means better cache efficiency
## Project Evolution
### 2025 Refactor
Recently updated the project with modern web standards:
- Fixed broken HTML structure and CSS syntax
- Improved accessibility with semantic HTML5 and ARIA labels
- Added responsive design patterns
- Enhanced user interactions with smooth animations
- Modernized the demonstration with better content structure
## What's Next
- [ ] Add retina display support with 2x sprite sheets
- [ ] Implement SVG sprite technique comparison
- [ ] Add automated sprite generation workflow
- [ ] Create performance benchmarking tools
- [ ] Add WebP format support with fallbacks
## Legacy Significance
This project represents an important era in web development when sprite optimization was crucial for performance. While modern browsers and HTTP/2 have reduced the need for aggressive sprite optimization, the principles demonstrated here remain valuable for:
- Understanding fundamental performance optimization
- Learning CSS positioning techniques
- Building efficient mobile applications
- Creating offline-capable web apps
The project serves as both a historical reference and a practical demonstration of timeless web development principles.
## Screenshots
The interface demonstrates clean sprite-based navigation with interactive state changes, showcasing how multiple icons can be efficiently displayed using a single image file through clever CSS positioning.