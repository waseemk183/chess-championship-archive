import {Chess} from 'chess.js'
import {readdirSync,readFileSync,writeFileSync} from 'node:fs'
const fen=board=>board.fen().split(' ').slice(0,4).join(' ')
const lines={}
const directory=process.argv[2]; if(!directory)throw Error('Pass a directory containing Lichess a.tsv through e.tsv');
for(const file of readdirSync(directory).filter(name=>/^[a-e]\.tsv$/.test(name))){
 for(const row of readFileSync(directory+'/'+file,'utf8').trim().split('\n').slice(1)){
  const [eco,name,pgn]=row.split('\t')
  const c=new Chess()
  c.loadPgn(pgn)
  lines[fen(c)]={eco,name}
 }
}
const found={}
for(const file of readdirSync('public/pgn')){
 const selections={}
 const games=readFileSync('public/pgn/'+file,'utf8').trim().split(/(?=^\[Event ")/m).filter(Boolean)
 for(const [i,g] of games.entries()){
  const c=new Chess();c.loadPgn(g)
  for(const move of c.history({verbose:true}).reverse()){
   const k=move.after.split(' ').slice(0,4).join(' ')
   if(lines[k]){selections[i]=lines[k].name;break}
  }
 }
 found[file.replace('.pgn','')]=selections
}
writeFileSync('src/openings.json',JSON.stringify(found)+'\n')
