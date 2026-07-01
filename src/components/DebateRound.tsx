import React, { useState, useEffect } from 'react';
import { DebatePrompt } from '../types';
import { Flame, Clock, Play, Pause, RotateCcw, ArrowRight, Lightbulb, CheckSquare } from 'lucide-react';

interface DebateRoundProps {
  key?: string;
  debate: DebatePrompt;
  onDebateFinished: (selectedOption: string) => void;
  onNext: () => void;
  isLastDebate: boolean;
}

export default function DebateRound({
  debate,
  onDebateFinished,
  onNext,
  isLastDebate
}: DebateRoundProps) {
  const [timeLeft, setTimeLeft] = useState(60);
  const [timerActive, setTimerActive] = useState(false);
  const [selectedVerdict, setSelectedVerdict] = useState<string | null>(null);

  // Reset state when a new debate scenario is loaded
  useEffect(() => {
    setSelectedVerdict(null);
    setTimeLeft(60);
    setTimerActive(false);
  }, [debate]);

  // Timer countdown hook
  useEffect(() => {
    let interval: any = null;
    if (timerActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(t => t - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setTimerActive(false);
    }
    return () => clearInterval(interval);
  }, [timerActive, timeLeft]);

  const handleStartStop = () => {
    setTimerActive(!timerActive);
  };

  const handleReset = () => {
    setTimerActive(false);
    setTimeLeft(60);
  };

  const handleSelectVerdict = (option: string) => {
    setSelectedVerdict(option);
    onDebateFinished(option);
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-6 md:p-8 relative overflow-hidden" id="debate-round-card">
      {/* Flame Icon Category */}
      <div className="flex items-center justify-between mb-6 pb-3 border-b border-slate-800/80">
        <span className="bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1.5 animate-pulse">
          <Flame className="w-4.5 h-4.5 text-rose-500" />
          Tactical Hot Take Debate
        </span>
        <span className="text-slate-400 text-xs font-semibold uppercase tracking-wider">
          Pitch Argument Round
        </span>
      </div>

      {/* Debate Scenario */}
      <div className="mb-6">
        <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight leading-snug mb-3" id="debate-topic-title">
          {debate.topic}
        </h3>
        <div className="p-4 bg-slate-950/60 border border-slate-800 rounded-xl">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-1">The Scenario:</span>
          <p className="text-sm text-slate-300 leading-relaxed font-semibold">
            {debate.scenario}
          </p>
        </div>
      </div>

      {/* Interactive Debate Timer */}
      <div className="mb-8 p-4 bg-slate-950/40 border border-slate-800/80 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4" id="debate-timer-box">
        <div className="flex items-center gap-3">
          <div className={`p-2.5 rounded-lg flex items-center justify-center ${timeLeft === 0 ? 'bg-rose-500/20 text-rose-400 animate-bounce' : 'bg-slate-800 text-slate-400'}`}>
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block">Pitch Timer:</span>
            <span className={`text-2xl font-black font-mono tracking-tight ${timeLeft <= 10 ? 'text-rose-500 animate-pulse' : 'text-white'}`}>
              00:{timeLeft < 10 ? `0${timeLeft}` : timeLeft}
            </span>
          </div>
        </div>

        {/* Timer Control Buttons */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleStartStop}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-1.5 shadow-md ${
              timerActive 
                ? 'bg-amber-500 text-slate-950 hover:bg-amber-400' 
                : 'bg-emerald-500 text-slate-950 hover:bg-emerald-400'
            }`}
            id="debate-timer-play-btn"
          >
            {timerActive ? <Pause className="w-4 h-4 fill-slate-950" /> : <Play className="w-4 h-4 fill-slate-950" />}
            <span>{timerActive ? 'Pause' : 'Start Timer'}</span>
          </button>

          <button
            type="button"
            onClick={handleReset}
            className="p-2.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 rounded-xl transition-all"
            title="Reset Timer"
            id="debate-timer-reset-btn"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Verdict Picker */}
      <div className="space-y-4">
        <div>
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-2.5">
            Collect Group Verdict (Who argued best or what was the consensus?):
          </span>
          <div className="grid grid-cols-1 gap-3">
            {debate.options.map((option) => {
              const isSelected = selectedVerdict === option;
              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => handleSelectVerdict(option)}
                  className={`w-full text-left px-5 py-3.5 border rounded-xl font-semibold text-sm transition-all flex items-center justify-between ${
                    isSelected 
                      ? 'border-emerald-500/50 bg-emerald-500/10 text-emerald-400 font-bold ring-1 ring-emerald-500/20' 
                      : 'border-slate-800 bg-slate-800/10 text-slate-300 hover:border-slate-700 hover:bg-slate-800/30'
                  }`}
                  id={`verdict-option-${option.replace(/\s+/g, '-').toLowerCase()}`}
                >
                  <span>{option}</span>
                  {isSelected && <CheckSquare className="w-4 h-4 text-emerald-400 flex-shrink-0" />}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Footer next button */}
      {selectedVerdict && (
        <div className="flex justify-end pt-4 border-t border-slate-800 mt-6">
          <button
            type="button"
            onClick={onNext}
            className="px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl text-sm transition-all flex items-center gap-2 shadow-lg shadow-emerald-500/15"
            id="debate-next-btn"
          >
            <span>{isLastDebate ? 'See Final Champions Podium' : 'Next Debate Hot Take'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
