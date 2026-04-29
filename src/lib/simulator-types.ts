/**
 * Anmeldung Simulator — interactive role-play of a Bürgeramt appointment.
 *
 * Structure:
 *   - 8 questions a Beamter typically asks (in German)
 *   - Each Q has 3-4 possible answers with scoring (correct/partial/wrong)
 *   - At the end: score, list of mistakes, recommended next steps
 *
 * Content (questions, options, feedback) lives in i18n namespace `simulator`
 * under key `anmeldung.questions[]`. Each question has:
 *   - de: how the Beamter phrases it (German, always shown verbatim)
 *   - bs: Bosnian explanation of what they're asking
 *   - options: array of { text, score (0|5|10), feedback }
 *
 * 4 languages required: bs (default), de, hr, sr.
 */
export interface SimQuestionOption {
  /** What the user picks (in the user's language) */
  text: string;
  /** 0 = wrong, 5 = partial, 10 = correct */
  score: 0 | 5 | 10;
  /** Inline feedback after picking */
  feedback: string;
}

export interface SimQuestion {
  id: string;
  /** Verbatim German phrasing (always shown, all 4 langs) */
  de: string;
  /** What the Beamter is actually asking — explanation in user's language */
  context: string;
  /** Optional tip shown before answering */
  tip?: string;
  options: SimQuestionOption[];
}

export const ANMELDUNG_SIM_TOTAL_QUESTIONS = 8;
