import React, { useState, useEffect } from 'react';
import { Player, JerseyItem } from '../types';
import JerseyRenderer from './JerseyRenderer';
import { Info, HelpCircle, AlertCircle, ArrowRight, Lightbulb, Sparkles } from 'lucide-react';

interface JerseyRoundProps {
  jersey: JerseyItem;
  activePlayer: Player;
  allCountries: string[]; // Options for multiple choice guesses
  onAnswerSelected: (isCorrect: boolean, chosenCountry: string, pointsAwarded: number) => void;
  revealAnswer: boolean;
  selectedGuess: string | null;
  onNext: () => void;
  isLastJersey: boolean;
}

export default function JerseyRound({
  jersey,
  activePlayer,
  allCountries,
  onAnswerSelected,
  revealAnswer,
  selectedGuess,
  onNext,
  isLastJersey
}: JerseyRoundProps) {
  const [hintUsed, setHintUsed] = useState(false);
  const [options, setOptions] = useState<string[]>([]);

  // Calculate points for this turn
  const potentialPoints = hintUsed ? 10 : 15;

  // Generate multiple choice options once per jersey item
  useEffect(() => {
    // Collect 3 random wrong countries from the list, plus the correct one, then shuffle
    const wrongCountries = allCountries.filter(c => c !== jersey.country);
    
    // Pick 3 random wrong ones
    const shuffledWrong = [...wrongCountries].sort(() => 0.5 - Math.random());
    const selectedWrong = shuffledWrong.slice(0, 3);
    
    // Shuffle the final 4 options
    const finalOptions = [...selectedWrong, jersey.country].sort(() => 0.5 - Math.random());
    setOptions(finalOptions);
    setHintUsed(false); // Reset hint state for new jersey
  }, [jersey, allCountries]);

  const handleSelect = (countryOption: string) => {
    if (revealAnswer) return;
    const isCorrect = countryOption === jersey.country;
    onAnswerSelected(isCorrect, countryOption, isCorrect ? potentialPoints : 0);
  };

  return (
    <div className="w-full max-w-3xl mx-auto bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-6 md:p-8 relative overflow-hidden" id="jersey-round-card">
      
      {/* Turn & Points Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-800">
        <div>
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-1">Target Player Turn</span>
          <span className={`inline-flex items-center gap-1 text-sm font-bold text-white px-3 py-1 rounded ${activePlayer.color}`}>
            {activePlayer.name}
          </span>
        </div>
        <div className="text-right">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-1">Potential Value</span>
          <span className="text-emerald-400 font-mono font-black text-lg">
            +{potentialPoints} PTS
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center mb-8">
        {/* Left column: Jersey Canvas */}
        <div className="md:col-span-5 flex flex-col items-center justify-center bg-slate-950/60 border border-slate-800/80 rounded-xl p-6 relative group">
          <div className="absolute top-3 left-3 bg-slate-900/90 border border-slate-800 text-slate-400 text-[10px] font-mono px-2 py-0.5 rounded uppercase">
            {jersey.continent}
          </div>

          <JerseyRenderer
            primaryColor={jersey.primaryColor}
            secondaryColor={jersey.secondaryColor}
            pattern={jersey.pattern}
            number="10"
            className="w-48 h-48 md:w-56 md:h-56"
            showBadge={true} // renders generic crest path inside
          />

          <div className="mt-4 text-center">
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-widest">
              Kit Pattern: {jersey.pattern}
            </span>
          </div>
        </div>

        {/* Right column: Guesses and Hints */}
        <div className="md:col-span-7 flex flex-col justify-center h-full">
          <h3 className="text-xl font-extrabold text-white mb-2 leading-tight">
            Who qualifies with this Home kit?
          </h3>
          <p className="text-sm text-slate-400 mb-6 font-medium">
            Identify the qualified country based on their home kit colors, stripes, and patterns. Look closely at the sleeve collars!
          </p>

          {/* Guesses Grid */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            {options.map((option) => {
              const isSelected = selectedGuess === option;
              const isCorrect = option === jersey.country;

              let btnStyle = "border-slate-800 hover:border-slate-700 hover:bg-slate-800/50 text-slate-300 bg-slate-800/20";

              if (revealAnswer) {
                if (isCorrect) {
                  btnStyle = "border-emerald-500 bg-emerald-500/15 text-emerald-400 font-black";
                } else if (isSelected) {
                  btnStyle = "border-rose-500 bg-rose-500/15 text-rose-400";
                } else {
                  btnStyle = "border-slate-800 bg-slate-800/5 text-slate-600 opacity-50";
                }
              }

              return (
                <button
                  key={option}
                  type="button"
                  disabled={revealAnswer}
                  onClick={() => handleSelect(option)}
                  className={`px-4 py-3 border.5 rounded-xl text-center text-sm font-bold transition-all ${btnStyle}`}
                  id={`jersey-guess-${option.toLowerCase()}`}
                >
                  {option}
                </button>
              );
            })}
          </div>

          {/* Scout Hint Trigger */}
          {!revealAnswer && (
            <div className="mt-2">
              {hintUsed ? (
                <div className="p-3.5 bg-slate-950/60 border border-slate-800 rounded-xl flex gap-2" id="scout-hint-text-box">
                  <Lightbulb className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-slate-300 leading-relaxed font-semibold">
                    <span className="text-amber-400 font-bold uppercase tracking-widest text-[10px] block mb-1">Scouting Clue:</span>
                    {jersey.hint}
                  </p>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setHintUsed(true)}
                  className="w-full text-center px-4 py-2.5 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/20 rounded-xl font-bold text-xs tracking-wider uppercase transition-all flex items-center justify-center gap-1.5"
                  id="scout-hint-btn"
                >
                  <Lightbulb className="w-4 h-4" />
                  Request Scouting Clue (-5 PTS penalty)
                </button>
              )}
            </div>
          )}

          {/* Fun Fact / Revealer Box */}
          {revealAnswer && (
            <div className="mt-2 p-4 bg-slate-950/80 border border-slate-800 rounded-xl" id="jersey-reveal-fact-box">
              <div className="flex items-center gap-2 mb-2 text-emerald-400">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <span className="text-[11px] font-black uppercase tracking-wider">
                  {selectedGuess === jersey.country ? 'GOAL! Corect Identification' : `MISS! It was ${jersey.country}`}
                </span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed font-semibold">
                <strong className="text-slate-200">Fun Kit Trivia:</strong> {jersey.funFact}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Footer next button */}
      {revealAnswer && (
        <div className="flex justify-end pt-4 border-t border-slate-800 mt-6">
          <button
            type="button"
            onClick={onNext}
            className="px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl text-sm transition-all flex items-center gap-2 shadow-lg shadow-emerald-500/15"
            id="jersey-next-btn"
          >
            <span>{isLastJersey ? 'View Locker Room Leaderboard' : 'Next Jersey Lineup'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
