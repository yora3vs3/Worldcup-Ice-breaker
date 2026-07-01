import React from 'react';
import { Player } from '../types';
import { Trophy, Award, Medal, ArrowRight, UserCheck } from 'lucide-react';

interface ScoreboardViewProps {
  players: Player[];
  currentRound: number;
  onProceed: () => void;
}

const ROUND_NEXT_STEPS = [
  'Proceed to Round 2: Jersey Identification',
  'Proceed to Round 3: Fan dressing room polls',
  'Proceed to Round 4: Tactical Hot Takes',
  'Complete Game & View Champions Podium'
];

export default function ScoreboardView({ players, currentRound, onProceed }: ScoreboardViewProps) {
  // Sort players by score descending
  const sortedPlayers = [...players].sort((a, b) => b.score - a.score);

  return (
    <div className="w-full max-w-xl mx-auto bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-6 md:p-8 relative overflow-hidden" id="scoreboard-view-card">
      {/* Turf pattern border */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-500 to-teal-500" />

      {/* Title */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center p-3 bg-emerald-500/10 rounded-full text-emerald-400 mb-3 border border-emerald-500/20">
          <Trophy className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-white tracking-tight leading-snug">
          Matchday Standings
        </h2>
        <p className="text-xs text-slate-400 mt-1 uppercase tracking-widest font-black">
          After Round {currentRound} of 4
        </p>
      </div>

      {/* Standings List */}
      <div className="space-y-3 mb-8" id="standings-list-container">
        {sortedPlayers.map((player, index) => {
          const isLeader = index === 0;
          let RankIcon = <span className="text-sm font-black text-slate-500">#{index + 1}</span>;
          
          if (index === 0) {
            RankIcon = <Medal className="w-5 h-5 text-amber-400" />;
          } else if (index === 1) {
            RankIcon = <Medal className="w-5 h-5 text-slate-300" />;
          } else if (index === 2) {
            RankIcon = <Medal className="w-5 h-5 text-amber-700" />;
          }

          return (
            <div
              key={player.id}
              className={`flex items-center justify-between p-4 rounded-xl border transition-all ${
                isLeader 
                  ? 'bg-emerald-500/10 border-emerald-500/30 shadow-lg shadow-emerald-500/5' 
                  : 'bg-slate-800/40 border-slate-800'
              }`}
              id={`scoreboard-row-${player.id}`}
            >
              <div className="flex items-center gap-3">
                {/* Rank spot */}
                <div className="w-8 h-8 rounded-full bg-slate-950 flex items-center justify-center border border-slate-800">
                  {RankIcon}
                </div>

                {/* Player identity info */}
                <div className="flex items-center gap-2">
                  <span className={`w-3 h-3 rounded-full ${player.color} inline-block`} />
                  <div>
                    <span className="font-extrabold text-white text-sm sm:text-base">{player.name}</span>
                    <span className="text-[10px] text-slate-400 block font-semibold uppercase tracking-wider">
                      Fav: {player.favoriteCountry}
                    </span>
                  </div>
                </div>
              </div>

              {/* Player Score */}
              <div className="text-right">
                <span className="text-[10px] text-slate-500 uppercase tracking-widest block font-bold">Total Pts</span>
                <span className="font-mono font-black text-lg text-emerald-400">{player.score}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Button proceed */}
      <div className="flex justify-end pt-4 border-t border-slate-800">
        <button
          type="button"
          onClick={onProceed}
          className="w-full sm:w-auto px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl text-sm transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/15"
          id="scoreboard-proceed-btn"
        >
          <span>{ROUND_NEXT_STEPS[currentRound - 1] || 'Next Turn'}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
