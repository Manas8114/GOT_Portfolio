# 🗄️ Mission: Operational Refinement of "The Archive", "Seals", & Core Portfolio UX

## 🎯 Primary Objectives

1. Eliminate card overlap and layout collision bugs in **Battles (Projects)** and **Seals (Certificates)** using an algorithmic, responsive staggered layout.
2. Implement **Mobile Tap-to-Expand** & keyboard-accessible case file folders (`activeProjectId` / `aria-expanded`).
3. Synchronize certificate IDs and research papers across `lib/data.ts` and view components.
4. Compress heavy assets (e.g., 11.8 MB profile image) and clean up ESLint / React 19 lifecycle warnings.

---

## 🛠️ Step 1: Algorithmic & Responsive Battles (Projects) Layout

The previous static `projectLayout` (14 coordinates) broke because `lib/data.ts` contains 19 projects, causing items 14–18 to collide on index 0 at `top: "2%", left: "5%"`, while fixed `height: 2000px` caused card clipping.

**Requirements:**

- **Dynamic Staggered Layout**: Replace static percentage coordinates with an algorithmic staggered grid/masonry flow that applies deterministic rotation (`rotate: angles[i % angles.length]`) and alternating horizontal/vertical offsets. All 19+ projects must render with zero overlap.
- **Dynamic Container Sizing**: Remove fixed `height: 2000px`; allow the container height to adjust dynamically based on card count.
- **Interactive Folder UI (Mobile + Desktop)**:
  - Default state: Closed folder tab with category tag and title.
  - Desktop: Hover reveals preview; clicking pins the card open.
  - Mobile: Tap toggles open/closed state (`activeProjectId`).
  - Accessibility: Full keyboard toggle support (`Enter` / `Space` with `tabIndex={0}` and `aria-expanded`).
- **Z-Index Management**: Hovering or dragging any card elevates it to the highest z-index (`z-50` / `z-[100]`).

---

## 🔬 Step 2: Research Integration & Tab Hierarchy

Clarify the relationship between **Battles** (Projects) and **Scrolls** (Research & Achievements).

**Requirements:**

- In `Battles`, provide category filter pills (*All*, *Research & Papers*, *Systems & AI/ML*, *Web*).
- Research Case Files must render with a distinct **Manila Folder Tab** and paperclip badge (`📎 Research Paper`), along with conference presentation highlights (e.g., *ICICV 2026 Oral*, *WOCC 2026*).
- Keep `Scrolls` focused as a dedicated **Milestone Timeline** (awards, hackathons, academic milestones) rather than duplicating project cards.

---

## 📜 Step 3: Expand & Fix Seals (Certificates)

- **Fix Mismatched IDs**: Update `featuredCerts` in `Certificates.tsx` from `["oracle-ai-foundations", "nptel-java"]` to match `lib/data.ts` (`"oracle-ai"`, `"java-nptel"`).
- **Algorithmic Staggering**: Apply dynamic staggered positioning to Certificates so all 13+ certs render with wax seals without clipping or clumping.

---

## ⚡ Step 4: Asset & Code Quality Polish

- **Profile Image Compression**: Compress `public/images/profile.jpg` from 11.8 MB down to < 150 KB, and ensure responsive image delivery.
- **Contact Email Correction**: Align email in `lib/data.ts` with verified address (`ms9508@srmist.edu.in`).
- **Skills Mobile Positioning**: Prevent desktop absolute coordinates (`top`, `left`) from being applied to relative mobile elements in `Skills.tsx`.
- **React 19 / ESLint Hygiene**: Move audio caching in `SoundSystem.tsx` from React state to `useRef`, and remove synchronous `setState` in initial effect hooks.
