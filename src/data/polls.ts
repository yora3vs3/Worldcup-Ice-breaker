import { PollItem, DebatePrompt } from '../types';

export const pollItems: PollItem[] = [
  {
    id: 'p1',
    topic: 'Who is your predicted Golden Boot winner for the 2026 World Cup?',
    description: 'The golden prize for the tournament\'s absolute top goalscorer. Who secures the crown?',
    options: [
      'Lionel Messi (Argentina - playing from his rocking chair, still curling free kicks)',
      'Cristiano Ronaldo (Portugal - scoring 50 penalties and SIUUU-ing in his 40s)',
      'Kylian Mbappé (France - wearing a ninja turtle mask for maximum aerodynamics)',
      'Erling Haaland (Norway - a literal goal-scoring cyborg running on premium oil)',
      'Vinícius Júnior (Brazil - samba dancing past defenders at 50mph)',
      'Jude Bellingham (England - saving the country, the world, and tea time)'
    ],
    category: 'Player Comparison'
  },
  {
    id: 'p2',
    topic: 'What is your ultimate World Cup matchday ritual?',
    description: 'Every true football fan has their superstition. What is yours?',
    options: [
      'Wearing my lucky national jersey (unwashed since the 2014 qualifiers)',
      'Ordering an excessive amount of food & eating the stress away',
      'Absolute silence & hiding under a blanket praying for no penalties',
      'Pacing back and forth in front of the TV screaming tactical advice at professional players'
    ],
    category: 'Fan Culture'
  },
  {
    id: 'p3',
    topic: '90th minute, 1-1, World Cup Final. You get a penalty. Who are you sending to take it?',
    description: 'Steel nerves, icy composure. Who do you trust with the fate of your nation?',
    options: [
      'Lionel Messi (With a cup of Mate tea in one hand)',
      'Cristiano Ronaldo (After staring at his abs in the stadium screen)',
      'Harry Kane (Hopefully shooting low, not over the stadium)',
      'Your local Sunday league legend who has never missed a penalty'
    ],
    category: 'Matchday Choices'
  },
  {
    id: 'p4',
    topic: 'Which region will produce the ultimate "Dark Horse" giant-killer in 2026?',
    description: 'Every World Cup has that one team that shocks the globe. Who rises up?',
    options: ['CONCACAF (USA/Canada/Mexico home turf buff)', 'CAF (Morocco back for more, or Nigeria flying high)', 'AFC (Japan ready to execute blue lock in real life)', 'A random country whose fans drank all the local beer supply first'],
    category: 'Hot Takes'
  },
  {
    id: 'p5',
    topic: 'Which co-host country offers the ultimate atmosphere to watch a match?',
    description: 'Three host nations, three unique vibes. Where would you book your flight?',
    options: [
      'Mexico (Deafening noise, tacos for breakfast, Aztec stadium history)',
      'USA (State-of-the-art stadiums, global fan melting pot, hot dogs)',
      'Canada (Northern breeze, polite crowd apologizing when they tackle you)'
    ],
    category: 'Fan Culture'
  },
  {
    id: 'p6',
    topic: 'Who is most likely to break the internet during the 2026 World Cup?',
    description: 'When the cameras are off or on, some players just can\'t help but go viral. What\'s the ultimate headline?',
    options: [
      'Cristiano Ronaldo launching an emergency 3-hour YouTube live stream after a benching',
      'Lionel Messi getting lost in a local Texas Walmart trying to find yerba mate',
      'Kylian Mbappé accidentally announcing he is buying Real Madrid itself',
      'The entire English squad getting distracted by a rogue squirrel on the pitch'
    ],
    category: 'Hot Takes'
  },
  {
    id: 'p7',
    topic: 'What is the most chaotic thing FIFA could introduce to the 2026 World Cup?',
    description: 'Let\'s be honest, modern football needs a little spice. What rule change would break the sport?',
    options: [
      'The "Multiball" rule: three footballs are launched onto the pitch randomly',
      'The "Microphone-Mic-Up": letting fans hear players arguing with referees live',
      'Manager Duel: if tied after extra time, managers must do a rock-paper-scissors showdown',
      'The "Sub-In-A-Fan" raffle: one lucky fan gets to play 2 minutes as a defender'
    ],
    category: 'Hot Takes'
  },
  // --- PLAYER OF THE MATCH SCENARIOS ---
  {
    id: 'potm1',
    topic: 'POTM: USA vs England (Hypothetical Match)',
    description: 'Scenario: USA is leading 1-0 till the 88th minute when England equalizes. In the 94th minute, Christian Pulisic intercepts a pass, makes a 50-yard solo run, gets fouled, and curls a spectacular direct free kick to win it 2-1 for the US! Who is your Player of the Match?',
    options: [
      'Christian Pulisic (USA - 94\' Match-winning solo run & free kick)',
      'Matt Turner (USA - 7 heroic saves to keep England at bay)',
      'Jude Bellingham (England - Tireless midfield engine + 88\' equalizer)',
      'Antonee Robinson (USA - Neutralized England\'s right wing)'
    ],
    category: 'Player of the Match'
  },
  {
    id: 'potm2',
    topic: 'POTM: Argentina vs France (Hypothetical Semi-Final)',
    description: 'Scenario: A tactical 0-0 battle. Lionel Messi plays a magical 40-yard trivela assist to Lautaro Martínez in the 112th minute, but Kylian Mbappé converts a cold-blooded penalty in the 119th. Argentina wins 4-3 on penalties, with Emiliano Martínez saving two spot-kicks! Who gets the trophy?',
    options: [
      'Emiliano Martínez (Argentina - Saved 2 penalty shootout spot-kicks)',
      'Lionel Messi (Argentina - Mind-bending assist in extra time + shootout goal)',
      'Kylian Mbappé (France - Struck the 119\' penalty under immense pressure)',
      'Alexis Mac Allister (Argentina - Covered 14.2km and dominated the midfield)'
    ],
    category: 'Player of the Match'
  },
  {
    id: 'potm3',
    topic: 'POTM: Mexico vs Germany (Hypothetical Group Stage)',
    description: 'Scenario: Mexico pulls off a legendary 1-0 upset. Santiago Giménez scores a stunning solo goal in the 14th minute. Germany launches a massive assault with 25 shots, but Memo Ochoa blocks absolutely everything, including a miracle fingertips save onto the crossbar in the 91st minute! Who is your Player of the Match?',
    options: [
      'Guillermo "Memo" Ochoa (Mexico - 9 world-class saves and clean sheet)',
      'Santiago Giménez (Mexico - Scored the sublime solo match-winner)',
      'Edson Álvarez (Mexico - Midfield general, 8 tackles and 4 interceptions)',
      'Jamal Musiala (Germany - Unlucky not to score, 6 successful dribbles)'
    ],
    category: 'Player of the Match'
  }
];

export const debatePrompts: DebatePrompt[] = [
  {
    id: 'd1',
    topic: 'The VAR Trial',
    scenario: 'Has the Video Assistant Referee (VAR) killed the beautiful game by ruining the spontaneous, ecstatic joy of celebrating a goal, or is absolute refereeing correctness worth the wait?',
    options: ['Abolish VAR! Give us raw, flawed, beautiful human emotion.', 'Keep VAR! Integrity and correct decisions are more important than timing.', 'Heavy Overhaul: Set a 30-second timer on reviews or lose the appeal.']
  },
  {
    id: 'd2',
    topic: 'Reliving the Golden Eras',
    scenario: 'A mythical time-travel match takes place. Both in their absolute peak form. Who wins the clash of philosophies?',
    options: ['2002 Brazil (Ronaldo, Ronaldinho, Rivaldo, Cafu - pure Jogo Bonito)', '2010 Spain (Xavi, Iniesta, Casillas, Villa - tiki-taka masterclass)', 'It goes to penalties, which is decided purely by luck']
  },
  {
    id: 'd3',
    topic: 'The Ultimate Career Choice',
    scenario: 'You are a professional world-class striker. You are offered a choice that defines your legacy. Which career do you choose?',
    options: ['Win ONE World Cup with your home nation, but spend your club career in lower divisions.', 'Win 5 Champions Leagues & 5 Ballon d\'Ors, but never even qualify for a World Cup.', 'Become a cult legend: No trophies, but beloved by fans worldwide for loyalty.']
  },
  {
    id: 'd4',
    topic: 'The Knockout Draw Dilemma',
    scenario: 'To eliminate negative defensive play, should we abolish the 30 minutes of Extra Time completely and go straight to penalties if a knockout game is tied at 90 minutes?',
    options: ['Yes! Extra time is just tired players walking around waiting for penalties.', 'No! Extra time is where historical legends and dramatic 118th-minute goals are born.', 'No, but replace Extra Time with 2v2 Golden Goal rules for pure chaos!']
  }
];
