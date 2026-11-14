import {historyRows, knockoutIds} from './history.ts'
export type Edition = {id:string; label:string; file?:string; place:string; dates:string; format:string; field:string; champion:string; score:string; history:string; source:string; split?:boolean}
export const timeline='https://worldchesschampionship2023.fide.com/chess-champions'
export const index='https://www.mark-weeks.com/chess/wcc-indx.htm'
export const modern='https://theweekinchess.com/chessnews/events/fide-world-chess-championship-2024'
export const hague='https://thechesspedia.net/world-championship-matches/fide-world-championship-tournament-1948/'
export const editions:Edition[]=[
{id:'2024',label:'2024',file:'WorldChamp2024',place:'Singapore',dates:'25 November – 12 December 2024',format:'Championship match',field:'Ding Liren · Gukesh D',champion:'Gukesh D',score:'7½–6½',history:'Ding Liren defended the title he won in 2023. Gukesh earned the challenge by winning the 2024 Candidates in Toronto. The best-of-14 match reached its final classical game tied at 6½–6½. Gukesh won with Black after Ding allowed a trade into a lost pawn ending, becoming the youngest undisputed world champion at 18.',source:modern},
{id:'1948',label:'1948',file:'WorldChamp1948',place:'The Hague & Moscow',dates:'2 March – 16 May 1948',format:'Five-player tournament',field:'Botvinnik · Smyslov · Keres · Reshevsky · Euwe',champion:'Mikhail Botvinnik',score:'Botvinnik 14 · Smyslov 11 · Keres and Reshevsky 10½ · Euwe 4',history:'Alexander Alekhine’s death in 1946 left the title vacant. FIDE invited leading masters to a tournament. Reuben Fine declined and five players contested the title, facing each opponent five times across 25 rounds with one bye per round. The first ten rounds took place in The Hague and the remainder in Moscow. Botvinnik clinched the title with a draw against Euwe in round 22 and finished three points clear.',source:hague}
]
const crossTables:Record<string,string>={
 '1951':'4951$wix','1954':'5254$wix','1957':'55571wix','1958':'55572wix','1960':'58601wix','1961':'58602wix','1963':'6163$wix','1966':'6466$wix','1969':'6769$wix','1972':'7072$wix','1975':'7375$wix','1978':'7678$wix','1981':'7981$wix','1984':'82841wix','1985':'82842wix','1986':'82843wix','1987':'8587$wix','1990':'8890$wix',
 '1993':'9193fwix','1996':'9496fwix','1998':'9798$wix','1999':'9899$wix','2000':'a0a1$wix','2002':'a1a2$wix','2004':'a3a4$wix','2005':'a4a5$wix','2006':'a5a7uwix','2007':'a5a7$wix','2008':'a7a8$cix','2010':'a7a8$wix','2012':'a8b0$wix','2013':'b1b3$wix','2014':'b2b4$wix','2016':'b4b6$wix','2018':'b7b8$wix','2021':'b9c0$wix'
}
editions.push(...historyRows.map(([id,label,place,dates,field,champion,score,history]) => ({
  id,label,place,dates,field,champion,score,history,
  file:id==='1975'?undefined:(+id>=1993&&+id<=2005?'FideChamp':'WorldChamp')+id,
  split:+id>=1993&&+id<=2006,
  format:id==='1975'?'Title awarded':id==='2006'?'Reunification match':knockoutIds.includes(id)?'Knockout':['2005','2007'].includes(id)?'Eight-player tournament':'Championship match',
  source:id==='2023'?'https://worldchesschampionship2023.fide.com/':'https://www.mark-weeks.com/chess/'+crossTables[id]+'.htm'
})))
editions.sort((a,b)=>Number(b.id)-Number(a.id))
export const splitText='In 1993, Garry Kasparov and Nigel Short took their title match outside FIDE. FIDE organized a separate championship between Anatoly Karpov and Jan Timman. The two title lines reunited in 2006 when classical champion Vladimir Kramnik played FIDE champion Veselin Topalov.'
export type Profile = {name:string; bio:string; url:string; federation?:string; appearances?:Record<string,string>}
const chesscom='https://www.chess.com/players/'
export const profiles:Profile[]=[
{name:'Mikhail Botvinnik',url:chesscom+'mikhail-botvinnik',bio:'The Soviet grandmaster won three separate reigns as world champion. His systematic opening preparation and preference for positions he had studied deeply influenced generations of Soviet players.',appearances:{'1948':'USSR · An invited contender and leading Soviet player, Botvinnik won his five-game series against each of the other entrants.'}},
{name:'Vasily Smyslov',url:chesscom+'vasily-smyslov',bio:'The future seventh world champion was renowned for harmonious piece placement and endgame skill. He beat Botvinnik for the title in 1957.',appearances:{'1948':'USSR · Invited as one of the Soviet representatives, Smyslov finished second with 11 points.'}},
{name:'Paul Keres',url:chesscom+'paul-keres',bio:'The Estonian grandmaster shared first at AVRO 1938 and was known for combining attacking play with deep opening knowledge.',appearances:{'1948':'USSR · Invited to the title tournament, Keres shared third and beat Botvinnik in their last encounter.'}},
{name:'Samuel Reshevsky',url:chesscom+'samuel-reshevsky',bio:'A childhood prodigy and multiple U.S. champion, Reshevsky was known for resourceful positional play and tactical defense, often under time pressure.',appearances:{'1948':'USA · Reshevsky accepted the invitation and shared third place. He defeated Botvinnik in Moscow.'}},
{name:'Max Euwe',url:chesscom+'max-euwe',bio:'The Dutch mathematician defeated Alekhine in 1935 and later served as FIDE president. His play and writing were noted for their systematic treatment of strategy.',appearances:{'1948':'Netherlands · The invited former world champion opened the tournament in his home country and finished fifth.'}},
{name:'Ding Liren',url:chesscom+'ding-liren',bio:'China’s first open classical world champion won the title in 2023. His games are known for calculation in complex positions and resilient defense.',appearances:{'2024':'China · Ding entered Singapore as defending champion. He won the first game and equalized again in game 12.'}},
{name:'Gukesh D',url:chesscom+'gukesh-dommaraju',bio:'An Indian grandmaster with a reputation for deep calculation, Gukesh won individual and team gold at the 2024 Chess Olympiad and captured the world title later that year.',appearances:{'2024':'India · Gukesh earned his place by winning the 2024 Candidates and clinched the match in game 14.'}}
]
export const latest='https://www.fide.com/salesforce-fide-world-championship-match-2026-schedule-format-and-prize-fund-confirmed/'
const otherPlayers=[
['David Bronstein','USSR','A Soviet champion and 1951 title challenger whose imaginative attacks and opening experiments helped popularize the King’s Indian Defense.','david-bronstein'],
['Mikhail Tal','USSR','The eighth world champion, known for sacrifices that created difficult practical problems. He won the 1959 Candidates and took the title at 23.','mikhail-tal'],
['Tigran Petrosian','USSR','The ninth world champion was renowned for anticipating threats, maneuvering in closed positions and using positional exchange sacrifices.','tigran-petrosian'],
['Boris Spassky','USSR','The tenth world champion was known for his versatility, combining direct attacks with strong positional play across many openings.','boris-spassky'],
['Bobby Fischer','USA','The eleventh world champion won the 1970 Interzonal and swept two consecutive Candidates matches 6–0. His play combined meticulous opening preparation with technically exact endgames.','bobby-fischer'],
['Anatoly Karpov','USSR through 1990, Russia in later FIDE events','A long-reigning world champion whose quiet moves often restricted an opponent’s pieces before he converted a small advantage.','anatoly-karpov'],
['Viktor Korchnoi','FIDE in 1978, Switzerland in 1981','A four-time Soviet champion and two-time title challenger known for tenacious defense and an ability to find counterplay under pressure.','viktor-korchnoi'],
['Garry Kasparov','USSR','The thirteenth world champion held the title from 1985 and became known for deep opening preparation and forceful initiative in complex positions.','garry-kasparov'],
['Jan Timman','Netherlands','A multiple Dutch champion and longtime Candidates contender, known for his broad opening repertoire and interest in endgame studies.','jan-timman'],
['Gata Kamsky','USA','A multiple U.S. champion and 2007 World Cup winner, Kamsky was known for practical defense and for creating chances in long positional struggles.','gata-kamsky'],
['Viswanathan Anand','India','India’s first grandmaster and a five-time world champion across knockout, tournament and match formats. He is known for fast calculation and flexible opening choices.','viswanathan-anand'],
['Alexander Khalifman','Russia','The 1999 FIDE champion won the Russian championship in 1996. He wrote extensively on opening preparation.','alexander-khalifman'],
['Vladimir Akopian','Armenia','The 1991 World Junior Champion reached the 1999 FIDE final and was a member of Armenia’s Olympic gold-medal teams.','vladimir-akopian'],
['Alexei Shirov','Spain in 2000','A grandmaster from Riga, Shirov is associated with sharp tactical play. His game collections are titled Fire on Board.','alexei-shirov'],
['Ruslan Ponomariov','Ukraine','The Ukrainian grandmaster became FIDE champion at 18. He later reached multiple World Cup finals.','ruslan-ponomariov'],
['Vasyl Ivanchuk','Ukraine','Winner of major tournaments including Linares and a World Rapid Champion, Ivanchuk is known for an unusually broad opening repertoire.','vasyl-ivanchuk'],
['Rustam Kasimdzhanov','Uzbekistan','The 2004 FIDE champion later worked as a second to Viswanathan Anand and Fabiano Caruana, contributing opening preparation at title matches.','rustam-kasimdzhanov'],
['Michael Adams','England','A multiple British champion and 2004 FIDE finalist, Adams is known for subtle maneuvering and positional pressure.','michael-adams'],
['Veselin Topalov','Bulgaria','The 2005 FIDE champion reached world number one and is known for energetic play and a willingness to sacrifice material for activity.','veselin-topalov'],
['Peter Svidler','Russia','A multiple Russian champion and 2011 World Cup winner, Svidler is closely associated with the Grünfeld Defense.','peter-svidler'],
['Alexander Morozevich','Russia','The Russian grandmaster reached number two in the world and often used unusual openings to reach complex positions.','alexander-morozevich'],
['Peter Leko','Hungary','The grandmaster drew the 2004 classical title match with Kramnik and was known for extensive theoretical preparation.','peter-leko'],
['Judit Polgár','Hungary','The strongest female player by peak rating, Polgár reached the world top ten and was known for aggressive tactical play.','judit-polgar'],
['Vladimir Kramnik','Russia','The 2000 classical champion and 2006 reunification winner built his reputation on deep positional preparation, notably the Berlin Defense.','vladimir-kramnik'],
['Boris Gelfand','Israel','The 2009 World Cup winner and 2012 title challenger is known for deep strategic preparation, including the Catalan and Najdorf.','boris-gelfand'],
['Levon Aronian','Armenia in 2007','The World Cup winner and Olympic gold medalist represented Armenia in the 2007 title tournament. His games often combine inventive tactics and positional play.','levon-aronian'],
['Alexander Grischuk','Russia','A multiple World Blitz Champion known for calculation in complicated middlegames, often while short of time.','alexander-grischuk'],
['Magnus Carlsen','Norway','A five-time classical world champion known for turning small advantages in apparently equal middlegames and endgames into wins.','magnus-carlsen'],
['Sergey Karjakin','Russia in 2016','The 2015 World Cup winner reached the 2016 title match. His defensive resourcefulness helped him hold several difficult positions against Carlsen.','sergey-karjakin'],
['Fabiano Caruana','USA in 2018','The 2014 Sinquefield Cup winner and 2018 challenger is known for extensive opening preparation and accurate calculation in sharp positions.','fabiano-caruana'],
['Ian Nepomniachtchi','Chess Federation of Russia in 2021, FIDE flag in 2023','Winner of consecutive Candidates tournaments, Nepomniachtchi is known for making decisions quickly in complex positions.','ian-nepomniachtchi']
]
for(const [name,federation,bio,slug] of otherPlayers) profiles.push({name,bio,url:chesscom+slug,federation})
for(const [name,federation] of [['Mikhail Botvinnik','USSR'],['Vasily Smyslov','USSR'],['Paul Keres','USSR'],['Samuel Reshevsky','USA'],['Max Euwe','Netherlands'],['Ding Liren','China'],['Gukesh D','India']]) {
  const profile=profiles.find(p=>p.name===name)
  if(profile)profile.federation=federation
}
