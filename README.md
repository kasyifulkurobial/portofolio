# 🎨 Portfolio Website - Kasyiful Kurobi Alqorrosyai'

Portfolio website profesional dengan animasi anime.js yang diinstall via **npm** dan menggunakan **Vite** sebagai build tool.

## 🚀 Features

### ✨ Design & Aesthetics
- **Technical-Refined Minimalism** - Clean, developer-focused design
- **Custom Typography** - Syne + JetBrains Mono
- **Gradient Accents** - Cyan-to-purple gradient
- **Dark/Light Theme** - Toggle dengan smooth transitions
- **Fully Responsive** - Mobile-first design

### 🎬 Animations (anime.js via npm)
- **Hero Section** - Sequential text reveals, staggered animations
- **Scroll Triggers** - Intersection Observer API
- **Skill Bars** - Animated progress bars
- **Timeline** - Sequential reveals
- **Hover Effects** - Scale, rotation, shadow
- **60fps Performance** - Optimized animations

## 🛠️ Tech Stack

- **HTML5** - Semantic markup
- **CSS3** - Custom properties, Grid, Flexbox
- **JavaScript ES6+** - Module imports
- **anime.js** - Installed via npm (v3.2.2)
- **Vite** - Build tool & dev server
- **Google Fonts** - Syne & JetBrains Mono

## 📁 Project Structure

```
portfolio/
├── index.html              # Main HTML file
├── src/
│   ├── css/
│   │   └── style.css      # Styling
│   └── js/
│       └── main.js        # Animations with anime.js import
├── public/                # Static assets
├── package.json           # npm dependencies
├── vite.config.js         # Vite configuration
└── README.md
```

## 🚀 Installation & Usage

### Prerequisites
- Node.js (v14 atau lebih tinggi)
- npm atau yarn

### 1. Clone atau Download Project

```bash
# Clone repository (jika ada)
git clone [repository-url]
cd portfolio

# Atau extract zip file
unzip portfolio.zip
cd portfolio
```

### 2. Install Dependencies

```bash
# Install semua dependencies termasuk anime.js
npm install
```

Dependencies yang akan diinstall:
- `animejs` (v4.2.2) - Animation library
- `vite` (v6.0.0) - Build tool

### 3. Development Mode

```bash
# Start development server
npm run dev
```

Server akan berjalan di `http://localhost:3000` dan otomatis reload saat ada perubahan code.

### 4. Build untuk Production

```bash
# Build optimized production files
npm run build
```

Output akan ada di folder `dist/` yang siap di-deploy.

### 5. Preview Production Build

```bash
# Preview production build
npm run preview
```

## 📦 NPM Scripts

```json
{
  "dev": "vite",                    // Development server
  "build": "vite build",            // Production build
  "preview": "vite preview"         // Preview production build
}
```

## 🎯 anime.js Implementation

### Import dari npm (v4)

```javascript
// src/js/main.js
import { animate, stagger } from 'animejs';

// Alias untuk kompatibilitas dengan syntax lama
const anime = animate;
anime.stagger = stagger;

// Gunakan anime seperti biasa
anime({
  targets: '.element',
  translateX: [0, 100],
  duration: 1000
});
```

### Contoh Animations

#### Hero Timeline
```javascript
const heroTimeline = anime.timeline({
    easing: 'easeOutExpo'
});

heroTimeline
    .add({ 
        targets: '.hero-label', 
        opacity: [0, 1],
        translateY: [20, 0]
    })
    .add({ 
        targets: '.hero-subtitle .word',
        opacity: [0, 1],
        delay: anime.stagger(100)
    });
```

#### Skill Progress Bars
```javascript
anime({
    targets: '.skill-progress',
    width: [0, '90%'],
    duration: 1200,
    easing: 'easeOutExpo'
});
```

#### Scroll-Triggered Animations
```javascript
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            anime({
                targets: entry.target,
                opacity: [0, 1],
                translateY: [30, 0],
                duration: 800
            });
        }
    });
});
```

## 🎨 Customization

### Update Content
Edit `index.html` untuk mengubah:
- Informasi personal
- Project descriptions
- Skills & experience
- Contact details

### Modify Styles
Edit `src/css/style.css`:
```css
:root {
    --color-accent-primary: #YOUR_COLOR;
    --color-accent-secondary: #YOUR_COLOR;
}
```

### Adjust Animations
Edit `src/js/main.js`:
```javascript
// Ubah duration, easing, atau delay
anime({
    duration: 800,        // milliseconds
    easing: 'easeOutCubic',
    delay: anime.stagger(100)
});
```

## 📱 Responsive Design

### Breakpoints
- **Desktop**: > 768px
- **Tablet**: 768px
- **Mobile**: < 768px

## ⚡ Performance

### Optimizations
- Vite untuk fast HMR & bundling
- Tree-shaking untuk anime.js
- Code splitting
- Lazy loading untuk images
- 60fps animations
- Reduced motion support

### Build Output
```bash
npm run build
```

Output:
```
dist/
├── index.html
├── assets/
│   ├── index-[hash].js      # Bundled JavaScript
│   ├── index-[hash].css     # Bundled CSS
│   └── anime-[hash].js      # anime.js chunk
```

## 🌐 Deployment

### Static Hosting

#### Vercel
```bash
npm install -g vercel
vercel
```

#### Netlify
```bash
npm run build
# Drag & drop dist/ folder ke Netlify
```

#### GitHub Pages
```bash
npm run build
# Push dist/ folder ke gh-pages branch
```

## 🔧 Troubleshooting

### Issue: Module not found 'animejs'
```bash
# Hapus node_modules dan reinstall
rm -rf node_modules package-lock.json
npm install
```

### Issue: Vite not found
```bash
# Install vite globally atau gunakan npx
npm install -g vite
# atau
npx vite
```

### Issue: Port 3000 sudah digunakan
Edit `vite.config.js`:
```javascript
export default defineConfig({
  server: {
    port: 3001  // Ganti port
  }
});
```

## 📚 Resources

### anime.js Documentation
- Official Docs: https://animejs.com/documentation/
- GitHub: https://github.com/juliangarnier/anime
- npm: https://www.npmjs.com/package/animejs

### Vite Documentation
- Official Docs: https://vitejs.dev/
- GitHub: https://github.com/vitejs/vite

## 🎓 Animation Patterns

### Page Load
- Navigation fade-in
- Hero sequential reveals
- Staggered word animations

### Scroll-Triggered
- Section headers
- Card grids with stagger
- Progress bars
- Timeline items

### Interactions
- Button hover scale
- Card elevation
- Icon rotations
- Theme toggle

## 📄 Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Opera 76+

Requires:
- ES6 Modules
- CSS Grid & Flexbox
- Intersection Observer API

## 🤝 Credits

**Developer**: Kasyiful Kurobi Alqorrosyai'  
**Animation Library**: anime.js by Julian Garnier  
**Build Tool**: Vite by Evan You  
**Fonts**: Google Fonts

## 📬 Contact

- Email: kkasarjana@gmail.com
- GitHub: [@kasyifulkurobial](https://github.com/kasyifulkurobial)
- LinkedIn: [Kasyiful Kurobi Alqorrosyai'](https://www.linkedin.com/in/kasyiful-kurobi-alqorrosyai)

---

**Built with 💻 | Animated with anime.js (npm) ✨ | Powered by Vite ⚡**