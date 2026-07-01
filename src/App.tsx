import React, { useState } from 'react';
import { Player, GameScreen, JerseyItem } from './types';
import PlayerSetup from './components/PlayerSetup';
import GameHeader from './components/GameHeader';
import TriviaRound from './components/TriviaRound';
import JerseyRound from './components/JerseyRound';
import PollsRound from './components/PollsRound';
import DebateRound from './components/DebateRound';
import ScoreboardView from './components/ScoreboardView';
import WinnerView from './components/WinnerView';

// Datasets
import { triviaQuestions } from './data/trivia';
import { jerseyItems } from './data/jerseys';
import { pollItems, debatePrompts } from './data/polls';

// Lucide Icons
import { 
  Trophy, 
  Flag, 
  Flame, 
  Calendar, 
  Award, 
  Tv, 
  CheckCircle, 
  Users, 
  Dribbble, 
  Sparkles,
  Shirt,
  Volume2,
  UsersRound,
  ShieldCheck
} from 'lucide-react';

export default function App() {
  // Core game flow state
  const [screen, setScreen] = useState<GameScreen>('welcome');
  const [players, setPlayers] = useState<Player[]>([]);
  const [currentRound, setCurrentRound] = useState<number>(1);
  const [selectedTriviaCategories, setSelectedTriviaCategories] = useState<string[]>([
    'History', '2026 World Cup', 'Superstars', 'Venues & Stadiums',
    'Guess the Manager', 'Qualified Team History', 'Guess the Stadium', 'Player Statistics'
  ]);
  
  // Index pointers
  const [currentTriviaIndex, setCurrentTriviaIndex] = useState<number>(0);
  const [currentJerseyIndex, setCurrentJerseyIndex] = useState<number>(0);
  const [currentPollIndex, setCurrentPollIndex] = useState<number>(0);
  const [currentDebateIndex, setCurrentDebateIndex] = useState<number>(0);
  
  // Interactive control states
  const [activePlayerTurnIndex, setActivePlayerTurnIndex] = useState<number>(0);
  const [revealAnswer, setRevealAnswer] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [selectedJerseyGuess, setSelectedJerseyGuess] = useState<string | null>(null);

  const filteredTriviaQuestions = triviaQuestions.filter(q => selectedTriviaCategories.includes(q.category));

  // Dynamic limits per session based on player count
  const getTotalTriviaCount = () => Math.min(filteredTriviaQuestions.length, players.length * 2);
  const getTotalJerseyCount = () => Math.min(jerseyItems.length, players.length * 2);
  const getTotalPollsCount = () => Math.min(pollItems.length, 4);
  const getTotalDebatesCount = () => Math.min(debatePrompts.length, 2);

  // Restart State to draft new player roster
  const handleRestart = () => {
    setScreen('welcome');
    setPlayers([]);
    setCurrentRound(1);
    setCurrentTriviaIndex(0);
    setCurrentJerseyIndex(0);
    setCurrentPollIndex(0);
    setCurrentDebateIndex(0);
    setActivePlayerTurnIndex(0);
    setRevealAnswer(false);
    setSelectedOption(null);
    setSelectedJerseyGuess(null);
  };

  const handleStartGame = (playerRoster: Player[], selectedCategories: string[]) => {
    setPlayers(playerRoster);
    setSelectedTriviaCategories(selectedCategories);
    setCurrentRound(1);
    setScreen('round_intro');
  };

  // Turn management: Trivia answer selected
  const handleTriviaAnswer = (isCorrect: boolean, chosenOption: string, points: number) => {
    setSelectedOption(chosenOption);
    setRevealAnswer(true);

    if (isCorrect) {
      setPlayers(prevPlayers => {
        const copy = [...prevPlayers];
        copy[activePlayerTurnIndex].score += points;
        return copy;
      });
    }
  };

  // Turn management: Trivia next click
  const handleTriviaNext = () => {
    const totalForRound = getTotalTriviaCount();
    if (currentTriviaIndex + 1 >= totalForRound) {
      // Completed Round 1 trivia! Go to scoreboard
      setScreen('scoreboard');
    } else {
      setCurrentTriviaIndex(prev => prev + 1);
      setActivePlayerTurnIndex(prev => (prev + 1) % players.length);
      setRevealAnswer(false);
      setSelectedOption(null);
    }
  };

  // Turn management: Jersey answer selected
  const handleJerseyAnswer = (isCorrect: boolean, chosenCountry: string, pointsAwarded: number) => {
    setSelectedJerseyGuess(chosenCountry);
    setRevealAnswer(true);

    if (isCorrect) {
      setPlayers(prevPlayers => {
        const copy = [...prevPlayers];
        copy[activePlayerTurnIndex].score += pointsAwarded;
        return copy;
      });
    }
  };

  // Turn management: Jersey next click
  const handleJerseyNext = () => {
    const totalForRound = getTotalJerseyCount();
    if (currentJerseyIndex + 1 >= totalForRound) {
      // Completed Round 2 jerseys! Go to scoreboard
      setScreen('scoreboard');
    } else {
      setCurrentJerseyIndex(prev => prev + 1);
      setActivePlayerTurnIndex(prev => (prev + 1) % players.length);
      setRevealAnswer(false);
      setSelectedJerseyGuess(null);
    }
  };

  // Turn management: Poll finished
  const handlePollFinished = (votesCast: Record<string, string>) => {
    setPlayers(prevPlayers => {
      return prevPlayers.map(p => ({
        ...p,
        pollVotes: {
          ...p.pollVotes,
          [pollItems[currentPollIndex].id]: votesCast[p.id] || ''
        }
      }));
    });
  };

  // Turn management: Poll next click
  const handlePollNext = () => {
    const totalForRound = getTotalPollsCount();
    if (currentPollIndex + 1 >= totalForRound) {
      // Completed Round 3 polls! Go to scoreboard
      setScreen('scoreboard');
    } else {
      setCurrentPollIndex(prev => prev + 1);
    }
  };

  // Turn management: Debate consensus verdict selected
  const handleDebateFinished = (verdictOption: string) => {
    // Debates do not modify score, they are icebreakers. 
    // We can show custom verdict statistics or award the "Debate Champion" award in final podium.
  };

  // Turn management: Debate next click
  const handleDebateNext = () => {
    const totalForRound = getTotalDebatesCount();
    if (currentDebateIndex + 1 >= totalForRound) {
      // Completed all debates! Go to scoreboard first to see final standings
      setScreen('scoreboard');
    } else {
      setCurrentDebateIndex(prev => prev + 1);
    }
  };

  // Scoreboard proceed button handler (transitions between rounds)
  const handleScoreboardProceed = () => {
    if (currentRound === 1) {
      setCurrentRound(2);
      setRevealAnswer(false);
      setActivePlayerTurnIndex(0);
      setScreen('round_intro');
    } else if (currentRound === 2) {
      setCurrentRound(3);
      setScreen('round_intro');
    } else if (currentRound === 3) {
      setCurrentRound(4);
      setScreen('round_intro');
    } else if (currentRound === 4) {
      setScreen('winner');
    }
  };

  // Get list of all qualified countries for options in jersey round
  const allCountriesList = jerseyItems.map(j => j.country);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col selection:bg-emerald-500 selection:text-slate-950" id="main-app-container">
      
      {/* Dynamic Scorebug Broadcast Header during active match */}
      {screen !== 'welcome' && screen !== 'players_setup' && (
        <GameHeader
          currentRound={currentRound}
          players={players}
          activePlayerTurnIndex={activePlayerTurnIndex}
          screen={screen}
        />
      )}

      {/* Main Game Screen Canvas */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 md:p-8" id="game-main-content">
        
        {/* VIEW 1: WELCOME LOBBY */}
        {screen === 'welcome' && (
          <div className="w-full max-w-3xl text-center bg-gradient-to-b from-slate-900 to-slate-950 border border-emerald-500/20 rounded-3xl p-6 sm:p-12 shadow-2xl relative overflow-hidden" id="welcome-canvas">
            {/* Field background effect */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-green-400 to-teal-500" />
            
            <div className="inline-flex items-center justify-center p-4 bg-emerald-500/15 rounded-full text-emerald-400 mb-6 border border-emerald-500/20 shadow-lg">
              <Dribbble className="w-12 h-12 text-emerald-400 animate-spin-slow" />
            </div>

            <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight mb-4 leading-tight">
              WORLD CUP <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">2026</span> ICEBREAKER
            </h1>
            
            <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto mb-10 font-medium leading-relaxed">
              Kick off the perfect party game with your fellow soccer fans! Gather around the screen for an interactive 4-round match of World Cup trivia, country jersey decoding, fan polls, and tactical debates.
            </p>

            {/* Feature Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto mb-12">
              <div className="bg-slate-900/60 border border-slate-800/80 p-4 rounded-2xl flex items-start gap-3.5 text-left">
                <div className="p-2 bg-emerald-500/10 rounded-xl text-emerald-400">
                  <Trophy className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-extrabold text-white">Group Stage Trivia</h4>
                  <p className="text-xs text-slate-400 mt-1">Pass-and-play multiple choice trivia on host venues, history, and stars.</p>
                </div>
              </div>

              <div className="bg-slate-900/60 border border-slate-800/80 p-4 rounded-2xl flex items-start gap-3.5 text-left">
                <div className="p-2 bg-sky-500/10 rounded-xl text-sky-400">
                  <Shirt className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-extrabold text-white">Jersey Identification</h4>
                  <p className="text-xs text-slate-400 mt-1">Guess which qualified nation matches the custom-styled SVG home jersey.</p>
                </div>
              </div>

              <div className="bg-slate-900/60 border border-slate-800/80 p-4 rounded-2xl flex items-start gap-3.5 text-left">
                <div className="p-2 bg-purple-500/10 rounded-xl text-purple-400">
                  <UsersRound className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-extrabold text-white">Dressing Room Polls</h4>
                  <p className="text-xs text-slate-400 mt-1">Icebreaker opinions on legendary comparisons. Discover who shares your views.</p>
                </div>
              </div>

              <div className="bg-slate-900/60 border border-slate-800/80 p-4 rounded-2xl flex items-start gap-3.5 text-left">
                <div className="p-2 bg-rose-500/10 rounded-xl text-rose-400">
                  <Flame className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-extrabold text-white">Tactical Hot Takes</h4>
                  <p className="text-xs text-slate-400 mt-1">Argue heated soccer scenarios with an active countdown pitch timer.</p>
                </div>
              </div>
            </div>

            {/* Action CTA */}
            <button
              type="button"
              onClick={() => setScreen('players_setup')}
              className="px-10 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-black rounded-2xl text-base shadow-xl shadow-emerald-500/20 hover:shadow-emerald-500/35 transition-all hover:translate-y-[-2px] active:translate-y-[1px]"
              id="start-welcome-btn"
            >
              Draft Roster & Play!
            </button>

            <div className="mt-8 flex items-center justify-center gap-3 text-xs text-slate-500">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>Co-hosts: USA • Mexico • Canada 2026</span>
            </div>
          </div>
        )}

        {/* VIEW 2: PLAYER SETUP */}
        {screen === 'players_setup' && (
          <PlayerSetup onStartGame={handleStartGame} />
        )}

        {/* VIEW 3: ROUND INTROS */}
        {screen === 'round_intro' && (
          <div className="w-full max-w-xl mx-auto bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-10 text-center shadow-2xl relative overflow-hidden" id="round-intro-canvas">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-500 to-teal-500" />
            
            {currentRound === 1 && (
              <div id="round-1-intro-content">
                <div className="w-16 h-16 bg-emerald-500/15 text-emerald-400 rounded-2xl border border-emerald-500/20 flex items-center justify-center mx-auto mb-6 shadow-md shadow-emerald-500/10">
                  <Trophy className="w-8 h-8" />
                </div>
                <span className="text-[10px] font-black tracking-widest text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full uppercase">
                  ROUND 1
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-4 mb-3 tracking-tight">
                  Group Stage Trivia
                </h2>
                <p className="text-sm text-slate-400 leading-relaxed mb-8 font-semibold">
                  Each player takes turns on the hot seat answering multiple-choice trivia about co-host cities, historical World Cup records, and superstars. Each correct shot scores <strong className="text-emerald-400">10-15 PTS</strong>!
                </p>
                <button
                  type="button"
                  onClick={() => setScreen('trivia')}
                  className="w-full py-4 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-xl text-sm tracking-wide uppercase transition-all shadow-lg shadow-emerald-500/25"
                  id="round-1-start-btn"
                >
                  Kick Off Round 1!
                </button>
              </div>
            )}

            {currentRound === 2 && (
              <div id="round-2-intro-content">
                <div className="w-16 h-16 bg-sky-500/15 text-sky-400 rounded-2xl border border-sky-500/20 flex items-center justify-center mx-auto mb-6 shadow-md shadow-sky-500/10">
                  <Shirt className="w-8 h-8" />
                </div>
                <span className="text-[10px] font-black tracking-widest text-sky-400 bg-sky-500/10 border border-sky-500/20 px-3 py-1 rounded-full uppercase">
                  ROUND 2
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-4 mb-3 tracking-tight">
                  Jersey Identification
                </h2>
                <p className="text-sm text-slate-400 leading-relaxed mb-8 font-semibold">
                  A country's home kit is their identity! Decode the patterns and color accents of qualified nations. If you are stuck, you can hire a scout clue for a small point penalty. Scores <strong className="text-sky-400">10-15 PTS</strong>!
                </p>
                <button
                  type="button"
                  onClick={() => setScreen('jersey')}
                  className="w-full py-4 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-xl text-sm tracking-wide uppercase transition-all shadow-lg"
                  id="round-2-start-btn"
                >
                  Unlock Wardrobe Lineup
                </button>
              </div>
            )}

            {currentRound === 3 && (
              <div id="round-3-intro-content">
                <div className="w-16 h-16 bg-purple-500/15 text-purple-400 rounded-2xl border border-purple-500/20 flex items-center justify-center mx-auto mb-6 shadow-md shadow-purple-500/10">
                  <UsersRound className="w-8 h-8" />
                </div>
                <span className="text-[10px] font-black tracking-widest text-purple-400 bg-purple-500/10 border border-purple-500/20 px-3 py-1 rounded-full uppercase">
                  ROUND 3
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-4 mb-3 tracking-tight">
                  Dressing Room Polls
                </h2>
                <p className="text-sm text-slate-400 leading-relaxed mb-8 font-semibold">
                  Time for tactical bonding. Cast your confidential votes sequentially on legendary player comparisons and fan customs, and then discover the voting breakdown. Who shares your soccer soul?
                </p>
                <button
                  type="button"
                  onClick={() => setScreen('polls')}
                  className="w-full py-4 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-xl text-sm tracking-wide uppercase transition-all shadow-lg"
                  id="round-3-start-btn"
                >
                  Join Dressing Room Polls
                </button>
              </div>
            )}

            {currentRound === 4 && (
              <div id="round-4-intro-content">
                <div className="w-16 h-16 bg-rose-500/15 text-rose-400 rounded-2xl border border-rose-500/20 flex items-center justify-center mx-auto mb-6 shadow-md shadow-rose-500/10">
                  <Flame className="w-8 h-8" />
                </div>
                <span className="text-[10px] font-black tracking-widest text-rose-400 bg-rose-500/10 border border-rose-500/20 px-3 py-1 rounded-full uppercase">
                  ROUND 4
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-4 mb-3 tracking-tight">
                  Tactical Hot Takes
                </h2>
                <p className="text-sm text-slate-400 leading-relaxed mb-8 font-semibold">
                  This is the media room. Argue heated, hilarious soccer scenarios (VAR, mythical matchups, career trades) under a strict 60-second pitch countdown timer. Register the group's consensus!
                </p>
                <button
                  type="button"
                  onClick={() => setScreen('debate')}
                  className="w-full py-4 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-xl text-sm tracking-wide uppercase transition-all shadow-lg"
                  id="round-4-start-btn"
                >
                  Enter Debate Pitch
                </button>
              </div>
            )}
          </div>
        )}

        {/* VIEW 4: TRIVIA CHALLENGE */}
        {screen === 'trivia' && (
          <TriviaRound
            question={filteredTriviaQuestions[currentTriviaIndex]}
            activePlayer={players[activePlayerTurnIndex]}
            onAnswerSelected={handleTriviaAnswer}
            revealAnswer={revealAnswer}
            selectedOption={selectedOption}
            onNext={handleTriviaNext}
            isLastQuestion={currentTriviaIndex + 1 === getTotalTriviaCount()}
          />
        )}

        {/* VIEW 5: JERSEY IDENTIFICATION */}
        {screen === 'jersey' && (
          <JerseyRound
            jersey={jerseyItems[currentJerseyIndex]}
            activePlayer={players[activePlayerTurnIndex]}
            allCountries={allCountriesList}
            onAnswerSelected={handleJerseyAnswer}
            revealAnswer={revealAnswer}
            selectedGuess={selectedJerseyGuess}
            onNext={handleJerseyNext}
            isLastJersey={currentJerseyIndex + 1 === getTotalJerseyCount()}
          />
        )}

        {/* VIEW 6: GROUP POLLS */}
        {screen === 'polls' && (
          <PollsRound
            key={pollItems[currentPollIndex].id}
            poll={pollItems[currentPollIndex]}
            players={players}
            onPollFinished={handlePollFinished}
            onNext={handlePollNext}
            isLastPoll={currentPollIndex + 1 === getTotalPollsCount()}
          />
        )}

        {/* VIEW 7: TACTICAL DEBATES */}
        {screen === 'debate' && (
          <DebateRound
            key={debatePrompts[currentDebateIndex].id}
            debate={debatePrompts[currentDebateIndex]}
            onDebateFinished={handleDebateFinished}
            onNext={handleDebateNext}
            isLastDebate={currentDebateIndex + 1 === getTotalDebatesCount()}
          />
        )}

        {/* VIEW 8: SCOREBOARD */}
        {screen === 'scoreboard' && (
          <ScoreboardView
            players={players}
            currentRound={currentRound}
            onProceed={handleScoreboardProceed}
          />
        )}

        {/* VIEW 9: WINNER PODIUM CHAMPIONS */}
        {screen === 'winner' && (
          <WinnerView
            players={players}
            onRestart={handleRestart}
          />
        )}

      </main>

      {/* Aesthetic Footer */}
      <footer className="py-4 text-center border-t border-slate-900/60 bg-slate-950" id="global-game-footer">
        <p className="text-[10px] font-mono font-bold uppercase text-slate-500 tracking-widest">
          World Cup 2026 Icebreaker • Built for Matchday Banter • co-hosts USA • MEX • CAN
        </p>
      </footer>
    </div>
  );
}
