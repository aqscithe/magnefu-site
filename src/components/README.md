# Video Background Components

A flexible set of Astro components for creating video backgrounds with customizable overlays.

## Components

### VideoBackground
Core component for YouTube video backgrounds with full control over playback and styling.

### VideoOverlay  
Toggleable overlay system with multiple types (text, CTA, custom) and positioning options.

### HeroVideoSection
Complete hero section combining video background and overlay with built-in responsive design.

## Quick Start

### Basic Hero Section
```astro
---
import HeroVideoSection from '../components/HeroVideoSection.astro';
---

<HeroVideoSection
  videoId="DQzuqZDV2A8"
  title="Welcome to Our Company"
  description="Innovative solutions for modern challenges"
  primaryCta="Get Started"
  primaryCtaHref="/contact"
  secondaryCta="Learn More"
  secondaryCtaHref="/about"
/>
```

### Custom Video Background
```astro
---
import VideoBackground from '../components/VideoBackground.astro';
import VideoOverlay from '../components/VideoOverlay.astro';
---

<VideoBackground 
  videoId="your-youtube-id"
  aspectRatio="16:9"
  overlayOpacity={0.5}
>
  <VideoOverlay
    type="custom"
    position="bottom-right"
    toggleable={true}
  >
    <div class="custom-content">
      <h3>Custom Content</h3>
      <p>Your custom overlay content here</p>
    </div>
  </VideoOverlay>
</VideoBackground>
```

## Props Reference

### HeroVideoSection Props

#### Video Configuration
- `videoId` (string, required): YouTube video ID
- `videoAspectRatio` ('16:9' | '21:9' | '4:3' | 'full'): Video aspect ratio
- `videoAutoplay` (boolean): Auto-play video
- `videoMuted` (boolean): Start video muted
- `videoLoop` (boolean): Loop video playback
- `videoStartTime` (number): Start time in seconds
- `videoEndTime` (number): End time in seconds
- `videoOpacity` (number): Video opacity (0-1)

#### Section Configuration
- `height` (string): Section height (default: '100vh')
- `minHeight` (string): Minimum height (default: '600px')
- `className` (string): Additional CSS classes
- `theme` ('light' | 'dark' | 'auto'): Color theme

#### Overlay Configuration
- `showOverlay` (boolean): Show content overlay
- `overlayType` ('text' | 'cta' | 'custom'): Overlay type
- `overlayPosition` (string): Overlay position
- `overlayToggleable` (boolean): Allow overlay toggle
- `overlayInitialVisible` (boolean): Initial overlay visibility
- `overlayAnimation` (string): Overlay animation type

#### Content
- `title` (string): Main title
- `subtitle` (string): Subtitle
- `description` (string): Description text
- `primaryCta` (string): Primary button text
- `primaryCtaHref` (string): Primary button link
- `secondaryCta` (string): Secondary button text
- `secondaryCtaHref` (string): Secondary button link

## JavaScript API

### Global APIs
```javascript
// Video Background API
const videoController = VideoBackgroundAPI.getController('.video-background');
videoController.play();
videoController.pause();
videoController.mute();
videoController.setOpacity(0.5);

// Video Overlay API
const overlayController = VideoOverlayAPI.getController('.video-overlay-container');
overlayController.show();
overlayController.hide();
overlayController.toggle();

// Hero Video API
const heroController = HeroVideoAPI.getController('.hero-video-section');
heroController.toggleOverlay();
heroController.getVideoController().pause();
```

### Events
```javascript
// Video events
element.addEventListener('video-videoloaded', (event) => {
  console.log('Video loaded');
});

element.addEventListener('video-videoplay', (event) => {
  console.log('Video playing');
});

// Overlay events
element.addEventListener('overlay-shown', (event) => {
  console.log('Overlay shown');
});

element.addEventListener('overlay-hidden', (event) => {
  console.log('Overlay hidden');
});
```

## Styling

### CSS Custom Properties
Each component exposes CSS custom properties for easy theming:

```css
.video-background {
  --video-opacity: 1;
  --overlay-color: rgba(0, 0, 0, 0.3);
  --overlay-opacity: 0.3;
  --z-index: -1;
}

.video-overlay-container {
  --bg-color: rgba(0, 0, 0, 0.7);
  --text-color: white;
  --padding: 2rem;
  --border-radius: 12px;
}

.hero-video-section {
  --hero-text-color: #FFFFFF;
  --hero-accent-color: #F76902;
}
```

### Responsive Design
All components include responsive breakpoints:
- Desktop: Full features
- Tablet (≤768px): Adapted layouts
- Mobile (≤480px): Optimized for small screens

### Accessibility
- Reduced motion support (disables video for users with motion sensitivity)
- Keyboard navigation support
- ARIA labels and proper focus management
- Screen reader friendly

## Examples

### Trimesh Hero Example
```astro
<HeroVideoSection
  videoId="DQzuqZDV2A8"
  title="TRIMESH"
  subtitle="DRONE SOLUTIONS"
  description="Professional UAV Services & Advanced Aerial Solutions"
  primaryCta="GET QUOTE"
  primaryCtaHref="#contact"
  secondaryCta="VIEW SERVICES"
  secondaryCtaHref="#services"
  theme="dark"
  overlayPosition="center"
  overlayBackgroundColor="rgba(0, 0, 0, 0.6)"
  height="100vh"
  minHeight="700px"
/>
```

### Multiple Video Sections
```astro
<!-- Hero with video -->
<HeroVideoSection videoId="hero-video-id" />

<!-- Content section with background video -->
<section class="content-with-video">
  <VideoBackground 
    videoId="content-video-id"
    aspectRatio="21:9"
    overlayOpacity={0.7}
  >
    <div class="content">
      <h2>Our Process</h2>
      <p>Content over video background</p>
    </div>
  </VideoBackground>
</section>
```

## Performance Tips

1. **Video Optimization**: Use optimized YouTube videos with appropriate quality settings
2. **Intersection Observer**: Videos only play when in viewport
3. **Reduced Motion**: Automatically disabled for users with motion sensitivity preferences
4. **Lazy Loading**: Components load efficiently using modern web APIs
5. **Memory Management**: Automatic cleanup when components unmount

## Browser Support

- Modern browsers with ES6 support
- YouTube iframe API support
- CSS Custom Properties support
- Intersection Observer API support

For older browsers, the components gracefully degrade to static backgrounds.