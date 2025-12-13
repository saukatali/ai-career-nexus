# AI Career Nexus - Design Documentation

## 🎨 Design System

### Color Palette

#### Neon Gradient Theme
```css
Primary Colors:
- Neon Blue: #00D9FF
- Neon Purple: #B026FF
- Neon Pink: #FF006B
- Neon Green: #00FFB9
- Neon Yellow: #FFD600

Dark Background Shades:
- Dark 900 (Base): #0A0A0F
- Dark 800: #13131A
- Dark 700: #1C1C26
- Dark 600: #252533
- Dark 500: #2E2E40
```

#### Gradient Combinations
- **Main Gradient**: Linear 135° from Neon Blue → Neon Purple → Neon Pink
- **Skill Gradient**: Linear 135° from Neon Green → Neon Blue
- **AI Gradient**: Linear 135° from Neon Purple → Neon Pink

### Typography

**Font Family**: Inter, system-ui, -apple-system, sans-serif

**Font Scales**:
- Display (Hero): 72px / 96px - Bold
- H1: 48px - Bold
- H2: 36px - Bold
- H3: 24px - Bold
- H4: 20px - Semibold
- Body Large: 18px - Regular
- Body: 16px - Regular
- Small: 14px - Regular
- Extra Small: 12px - Regular

### Glass Morphism

**Standard Glass Effect**:
```css
background: rgba(255, 255, 255, 0.05);
backdrop-filter: blur(10px);
border: 1px solid rgba(255, 255, 255, 0.1);
```

**Strong Glass Effect**:
```css
background: rgba(255, 255, 255, 0.08);
backdrop-filter: blur(20px);
border: 1px solid rgba(255, 255, 255, 0.15);
```

### Shadows & Glows

**Neon Glow Effects**:
- Blue Glow: `0 0 20px rgba(0, 217, 255, 0.5), 0 0 40px rgba(0, 217, 255, 0.3)`
- Purple Glow: `0 0 20px rgba(176, 38, 255, 0.5), 0 0 40px rgba(176, 38, 255, 0.3)`
- Pink Glow: `0 0 20px rgba(255, 0, 107, 0.5), 0 0 40px rgba(255, 0, 107, 0.3)`
- Standard Glow: `0 0 30px rgba(0, 217, 255, 0.4)`
- Float Shadow: `0 10px 40px rgba(0, 0, 0, 0.3)`

### Animations

**Micro-animations**:
- Float: 6s ease-in-out infinite (translateY 0 → -20px → 0)
- Pulse Slow: 4s cubic-bezier infinite
- Glow: 3s ease-in-out infinite (opacity 1 → 0.5 → 1)
- Shimmer: 2s linear infinite (background position shift)

**Interaction States**:
- Hover: scale(1.05) + enhanced glow
- Active/Tap: scale(0.95)
- Disabled: opacity(0.5)

### Border Radius

- Small: 8px
- Medium: 12px
- Large: 16px
- XL: 20px
- 2XL: 24px
- 3XL: 32px
- Full: 9999px (pills/circles)

### Spacing Scale

Based on 4px base unit:
- xs: 4px
- sm: 8px
- md: 12px
- lg: 16px
- xl: 24px
- 2xl: 32px
- 3xl: 48px
- 4xl: 64px

---

## 📱 Screen Designs

### 1. Landing Page

**Hero Section**:
- Full-screen viewport height
- 3D gradient background with animated blobs
- Left: Text content (70% width)
  - Badge: "Powered by Advanced AI"
  - H1: "Your Future Career, AI-Engineered" (gradient text)
  - Body: Value proposition
  - CTA: "Start Career Test" (neon gradient button)
  - Stats row: 50K+ Paths, 98% Accuracy, 1M+ Users
- Right: Floating cards (30% width)
  - 4 floating glassmorphic cards with job stats
  - Animated float effect
  - Color-coded borders (blue, purple, pink, green)

**Features Section**:
- 4-column grid layout
- Each feature card:
  - Icon with gradient background
  - Title
  - Description
  - "Learn more" link with arrow
  - Hover: lift up 10px
  - Border glow on hover

**CTA Section**:
- Centered card with strong glassmorphism
- Border: 2px neon blue glow
- Action button with enhanced shadow

---

### 2. Dashboard

**Layout**:
- Sidebar (320px fixed width)
  - Logo
  - User profile card
  - Navigation menu (6 items)
  - Settings/logout at bottom
- Main content area (flex-1)

**Components**:

**AI Career Score Card** (full width):
- Grid: 1/3 radial gauge + 2/3 breakdown
- Radial gauge: 192px diameter, score 92/100
- 5 progress bars for score breakdown
- Neon blue border with glow

**Skill Distribution** (left column):
- Animated SVG skill wheel
- 4 skill tags with percentages
- Glassmorphic container

**Career Progress** (right column):
- 4 progress items with icons
- Each item: title, subtitle, progress bar

**Recommendations Carousel**:
- 3-column grid
- Gradient background cards
- Icon + title + description + CTA

**Quick Actions**:
- 4-column grid
- Icon cards with hover lift

---

### 3. Skill-to-Job Matching

**Layout**: 
- Left sidebar (33%): Input panel (sticky)
- Right content (67%): Results grid

**Input Panel**:
- Skill input with autocomplete
- AI suggestion chips (6 visible)
- Selected skills (removable chips)
- "Find Matching Jobs" button
- Stats: Skills Added, Job Matches

**Job Results**:
- Each job card:
  - Header: Title + Company + Match %
  - Details: Location, Type, Applicants, Posted
  - Salary prediction bar (animated)
  - Required skills tags
  - Action buttons: Apply + Save
  - Color-coded match percentage (90+ green, 80+ blue, 70+ purple)

---

### 4. Resume Analyzer

**Layout**:
- Left panel (40%): Upload + Status
- Right panel (60%): Results

**Upload Area**:
- Drag & drop zone with glassmorphism
- Dashed border (2px)
- Icon (80px gradient circle)
- Support badges: PDF, DOC, DOCX
- File info when uploaded

**Analysis Progress**:
- Spinner + AI icon
- 4 step indicators with pulse animation

**Results Panel**:

**Resume Score Meter**:
- SVG radial gauge (256px)
- Gradient stroke (purple to pink)
- Score 87/100 in center
- 5 category scores below

**AI Insights**:
- Strengths section (green checkmarks)
- Improvements section (blue warning icons)
- Missing keywords (purple chips)
- Each item in glassmorphic container

**CTA Card**:
- "Generate Better Resume" button
- Green glow effect
- Sparkles icon

---

### 5. AI Career Coach

**Layout**: 
- Sidebar (320px): Interview modes + stats
- Main area: Chat interface

**Interview Modes** (4 cards):
- Behavioral (blue)
- Technical (purple)
- Mock Interview (pink)
- Career Chat (green)
- Active mode: gradient background + border glow

**Chat Interface**:
- Messages area (scrollable)
- Message bubbles:
  - AI: left-aligned, blue gradient avatar
  - User: right-aligned, purple gradient avatar
  - Glassmorphic backgrounds
  - Timestamps
- AI feedback panels:
  - 4 metrics: Tone, Clarity, Confidence, Structure
  - Progress bars with percentages

**Input Area**:
- Real-time feedback indicators (4 metrics)
- Voice input button (mic icon)
- Text area (3 rows)
- Send button (gradient)
- Speaker toggle

---

### 6. Skill Gap & Analytics

**Top Stats** (4 columns):
- Overall Progress: 87%
- Skills Mastered: 24
- Skills to Learn: 8
- Learning Hours: 156h
- Each with icon + change indicator

**Radar Chart** (left):
- 6 skills plotted
- Current vs Desired levels
- Neon blue + purple colors
- Legend at bottom

**Growth Chart** (right):
- Area chart: Weekly skill score
- Line chart: Learning hours overlay
- Gradient fill under area
- 7 weeks of data

**Missing Skills Heatmap**:
- 4-column grid
- Each card:
  - Skill name + importance %
  - Category, Difficulty, Time
  - "Start Learning" button
  - Border color by importance

**Recommended Courses**:
- 3 course cards (stacked)
- Each: Title, Provider, Duration, Rating, Impact
- Skills covered tags
- Progress bar if started
- Action buttons: Start/Continue + Preview

**Learning Roadmap**:
- Vertical timeline
- Gradient line (blue → purple → pink)
- 5 milestone cards
- Each: Icon node + Title + Duration + Due date
- Status: in-progress (blue), upcoming (gray)

---

## 🎯 Component Library

### Buttons

**Primary (Gradient)**:
```jsx
bg-neon-gradient
rounded-xl / rounded-2xl
px-8 py-4
shadow-neon-blue
hover: scale(1.05) + enhanced glow
```

**Secondary (Glass)**:
```jsx
glass-morph-strong
border border-white/20
rounded-xl / rounded-2xl
hover: border-neon-blue/50
```

### Cards

**Standard**:
```jsx
glass-morph-strong
rounded-3xl
p-8
border border-white/10
hover: border-white/20
```

**Featured** (with glow):
```jsx
glass-morph-strong
rounded-3xl
p-8
border-2 border-neon-blue/30
shadow-neon-blue
```

### Form Inputs

```jsx
bg-dark-700
border border-white/10
rounded-xl
px-4 py-3
focus: border-neon-blue/50
placeholder: gray-500
```

### Progress Bars

```jsx
Container: h-2 bg-dark-700 rounded-full
Fill: h-full bg-neon-{color} rounded-full
Animation: width 0 → percentage (1s ease-out)
```

### Badges/Tags

```jsx
px-3 py-1
glass-morph
rounded-lg
text-xs
border border-neon-{color}/30
```

---

## 📐 Layouts

### Desktop (1920px)
- Max content width: 1280px (7xl container)
- Sidebar: 320px fixed
- Grid gaps: 24px - 32px
- Padding: 32px - 48px

### Tablet (768px - 1024px)
- 2-column grids collapse to 1 column
- Sidebar: 280px
- Grid gaps: 16px - 24px
- Padding: 24px

### Mobile (< 768px)
- Single column layout
- Sidebar becomes drawer/modal
- Cards stack vertically
- Padding: 16px
- Font sizes reduce by 10-20%

---

## 🔄 User Flow Diagram

```
[Landing Page]
     ↓
[Login/Signup] ← (Modal/Redirect)
     ↓
[Dashboard] ← Hub
     ↓
     ├─→ [Skill Matcher]
     │        ↓
     │   Add Skills
     │        ↓
     │   View Matches
     │        ↓
     │   Apply to Jobs
     │
     ├─→ [Resume Analyzer]
     │        ↓
     │   Upload Resume
     │        ↓
     │   View Analysis
     │        ↓
     │   Generate Improved
     │
     ├─→ [AI Coach]
     │        ↓
     │   Select Mode
     │        ↓
     │   Chat/Practice
     │        ↓
     │   Get Feedback
     │
     └─→ [Skill Gap]
              ↓
         View Analytics
              ↓
         Select Courses
              ↓
         Follow Roadmap
```

**Key User Journeys**:

1. **New User Onboarding**:
   - Land on homepage → Impressed by hero → Click "Start Career Test"
   - Quick signup → Dashboard → See AI score
   - Explore modules → Start with Resume Analyzer

2. **Job Seeker**:
   - Dashboard → Skill Matcher
   - Add skills → Get matches → Apply
   - Use AI Coach for interview prep

3. **Skill Developer**:
   - Dashboard → Skill Gap
   - View radar chart → See missing skills
   - Enroll in courses → Track progress → Update roadmap

---

## 🎭 Interaction Details

### Hover States
- Buttons: Scale 1.05 + glow enhance
- Cards: Lift 5-10px + border brighten
- Links: Underline + color shift

### Click/Tap States
- Scale 0.95 briefly
- Ripple effect on glassmorphic elements

### Loading States
- Spinner with gradient border
- Skeleton screens with shimmer
- Progress indicators with pulse

### Success States
- Green checkmark animation
- Confetti for major milestones
- Toast notifications (top-right)

### Error States
- Red border pulse
- Shake animation
- Error message below field

### Empty States
- Large icon (gray)
- Descriptive message
- CTA to add content

---

## 🚀 Animation Specifications

### Page Transitions
- Fade in: opacity 0 → 1 (300ms)
- Slide in: translateY(20px) → 0 (400ms ease-out)
- Stagger: Delay +100ms per item

### Chart Animations
- Line draw: strokeDashoffset animation (2s)
- Bar grow: width/height 0 → value (1s ease-out)
- Radar fill: opacity 0 → 1 + scale 0.8 → 1 (1s)

### Floating Elements
- translateY oscillation: -20px range
- Duration: 6s
- Easing: ease-in-out
- Infinite loop

### Glow Pulse
- Opacity: 1 → 0.5 → 1
- Duration: 3s
- Infinite loop

---

## 📊 Data Visualization Styles

### Charts Color Scheme
- Primary data: Neon blue (#00D9FF)
- Secondary: Neon green (#00FFB9)
- Tertiary: Neon purple (#B026FF)
- Grid lines: Dark 500 (#2E2E40)
- Axes: Gray 400

### Chart Types Used
1. **Radial Bar** - AI Career Score
2. **Radar** - Skill Strength
3. **Area** - Growth trends
4. **Line** - Time series
5. **Progress Bars** - Scores & progress

---

## ✨ Unique Design Elements

### 3D Depth Effect
- Layered glassmorphism
- Multiple shadows (near + far)
- Z-index hierarchy
- Parallax on scroll (optional)

### Neon Accents
- Text shadows for glow
- Border glow on hover
- Button shadow pulsing
- Icon backgrounds with opacity

### Floating UI
- Cards with subtle float animation
- Drop shadows for elevation
- Rounded corners (24px-32px)
- Padding: generous (32px-48px)

### AI Visual Language
- Brain/sparkles icons
- Animated scanning lines
- Pulse indicators
- Gradient accents for AI features

---

## 🎨 Icon System

**Primary Icons** (Lucide React):
- Brain: AI/Intelligence
- Target: Goals/Matching
- FileText: Documents/Resume
- MessageSquare: Chat/Communication
- BarChart3: Analytics/Data
- Sparkles: AI Magic/Enhancement
- TrendingUp: Growth/Progress
- Award: Achievement/Certification
- Zap: Speed/Power
- Users: Community/Applicants

**Icon Sizing**:
- Small: 16px
- Medium: 20px
- Large: 24px
- XL: 32px
- Hero: 48px+

**Icon Styling**:
- Stroke width: 2px
- Rounded caps
- Gradient backgrounds for featured icons
- Glow effect on hover

---

## 📱 Responsive Breakpoints

```css
Mobile: < 640px
Tablet: 640px - 1024px
Desktop: 1024px - 1920px
Large Desktop: > 1920px
```

**Responsive Adjustments**:
- Font scale: -2px to -4px on mobile
- Grid columns: 4 → 2 → 1
- Sidebar: Fixed → Drawer
- Padding: 48px → 24px → 16px
- Charts: Full width stacking

---

## 🎯 Accessibility

- WCAG AA contrast ratios
- Focus indicators (neon blue outline)
- Keyboard navigation support
- ARIA labels on interactive elements
- Screen reader friendly
- Reduced motion support

---

## 🔧 Technical Stack

- **Framework**: React 18
- **Routing**: React Router v6
- **Animations**: Framer Motion
- **Charts**: Recharts
- **Icons**: Lucide React
- **Styling**: Tailwind CSS
- **Build**: Vite

---

**Design Version**: 1.0.0  
**Last Updated**: December 12, 2025  
**Designer**: AI Career Nexus Team
