import { TriviaQuestion } from '../types';

export const triviaQuestions: TriviaQuestion[] = [
  {
    id: 't1',
    question: 'The 2026 FIFA World Cup is historic for being the first to feature how many qualified teams?',
    options: ['32 Teams', '40 Teams', '48 Teams', '64 Teams'],
    correctAnswer: '48 Teams',
    explanation: 'The 2026 World Cup expands from the traditional 32-team format to a massive 48-team tournament, resulting in 104 matches total!',
    points: 10,
    category: '2026 World Cup'
  },
  {
    id: 't2',
    question: 'Which of these iconic stadiums is making history by hosting matches in its third different World Cup tournament (1970, 1986, and 2026)?',
    options: ['Estadio Azteca (Mexico City)', 'Rose Bowl (Pasadena)', 'Maracanã (Rio de Janeiro)', 'Wembley Stadium (London)'],
    correctAnswer: 'Estadio Azteca (Mexico City)',
    explanation: 'Estadio Azteca in Mexico City becomes the first stadium in history to host matches across three different FIFA World Cups (1970, 1986, and 2026).',
    points: 15,
    category: 'Venues & Stadiums'
  },
  {
    id: 't3',
    question: 'How many countries are co-hosting the 2026 FIFA World Cup?',
    options: ['One country', 'Two countries', 'Three countries', 'Four countries'],
    correctAnswer: 'Three countries',
    explanation: 'The tournament is jointly hosted by three North American countries: the United States, Canada, and Mexico.',
    points: 10,
    category: '2026 World Cup'
  },
  {
    id: 't4',
    question: 'Who scored the famous "Hand of God" goal and the "Goal of the Century" in the same World Cup match in 1986?',
    options: ['Pelé', 'Diego Maradona', 'Johan Cruyff', 'Zinedine Zidane'],
    correctAnswer: 'Diego Maradona',
    explanation: 'Diego Maradona scored both legendary goals against England in the 1986 World Cup quarter-finals at Estadio Azteca.',
    points: 10,
    category: 'History'
  },
  {
    id: 't5',
    question: 'Which country has won the most FIFA World Cup titles in history?',
    options: ['Germany', 'Italy', 'Argentina', 'Brazil'],
    correctAnswer: 'Brazil',
    explanation: 'Brazil holds the record with 5 World Cup titles (1958, 1962, 1970, 1994, 2002), followed by Italy and Germany with 4 each.',
    points: 10,
    category: 'History'
  },
  {
    id: 't6',
    question: 'In the 2026 World Cup group stage, how many teams are placed in each group?',
    options: ['3 Teams', '4 Teams', '5 Teams', '6 Teams'],
    correctAnswer: '4 Teams',
    explanation: 'After initially considering groups of 3, FIFA finalized the 2026 format to have 12 groups of 4 teams each, with the top 2 and 8 best third-place teams advancing to the Round of 32.',
    points: 15,
    category: '2026 World Cup'
  },
  {
    id: 't7',
    question: 'Who won the Golden Boot as the top goalscorer of the 2022 World Cup in Qatar?',
    options: ['Lionel Messi', 'Kylian Mbappé', 'Erling Haaland', 'Olivier Giroud'],
    correctAnswer: 'Kylian Mbappé',
    explanation: 'Kylian Mbappé won the 2022 Golden Boot by scoring 8 goals, including a dramatic hat-trick in the final match against Argentina.',
    points: 10,
    category: 'Superstars'
  },
  {
    id: 't8',
    question: 'Which city will host the highly-anticipated 2026 FIFA World Cup Final match?',
    options: ['Los Angeles (SoFi Stadium)', 'New York New Jersey (MetLife Stadium)', 'Dallas (AT&T Stadium)', 'Mexico City (Estadio Azteca)'],
    correctAnswer: 'New York New Jersey (MetLife Stadium)',
    explanation: 'FIFA selected MetLife Stadium in East Rutherford, New Jersey (referred to as New York New Jersey Stadium for the event) to host the prestigious final on July 19, 2026.',
    points: 15,
    category: 'Venues & Stadiums'
  },
  {
    id: 't9',
    question: 'Which country is the only one to have played in every single FIFA World Cup tournament since its inception in 1930?',
    options: ['Germany', 'Brazil', 'Argentina', 'France'],
    correctAnswer: 'Brazil',
    explanation: 'Brazil is the only nation to have participated in all 22 World Cup tournaments (including 2026, making it 23) since the inaugural cup in 1930.',
    points: 10,
    category: 'History'
  },
  {
    id: 't10',
    question: 'Who is the all-time leading goalscorer in FIFA World Cup history with 16 goals across four tournaments?',
    options: ['Miroslav Klose (Germany)', 'Ronaldo (Brazil)', 'Gerd Müller (Germany)', 'Lionel Messi (Argentina)'],
    correctAnswer: 'Miroslav Klose (Germany)',
    explanation: 'German striker Miroslav Klose scored 16 goals across the 2002, 2006, 2010, and 2014 tournaments, surpassing Ronaldo (15) to hold the absolute record.',
    points: 15,
    category: 'History'
  },
  // --- GUESS THE MANAGER MODULE ---
  {
    id: 'mgr1',
    question: 'This tactical mastermind took over his national team in 2018, guided them to a historic Copa América title in 2021, and secured their third FIFA World Cup title in 2022. Who is this manager?',
    options: ['Lionel Scaloni', 'Didier Deschamps', 'Gerardo Martino', 'Jorge Sampaoli'],
    correctAnswer: 'Lionel Scaloni',
    explanation: 'Lionel Scaloni took over Argentina as a caretaker manager after the 2018 World Cup and engineered a magnificent rebuild, winning Copa América 2021 and the 2022 World Cup.',
    points: 15,
    category: 'Guess the Manager'
  },
  {
    id: 'mgr2',
    question: 'Known for intensive "gegenpressing" and high-octane transitional play, this manager coached Leeds United and Red Bull Salzburg before taking the reins of co-host Canada in 2024. Who is he?',
    options: ['Jesse Marsch', 'Mauricio Pochettino', 'Gregg Berhalter', 'Bob Bradley'],
    correctAnswer: 'Jesse Marsch',
    explanation: 'Jesse Marsch was appointed as Canada\'s head coach in May 2024, leading them to a stunning Copa América semi-final run and building massive excitement for the 2026 World Cup.',
    points: 15,
    category: 'Guess the Manager'
  },
  {
    id: 'mgr3',
    question: 'This legendary former midfielder won the World Cup as captain in 1998, and later managed his country to another World Cup title in 2018 and the final in 2022. Who is this manager?',
    options: ['Zinedine Zidane', 'Didier Deschamps', 'Laurent Blanc', 'Thierry Henry'],
    correctAnswer: 'Didier Deschamps',
    explanation: 'Didier Deschamps is one of only three men in football history (along with Mário Zagallo and Franz Beckenbauer) to win the FIFA World Cup as both a player and a manager.',
    points: 10,
    category: 'Guess the Manager'
  },
  {
    id: 'mgr4',
    question: 'In September 2024, this highly acclaimed Argentine manager, who previously led Tottenham to a Champions League final and coached Chelsea & PSG, was appointed head coach of the USMNT. Who is he?',
    options: ['Mauricio Pochettino', 'Gerardo Martino', 'Marcelo Bielsa', 'Diego Simeone'],
    correctAnswer: 'Mauricio Pochettino',
    explanation: 'Mauricio Pochettino made global headlines by signing on to lead the United States Men\'s National Team into their co-hosted 2026 home World Cup campaign.',
    points: 15,
    category: 'Guess the Manager'
  },
  // --- QUALIFIED TEAM HISTORY MODULE ---
  {
    id: 'hist1',
    question: 'Which team holds the record for the most total World Cup match wins in history, having also won the entire tournament five times?',
    options: ['Germany', 'Brazil', 'Italy', 'Argentina'],
    correctAnswer: 'Brazil',
    explanation: 'Brazil has won a record 76 World Cup matches and is the most successful national team in history with five coveted trophies.',
    points: 10,
    category: 'Qualified Team History'
  },
  {
    id: 'hist2',
    question: 'In one of the most stunning group stage matches in World Cup history, which qualified team defeated Argentina 2-1 in their opening game of the 2022 tournament?',
    options: ['Saudi Arabia', 'Morocco', 'Japan', 'Mexico'],
    correctAnswer: 'Saudi Arabia',
    explanation: 'Saudi Arabia shocked the footballing globe in Qatar 2022 by defeating eventual champions Argentina 2-1 in a legendary group stage matchup.',
    points: 15,
    category: 'Qualified Team History'
  },
  {
    id: 'hist3',
    question: 'Which European powerhouse reached the World Cup semi-finals in 2018 and finished third in 2022, famously led by midfielder Luka Modrić?',
    options: ['Croatia', 'Belgium', 'Netherlands', 'Denmark'],
    correctAnswer: 'Croatia',
    explanation: 'Croatia has punched far above its weight in recent tournaments, finishing as runners-up in 2018 and taking third place in 2022.',
    points: 10,
    category: 'Qualified Team History'
  },
  // --- GUESS THE STADIUM MODULE ---
  {
    id: 'std1',
    question: 'Which 2026 World Cup venue features a massive, futuristic translucent roof, retractable field, and is the home of the NFL\'s Dallas Cowboys, set to host the most matches (9) in the tournament?',
    options: ['AT&T Stadium (Dallas)', 'SoFi Stadium (Los Angeles)', 'MetLife Stadium (New York NJ)', 'Mercedes-Benz Stadium (Atlanta)'],
    correctAnswer: 'AT&T Stadium (Dallas)',
    explanation: 'AT&T Stadium in Arlington, Texas, is renowned for its sheer scale, high-definition giant screen, and retractable roof. It will host nine matches, including a high-stakes semi-final.',
    points: 15,
    category: 'Guess the Stadium'
  },
  {
    id: 'std2',
    question: 'Located in Mexico\'s third-largest city, this architecturally stunning stadium is known as "El Gigante de Acero" (The Steel Giant) and sits under the backdrop of the iconic Cerro de la Silla mountain. What is it?',
    options: ['Estadio BBVA (Monterrey)', 'Estadio Akron (Guadalajara)', 'Estadio Azteca (Mexico City)', 'Estadio Jalisco (Guadalajara)'],
    correctAnswer: 'Estadio BBVA (Monterrey)',
    explanation: 'Estadio BBVA in Monterrey is globally famous for its ultra-modern exterior and breathtaking mountain views framed perfectly by the open-stadium layout.',
    points: 15,
    category: 'Guess the Stadium'
  },
  {
    id: 'std3',
    question: 'This venue is a multi-billion dollar state-of-the-art marvel located in Inglewood, California. It features a dual-sided oval "Infinity Screen" suspended from a translucent canopy roof and hosted Super Bowl LVI. Which stadium is it?',
    options: ['SoFi Stadium (Los Angeles)', 'Allegiant Stadium (Las Vegas)', 'Lumen Field (Seattle)', 'Levi\'s Stadium (San Francisco)'],
    correctAnswer: 'SoFi Stadium (Los Angeles)',
    explanation: 'SoFi Stadium in Los Angeles is a technological masterpiece. It will host the highly anticipated opening match for the USMNT.',
    points: 15,
    category: 'Guess the Stadium'
  },
  // --- PLAYER STATISTICS MODULE ---
  {
    id: 'stat1',
    question: 'Which modern superstar holds the record for the most assists in World Cup history with 8 assists, alongside being his country\'s top goalscorer in the tournament with 13 goals?',
    options: ['Lionel Messi (Argentina)', 'Pelé (Brazil)', 'Diego Maradona (Argentina)', 'Thomas Müller (Germany)'],
    correctAnswer: 'Lionel Messi (Argentina)',
    explanation: 'Lionel Messi has registered 8 assists (tied with Maradona) and scored 13 goals across 26 matches, securing his legendary status with the 2022 World Cup title.',
    points: 15,
    category: 'Player Statistics'
  },
  {
    id: 'stat2',
    question: 'Which lethal forward is currently the youngest player in history to score 10 World Cup goals, doing so at just 23 years of age during the 2022 Qatar tournament?',
    options: ['Kylian Mbappé (France)', 'Erling Haaland (Norway)', 'Neymar (Brazil)', 'Harry Kane (England)'],
    correctAnswer: 'Kylian Mbappé (France)',
    explanation: 'Kylian Mbappé reached 12 World Cup goals by the age of 23, surpassing Pelé\'s previous statistical milestones for young goalscorers.',
    points: 10,
    category: 'Player Statistics'
  },
  {
    id: 'stat3',
    question: 'In World Cup history, who holds the infamous record for the fastest red card ever received, being sent off just 56 seconds into a match against Scotland in 1986?',
    options: ['José Batista (Uruguay)', 'Zinedine Zidane (France)', 'Roy Keane (Ireland)', 'Luis Suárez (Uruguay)'],
    correctAnswer: 'José Batista (Uruguay)',
    explanation: 'Uruguayan defender José Batista was sent off under a minute into the match by referee Joël Quiniou in the 1986 Mexico tournament.',
    points: 15,
    category: 'Player Statistics'
  }
];
