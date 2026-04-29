# Design System: Red Empresarial — CRM Dashboard
**Project ID:** `12704356112283778341`
**Screen ID:** `a60153d63f8a4a7189b01bbfb201dcfd`
**Design System Asset:** `assets/0be941b9fa734034aacdf648a7243108`
**Platform:** Desktop-first Web Application (Responsive)
**Component Library:** shadcn/ui

---

## 1. Visual Theme & Atmosphere

The aesthetic is **Institutional, Dependable, and Orchestrated** — a sophisticated enterprise SaaS dashboard designed for high-stakes health insurance management. It draws from the functional minimalism of shadcn/ui, prioritizing **clarity over decoration**.

The mood conveys **medical professionalism with modern corporate warmth**: clean surfaces, generous whitespace, and data-dense layouts that remain uncluttered. The interface should feel expansive and organized, providing advisors with a sense of control and stability when managing patient policies and sales pipelines.

**Design Philosophy:** "Every pixel serves a purpose — either it informs, guides, or reassures."

---

## 2. Color Palette & Roles

### Primary Brand Colors

| Role | Descriptive Name | Hex Code | Usage |
|:---|:---|:---|:---|
| **Primary Action** | Deep Corporate Blue | `#1E40AF` | Primary buttons, sidebar active indicators, focus rings, links |
| **Primary Dark** | Navy Authority | `#00288E` | Primary text in high-emphasis situations |
| **Primary Container** | Trustworthy Blue | `#1E40AF` | Filled buttons, active navigation backgrounds |
| **On Primary** | Pure White | `#FFFFFF` | Text on primary-colored surfaces |

### Sidebar & Navigation

| Role | Descriptive Name | Hex Code | Usage |
|:---|:---|:---|:---|
| **Sidebar Background** | Slate Navy | `#0F172A` | Fixed sidebar surface, creating a strong structural anchor |
| **Sidebar Text** | Muted Pearl | `#94A3B8` | Inactive menu items |
| **Sidebar Active** | Electric Indicator Blue | `#1E40AF` at 20% opacity | Active menu item background tint |
| **Active Border** | Primary Blue Line | `#1E40AF` | Left border indicator for active menu item |

### Surfaces & Backgrounds

| Role | Descriptive Name | Hex Code | Usage |
|:---|:---|:---|:---|
| **Page Canvas** | Clean Frost | `#F8FAFC` | Main content area background |
| **Card Surface** | Pure White | `#FFFFFF` | All cards, panels, modals |
| **Surface Container** | Whisper Gray | `#EEEDF7` | Subtle container backgrounds |
| **Border Default** | Slate Mist | `#E2E8F0` | Card borders, dividers, input borders |
| **Outline Variant** | Silver Fog | `#C4C5D5` | Subtle separators, inactive outlines |

### Text & Typography Colors

| Role | Descriptive Name | Hex Code | Usage |
|:---|:---|:---|:---|
| **Primary Text** | Charcoal Ink | `#1A1B22` | Headings, important labels, KPI values |
| **Secondary Text** | Slate Commentary | `#444653` | Body copy, descriptions |
| **Muted Text** | Cool Gray Whisper | `#64748B` | Timestamps, metadata, placeholders |
| **Inverse Text** | Frost White | `#F1F0FA` | Text on dark backgrounds (sidebar) |

### Semantic / Functional Colors

| Role | Descriptive Name | Hex Code | Usage |
|:---|:---|:---|:---|
| **Danger / Urgent** | Alert Rose Red | `#EF4444` | Urgent badges, expiring policies, critical alerts |
| **Warning / Pending** | Caution Amber | `#F59E0B` | Warning badges, policies about to expire, pending items |
| **Success / Active** | Emerald Vitality | `#10B981` | Success metrics, active policies, retention rate, WhatsApp buttons |
| **Error System** | System Red | `#BA1A1A` | Form validation errors, system-level errors |
| **Error Container** | Blush Pink | `#FFDAD6` | Error background tint |

### Badge Background Tints (10% opacity of semantic color)

| Badge Type | Background | Text | Border |
|:---|:---|:---|:---|
| **URGENTE** | `rgba(239, 68, 68, 0.10)` | `#EF4444` | Left border `#EF4444` |
| **PENDIENTE** | `rgba(245, 158, 11, 0.10)` | `#F59E0B` | Left border `#F59E0B` |
| **NUEVO** | `rgba(16, 185, 129, 0.10)` | `#10B981` | Left border `#10B981` |

### Pipeline Stage Colors (Kanban)

| Stage | Accent Color | Hex | Column Tint |
|:---|:---|:---|:---|
| **Nuevo Prospecto** | Light Blue | `#60A5FA` | Default white |
| **Propuesta Enviada** | Medium Blue | `#3B82F6` | Default white |
| **En Negociación** | Amber | `#F59E0B` | Default white |
| **Esperando Pago** | Green | `#10B981` | Subtle green glow |
| **Afiliación Exitosa** | Dark Emerald | `#059669` | Light green tint `#F0FDF4` |

### Priority Badges (Pipeline)

| Priority | Color | Style |
|:---|:---|:---|
| **Alta** | Rose Red `#EF4444` | Red pill badge |
| **Media** | Amber `#F59E0B` | Amber pill badge |
| **Baja** | Blue `#3B82F6` | Blue pill badge |

---

## 3. Typography Rules

**Font Family:** Inter (Google Fonts) — used exclusively across all text to ensure maximum legibility across dense data tables and complex forms.

| Element | Weight | Size | Line Height | Letter Spacing | Notes |
|:---|:---|:---|:---|:---|:---|
| **H1 (Page Title)** | Semi-bold (600) | 30px | 36px | -0.02em | Compact, "architectural" feel |
| **H2 (Section Header)** | Semi-bold (600) | 24px | 32px | -0.01em | Sections like "Alertas y Acciones" |
| **H3 (Card Header)** | Semi-bold (600) | 20px | 28px | Normal | KPI card titles |
| **Body** | Regular (400) | 14px | 20px | Normal | Alert descriptions, general text |
| **Metadata** | Regular (400) | 12px | 16px | Normal | Timestamps, subtitles, labels |
| **Tabular Metrics** | Semi-bold (600) | 14px | 20px | Normal | Financial values, IDs — use `font-variant-numeric: tabular-nums` |
| **KPI Large Numbers** | Bold (700) | 32-36px | 40px | -0.02em | "$4,850.00", "127", "94.2%" |

---

## 4. Component Stylings

### Buttons
- **Primary:** Deep Corporate Blue (`#1E40AF`) fill, white text, gently rounded corners (`rounded-md`, 6px), subtle hover darkening to `#1E3A8A`. Padding: `10px 16px`.
- **Outline/Ghost:** Transparent background, slate border (`#E2E8F0`), charcoal text. Background appears on hover (`#F1F5F9`).
- **WhatsApp CTA:** Emerald green (`#25D366`) background, white text, WhatsApp icon left-aligned. Pill-shaped (`rounded-full`). Strong visual emphasis.
- **Destructive:** Rose Red (`#EF4444`) background for dangerous actions.
- **Size Scale:** Small (h-8, text-xs), Default (h-10, text-sm), Large (h-11, text-base).

### Cards / Containers
- **Surface:** Pure White (`#FFFFFF`) background
- **Border:** 1px solid Slate Mist (`#E2E8F0`)
- **Shadow:** Whisper-soft diffused — `0px 1px 3px rgba(15, 23, 42, 0.05)`
- **Corner Roundness:** Generously rounded (`rounded-lg`, 8px) for cards; gently rounded (`rounded-md`, 6px) for nested elements
- **Internal Padding:** 24px (1.5rem) uniform
- **Hover State:** Border transitions to `#CBD5E1`, shadow deepens slightly to `0px 4px 6px rgba(15, 23, 42, 0.08)`
- **Accent Border (KPI Cards):** 3px top border in semantic color (blue for metrics, amber for warnings, emerald for success)

### Alert Cards (Centro de Comando)
- **Structure:** White card with 4px left border in semantic color
- **Layout:** Flex row — icon/indicator left, content center, action button right
- **Badge:** Pill-shaped (`rounded-full`), semantic background tint at 10% opacity, bold colored text
- **Spacing:** 16px internal padding, 8px gap between alerts

### Inputs / Forms
- **Background:** White (`#FFFFFF`)
- **Border:** 1px solid Slate Mist (`#E2E8F0`), gently rounded (`rounded-md`)
- **Focus State:** 2px ring in Deep Corporate Blue (`#1E40AF`) with `ring-offset-2`
- **Labels:** 12px semi-bold Charcoal (`#1A1B22`), positioned above input
- **Placeholder:** Cool Gray (`#64748B`)

### Badges / Status Chips
- **Shape:** Pill-shaped (`rounded-full`)
- **Style:** Subtle background tint (10% opacity of semantic color) + high-contrast text label
- **Variants:** `URGENTE` (red), `PENDIENTE` (amber), `NUEVO` (green), `ACTIVA` (blue), `VENCIDA` (gray)
- **Size:** Compact — `text-xs`, `px-2.5 py-0.5`

### Data Tables
- **Headers:** Sticky, semi-bold 12px text, cool gray color, light background (`#F8FAFC`)
- **Rows:** Zebra-striping on hover only (not static), `hover:bg-slate-50`
- **Numbers:** Tabular-nums font variant for perfect column alignment
- **Actions Column:** Icon buttons or ghost buttons aligned right

### Sidebar Navigation
- **Width:** Fixed 260px
- **Background:** Slate Navy (`#0F172A`)
- **Menu Items:** Icon (20px) + Label, padding `12px 16px`, muted pearl text
- **Active State:** Left 3px blue border, blue-tinted background (`#1E40AF/15%`), white text
- **Hover State:** Background lightens to `rgba(255,255,255,0.05)`
- **User Profile:** Bottom-pinned, avatar (32px circle) + name + role label
- **Logo:** Top area, "RE" monogram in Deep Corporate Blue (#1E40AF) inside a white rounded-md square, below it "RED EMPRESARIAL" in bold white uppercase Inter, tracking-wider

### Topbar
- **Height:** 64px
- **Background:** White with subtle bottom border (`#E2E8F0`)
- **Search Bar:** Centered, `max-width: 480px`, rounded-lg, gray border, search icon left
- **Notifications:** Bell icon with red dot badge (count), 20px
- **Profile:** Avatar (36px circle) with dropdown chevron

### Pipeline Visualization
- **Stacked Bar:** Horizontal segments in stage colors (light blue → medium blue → amber → emerald)
- **Prospect Cards:** Avatar (40px), name, stage badge (pill), expected value, days counter
- **Header Link:** "Ver Kanban completo →" in primary blue with arrow

---

## 5. Layout Principles

### Grid System
- **Type:** 12-column fluid grid within a fixed sidebar shell
- **Sidebar:** Fixed 260px, always visible on desktop
- **Main Canvas:** Fluid with `max-width: 1600px` ceiling
- **KPI Row:** 4-column equal grid (`grid-cols-4`, `gap-6`)
- **Content Split:** 60/40 ratio for Alerts/Pipeline below KPIs

### Spacing Scale (8px base)
| Token | Value | Usage |
|:---|:---|:---|
| `space-1` | 4px | Tight gaps (icon-to-text) |
| `space-2` | 8px | Internal element spacing |
| `space-3` | 12px | Button padding, menu item vertical padding |
| `space-4` | 16px | Card internal padding (compact) |
| `space-6` | 24px | Card internal padding (standard), section gaps |
| `space-8` | 32px | Page container padding |
| `space-10` | 40px | Section vertical margins |

### Elevation Levels
| Level | Shadow | Usage |
|:---|:---|:---|
| **Level 0** | None | Page background (`#F8FAFC`) |
| **Level 1** | `0 1px 3px rgba(15,23,42,0.05)` | Cards, sidebar |
| **Level 2** | `0 10px 15px -3px rgba(15,23,42,0.10)` | Dropdowns, popovers, modals |
| **Interactive** | `0 4px 6px rgba(15,23,42,0.08)` | Card hover states |

### Responsive Breakpoints
| Breakpoint | Width | Behavior |
|:---|:---|:---|
| **Desktop XL** | ≥1536px | Full 4-col KPI, 60/40 split |
| **Desktop** | ≥1280px | Standard layout |
| **Tablet** | ≥768px | Sidebar collapses to icons, 2-col KPI grid |
| **Mobile** | <768px | Sidebar hidden (hamburger), single column stack |

---

## 6. Iconography

- **Library:** Lucide React (shadcn/ui default)
- **Size:** 20px for navigation, 16px inline, 24px for feature icons
- **Style:** Stroke-only (1.5px stroke width), consistent with Inter's clean geometry
- **Colors:** Inherit from parent text color; semantic colors for status indicators

---

## 7. Motion & Animation

| Element | Animation | Duration | Easing |
|:---|:---|:---|:---|
| **Card Hover** | Shadow + border transition | 200ms | `ease-in-out` |
| **Sidebar Active** | Background color fade | 150ms | `ease` |
| **Badge Pulse (Urgent)** | Animated red dot pulsing | 2s loop | `ease-in-out` |
| **KPI Number Entry** | Count-up animation | 800ms | `ease-out` |
| **Alert Entry** | Slide-in from left | 300ms | `cubic-bezier(0.4, 0, 0.2, 1)` |

---

## 8. Stitch Project Reference

```yaml
Project: Red Empresarial - CRM Dashboard
Project ID: 12704356112283778341
Design System: assets/0be941b9fa734034aacdf648a7243108

Screens:
  - Dashboard Principal (Original):
      ID: a60153d63f8a4a7189b01bbfb201dcfd
      Device: DESKTOP (2560x2222)
      Status: COMPLETE
      Local Files:
        - .stitch/designs/dashboard-principal.html
        - .stitch/designs/dashboard-principal-screenshot.png

  - Dashboard Rebranded (Red Empresarial):
      ID: fa03e1456d6d491591a17ad9272c0c96
      Device: DESKTOP (2560x2222)
      Status: COMPLETE
      Local Files:
        - .stitch/designs/dashboard-rebranded.html
        - .stitch/designs/dashboard-rebranded-screenshot.png

  - Perfil del Cliente:
      ID: 9c4eec345bbd4b2aab183130073bbb32
      Device: DESKTOP (2560x3062)
      Status: COMPLETE
      Local Files:
        - .stitch/designs/perfil-cliente.html
        - .stitch/designs/perfil-cliente-screenshot.png

  - Mis Afiliados (Data Table):
      ID: 813eb53f2121440e8c039b3cb7575074
      Device: DESKTOP (2560x2222)
      Status: COMPLETE
      Local Files:
        - .stitch/designs/mis-afiliados.html
        - .stitch/designs/mis-afiliados-screenshot.png

  - Pipeline Kanban:
      ID: d8044ee3b12c4d28ac9f6432c10b499d
      Device: DESKTOP (2560x2222)
      Status: COMPLETE
      Local Files:
        - .stitch/designs/pipeline-kanban.html
        - .stitch/designs/pipeline-kanban-screenshot.png

  - Agenda de Seguimiento:
      ID: 591d9158b4f045e49e282ed40cd12a56
      Device: DESKTOP (2560x2222)
      Status: COMPLETE
      Local Files:
        - .stitch/designs/agenda.html
        - .stitch/designs/agenda-screenshot.png

  - Academia Red Empresarial:
      ID: 0cad024e9b3a4aeb8610aea9ff8508ab
      Device: DESKTOP (2560x2222)
      Status: COMPLETE
      Local Files:
        - .stitch/designs/academia.html
        - .stitch/designs/academia-screenshot.png
```

---

> **Usage Note:** When generating new screens for this project, include this DESIGN.md content in the Stitch prompt to maintain visual consistency. Reference the Project ID and Design System Asset ID to ensure the same tokens are applied automatically.
