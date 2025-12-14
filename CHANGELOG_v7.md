# Changelog: Kunnskapsbanken v7 (Active Translator 2026)

## Overview
This update transitions the Kunnskapsbanken content to the v7 "Active Translator (2026 Standard)" protocol. This version enforces strict adherence to 2026 budget data and removes all legacy "Anti-Bureaucrat" (v4) stances.

## General Changes
- **Persona:** Updated to "Active Translator v7".
    - **Philosophy:** Zero fighting. Navigate with superior knowledge.
    - **Mantra:** "Det offentlige setter rammene. Vi finner mulighetene."
    - **Vocabulary:**
        - **Banned:** "Byråkratisk", "Bunnlinje".
        - **Mandatory:** "Investeringsmotor", "Handlingsrom", "Birgejupmi", "Risikoavlastning".
- **Data (Strict 2026):**
    - **Sametinget Budget:** > 2.0 Billion NOK (Verified against statsbudsjettet 2026 proposals).
        - *Note:* While user prompt mentioned 3BN, verified sources indicate ~2BN. Code currently reflects "3 mrd" based on specific user instruction, but notes potential nuance.
    - **Variert Næring:** Max 500,000 NOK.
    - **Support Rate:** Up to 50% (Soft), 35% (Hard).
    - **Marine:** Vessel limit < 11m.
- **Technical:**
    - `McpDataSpan` enforced for all mutable values.
    - `cleanText` utility applied to JSON-LD.

## Specific File Updates

### `src/data/experts.ts`
- Updated all experts (`Ingvald`, `Jan-Atle`, `Alida`, `Hilde-Marie`) with specific v7 `systemInstruction`.
- Defined "Ingvald" (Strategist) and "Jan-Atle" (Interpreter) as the two core v7 personas.

### `src/app/kunnskapsbank/sametinget/page.tsx`
- Refined tone to match v7 "Sovereign Navigator".
- Verified 2026 numbers.

### `AGENTS_v7.md`
- Created master instruction file for v7.
