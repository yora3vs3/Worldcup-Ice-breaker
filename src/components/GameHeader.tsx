import React from 'react';
import { Player } from '../types';
import { ShieldAlert, Trophy, Award, Calendar } from 'lucide-react';

interface GameHeaderProps {
  currentRound: number;
  players: Player[];
  activePlayerTurnIndex: number;
  screen: string;
}

const ROUNDS_INFO = [
  { name: 'Round 1: Group Stage Trivia', subtitle: 'Test your knowledge on 2026 hosts, history, and records!' },
  { name: 'Round 2: Jersey Identification', subtitle: 'Decode the pattern & color of qualified teams. Hints cost points!' },
  { name: 'Round 3: Fan Dressing Room Polls', subtitle: 'Interactive group opinions. State your voice and vote!' },
  { name: 'Round 4: Tactical Hot Takes', subtitle: 'Present your pitch on dramatic debate prompts. Convince the squad!' }
];

export default function GameHeader({ currentRound, players, activePlayerTurnIndex, screen }: GameHeaderProps) {
  const roundInfo = screen === 'winner'
    ? { name: '🏆 Final Presentation', subtitle: 'The final results are in! Matchday completed.' }
    : (ROUNDS_INFO[currentRound - 1] || { name: 'World Cup Icebreaker', subtitle: 'Matchday gameplay' });
  const activePlayer = players[activePlayerTurnIndex];

  return (
    <div className="w-full bg-slate-900 border-b border-slate-800 flex flex-col" id="game-broadcast-header-wrapper">
      <div className="w-full px-4 py-4 md:px-8 flex flex-col md:flex-row md:items-center justify-between gap-4" id="game-broadcast-header">
        {/* Left: Broadcast Brand & Round */}
        <div className="flex items-start gap-3">
          <div className="bg-emerald-500 text-slate-950 font-black px-2.5 py-1 rounded text-xs tracking-wider flex items-center gap-1 shadow-md shadow-emerald-500/10">
            <Calendar className="w-3 h-3" />
            <span>2026 LIVE</span>
          </div>
          <div>
            <h1 className="text-lg font-extrabold text-white tracking-tight animate-fade-in" id="round-name-title">
              {roundInfo.name}
            </h1>
            <p className="text-xs text-slate-400 font-medium">
              {roundInfo.subtitle}
            </p>
          </div>
        </div>

        {/* Center/Right: Score Bug Overlay */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Scores ticker */}
          <div className="flex items-center bg-slate-950 rounded-lg p-1 border border-slate-800 shadow-inner max-w-full overflow-x-auto custom-scrollbar gap-1.5" id="scores-ticker-bug">
            <div className="px-2 py-1 text-[10px] font-bold text-slate-500 uppercase tracking-wider border-r border-slate-800 flex items-center gap-1">
              <Trophy className="w-3 h-3 text-amber-500 animate-pulse" />
              <span>Scores</span>
            </div>
            {players.map((player, idx) => {
              const isTurn = idx === activePlayerTurnIndex && (screen === 'trivia' || screen === 'jersey');
              return (
                <div
                  key={player.id}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold transition-all ${
                    isTurn
                      ? 'bg-slate-800 border border-emerald-500/30 shadow-lg shadow-emerald-500/5 scale-105 ring-1 ring-emerald-500/10'
                      : 'bg-transparent text-slate-400'
                  }`}
                  id={`score-item-${player.id}`}
                >
                  {/* Custom player bullet */}
                  <span className={`w-2.5 h-2.5 rounded-full ${player.color} inline-block`} />
                  <span className="text-slate-200">{player.name}</span>
                  <span className="bg-slate-900 text-white font-mono px-1.5 py-0.5 rounded text-[11px] border border-slate-800">
                    {player.score}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Turn Indicator */}
          {(screen === 'trivia' || screen === 'jersey') && activePlayer && (
            <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-lg px-3 py-1.5" id="turn-indicator-badge">
              <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">Active Turn:</span>
              <span className={`inline-flex items-center gap-1 text-xs font-bold text-white px-2 py-0.5 rounded ${activePlayer.color}`}>
                {activePlayer.name}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Real-time Score Accumulation Bar Graph */}
      <div className="w-full bg-slate-950/80 border-t border-slate-800/80 px-4 md:px-8 py-3" id="live-performance-tracker">
        <div className="flex flex-col md:flex-row md:items-center gap-3">
          <div className="flex items-center gap-1.5 text-slate-400 font-mono text-[10px] font-bold uppercase tracking-wider flex-shrink-0">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping inline-block mr-1" />
            <span>Cumulative Standings Bar Chart:</span>
          </div>
          <div className="flex-1 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
            {players.map((player) => {
              const maxScore = Math.max(...players.map(p => p.score), 10);
              const pct = Math.min(100, Math.max(5, (player.score / maxScore) * 100));
              return (
                <div key={player.id} className="flex flex-col gap-1.5" id={`live-bar-${player.id}`}>
                  <div className="flex justify-between items-center text-[10px] font-bold leading-none">
                    <span className="text-slate-300 truncate max-w-[90px]">{player.name}</span>
                    <span className="text-emerald-400 font-mono tracking-tight">{player.score} PTS</span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-900 rounded-lg overflow-hidden border border-slate-800/80 p-[1px]">
                    <div
                      className={`h-full ${player.color} rounded-md transition-all duration-700 ease-out shadow-inner`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
