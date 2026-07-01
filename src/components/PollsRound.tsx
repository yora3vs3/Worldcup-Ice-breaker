import React, { useState } from 'react';
import { Player, PollItem } from '../types';
import { Vote, Users, BarChart3, Check, ArrowRight, MessageSquareCode } from 'lucide-react';

interface PollsRoundProps {
  key?: string;
  poll: PollItem;
  players: Player[];
  onPollFinished: (votes: Record<string, string>) => void;
  onNext: () => void;
  isLastPoll: boolean;
}

export default function PollsRound({
  poll,
  players,
  onPollFinished,
  onNext,
  isLastPoll
}: PollsRoundProps) {
  // State to track current voting phase
  const [currentVoterIndex, setCurrentVoterIndex] = useState(0);
  const [votes, setVotes] = useState<Record<string, string>>({}); // player.id -> optionSelected
  const [isFinished, setIsFinished] = useState(false);

  // Reset state when a new poll is loaded
  React.useEffect(() => {
    setCurrentVoterIndex(0);
    setVotes({});
    setIsFinished(false);
  }, [poll]);

  const activeVoter = players[currentVoterIndex];

  const handleVote = (option: string) => {
    const updatedVotes = {
      ...votes,
      [activeVoter.id]: option
    };
    setVotes(updatedVotes);

    if (currentVoterIndex < players.length - 1) {
      setCurrentVoterIndex(currentVoterIndex + 1);
    } else {
      // Everyone voted!
      setIsFinished(true);
      onPollFinished(updatedVotes);
    }
  };

  // Calculate vote totals for chart
  const getVoteDistribution = () => {
    const counts: Record<string, number> = {};
    const voterNamesByOption: Record<string, string[]> = {};
    
    poll.options.forEach(opt => {
      counts[opt] = 0;
      voterNamesByOption[opt] = [];
    });

    Object.entries(votes).forEach(([playerId, chosenOption]) => {
      const optKey = chosenOption as string;
      const playerObj = players.find(p => p.id === playerId);
      if (playerObj) {
        counts[optKey] = (counts[optKey] || 0) + 1;
        voterNamesByOption[optKey].push(playerObj.name);
      }
    });

    return { counts, voterNamesByOption };
  };

  const { counts, voterNamesByOption } = isFinished ? getVoteDistribution() : { counts: {}, voterNamesByOption: {} };

  return (
    <div className="w-full max-w-2xl mx-auto bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-6 md:p-8 relative overflow-hidden" id="polls-round-card">
      
      {/* Category Tag */}
      <div className="flex items-center justify-between mb-6 pb-3 border-b border-slate-800/80">
        <span className="bg-slate-800 border border-slate-700 text-slate-300 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1.5">
          <Users className="w-3.5 h-3.5 text-emerald-400" />
          {poll.category}
        </span>
        <span className="text-slate-400 text-xs font-semibold uppercase tracking-wider">
          {isFinished ? 'Verdict Out' : `Voter ${currentVoterIndex + 1} of ${players.length}`}
        </span>
      </div>

      {/* Poll Heading */}
      <div className="mb-8">
        <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight leading-snug mb-2">
          {poll.topic}
        </h3>
        <p className="text-sm text-slate-400 leading-relaxed font-medium">
          {poll.description}
        </p>
      </div>

      {/* Phase 1: ACTIVE VOTING */}
      {!isFinished && activeVoter && (
        <div id="active-voting-section">
          {/* Active Voter Announcement */}
          <div className="mb-6 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className={`w-3 h-3 rounded-full ${activeVoter.color} animate-pulse`} />
              <div>
                <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest block">Up to Shoot:</span>
                <span className="text-base font-bold text-white leading-none">{activeVoter.name}</span>
              </div>
            </div>
            <div className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-lg flex items-center gap-1">
              <Vote className="w-4 h-4" />
              <span>Casting Vote...</span>
            </div>
          </div>

          {/* Voting Options */}
          <div className="grid grid-cols-1 gap-3.5">
            {poll.options.map((option, idx) => (
              <button
                key={option}
                type="button"
                onClick={() => handleVote(option)}
                className="w-full text-left px-5 py-4 border border-slate-800 hover:border-emerald-500/40 hover:bg-slate-800/40 text-slate-200 bg-slate-800/10 rounded-xl font-semibold text-sm sm:text-base transition-all duration-200 hover:translate-x-1 outline-none focus:outline-none"
                id={`poll-vote-btn-${idx}`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Phase 2: RESULTS REVEALED */}
      {isFinished && (
        <div id="results-charts-section" className="space-y-6">
          <div className="flex items-center gap-2 text-emerald-400 mb-4 bg-emerald-500/10 border border-emerald-500/20 px-4 py-3 rounded-xl">
            <BarChart3 className="w-5 h-5 text-emerald-400" />
            <span className="text-sm font-bold uppercase tracking-wider">Group Opinion Breakout</span>
          </div>

          <div className="space-y-4">
            {poll.options.map((option, idx) => {
              const voteCount = counts[option] || 0;
              const percentage = Math.round((voteCount / players.length) * 100) || 0;
              const voters = voterNamesByOption[option] || [];

              return (
                <div key={option} className="p-4 bg-slate-950/60 rounded-xl border border-slate-800" id={`poll-result-${idx}`}>
                  <div className="flex items-center justify-between gap-4 mb-2 text-sm font-semibold text-slate-200">
                    <span className="flex-1 pr-2 leading-snug">{option}</span>
                    <span className="font-mono text-emerald-400 font-bold">{voteCount} {voteCount === 1 ? 'vote' : 'votes'} ({percentage}%)</span>
                  </div>

                  {/* Progress bar */}
                  <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden mb-3">
                    <div
                      className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full transition-all duration-1000"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>

                  {/* Who voted for this */}
                  {voters.length > 0 ? (
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mr-1">Voters:</span>
                      {voters.map((vName, vIdx) => (
                        <span
                          key={vIdx}
                          className="px-2 py-0.5 bg-slate-800 text-slate-300 border border-slate-700 text-[10px] font-bold rounded-md"
                        >
                          {vName}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <span className="text-[10px] font-semibold text-slate-600 uppercase tracking-widest block">No tactical takers</span>
                  )}
                </div>
              );
            })}
          </div>

          {/* Icebreaker talking prompt */}
          <div className="p-4 bg-slate-950/40 border border-dashed border-slate-800 rounded-xl flex items-start gap-3">
            <MessageSquareCode className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-0.5">Dressing Room Chatter Prompt:</span>
              <p className="text-xs text-slate-500 leading-relaxed font-semibold">
                Look at the splits! Have those who voted differently defend their tactical mindset. Why is their selection superior?
              </p>
            </div>
          </div>

          {/* Footer Trigger */}
          <div className="flex justify-end pt-4 border-t border-slate-800">
            <button
              type="button"
              onClick={onNext}
              className="px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl text-sm transition-all flex items-center gap-2 shadow-lg shadow-emerald-500/15"
              id="poll-next-btn"
            >
              <span>{isLastPoll ? 'Enter Tactical Hot Take Debates' : 'Next Dressing Room Poll'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
