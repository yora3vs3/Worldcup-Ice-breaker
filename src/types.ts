export interface Player {
  id: string;
  name: string;
  score: number;
  favoriteCountry: string;
  color: string; // Tailwind bg-class color, e.g. 'emerald-500'
  answers: Record<string, string>; // questionId -> chosenOption
  jerseyGuesses: Record<string, string>; // jerseyId -> countryGuess
  pollVotes: Record<string, string>; // pollId -> optionChosen
}

export interface TriviaQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  points: number;
  category: 'History' | '2026 World Cup' | 'Superstars' | 'Venues & Stadiums' | 'Guess the Manager' | 'Qualified Team History' | 'Guess the Stadium' | 'Player Statistics';
}

export type JerseyPattern = 'solid' | 'stripes' | 'hoops' | 'sash' | 'halves' | 'stars' | 'checkered';

export interface JerseyItem {
  id: string;
  country: string;
  continent: string;
  primaryColor: string; // hex or tailwind text/bg names
  secondaryColor: string;
  pattern: JerseyPattern;
  hint: string;
  funFact: string;
}

export interface PollItem {
  id: string;
  topic: string;
  description: string;
  options: string[];
  category: 'Matchday Choices' | 'Player Comparison' | 'Hot Takes' | 'Fan Culture' | 'Player of the Match';
}

export interface DebatePrompt {
  id: string;
  topic: string;
  scenario: string;
  options: string[];
}

export type GameScreen = 
  | 'welcome' 
  | 'players_setup' 
  | 'round_intro'
  | 'trivia' 
  | 'jersey' 
  | 'polls' 
  | 'debate' 
  | 'scoreboard' 
  | 'winner';

export interface GameState {
  screen: GameScreen;
  players: Player[];
  currentRound: number; // 1: Trivia, 2: Jersey Identification, 3: Fan Polls, 4: Hot Takes Debate
  currentTriviaIndex: number;
  currentJerseyIndex: number;
  currentPollIndex: number;
  currentDebateIndex: number;
  activePlayerTurnIndex: number; // For pass-and-play trivia or jersey rounds
  revealAnswer: boolean;
  selectedOption: string | null;
  selectedJerseyGuess: string | null;
}
