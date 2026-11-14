import { Chess } from 'chess.js'

export const mentor = 'https://www.pgnmentor.com/events/'
export const resultText = (r:string) => r === '1/2-1/2' ? '½–½' : r.replace('-', '–')
export const name = (s:string) => s === 'Gukesh,D' || s === 'Gukesh, D' ? 'Gukesh D' : s.includes(',') ? s.split(',').reverse().map(s => s.trim()).join(' ') : s
export function parse(pgn:string) {
  return pgn.trim().split(/(?=^\[Event ")/m).filter(Boolean).map((pgn, i) => {
    const tags = Object.fromEntries(Array.from(pgn.matchAll(/^\[(\w+) "(.*)"\]\s*$/gm), m => [m[1],m[2]]))
    return {pgn, tags, ordinal:i}
  }).sort((a,b) => {
    const phase = (r:typeof a) => /rapid|blitz|playoffs|tiebreak|tie-break/i.test(r.tags.Event) && !/knockout/i.test(r.tags.Event) ? 1 : 0
    return phase(a)-phase(b) || a.tags.Round?.localeCompare(b.tags.Round ?? '', 'en', {numeric:true}) || a.ordinal-b.ordinal
  }).map((g,i) => ({...g,id:i+1}))
}
export const isForfeit = (g:Game, id:string) => g.tags.Termination === 'forfeit' ||
    (id === '1972' && g.tags.Round === '2') || (id === '2006' && g.tags.Round === '5' && !/Playoffs/i.test(g.tags.Event))
export type Game = ReturnType<typeof parse>[number]
export function replay(pgn:string) {
  const chess = new Chess()
  chess.loadPgn(pgn)
  const moves = chess.history({verbose:true})
  return {moves, positions:[moves[0]?.before ?? chess.fen(), ...moves.map(move => move.after)]}
}
