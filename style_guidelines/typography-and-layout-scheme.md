# Typography & Layout Scheme - Understated Sophistication

## Overview
This style guide establishes a cohesive visual language for the interior design website, drawing inspiration from premium interior design brands. The design philosophy emphasizes **understated sophistication** through refined typography, balanced layouts, and a warm, neutral color palette that allows portfolio imagery to take center stage.

## Typography System

### Primary Font Family: Avenir
- **Fallback**: System fonts (-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif)
- **Usage**: Body text, UI elements, secondary headings
- **Character**: Clean, modern, highly legible with excellent readability across all devices

### Secondary Font Family: Baskerville (Serif)
- **Fallback**: Palatino, Garamond, serif
- **Usage**: Primary headings, brand statements, call-to-action text
- **Character**: Elegant, traditional with strong presence and sophistication
- **Note**: Uses standard Baskerville typeface. Fry's Baskerville requires separate licensing.

### Typography Scale

#### Desktop
```
H1 - Primary Headlines: 48px / 56px line-height / Baskerville
H2 - Section Headers: 36px / 44px line-height / Baskerville
H3 - Subsection Headers: 24px / 32px line-height / Avenir Medium
H4 - Component Headers: 20px / 28px line-height / Avenir Medium
Body Large - Lead text: 18px / 28px line-height / Avenir Regular
Body - Standard text: 16px / 24px line-height / Avenir Regular
Body Small - Captions: 14px / 20px line-height / Avenir Regular
UI Text - Buttons/Labels: 14px / 18px line-height / Avenir Medium
```

#### Mobile
```
H1 - Primary Headlines: 32px / 40px line-height / Baskerville
H2 - Section Headers: 28px / 36px line-height / Baskerville
H3 - Subsection Headers: 20px / 26px line-height / Avenir Medium
H4 - Component Headers: 18px / 24px line-height / Avenir Medium
Body Large - Lead text: 16px / 24px line-height / Avenir Regular
Body - Standard text: 14px / 20px line-height / Avenir Regular
Body Small - Captions: 12px / 16px line-height / Avenir Regular
UI Text - Buttons/Labels: 13px / 16px line-height / Avenir Medium
```

### Font Weight Usage
- **Light (300)**: Secondary text, captions
- **Regular (400)**: Body text, standard UI elements
- **Medium (500)**: Subheadings, important UI elements
- **Semibold (600)**: Section headers, call-to-action buttons

## Color Palette

### Primary Neutrals
- **Warm White**: `#FAFAF7` - Primary background, text on dark backgrounds
- **Soft Beige**: `#F5F2ED` - Secondary background, section dividers
- **Warm Gray**: `#E8E4DF` - Borders, subtle accents
- **Taupe**: `#D4C5B3` - Text accents, secondary elements

### Supporting Colors
- **Rich Brown**: `#9a7d55` - Primary brand color, headings
- **Charcoal**: `#2C2C2C` - High contrast text, important information
- **Warm Black**: `#1A1A1A` - Primary text color

### Semantic Colors
- **Success**: `#4A7C59` - Confirmations, positive actions
- **Warning**: `#B8860B` - Alerts, important notices
- **Error**: `#8B4513` - Errors, critical issues

## Layout Principles

### Grid System
- **Desktop**: 12-column grid with 24px gutters
- **Mobile**: 4-column grid with 16px gutters
- **Breakpoint**: 768px for mobile-to-desktop transition

### Spacing Scale (Multiples of 8px)
- **Micro**: 4px - Smallest spacing unit
- **Small**: 8px - Tight spacing between related elements
- **Base**: 16px - Standard spacing unit
- **Medium**: 24px - Section spacing
- **Large**: 32px - Component separation
- **XL**: 48px - Major section breaks
- **XXL**: 64px - Page-level spacing

### Container Widths
- **Desktop Max**: 1440px
- **Desktop Large**: 1200px
- **Desktop Medium**: 960px
- **Mobile**: 100% with 24px side padding

## Component Guidelines

### Hero Sections
- **Height**: 70vh minimum (desktop), 60vh minimum (mobile)
- **Typography**: H1 with Baskerville serif for main heading
- **Layout**: Center-aligned, generous padding
- **Background**: Full-width image with overlay

### Navigation
- **Height**: 80px (desktop), 64px (mobile)
- **Typography**: Avenir Medium for menu items
- **Layout**: Horizontal, right-aligned on desktop; hamburger menu on mobile
- **Background**: Transparent overlay on hero sections

### Content Sections
- **Padding**: 64px vertical (desktop), 48px vertical (mobile)
- **Typography**: H2 for section headers, Body Large for lead text
- **Layout**: 80% content width, center-aligned
- **Background**: Alternating Soft Beige and Warm White

### Call-to-Action Buttons
- **Typography**: Avenir Medium, all caps, 1px letter-spacing
- **Padding**: 16px 32px (desktop), 14px 28px (mobile)
- **Border-radius**: 25pt for modern, rounded appearance
- **Variants**:
  - **Light Background**: Rich Brown background (#9a7d55), Warm White text (#FAFAF7)
  - **Dark Background**: Transparent background, Warm White text (#FAFAF7), 2px Warm White border
- **Hover Effects**: Smooth color transitions with 0.3s ease timing

### Image Galleries
- **Aspect Ratios**: 4:3 (landscape), 3:4 (portrait)
- **Spacing**: 2px gaps for grid cohesion
- **Hover Effects**: Subtle scale (1.02x) and brightness increase

## Mobile Optimizations

### Responsive Typography
- Fluid typography using clamp() for seamless scaling
- Minimum readable sizes maintained across all breakpoints
- Touch-friendly button sizes (44px minimum height)

### Layout Adaptations
- Single-column layout for all content sections
- Stacked navigation becomes hamburger menu
- Reduced spacing to accommodate smaller screens
- Full-width images with optimized loading

### Touch Interactions
- 44px minimum touch targets
- Appropriate hover states adapted for touch
- Swipe gestures for image galleries

## Desktop Enhancements

### Advanced Layouts
- Multi-column text layouts for longer content
- Asymmetrical grid layouts for visual interest
- Sophisticated hover animations and transitions

### Performance Considerations
- Optimized image loading with progressive enhancement
- Smooth scrolling and transitions
- Proper font loading strategies

## Implementation Notes

### CSS Architecture
```css
/* Typography */
.font-primary { font-family: 'Avenir', -apple-system, BlinkMacSystemFont, sans-serif; }
.font-secondary { font-family: 'Baskerville', Palatino, Garamond, serif; }

/* Spacing */
.spacing-xs { margin: 8px; }
.spacing-sm { margin: 16px; }
.spacing-md { margin: 24px; }
.spacing-lg { margin: 32px; }

/* Responsive */
@media (max-width: 768px) {
  .hero-height { height: 60vh; }
  .container { padding: 0 24px; }
}
```

### Font Rendering
- To ensure light font weights (e.g., Avenir Light 300) render crisply and without appearing heavier than intended, especially on dark backgrounds, apply the following CSS properties to the `body` tag or relevant elements:
  ```css
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  ```

### Accessibility
- WCAG AA contrast ratios maintained
- Proper heading hierarchy
- Focus indicators for keyboard navigation
- Alt text for all meaningful images

This style guide ensures visual consistency while maintaining the sophisticated, understated aesthetic that allows the interior design portfolio to shine.
