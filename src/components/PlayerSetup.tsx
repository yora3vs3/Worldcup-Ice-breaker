import React, { useState } from 'react';
import { Player } from '../types';
import { 
  Plus, Trash2, User, Trophy, Play, Info, 
  Sparkles, Calendar, Award, Tv, UserCheck, Compass, Activity, Check 
} from 'lucide-react';

interface PlayerSetupProps {
  onStartGame: (players: Player[], selectedCategories: string[]) => void;
}

const PRESET_COLORS = [
  'bg-emerald-500 text-white border-emerald-600',
  'bg-sky-500 text-white border-sky-600',
  'bg-amber-500 text-white border-amber-600',
  'bg-rose-500 text-white border-rose-600',
  'bg-violet-500 text-white border-violet-600',
  'bg-orange-500 text-white border-orange-600',
  'bg-teal-500 text-white border-teal-600',
  'bg-indigo-500 text-white border-indigo-600'
];

const COLOR_NAMES = ['Emerald', 'Sky Blue', 'Amber Gold', 'Rose Red', 'Violet Purple', 'Orange', 'Teal Green', 'Indigo Blue'];

const HOST_COUNTRIES = ['USA', 'Canada', 'Mexico'];

const AVAILABLE_CATEGORIES = [
  { id: '2026 World Cup', label: '2026 World Cup', desc: 'Co-hosts, match schedules, and tournament format.', icon: 'Sparkles' },
  { id: 'History', label: 'Classic History', desc: 'Legendary moments, historical records, and cup wins.', icon: 'Calendar' },
  { id: 'Superstars', label: 'Superstars', desc: 'Elite players, Golden Boot winners, and individual honors.', icon: 'Award' },
  { id: 'Venues & Stadiums', label: 'Venues & Stadiums', desc: 'Host cities and key stadium details.', icon: 'Tv' },
  { id: 'Guess the Manager', label: 'Guess the Manager', desc: 'Tactical minds, career paths, and achievements of qualified team bosses.', icon: 'UserCheck' },
  { id: 'Qualified Team History', label: 'Qualified Team History', desc: 'Past World Cup performances, iconic matches, and legendary players.', icon: 'Trophy' },
  { id: 'Guess the Stadium', label: 'Guess the Stadium', desc: 'Stadium descriptions, structural marvels, and host city landmarks.', icon: 'Compass' },
  { id: 'Player Statistics', label: 'Player Statistics', desc: 'Goals, assists, yellow/red cards, and performance records of key stars.', icon: 'Activity' }
];

export default function PlayerSetup({ onStartGame }: PlayerSetupProps) {
  const [playerInputs, setPlayerInputs] = useState<{ name: string; favoriteCountry: string; colorIndex: number }[]>([
    { name: 'Striker', favoriteCountry: 'USA', colorIndex: 0 },
    { name: 'Midfielder', favoriteCountry: 'Mexico', colorIndex: 1 },
  ]);

  const [selectedCategories, setSelectedCategories] = useState<string[]>([
    'History', '2026 World Cup', 'Superstars', 'Venues & Stadiums',
    'Guess the Manager', 'Qualified Team History', 'Guess the Stadium', 'Player Statistics'
  ]);

  const [error, setError] = useState<string | null>(null);

  const handleAddPlayer = () => {
    if (playerInputs.length >= 8) {
      setError('Maximum of 8 players can join the locker room!');
      return;
    }
    const nextColorIndex = playerInputs.length % PRESET_COLORS.length;
    setPlayerInputs([
      ...playerInputs,
      { name: `Player ${playerInputs.length + 1}`, favoriteCountry: HOST_COUNTRIES[playerInputs.length % 3], colorIndex: nextColorIndex }
    ]);
    setError(null);
  };

  const handleRemovePlayer = (index: number) => {
    if (playerInputs.length <= 2) {
      setError('You need at least 2 players to start the icebreaker!');
      return;
    }
    const newList = [...playerInputs];
    newList.splice(index, 1);
    setPlayerInputs(newList);
    setError(null);
  };

  const handleUpdatePlayer = (index: number, field: 'name' | 'favoriteCountry' | 'colorIndex', value: any) => {
    const newList = [...playerInputs];
    newList[index] = {
      ...newList[index],
      [field]: value
    };
    setPlayerInputs(newList);
  };

  const handleToggleCategory = (catId: string) => {
    if (selectedCategories.includes(catId)) {
      if (selectedCategories.length <= 1) {
        setError('At least one trivia category must be selected to kick off!');
        return;
      }
      setSelectedCategories(selectedCategories.filter(id => id !== catId));
    } else {
      setSelectedCategories([...selectedCategories, catId]);
      setError(null);
    }
  };

  const handleStart = () => {
    // Validate names are not empty
    const invalid = playerInputs.some(p => !p.name.trim());
    if (invalid) {
      setError('All players must have a name! Check the locker room roster.');
      return;
    }

    const uniqueNames = new Set(playerInputs.map(p => p.name.trim().toLowerCase()));
    if (uniqueNames.size !== playerInputs.length) {
      setError('Every player needs a unique name so we can track the scoreboard!');
      return;
    }

    const players: Player[] = playerInputs.map((p, idx) => ({
      id: `player_${idx}_${Date.now()}`,
      name: p.name.trim(),
      score: 0,
      favoriteCountry: p.favoriteCountry,
      color: PRESET_COLORS[p.colorIndex].split(' ')[0], // just take the main bg class
      answers: {},
      jerseyGuesses: {},
      pollVotes: {}
    }));

    onStartGame(players, selectedCategories);
  };

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Sparkles': return <Sparkles className="w-4 h-4 text-emerald-400" />;
      case 'Calendar': return <Calendar className="w-4 h-4 text-emerald-400" />;
      case 'Award': return <Award className="w-4 h-4 text-emerald-400" />;
      case 'Tv': return <Tv className="w-4 h-4 text-emerald-400" />;
      case 'UserCheck': return <UserCheck className="w-4 h-4 text-emerald-400" />;
      case 'Trophy': return <Trophy className="w-4 h-4 text-emerald-400" />;
      case 'Compass': return <Compass className="w-4 h-4 text-emerald-400" />;
      case 'Activity': return <Activity className="w-4 h-4 text-emerald-400" />;
      default: return <Trophy className="w-4 h-4 text-emerald-400" />;
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-slate-900 border border-emerald-500/20 rounded-2xl shadow-2xl p-6 sm:p-8 relative overflow-hidden" id="player-setup-card">
      {/* Decorative turf line */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-500 via-green-400 to-teal-500" />

      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center p-3 bg-emerald-500/10 rounded-full text-emerald-400 mb-3 border border-emerald-500/20 animate-pulse">
          <Trophy className="w-8 h-8" />
        </div>
        <h2 className="text-3xl font-bold tracking-tight text-white mb-2 font-sans">
          Lobby & Locker Room
        </h2>
        <p className="text-sm text-slate-400 max-w-md mx-auto font-medium">
          Set up players, pick kit colors, and customize the trivia match settings below!
        </p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-rose-500/10 border border-rose-500/20 rounded-xl text-rose-400 text-sm flex items-center gap-2">
          <Info className="w-4 h-4 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Roster & Configurations Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8 items-start">
        {/* Left Column: Players Roster */}
        <div className="lg:col-span-6 space-y-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <User className="w-4 h-4 text-emerald-400" />
              Locker Room Roster ({playerInputs.length})
            </span>
          </div>

          <div className="space-y-3 max-h-[360px] overflow-y-auto pr-1.5 custom-scrollbar">
            {playerInputs.map((player, index) => (
              <div 
                key={index} 
                className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 p-3.5 bg-slate-950/40 rounded-xl border border-slate-800 hover:border-slate-700 transition-all duration-200"
                id={`player-row-${index}`}
              >
                {/* Index & Color Selector Bubble */}
                <div className="flex items-center gap-3">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs bg-slate-800 border border-slate-700 text-slate-400`}>
                    {index + 1}
                  </div>
                  
                  <div className="relative">
                    <select
                      value={player.colorIndex}
                      onChange={(e) => handleUpdatePlayer(index, 'colorIndex', parseInt(e.target.value))}
                      className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
                      title="Choose player color"
                    >
                      {PRESET_COLORS.map((_, cIdx) => (
                        <option key={cIdx} value={cIdx}>{COLOR_NAMES[cIdx]}</option>
                      ))}
                    </select>
                    <div className={`w-8 h-8 rounded-full border-2 ${PRESET_COLORS[player.colorIndex]} flex items-center justify-center cursor-pointer transition-transform hover:scale-110 shadow-lg`}>
                      <User className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>

                {/* Name Input */}
                <div className="flex-1 min-w-0">
                  <input
                    type="text"
                    value={player.name}
                    maxLength={16}
                    placeholder="Enter player name..."
                    onChange={(e) => handleUpdatePlayer(index, 'name', e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 text-xs sm:text-sm font-semibold transition-colors"
                    id={`player-name-input-${index}`}
                  />
                </div>

                {/* Co-host Selection & Remove button */}
                <div className="flex items-center gap-2 justify-between sm:justify-start">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] text-slate-500 uppercase font-bold">Fav Host:</span>
                    <div className="flex bg-slate-900 rounded-lg p-0.5 border border-slate-800">
                      {HOST_COUNTRIES.map((country) => (
                        <button
                          key={country}
                          type="button"
                          onClick={() => handleUpdatePlayer(index, 'favoriteCountry', country)}
                          className={`px-2 py-0.5 text-[10px] font-bold rounded transition-all ${
                            player.favoriteCountry === country
                              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                              : 'text-slate-500 border border-transparent hover:text-slate-300'
                          }`}
                        >
                          {country}
                        </button>
                      ))}
                    </div>
                  </div>

                  {playerInputs.length > 2 && (
                    <button
                      type="button"
                      onClick={() => handleRemovePlayer(index)}
                      className="p-1.5 text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-all"
                      title="Remove Player"
                      id={`remove-player-btn-${index}`}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={handleAddPlayer}
            className="w-full px-4 py-2.5 border border-dashed border-slate-800 hover:border-slate-700 bg-slate-800/10 hover:bg-slate-800/20 text-slate-300 rounded-xl font-semibold text-xs transition-all flex items-center justify-center gap-2"
            id="add-player-btn"
          >
            <Plus className="w-3.5 h-3.5" />
            Add Draft Player
          </button>
        </div>

        {/* Right Column: Trivia Categories */}
        <div className="lg:col-span-6 space-y-4">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5 mb-2">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            Match Setup: Pitch Sectors (Trivia Categories)
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-[360px] overflow-y-auto pr-1.5 custom-scrollbar">
            {AVAILABLE_CATEGORIES.map((cat) => {
              const isSelected = selectedCategories.includes(cat.id);
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => handleToggleCategory(cat.id)}
                  className={`p-3 rounded-xl border text-left transition-all duration-200 flex items-start gap-2.5 outline-none focus:outline-none ${
                    isSelected
                      ? 'bg-emerald-500/10 border-emerald-500/20 text-white'
                      : 'bg-slate-950/40 border-slate-800 text-slate-600 hover:border-slate-700/80 hover:text-slate-400'
                  }`}
                  id={`cat-toggle-${cat.id.replace(/\s+/g, '-').toLowerCase()}`}
                >
                  <div className={`p-1.5 rounded-md ${isSelected ? 'bg-emerald-500/10 text-emerald-400' : 'bg-slate-900 text-slate-600'} flex-shrink-0`}>
                    {getCategoryIcon(cat.icon)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <span className={`text-[11px] font-bold truncate leading-none ${isSelected ? 'text-emerald-400' : 'text-slate-500'}`}>
                        {cat.label}
                      </span>
                      {isSelected && <Check className="w-3 h-3 text-emerald-400 flex-shrink-0" />}
                    </div>
                    <p className="text-[10px] text-slate-400 mt-1 leading-snug font-medium">
                      {cat.desc}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-end pt-4 border-t border-slate-800">
        <button
          type="button"
          onClick={handleStart}
          className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 rounded-xl font-bold text-sm shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/35 transition-all hover:translate-y-[-1px] active:translate-y-[1px] flex items-center justify-center gap-2"
          id="kick-off-btn"
        >
          <Play className="w-4 h-4 fill-slate-950" />
          Kick Off Match!
        </button>
      </div>
    </div>
  );
}
