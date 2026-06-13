#  AI Usage Disclosure

**AI tool used:** ChatGPT 

**Nature of assistance:** Code scaffolding, debugging, API integration, README structure, and architectural brainstorming. The final implementation, testing, and all critical decisions were made by the human developer.

---

## 📋 Detailed Interaction Log (summarised)

The following are key prompts and how they shaped the project. Full conversation logs are omitted for brevity but can be shared upon request.

### 1. Problem interpretation
> *"Millions of people generate data about themselves – build a backend that takes a stream of user activity, finds patterns, and tells each user something genuinely useful they couldn't see on their own. System must use rule-based logic + an LLM. Provide a full implementation."*

**Outcome:** Clarified that the LLM should not compute raw stats but synthesise insights from pre‑computed rules. Decided on user activity model: `(userId, activityType, duration, timestamp)`.

### 2. Stack selection
> *"Use Node.js, Express, TypeScript for backend, Next.js for frontend, SQLite for persistence, and Gemini API (free tier) as the LLM."*

**Outcome:** Generated initial folder structure and boilerplate.

### 3. Rule‑based statistics design
> *"What non‑obvious patterns can a rule‑based system detect without an LLM? Give me a function that computes: most active day of week, most active hour block (morning/afternoon/evening/night), consistency score (standard deviation of daily activity counts), and weekly trend (increase/decrease/stable)."*

**Outcome:** Created `ruleBasedStats.ts` with SQLite queries and deterministic calculations.

### 4. Hybrid approach – feeding stats to LLM
> *"How do I ensure the LLM doesn't hallucinate numbers? Should I compute all stats first and then pass them as context?"*

**Outcome:** Designed the prompt that injects computed stats and recent activity samples into Gemini, asking for a single non‑obvious, actionable insight.

### 5. Gemini API integration troubles
> *"I'm getting 'API key not valid' even though the key is correct. What's wrong?"*  
> *"Now I get 'models/gemini-1.5-flash is not found'. Which model works with free tier?"*  
> *"None of the model names work – gemini-pro, gemini-1.0-pro, 1.5-flash all fail."*

**Outcome:** Discovered that the old `@google/generative-ai` package and deprecated models were the issue. Switched to `@google/genai` SDK and used `gemini-2.0-flash`, which resolved the errors. Also added graceful fallback so the system returns rule‑based insight if LLM fails.

### 6. Frontend – displaying both rule and LLM outputs
> *"Show the rule‑based stats in a grid and the LLM insight in a separate box. Handle loading and error states."*

**Outcome:** Built `InsightsView.tsx` with stats cards and an insight box, plus a fallback message when Gemini is unavailable.

### 7. README and verification
> *"Write a README that includes setup, running instructions, how to verify everything works, and a section on incomplete parts."*

**Outcome:** Produced the current README with clear steps, troubleshooting, and the required trade-off analysis.

---

##  Human Contribution Summary

- **Architecture decision:** Rule‑based pre‑computation + LLM synthesis, not end‑to‑end LLM.
- **Trade‑off analysis:** Reliability and cost vs. missing novel correlations.
- **Database schema design and indexing.**
- **Integration testing:** Logged real activities, verified stats against manual counts.
- **Fallback logic:** Ensured system always returns insight even if LLM fails.
- **All final code adjustments, styling, and deployment readiness.**

---
