import {readFileSync,readdirSync,writeFileSync} from 'node:fs'
import {parse,name,isForfeit,replay} from '../src/records.ts'
import {annotations} from '../src/notes.ts'
const lines=['Per-game research status','Moves are recorded unless explicitly marked. A commentary gap means a sourced move note or overview remains to be added.','']
for (const f of readdirSync('public/pgn')) {
  const year=f.match(/\d{4}/)[0]
  const games=parse(readFileSync('public/pgn/'+f,'utf8'))
  lines.push(year+' · '+games.length+' records')
  for (const game of games) {
    const tags=game.tags
    const key=year+':'+tags.Round?.split('.')[0]+':'+tags.White.split(/[ ,]/)[0]
    const a=annotations[key]
    const record=replay(game.pgn)
    for (const note of a?.notes??[]) {
      if (!record.moves[note.ply-1]) throw Error('Invalid note at '+key)
      if (note.variation) {
        const {Chess}=await import('chess.js')
        const board=new Chess(record.positions[note.start])
        for(const move of note.variation) board.move(move)
      }
    }
    const status=isForfeit(game,year)?'forfeit':!record.moves.length?'move record missing':a ? a.overview?'overview and note present':'move note present; separate overview pending':'published commentary pending'
    lines.push('  '+game.id+' · '+tags.Event+' · '+tags.Round+' · '+name(tags.White)+' – '+name(tags.Black)+' · '+tags.Result+' · '+status)
  }
  lines.push('')
}
writeFileSync('public/research-gaps.txt',lines.join('\n')+'\n')
