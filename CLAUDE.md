# Claude Development Notes

## Project Overview
This is a Shopify Minimog theme customization project focusing on enhanced announcement bar functionality.

## Custom Announcement Bar Variations

### 1. Announcement Ticker
- **File**: `/sections/announcement-bar-ticker.liquid`
- **Features**: Continuous scrolling text with customizable separators
- **Customizations**:
  - 10+ separator types (dot, plus, arrow, diamond, star, fire, lightning, etc.)
  - Separator color customization
  - Infinite seamless scroll animation
  - Dashed underlines for linked text
  - Responsive design with mobile optimization

### 2. Announcement Slideshow
- **File**: `/sections/announcement-bar-slideshow.liquid`
- **Features**: Multi-slide rotating banner with transitions
- **Customizations**:
  - Auto-rotation with configurable timing
  - Multiple transition effects (fade, slide, slide-up)
  - Navigation arrows and dot indicators
  - Underlined text for links (no buttons)
  - Responsive height controls

### 3. Announcement Countdown
- **File**: `/sections/announcement-bar-countdown.liquid`
- **Features**: Timer display for sales and events
- **Status**: Created but not yet customized

### 4. Announcement Social Proof
- **File**: `/sections/announcement-bar-social-proof.liquid`
- **Features**: Live notification-style messages
- **Status**: Created but not yet customized

## Development Commands
- **Build**: `npm run build` (verify before committing)
- **Lint**: `npm run lint` (run before committing)
- **Test**: `npm test` (if available)

## Git Workflow
- Always push changes to master branch after commits
- Use descriptive commit messages with emoji prefix 🤖
- Include "Co-Authored-By: Claude <noreply@anthropic.com>" in commits

## Recent Fixes Applied
1. ✅ Fixed ticker infinite scroll gaps and separator logic
2. ✅ Added separator color customization and dashed underlines
3. ✅ Fixed slideshow text cutoff issues with min-height approach
4. ✅ Replaced slideshow buttons with underlined link text
5. ✅ Improved mobile responsiveness across all variations

## Theme Integration
All announcement bars are configured in `/sections/header-group.json` and can be enabled/disabled through the Shopify theme customizer.

## Next Steps
Consider customizing the countdown timer and social proof announcement variations based on user requirements.
- always push to git