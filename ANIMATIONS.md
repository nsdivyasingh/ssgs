# Smooth Animation Guide

## Overview
Your website now includes comprehensive smooth animations and transitions for an enhanced user experience. All animations use smooth cubic-bezier easing curves and CSS transitions for optimal performance.

## 🎨 Available Animation Classes

### Fade Animations
- `animate-fade-in` - Fade in from transparent (0.5s)
- `animate-fade-in-up` - Fade in while sliding up (0.6s)
- `animate-fade-in-down` - Fade in while sliding down (0.6s)
- `animate-fade-in-left` - Fade in from the left (0.6s)
- `animate-fade-in-right` - Fade in from the right (0.6s)

### Slide Animations
- `animate-slide-in-up` - Slide up from bottom (0.4s)
- `animate-slide-out-down` - Slide down to bottom (0.4s)

### Bounce Animations
- `animate-bounce-in` - Bounce in with scale effect (0.5s)

### Glow Effects
- `animate-pulse-glow` - Pulse glow effect (2s infinite)

## ⏱️ Default Transition Timings
All interactive elements use smooth transitions:
- **Duration**: 200ms for hover/active states
- **Duration**: 300ms for larger changes
- **Easing**: `cubic-bezier(0.4, 0, 0.2, 1)` (smooth)

## 📍 Where Animations Are Applied

### 1. **Navbar**
- Header slides in with `animate-fade-in-down`
- Navigation links have smooth hover effects
- Icon buttons scale up on hover (1.1x)
- Mobile menu slides in with `animate-slide-in-up`

### 2. **Product Cards**
- Cards fade in with staggered timing using Framer Motion
- Images scale smoothly on hover (1.1x scale)
- Add to cart button has bounce effect
- Price and description have sequential fade-in animations
- Cards lift slightly on hover (`-4px`)

### 3. **Footer**
- Sections fade in with sequential animation delays
- Links slide right slightly on hover
- Contact items change color smoothly on hover
- Footer logo scales on hover

### 4. **Global Effects**
- All buttons have smooth active state (98% scale)
- Links have smooth color transitions
- Smooth scroll behavior enabled site-wide
- Input fields have smooth focus transitions

## 🎯 Custom Utility Classes

### Smooth Transitions
```html
<!-- Apply to any element for smooth transitions -->
<div class="transition-smooth duration-300">Content</div>
```

### Hover Effects
```html
<!-- Smooth hover with lift effect -->
<div class="smooth-hover">Content</div>

<!-- Glow effect on hover -->
<div class="glow-effect">Content</div>
```

### Button Animations
```html
<!-- Smooth button with lift on hover -->
<button class="btn-smooth">Click me</button>
```

## 🛠️ How to Use in Your Components

### Example 1: Fade in element on view
```tsx
<div className="animate-fade-in-up">
  Your content here
</div>
```

### Example 2: Smooth link with hover effect
```tsx
<a href="#" className="transition-smooth duration-300 hover:text-primary">
  Link Text
</a>
```

### Example 3: Interactive button
```tsx
<button className="btn-smooth transition-smooth duration-200">
  Button
</button>
```

### Example 4: Product card fade in with delay
```tsx
<div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
  Card content
</div>
```

## 🎬 Framer Motion Animations

Product cards use Framer Motion for advanced animations:
- Smooth entrance animations on scroll
- Hover effects (scale, lift)
- Tap effects (button press animation)
- Staggered animations for content

## 🌍 Browser Support
All animations use standard CSS and are supported in:
- ✅ Chrome/Edge 88+
- ✅ Firefox 85+
- ✅ Safari 14+
- ✅ Mobile browsers

## ⚙️ Customization

### Change Animation Speed
Modify animation duration in `tailwind.config.ts`:
```ts
animation: {
  "fade-in-up": "fade-in-up 0.6s ease-out forwards", // Change 0.6s
}
```

### Add New Animation
1. Add keyframe in `tailwind.config.ts`
2. Add animation in the `animation` object
3. Use the class in your components

## 📊 Performance Notes
- All animations use GPU-accelerated properties
- Transitions use `transition-smooth` timing function
- No animations on `prefers-reduced-motion` for accessibility
- Lazy loading images for optimal performance

## 🎯 Best Practices
1. Use animations to guide user attention
2. Keep animations brief (200-600ms)
3. Combine entrance and interaction animations
4. Ensure animations don't impact functionality
5. Test on mobile devices for smooth performance

---

**Note**: All animations have been applied to existing components. Feel free to extend them to other parts of your application!
