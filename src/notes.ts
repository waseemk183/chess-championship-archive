import { hague } from './data.ts'
export type Note = {ply:number; text:string; analyst:string; publication:string; url:string; location:string; variation?:string[]; start?:number}
export type Annotation = {overview?:string; notes:Note[]}
export const annotations:Record<string,Annotation> = {
'1948:22:Botvinnik':{overview:'Botvinnik needed a draw to secure first place. The encounter ended after fourteen moves, and Euwe congratulated the new champion.',notes:[{ply:28,text:'The draw secured the championship for Botvinnik with rounds still to play.',analyst:'The Chesspedia editorial account',publication:'The Chesspedia',url:hague,location:'Round 22'}]},
'2024:14:Ding':{overview:'The match was level going into the final classical game. Ding reached a defensible ending, but the ensuing exchanges after his rook move left Gukesh a winning pawn ending.',notes:[
{ply:8,text:'Grivas illustrates how capturing on d4 and building a pawn center with …e5 can produce a reversed Grünfeld structure.',analyst:'GM Efstratios Grivas',publication:'European Chess Union',url:'https://www.europechess.org/wp-content/uploads/2024/12/FIDE-World-Championship-2024_EfGrivas.pdf',location:'p. 97',start:7,variation:['cxd4','Nxd4','e5','Nxc6','bxc6','c4']},
{ply:109,text:'Ding invited an exchange of rooks. Gukesh could then force the bishops off as well, leaving a pawn ending that Black wins.',analyst:'GM Sundararajan Kidambi',publication:'ChessBase India',url:'https://chessbase.in/news/World-Championship-2024-diaries-Game-14-by-GM-Sundararajan-Kidambi',location:'55.Rf2'}
]}
}

const grivas='https://www.europechess.org/wp-content/uploads/2024/12/FIDE-World-Championship-2024_EfGrivas.pdf'
const singaporeNotes: [number, number, string, string][] = [
 [1,2,'pp. 9–10','Ding had used the French against Nepomniachtchi in 2023. Grivas notes how rare it has been in title matches. Gukesh gained space early, but Ding’s queenside advance gave him counterplay.'],
 [2,24,'pp. 18–19','The queens came off, but each player kept both rooks and both knights, so there was still play in the position. The game eventually ended in a repetition.'],
 [3,16,'pp. 22–23','Ding offered to exchange queens with his bishop already out on f5. The game remained sharp despite the exchange, and the defending champion eventually ran out of time.'],
 [4,6,'p. 29','Grivas identifies Ding’s setup as a London with colors reversed after Gukesh developed the bishop to f5. Black could also have played …e6.'],
 [5,12,'pp. 33–34','Ding closed the queenside structure with …c4. Gukesh later had to defend a difficult middlegame, but Ding did not convert the pressure and the game was drawn.'],
 [6,20,'p. 40','Grivas highlights …Ne4. Black placed the knight in the center, and after …e5 and an exchange, the d-pawn recaptured on e4.'],
 [7,14,'pp. 48–49','Grivas endorses the capture on c4 and notes that working it out cost Ding substantial time. Gukesh later had an extra pawn but could not convert.'],
 [8,11,'pp. 57–58','Grivas considers White’s earlier alternative of Nc3 instead of capturing on e7. He argues that this preserves flexibility without demonstrating an edge.'],
 [9,7,'pp. 65–66','Grivas preferred his own usual choice of Nd2 when meeting the bishop check in this Catalan. In the game, Ding held against Gukesh’s pressure.'],
 [10,11,'pp. 70–71','Grivas highlights Ding’s capture on c5. The London System led to a relatively quiet draw, the seventh in succession.'],
 [11,10,'pp. 74–75','Grivas questions the bishop move to g4. Gukesh obtained the bishop pair on move eight and later took the lead in the match.'],
 [12,71,'pp. 85–86','Grivas singles out the advance to d7. Ding’s advanced pawn and active pieces put Black under pressure, and the win leveled the match.'],
 [13,12,'pp. 87–88','The players revisited the French Defense from game one. Grivas judged that Gukesh later had winning chances, but Ding escaped and held the draw.']
]
for (const [round,ply,location,text] of singaporeNotes) {
 const white=round%2?'Gukesh':'Ding'
 annotations[`2024:${round}:${white}`]={notes:[{ply,text,analyst:'GM Efstratios Grivas',publication:'European Chess Union',url:grivas,location}]}
}
annotations['1972:6:Fischer']={overview:'Fischer entered game six level and took the lead with his first win with White in the match.',notes:[{ply:1,text:'Fischer’s choice of c4 surprised the audience. He later reached a Queen’s Gambit, which Alexander regarded as the game’s defining strategic achievement.',analyst:'C. H. O’D. Alexander, quoted by the Guardian',publication:'The Guardian',url:'https://www.theguardian.com/sport/2024/nov/24/greatest-chess-games-world-championship-history',location:'Reykjavík 1972, game 6'}]}
