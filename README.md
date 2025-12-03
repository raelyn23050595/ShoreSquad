# 🌊 ShoreSquad - Beach Cleanup Crew Organizer

Rally your crew, track weather, and hit the next beach cleanup with our dope map app!

## 🎯 Project Overview

ShoreSquad is a web application designed to mobilize young people to clean beaches by providing:
- **Interactive Map** - Find and organize beach cleanups near you
- **Crew Management** - Rally your crew and track team members
- **Weather Integration** - Plan cleanups based on real-time weather conditions
- **Social Features** - Connect with like-minded eco-warriors
- **Impact Tracking** - See the real-world difference your crew makes

## 📁 Project Structure

```
ShoreSquad/
├── index.html          # HTML5 boilerplate with semantic markup
├── css/
│   └── styles.css      # Responsive design with brand color palette
├── js/
│   └── app.js          # Interactive features and app logic
├── assets/             # Images, icons, and other media
├── .gitignore          # Git ignore configuration
├── .vscode/
│   └── settings.json   # VS Code Live Server config
└── README.md           # This file
```

## 🎨 Brand & Design

### Color Palette
- **Primary Blue**: #0077BE - Trust and water connection
- **Teal**: #00D4D4 - Energy and eco-friendliness
- **Sand Yellow**: #F4D35E - Beach vibes and optimism
- **Eco Green**: #2ECC71 - Sustainability
- **Coral Orange**: #FF6B6B - Social connection and urgency
- **Dark Navy**: #1A3A52 - Text and professionalism

### Design Principles
✅ **Mobile-First** - Optimized for young audience primarily on mobile  
✅ **Accessible** - WCAG 2.1 AA compliant (keyboard nav, screen reader support)  
✅ **Performant** - Lazy loading, service workers, efficient animations  
✅ **Social** - Micro-interactions that celebrate crew growth and impact  

## 🚀 Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- VS Code with Live Server extension (optional but recommended)

### Installation

1. **Clone or download the repository**
   ```bash
   cd ShoreSquad
   ```

2. **Open with Live Server**
   - Right-click `index.html` → "Open with Live Server"
   - Or press `Alt + L` then `Alt + O` in VS Code

3. **Access the app**
   - Open `http://localhost:5500` in your browser

### Manual Setup (without Live Server)
```bash
# Start a simple HTTP server
python -m http.server 8000
# Visit http://localhost:8000
```

## ⚡ JavaScript Features

### Core Functionality
- **Leaflet.js Integration** - Interactive map for cleanup locations
- **Geolocation API** - Auto-detect user location
- **Local Storage** - Persist user data and preferences
- **Service Workers** - Offline support (offline-first approach)
- **Intersection Observer** - Performance-optimized lazy loading
- **Event Delegation** - Efficient event handling

### Performance Optimizations
- CSS-driven animations (GPU accelerated)
- Intersection Observer for image lazy loading
- Deferred script loading
- LocalStorage caching
- Request Animation Frame for smooth animations

## 🎯 UX Features

### User Experience Highlights
1. **Smooth Navigation** - Mobile menu, sticky header, smooth scrolling
2. **Interactive Map** - Click cleanups to zoom and see details
3. **Social Proof** - Display crew size, completed cleanups, impact stats
4. **Micro-interactions** - Hover effects, click animations, notifications
5. **Accessibility** - Full keyboard support, ARIA labels, color contrast compliance

### Responsive Breakpoints
- Mobile: < 480px
- Tablet: 480px - 768px
- Desktop: > 768px

## 📊 Current Mock Data

### Sample Cleanups
- Mission Beach Cleanup (Dec 10)
- Pacific Beach Eco Day (Dec 15)
- Ocean Beach Community Effort (Dec 20)

### Sample Crews
- Ocean Warriors (24 members, 8 cleanups)
- Beach Guardians (16 members, 5 cleanups)
- Coastal Crusaders (20 members, 12 cleanups)

## 🔧 Development

### Making Changes
1. Edit `index.html` for structure
2. Modify `css/styles.css` for styling
3. Update `js/app.js` for functionality
4. Changes auto-reload with Live Server

### Adding New Features
- **New Pages**: Add new HTML sections and update navigation
- **New Styles**: Use existing CSS variables for consistency
- **New Interactivity**: Extend `ShoreSquadApp` object in `app.js`

### Git Workflow
```bash
# View status
git status

# Commit changes
git add .
git commit -m "🌊 Your commit message"

# View history
git log --oneline
```

## 📱 Browser Support
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🌍 External Dependencies
- **Leaflet.js** - CDN: Lightweight mapping library
- **OpenStreetMap** - Free, open-source map tiles

## 📝 Future Enhancements

- [ ] User authentication system
- [ ] Real weather API integration (OpenWeatherMap)
- [ ] Photo upload for cleanup documentation
- [ ] Real-time notifications for new cleanups
- [ ] Social sharing integration
- [ ] Database backend (Firebase/MongoDB)
- [ ] Mobile app (React Native/Flutter)
- [ ] Impact analytics dashboard
- [ ] Corporate partnership matching
- [ ] Environmental impact calculator

## 📚 Resources

- [Leaflet.js Documentation](https://leafletjs.com/)
- [MDN Web Docs](https://developer.mozilla.org/)
- [WCAG 2.1 Accessibility Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [CSS-Tricks](https://css-tricks.com/)

## 🤝 Contributing

We welcome contributions! Here's how:
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m '🌊 Add AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the MIT License.

## 🌊 Connect With Us

- **Instagram**: @shoresquad
- **Twitter**: @shoresquad
- **TikTok**: @shoresquad

---

**Built with 🌊 by eco-warriors. Let's save our shores together!**
