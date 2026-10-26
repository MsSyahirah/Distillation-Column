# Explore the Distillation Tower

An interactive web-based lesson designed for ITE Chemical Process Technology students to visualise distillation tower equipment, track counter-current vapour and liquid movement, test operational adjustments, and solidify core chemical engineering principles.

Created by **Ms Syahirah**.

---

## User Review & Critical Decisions

> [!IMPORTANT]
> The following key decisions were confirmed with Ms Syahirah during Phase 1 clarification:
> - **Student Review Strategy**: Built-in Teacher Review panel on the device, accompanied by one-click text/markdown copying for Miro boards and LMS submissions.
> - **Visual Aesthetics**: Dual-theme toggle supporting an Industrial DCS Console (dark slate high-contrast mimic) and a Clean Laboratory mode (light slate/zinc).
> - **Lesson Navigation**: Self-paced open tabs enabling flexible exploration while maintaining clear visual progress indicators and section checklists.

---

## 1. Overview & Core Concept

- **Target Audience**: ITE (Institute of Technical Education) Chemical Process Technology students learning continuous fractionation fundamentals.
- **Core Educational Objective**: Enable beginner operators to mentally map the internal and external physical equipment of a tray distillation column, understand how ascending vapour contacts descending liquid on trays to achieve separation, and observe how changes in reboiler heat input and reflux affect column operation without confusing mathematical complexity.
- **Teaching Assumptions & Safety Statement**: Prominently presented as a *"Simplified Conceptual Teaching Model"*. No fictitious precision numbers; clear qualitative explanations grounded in mass and energy balance concepts (vapour enrichment in more volatile components, counter-current liquid refluxing).

---

## 2. User Experience & Visual Design

### Top Bar & Attribution Contract
- **Title**: *Explore the Distillation Tower*
- **Author Credit**: "Created by Ms Syahirah" prominently displayed below the title in the header and reiterated across all views and the footer.
- **Header Actions**:
  - Student Profile indicator (`[Name] · [Class]`)
  - Theme Toggle (Industrial DCS Dark Console ⇄ Clean Modern Lab)
  - Motion / Accessibility Toggle (Reduced Motion mode for smooth accessibility)
  - Teacher Review Modal Access (quick view for teacher inspection)

### 5-Stage Learning Navigation
1. **01. Explore Equipment**:
   - Interactive SVG diagram of the complete distillation system: Tower shell, bubble/sieve trays with downcomers, feed nozzle/tray, condenser, reflux accumulator drum, reflux pump/line, overhead distillate outlet, reboiler, and column bottoms outlet.
   - Clickable hotspots with popover cards explaining: Component Name, Purpose, and "How it works in plain English" (explaining technical terms like *volatile*, *reflux*, *latent heat* on first appearance).
   - "Show Labels / Hide Labels" master toggle for self-testing.
2. **02. Follow the Flow**:
   - Dynamic counter-current flow visualization:
     - Ascending Vapour: Warm amber/orange animated dashed pulses with upward glyph arrows (`▲ Vapour`).
     - Descending Liquid: Cool azure/cyan flowing droplet trails with downward glyph arrows (`▼ Liquid`).
   - Overhead cycle: Vapour exits top nozzle $\to$ cools in condenser $\to$ collects in reflux drum $\to$ splits into Reflux (returned to top tray) and Distillate product.
   - Bottoms cycle: Liquid leaves tower bottom $\to$ enters reboiler $\to$ boiled vapour re-enters tower $\to$ residual heavy liquid leaves as Bottoms product.
   - Interactive playback deck: Play, Pause, Replay, Speed slider ($0.5\times$, $1\times$, $2\times$), and Step-by-Step pathway highlighter (Overhead System, Column Trays, Reboiler Circuit).
   - Conceptual principle highlight: Demonstrates how liquid-vapour contact on each tray enriches the rising vapour in the more volatile component.
3. **03. Predict & Observe**:
   - Guided operating change scenarios:
     - *Scenario A: Increasing Reboiler Heat Input*
     - *Scenario B: Increasing Reflux Rate*
     - *Scenario C: Low Reboiler Heat (Vapour starving)*
     - *Scenario D: Total Reflux (Zero Distillate takeoff)*
   - 2-Step interactive pattern:
     1. Prediction step: Student selects their prediction before adjusting controls.
     2. Observation step: Column animation adapts (flow speed, vapour density, liquid level) alongside plain-English feedback on the physical outcome and clear pedagogical assumptions.
4. **04. Check Understanding**:
   - Component-labelling interactive exercise with dual input options: Drag-and-drop or accessible Click-to-Select targeting.
   - 5 Concept Check questions covering tower mechanics, fluid directions, reflux purpose, and reboiler heat duty.
   - Instant explanatory feedback for both correct and incorrect answers with retry support and constructive hints.
5. **05. Reflect & Teacher Review**:
   - Guided reflection prompts:
     - *One thing I understand*
     - *One thing I am still unsure about*
     - *One question I want to ask Ms Syahirah*
   - Copy-to-clipboard button formatted for instant pasting into Miro, Google Docs, or email.
   - Dedicated "Teacher Review" tab/modal displaying student responses, quiz attempts, and time spent, with a printable completion certificate slip.
   - Scientific assumptions & simplifications reference table for instructor validation.

### Visual Aesthetic & Palette
- **DCS Dark Console**: Deep slate background (`#0B1120`), zinc card surfaces (`#1E293B`), cybernetic cyan borders (`#0284C7`), crisp amber alerts (`#F59E0B`), high-contrast off-white text (`#F8FAFC`).
- **Clean Lab Light**: Clean titanium off-white canvas (`#F8FAFC`), crisp white panel surfaces (`#FFFFFF`), subtle steel borders (`#E2E8F0`), deep ink body text (`#0F172A`).
- **Fluid Semantics**: Vapour (`#F97316` Amber-Orange with `▲` arrows) vs Liquid (`#0284C7` Cyan-Blue with `▼` arrows). Dual-coded with explicit text labels and vector directional glyphs to avoid relying on color alone.

---

## 3. Key Product Decisions & Trade-Offs

- **Decision 1: SVG Vector Architecture over Canvas or Video**
  - *Chosen Approach*: Interactive vector SVG diagram with React state bindings for component highlights, label overlays, and SVG filter animations.
  - *Why*: Crisp scaling across laptop screens and tablets, direct keyboard accessibility, individual element DOM clickability, and seamless theme switching.
- **Decision 2: Simplified Conceptual Physics vs Empirical Equations**
  - *Chosen Approach*: Qualitative mass-and-energy balance model rather than simulated Antoine equations or McCabe-Thiele calculations.
  - *Why*: Meets the specific requirement: *"Clearly label the activity as a 'Simplified conceptual teaching model'. Do not invent realistic-looking temperatures, pressures, compositions or purity values without a defined calculation model."* Focuses students on core physical intuition.
- **Decision 3: Zero-Dependency Local Persistence & Export**
  - *Chosen Approach*: Browser `localStorage` for progress persistence with zero external backend dependencies.
  - *Why*: Allows students to use the tool instantly in computer labs without logins, while retaining their reflection answers and quiz scores for teacher inspection on the device.

---

## 4. Technical Architecture & Data Strategy

### System & Component Structure

```
┌────────────────────────────────────────────────────────────────────────┐
│                        App Root (State Provider)                       │
│  - Theme (Dark DCS / Clean Lab)    - Student Info (Name, Class)        │
│  - Active Tab (01-05, Teacher)     - Progress Tracker (Steps Complete) │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
    ┌───────────────────────────────┴───────────────────────────────┐
    │                       Header Bar Zone                         │
    │  - Title: Explore the Distillation Tower                     │
    │  - "Created by Ms Syahirah" attribution                       │
    │  - Tab navigation (01 Explore -> 05 Reflect -> Teacher Review)│
    │  - Theme toggle & Reduced Motion switch                       │
    └───────────────────────────────┬───────────────────────────────┘
                                    │
    ┌───────────────────────────────┴───────────────────────────────┐
    │                      Active View Router                       │
    ├───────────────────────┬───────────────────────┬───────────────┤
    │  01. Equipment Deck   │  02. Flow Visualizer  │ 03. Predict   │
    │  - Interactive SVG    │  - Counter-current    │ - Scenarios   │
    │  - Tray & Vessel data │    vapour/liquid flow │ - Hypothesize │
    │  - Component glossary │  - Play/Pause/Speed   │ - Observe &   │
    │  - Show/Hide labels   │  - Step-by-Step mode  │   Assumptions │
    ├───────────────────────┴───────────────────────┴───────────────┤
    │  04. Knowledge Check      │ 05. Reflection & Teacher Review   │
    │  - Drag & Click labelling │ - 3 Reflection prompts            │
    │  - 5 Multiple-choice items│ - Miro / Classroom Export Card    │
    │  - Instant feedback & hint│ - Teacher content review guide    │
    └───────────────────────────────────────────────────────────────┘
```

### State Management & Entities

```typescript
interface StudentProfile {
  name: string;
  className: string;
  startedAt: string;
}

interface ComponentDetail {
  id: string;
  name: string;
  symbol: string;
  category: 'column' | 'overhead' | 'bottoms' | 'internals';
  purpose: string;
  howItWorks: string;
  technicalTerms: { term: string; definition: string }[];
  coordinates: { x: number; y: number; width?: number; height?: number };
}

interface FlowStep {
  id: string;
  title: string;
  phase: 'vapour' | 'liquid' | 'contact';
  description: string;
  highlightElements: string[];
}

interface PredictionScenario {
  id: string;
  title: string;
  actionDescription: string;
  question: string;
  options: { id: string; text: string; isCorrect: boolean; explanation: string }[];
  observedOutcome: string;
  assumptions: string[];
}

interface ReflectionData {
  understood: string;
  unsure: string;
  questionForTeacher: string;
  completedAt?: string;
}
```
