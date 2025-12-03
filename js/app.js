/**
 * ShoreSquad - Main JavaScript Application
 * Features: Map integration, crew management, weather tracking, performance optimization
 */

// ============================================
// 1. STATE MANAGEMENT
// ============================================

const ShoreSquadApp = {
    state: {
        crews: [],
        cleanups: [],
        userLocation: null,
        mapInstance: null,
        notifications: [],
        stats: {
            totalCleanups: 0,
            totalCrew: 0,
            plasticCollected: 0,
            beachesClean: 0
        }
    },

    // ============================================
    // 2. INITIALIZATION
    // ============================================

    init() {
        console.log('🌊 ShoreSquad App Initializing...');
        this.setupEventListeners();
        this.loadLocalData();
        this.initializeMap();
        this.loadMockData();
        this.updateUI();
        this.setupServiceWorker();
    },

    // ============================================
    // 3. EVENT LISTENERS
    // ============================================

    setupEventListeners() {
        // Mobile menu toggle
        const menuToggle = document.querySelector('.menu-toggle');
        const navMenu = document.getElementById('navMenu');
        
        if (menuToggle) {
            menuToggle.addEventListener('click', () => {
                navMenu.classList.toggle('active');
                menuToggle.setAttribute('aria-expanded', 
                    navMenu.classList.contains('active'));
            });
        }

        // Close menu when link is clicked
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
            });
        });

        // CTA Buttons
        const joinCrewBtn = document.getElementById('joinCrewBtn');
        const startCrewBtn = document.getElementById('startCrewBtn');
        const ctaBtn = document.querySelector('.cta-section .btn');

        if (joinCrewBtn) {
            joinCrewBtn.addEventListener('click', () => {
                this.showNotification('Welcome to ShoreSquad! 🎉', 'success');
                this.scrollToSection('#crews');
            });
        }

        if (startCrewBtn) {
            startCrewBtn.addEventListener('click', () => {
                this.showNotification('Create a crew to get started!', 'info');
                this.scrollToSection('#crews');
            });
        }

        if (ctaBtn) {
            ctaBtn.addEventListener('click', () => {
                this.showNotification('Let\'s save the ocean! 🌊', 'success');
            });
        }

        // Cleanup list click handlers
        document.addEventListener('click', (e) => {
            if (e.target.closest('.cleanup-item')) {
                const item = e.target.closest('.cleanup-item');
                const cleanupId = item.dataset.id;
                this.selectCleanup(cleanupId);
            }
        });
    },

    // ============================================
    // 4. MAP INITIALIZATION (Leaflet)
    // ============================================

    initializeMap() {
        const mapContainer = document.getElementById('mapContainer');
        if (!mapContainer) return;

        // Default to San Diego beaches
        const defaultLocation = [32.7157, -117.1611];

        try {
            this.state.mapInstance = L.map('mapContainer').setView(defaultLocation, 11);

            // Add map tiles
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '© OpenStreetMap contributors',
                maxZoom: 19
            }).addTo(this.state.mapInstance);

            // Get user location
            this.getUserLocation();

            console.log('✅ Map initialized');
        } catch (error) {
            console.error('❌ Map initialization error:', error);
        }
    },

    getUserLocation() {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    this.state.userLocation = { latitude, longitude };
                    
                    // Add user marker
                    L.circleMarker([latitude, longitude], {
                        radius: 8,
                        fillColor: '#00D4D4',
                        color: '#0077BE',
                        weight: 2,
                        opacity: 1,
                        fillOpacity: 0.8
                    }).addTo(this.state.mapInstance)
                    .bindPopup('📍 Your Location');

                    console.log('📍 User location detected:', { latitude, longitude });
                },
                (error) => {
                    console.warn('⚠️ Geolocation error:', error.message);
                }
            );
        }
    },

    // ============================================
    // 5. DATA MANAGEMENT
    // ============================================

    loadMockData() {
        // Mock cleanup locations
        this.state.cleanups = [
            {
                id: 1,
                name: 'Mission Beach Cleanup',
                location: { lat: 32.7597, lng: -117.2483 },
                date: 'Dec 10, 2025',
                crewSize: 12,
                weather: '22°C, Sunny ☀️',
                plasticTarget: 91
            },
            {
                id: 2,
                name: 'Pacific Beach Eco Day',
                location: { lat: 32.8007, lng: -117.2467 },
                date: 'Dec 15, 2025',
                crewSize: 8,
                weather: '20°C, Partly Cloudy ⛅',
                plasticTarget: 68
            },
            {
                id: 3,
                name: 'Ocean Beach Community Effort',
                location: { lat: 32.7345, lng: -117.2456 },
                date: 'Dec 20, 2025',
                crewSize: 15,
                weather: '21°C, Clear 🌊',
                plasticTarget: 113
            }
        ];

        // Mock crews
        this.state.crews = [
            {
                id: 1,
                name: 'Ocean Warriors',
                members: 24,
                cleanups: 8,
                nextCleanup: 'Mission Beach',
                color: '#00D4D4'
            },
            {
                id: 2,
                name: 'Beach Guardians',
                members: 16,
                cleanups: 5,
                nextCleanup: 'Pacific Beach',
                color: '#2ECC71'
            },
            {
                id: 3,
                name: 'Coastal Crusaders',
                members: 20,
                cleanups: 12,
                nextCleanup: 'Ocean Beach',
                color: '#FF6B6B'
            }
        ];

        // Update stats
        this.updateStats();
        this.renderCleanups();
        this.renderCrews();
        this.renderWeather();
    },

    loadLocalData() {
        const savedData = localStorage.getItem('shoreSquadData');
        if (savedData) {
            try {
                const data = JSON.parse(savedData);
                this.state = { ...this.state, ...data };
                console.log('📦 Data loaded from LocalStorage');
            } catch (error) {
                console.error('Error loading saved data:', error);
            }
        }
    },

    saveData() {
        localStorage.setItem('shoreSquadData', JSON.stringify(this.state));
        console.log('💾 Data saved to LocalStorage');
    },

    // ============================================
    // 6. RENDERING FUNCTIONS
    // ============================================

    renderCleanups() {
        const cleanupList = document.getElementById('cleanupList');
        if (!cleanupList) return;

        cleanupList.innerHTML = this.state.cleanups.map(cleanup => `
            <li class="cleanup-item" data-id="${cleanup.id}" role="button" tabindex="0">
                <div class="cleanup-name" style="font-weight: 600; color: #0077BE;">
                    ${cleanup.name}
                </div>
                <div style="font-size: 0.85rem; color: #666; margin-top: 4px;">
                    📅 ${cleanup.date}
                </div>
                <div style="font-size: 0.85rem; color: #666;">
                    👥 ${cleanup.crewSize} people
                </div>
                <div style="font-size: 0.85rem; color: #2ECC71; margin-top: 4px;">
                    ${cleanup.weather}
                </div>
            </li>
        `).join('');

        // Add cleanup markers to map
        this.addCleanupMarkers();

        console.log('🗺️ Cleanups rendered');
    },

    renderCrews() {
        const crewsGrid = document.getElementById('crewsGrid');
        if (!crewsGrid) return;

        crewsGrid.innerHTML = this.state.crews.map(crew => `
            <div class="crew-card" role="article">
                <div class="crew-name">${crew.name}</div>
                <div class="crew-members">
                    <span style="color: #0077BE; font-weight: 600;">${crew.members}</span> members
                </div>
                <div style="margin: 12px 0; font-size: 0.9rem; color: #666;">
                    ✅ ${crew.cleanups} cleanups completed
                </div>
                <div style="margin: 12px 0; font-size: 0.9rem; color: #666;">
                    📍 Next: ${crew.nextCleanup}
                </div>
                <button class="btn btn-primary" style="width: 100%; margin-top: 12px;" 
                    onclick="ShoreSquadApp.joinCrew('${crew.name}')">
                    Join Crew
                </button>
            </div>
        `).join('');

        console.log('👥 Crews rendered');
    },

    renderWeather() {
        const weatherCards = document.getElementById('weatherCards');
        if (!weatherCards) return;

        const weatherData = [
            { day: 'Today', temp: 22, condition: 'Sunny ☀️', uv: 'High' },
            { day: 'Tomorrow', temp: 20, condition: 'Partly Cloudy ⛅', uv: 'Medium' },
            { day: 'Dec 10', temp: 21, condition: 'Sunny ☀️', uv: 'High' }
        ];

        weatherCards.innerHTML = weatherData.map(w => `
            <div class="weather-card" role="article">
                <div class="weather-icon">${w.condition.split(' ')[1]}</div>
                <div class="weather-temp">${w.temp}°C</div>
                <div class="weather-condition">${w.condition.split(' ')[0]}</div>
                <div style="font-size: 0.85rem; color: #666; margin-top: 8px;">
                    UV: ${w.uv}
                </div>
            </div>
        `).join('');

        console.log('🌤️ Weather rendered');
    },

    updateStats() {
        // Calculate stats from mock data
        this.state.stats.totalCleanups = this.state.crews.reduce((sum, crew) => sum + crew.cleanups, 0);
        this.state.stats.totalCrew = this.state.crews.reduce((sum, crew) => sum + crew.members, 0);
        this.state.stats.plasticCollected = this.state.cleanups.reduce((sum, cleanup) => sum + cleanup.plasticTarget, 0);
        this.state.stats.beachesClean = this.state.cleanups.length;

        // Update UI with animation
        this.animateStatNumbers();
    },

    animateStatNumbers() {
        const stats = [
            { id: 'totalCleanups', value: this.state.stats.totalCleanups },
            { id: 'totalCrew', value: this.state.stats.totalCrew },
            { id: 'plasticCollected', value: this.state.stats.plasticCollected },
            { id: 'beachesClean', value: this.state.stats.beachesClean }
        ];

        stats.forEach(stat => {
            const element = document.getElementById(stat.id);
            if (element) {
                this.countUpAnimation(element, stat.value);
            }
        });
    },

    countUpAnimation(element, finalValue) {
        const duration = 2000;
        const startTime = Date.now();
        const startValue = 0;

        const animationFrame = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const currentValue = Math.floor(startValue + (finalValue - startValue) * progress);
            
            element.textContent = currentValue;

            if (progress < 1) {
                requestAnimationFrame(animationFrame);
            }
        };

        requestAnimationFrame(animationFrame);
    },

    // ============================================
    // 7. INTERACTIVE FEATURES
    // ============================================

    addCleanupMarkers() {
        if (!this.state.mapInstance) return;

        this.state.cleanups.forEach(cleanup => {
            L.marker([cleanup.location.lat, cleanup.location.lng], {
                icon: L.divIcon({
                    className: 'cleanup-marker',
                    html: `
                        <div style="
                            background: linear-gradient(135deg, #0077BE, #00D4D4);
                            color: white;
                            padding: 8px;
                            border-radius: 50%;
                            width: 32px;
                            height: 32px;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            font-weight: bold;
                            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
                        ">🌊</div>
                    `,
                    iconSize: [32, 32]
                })
            }).addTo(this.state.mapInstance)
            .bindPopup(`
                <strong>${cleanup.name}</strong><br>
                📅 ${cleanup.date}<br>
                👥 ${cleanup.crewSize} crew members
            `);
        });
    },

    selectCleanup(cleanupId) {
        const cleanup = this.state.cleanups.find(c => c.id == cleanupId);
        if (cleanup && this.state.mapInstance) {
            this.state.mapInstance.setView([cleanup.location.lat, cleanup.location.lng], 14);
            this.showNotification(`Selected: ${cleanup.name}`, 'info');
        }
    },

    joinCrew(crewName) {
        this.showNotification(`✨ You joined ${crewName}! Welcome aboard!`, 'success');
        this.saveData();
        this.loadMockData();
    },

    // ============================================
    // 8. UI UTILITIES
    // ============================================

    updateUI() {
        this.renderCleanups();
        this.renderCrews();
        this.renderWeather();
        this.updateStats();
    },

    scrollToSection(sectionId) {
        const section = document.querySelector(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    },

    showNotification(message, type = 'info') {
        console.log(`[${type.toUpperCase()}] ${message}`);
        
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 16px 24px;
            border-radius: 8px;
            background: ${type === 'success' ? '#2ECC71' : type === 'error' ? '#FF6B6B' : '#0077BE'};
            color: white;
            font-weight: 500;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
            animation: slideInRight 0.3s ease;
            z-index: 1000;
        `;
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    },

    // ============================================
    // 9. SERVICE WORKER (Offline Support)
    // ============================================

    setupServiceWorker() {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('sw.js').catch(err => {
                console.log('⚠️ Service Worker registration failed:', err);
            });
        }
    }
};

// ============================================
// 10. DOM CONTENT LOADED
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    ShoreSquadApp.init();
});

// ============================================
// 11. PERFORMANCE OPTIMIZATIONS
// ============================================

// Lazy load images using Intersection Observer
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img.lazy').forEach(img => imageObserver.observe(img));
}

// Add CSS animation styles dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(30px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes slideOutRight {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(30px);
        }
    }
`;
document.head.appendChild(style);
