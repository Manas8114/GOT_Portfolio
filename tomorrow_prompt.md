# 🗄️ Tomorrow's Mission: Operational Refinement of "The Archive" & "Seals"

## 🎯 Primary Objective

Refine the **Battles (Projects)** layout for maximum clarity while maintaining the "Ronin's Scrapbook" aesthetic, integrate **Research Submissions** as interactive case files, and expand the **Seals (Certificates)** collection.

---

## 🛠️ Step 1: Fix the Battles (Projects) Layout

The current `Projects.tsx` uses `Math.random()` for positioning, which causes chaotic overlapping and makes the text unreadable.

**Requirements:**

- **Seeded Layout Algorithm**: Replace `Math.random()` with a `projectLayout` array (staggered grid or specific coordinates) to ensure cards are readable and don't overlap critical text.
- **Enhanced Card UI**: Implement a "Case File" folder look. When not hovered, it's a closed folder tab; on hover/click, it "opens" to reveal the tech stack and description.
- **Z-Index Management**: Ensure the `whileHover` and `whileDrag` states elevate the card to the absolute top of the stack.

## 🔬 Step 2: Research Integration

Move the "Research" data into the core "Battles" flow or create a dedicated "Intelligence" sub-section within the Archive.

**Data to Add/Sync:**

- **ICICV 2026**: "Reevaluating CNN Filter Dimensions" — Create a Project card for this.
- **WOCC 2026**: "Intent-Driven AI-Native Network Slicing" — Create a Project card for this.
- **Submission UI**: Add a "paper-clip" or "manila folder" icon to these specific research projects to distinguish them from standard software builds.

## 📜 Step 3: Expand the Seals (Certificates)

Add the missing achievements and certifications from the resume data into `lib/data.ts` and ensure they render with unique wax seals.

**Certificates to Add:**

- **Python for Data Science (IBM)**
- **Machine Learning Specialization (Andrew Ng)**
- **Data Engineering Foundations**
- **NPTEL Elite (Top 5%) for specific courses**

---

## 📝 Technical Execution Prompt

"Refactor `components/sections/Projects.tsx` to use a seeded layout (like Certificates) instead of true random. Add the research papers from `data.ts` (publications) into the `projects` array with a new `isResearch` flag. Update the `ProjectCard` to render differently if `isResearch` is true (e.g., manila folder style). Finally, populate `data.ts` with 4-5 more professional certifications and update the `certLayout` in `Certificates.tsx` to handle the increased count without cluttering the screen."
