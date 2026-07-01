import React from 'react';
import { Player, TriviaQuestion } from '../types';
import { CheckCircle2, XCircle, Award, ArrowRight, HelpCircle } from 'lucide-react';

interface TriviaRoundProps {
  question: TriviaQuestion;
  activePlayer: Player;
  onAnswerSelected: (isCorrect: boolean, chosenOption: string, points: number) => void;
  revealAnswer: boolean;
  selectedOption: string | null;
  onNext: () => void;
  isLastQuestion: boolean;
}

export default function TriviaRound({
  question,
  activePlayer,
  onAnswerSelected,
  revealAnswer,
  selectedOption,
  onNext,
  isLastQuestion
}: TriviaRoundProps) {
  const handleSelect = (option: string) => {
    if (revealAnswer) return;
    const isCorrect = option === question.correctAnswer;
    onAnswerSelected(isCorrect, option, question.points);
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-6 md:p-8 relative overflow-hidden" id="trivia-round-card">
      {/* Category banner */}
      <div className="flex items-center justify-between mb-6">
        <span className="bg-slate-800/80 border border-slate-700 text-slate-300 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1.5">
          <HelpCircle className="w-3.5 h-3.5 text-emerald-400" />
          {question.category}
        </span>
        <span className="text-emerald-400 text-xs font-mono font-bold tracking-wider">
          +{question.points} PTS
        </span>
      </div>

      {/* Question prompt */}
      <div className="mb-8">
        <div className="text-sm font-semibold text-slate-400 mb-2 uppercase tracking-widest flex items-center gap-1.5">
          <span>Target Player Turn:</span>
          <span className={`px-2.5 py-0.5 rounded text-white font-bold text-xs ${activePlayer.color}`}>
            {activePlayer.name}
          </span>
        </div>
        <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight leading-snug" id="trivia-question-text">
          {question.question}
        </h3>
      </div>

      {/* Answer options */}
      <div className="grid grid-cols-1 gap-3.5 mb-8">
        {question.options.map((option) => {
          const isSelected = selectedOption === option;
          const isCorrect = option === question.correctAnswer;
          
          let btnStyle = "border-slate-800 hover:border-slate-700 hover:bg-slate-800/50 text-slate-300 bg-slate-800/20";
          let stateIcon = null;

          if (revealAnswer) {
            if (isCorrect) {
              btnStyle = "border-emerald-500/50 bg-emerald-500/10 text-emerald-400 ring-1 ring-emerald-500/20";
              stateIcon = <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />;
            } else if (isSelected) {
              btnStyle = "border-rose-500/50 bg-rose-500/10 text-rose-400 ring-1 ring-rose-500/20";
              stateIcon = <XCircle className="w-5 h-5 text-rose-400 flex-shrink-0" />;
            } else {
              btnStyle = "border-slate-800 bg-slate-800/10 text-slate-500 opacity-60";
            }
          }

          return (
            <button
              key={option}
              type="button"
              disabled={revealAnswer}
              onClick={() => handleSelect(option)}
              className={`w-full text-left px-5 py-4 border rounded-xl font-semibold text-sm sm:text-base flex items-center justify-between transition-all duration-200 outline-none focus:outline-none focus:ring-1 focus:ring-emerald-500 ${btnStyle}`}
              id={`trivia-option-${option.replace(/\s+/g, '-').toLowerCase()}`}
            >
              <span className="pr-4">{option}</span>
              {stateIcon}
            </button>
          );
        })}
      </div>

      {/* Fact explanation reveal */}
      {revealAnswer && (
        <div className="mb-8 p-4 bg-slate-950/80 border border-slate-800/60 rounded-xl" id="trivia-explanation-box">
          <div className="flex items-center gap-2 mb-2">
            <Award className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-bold text-slate-300 uppercase tracking-widest">Post-Match Report:</span>
          </div>
          <p className="text-sm text-slate-400 leading-relaxed font-medium">
            {question.explanation}
          </p>
        </div>
      )}

      {/* Footer trigger */}
      {revealAnswer && (
        <div className="flex justify-end pt-4 border-t border-slate-800">
          <button
            type="button"
            onClick={onNext}
            className="px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl text-sm transition-all flex items-center gap-2 shadow-lg shadow-emerald-500/15"
            id="trivia-next-btn"
          >
            <span>{isLastQuestion ? 'Proceed to Halftime Scores' : 'Next Pitch Turn'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
