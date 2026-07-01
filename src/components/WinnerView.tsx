import React from 'react';
import { Player } from '../types';
import { Trophy, Award, Medal, RefreshCw, Star, Flag } from 'lucide-react';

interface WinnerViewProps {
  players: Player[];
  onRestart: () => void;
}

export default function WinnerView({ players, onRestart }: WinnerViewProps) {
  // Sort players by final score
  const sorted = [...players].sort((a, b) => b.score - a.score);
  const gold = sorted[0];
  const silver = sorted[1];
  const bronze = sorted[2]; // Might be undefined if only 2 players

  return (
    <div className="w-full max-w-2xl mx-auto bg-slate-900 border border-emerald-500/30 rounded-3xl shadow-2xl p-6 sm:p-10 relative overflow-hidden" id="winner-view-card">
      
      {/* Dynamic confetti/sparkle overlays */}
      <div className="absolute -top-12 -left-12 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
      
      {/* Golden star badge in background */}
      <div className="absolute top-4 right-4 text-emerald-500/10 animate-spin-slow pointer-events-none">
        <Star className="w-40 h-40" />
      </div>

      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center p-4 bg-emerald-500/15 rounded-full text-emerald-400 mb-3 border border-emerald-500/20 shadow-lg animate-bounce">
          <Trophy className="w-12 h-12" />
        </div>
        <h2 className="text-3xl font-black text-white tracking-tight leading-none mb-2">
          World Cup Champions!
        </h2>
        <p className="text-sm text-slate-400 max-w-md mx-auto">
          The whistle has blown. We have crowned our tactical champions! Share the trophy and start the tournament banter.
        </p>
      </div>

      {/* Podium Visual Graphic */}
      <div className="mb-10 bg-slate-950/50 rounded-2xl p-6 border border-slate-800/80">
        <div className="flex items-end justify-center gap-2 sm:gap-4 h-64 select-none pt-4">
          
          {/* 2nd Place: Silver (Left) */}
          {silver && (
            <div className="flex flex-col items-center w-24 sm:w-28 text-center">
              <div className="mb-2">
                <div className={`w-10 h-10 rounded-full ${silver.color} flex items-center justify-center border-2 border-slate-400 shadow-md relative`}>
                  <span className="text-xs font-black text-white">{silver.name.substring(0, 2).toUpperCase()}</span>
                </div>
                <span className="text-[11px] font-black text-slate-200 block truncate max-w-[80px] mt-1.5">{silver.name}</span>
                <span className="text-[11px] font-mono font-bold text-slate-400 block">{silver.score} pts</span>
              </div>
              {/* Podium Bar */}
              <div className="w-full h-24 bg-gradient-to-t from-slate-800/40 to-slate-800 rounded-t-xl flex flex-col items-center justify-center border border-slate-700/60 border-b-0 shadow-lg">
                <Medal className="w-6 h-6 text-slate-300" />
                <span className="text-xl font-black text-slate-300 mt-1">2nd</span>
              </div>
            </div>
          )}

          {/* 1st Place: Gold (Center) */}
          {gold && (
            <div className="flex flex-col items-center w-28 sm:w-32 text-center relative z-10 -translate-y-2">
              {/* Crown badge */}
              <div className="absolute -top-6 text-amber-400 animate-pulse">
                <Star className="w-6 h-6 fill-amber-400" />
              </div>
              <div className="mb-2">
                <div className={`w-14 h-14 rounded-full ${gold.color} flex items-center justify-center border-4 border-amber-400 shadow-xl relative`}>
                  <span className="text-sm font-black text-white">{gold.name.substring(0, 2).toUpperCase()}</span>
                </div>
                <span className="text-xs font-black text-white block truncate max-w-[100px] mt-1.5">{gold.name}</span>
                <span className="text-xs font-mono font-bold text-emerald-400 block">{gold.score} pts</span>
              </div>
              {/* Podium Bar */}
              <div className="w-full h-32 bg-gradient-to-t from-emerald-950/20 to-emerald-500/20 rounded-t-xl flex flex-col items-center justify-center border border-emerald-500/40 border-b-0 shadow-2xl relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-transparent via-emerald-500/5 to-transparent animate-pulse" />
                <Trophy className="w-8 h-8 text-amber-400" />
                <span className="text-2xl font-black text-amber-400 mt-1">1st</span>
              </div>
            </div>
          )}

          {/* 3rd Place: Bronze (Right) */}
          {bronze ? (
            <div className="flex flex-col items-center w-24 sm:w-28 text-center">
              <div className="mb-2">
                <div className={`w-10 h-10 rounded-full ${bronze.color} flex items-center justify-center border-2 border-amber-700 shadow-md relative`}>
                  <span className="text-xs font-black text-white">{bronze.name.substring(0, 2).toUpperCase()}</span>
                </div>
                <span className="text-[11px] font-black text-slate-200 block truncate max-w-[80px] mt-1.5">{bronze.name}</span>
                <span className="text-[11px] font-mono font-bold text-slate-400 block">{bronze.score} pts</span>
              </div>
              {/* Podium Bar */}
              <div className="w-full h-16 bg-gradient-to-t from-slate-800/40 to-slate-800 rounded-t-xl flex flex-col items-center justify-center border border-slate-700/60 border-b-0 shadow-lg">
                <Medal className="w-5 h-5 text-amber-700" />
                <span className="text-lg font-black text-amber-700 mt-1">3rd</span>
              </div>
            </div>
          ) : (
            // Spacer to keep layout balanced if only 2 players
            <div className="w-24 sm:w-28" />
          )}

        </div>
      </div>

      {/* Roster stats / Rankings summary */}
      <div className="space-y-3 mb-10">
        <h4 className="text-[11px] font-black uppercase tracking-widest text-slate-500 mb-1 pl-1">
          Final Squad Roster Rank
        </h4>
        {sorted.map((player, idx) => (
          <div key={player.id} className="flex items-center justify-between p-3.5 bg-slate-800/40 border border-slate-800 rounded-xl">
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-slate-500 font-mono w-4">#{idx + 1}</span>
              <span className={`w-2.5 h-2.5 rounded-full ${player.color}`} />
              <span className="font-extrabold text-slate-200 text-sm">{player.name}</span>
              <span className="text-[10px] bg-slate-900 border border-slate-800 text-slate-400 px-2 py-0.5 rounded font-bold uppercase">
                {player.favoriteCountry} FAN
              </span>
            </div>
            <span className="font-mono font-black text-sm text-slate-300">{player.score} PTS</span>
          </div>
        ))}
      </div>

      {/* Restart / Rematch Trigger */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-slate-800">
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <Flag className="w-4 h-4 text-emerald-500" />
          <span>Hosts: United States • Mexico • Canada 2026</span>
        </div>

        <button
          type="button"
          onClick={onRestart}
          className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-black rounded-xl text-sm shadow-lg shadow-emerald-500/15 hover:shadow-emerald-500/25 transition-all flex items-center justify-center gap-2"
          id="rematch-btn"
        >
          <RefreshCw className="w-4 h-4" />
          Draft a New Match!
        </button>
      </div>

    </div>
  );
}
