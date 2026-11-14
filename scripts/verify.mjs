import { readFileSync, readdirSync } from 'node:fs'
import { Chess } from 'chess.js'
let total=0, empty=0, failed=0
for (const file of readdirSync('public/pgn').sort()) {
  const games=readFileSync('public/pgn/'+file,'utf8').trim().split(/(?=^\[Event ")/m).filter(Boolean)
  let count=0
  for (const [i,pgn] of games.entries()) {
    try {
      const chess=new Chess()
      chess.loadPgn(pgn)
      if(!chess.history().length){empty++;console.log('EMPTY',file,i+1,pgn.match(/\[Round "(.*?)"\]/)?.[1]);}
      count++
    } catch(error){failed++;console.error(file,i+1,error.message)}
  }
  total+=count
  console.log(file,count)
}
console.log({total,empty,failed})
if(failed)process.exitCode=1
