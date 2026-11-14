import {useEffect, useMemo, useState} from 'react'
import {createRoot} from 'react-dom/client'
import {Chessboard} from 'react-chessboard'
import {Chess} from 'chess.js'
import {editions, profiles, splitText, latest, index, timeline, type Edition} from './data'
import {annotations, type Note} from './notes'
import {parse,replay,mentor,name,resultText,isForfeit,type Game} from './records'
import './style.css'
import openingData from './openings.json'

const openings:Record<string,Record<string,string>>=openingData
const asset = (path:string) => import.meta.env.BASE_URL + path
const href=(id:string, game?:number)=>`#/edition/${id}${game ? '/game/'+game : ''}`
function useRoute(){
  const [route,setRoute]=useState(location.hash)
  useEffect(()=>{const update=()=>{setRoute(location.hash);window.scrollTo(0,0)};window.addEventListener('hashchange',update);return()=>window.removeEventListener('hashchange',update)},[])
  return route
}
function Home(){
 const [query,setQuery]=useState('')
 const [selected,setSelected]=useState('')
 const filtered=editions.filter(e=>[e.label,e.place,e.field,e.champion,e.format].join(' ').toLowerCase().includes(query.trim().toLowerCase()))
 return <><section className="hero"><div className="hero-inner"><p className="eyebrow"><span/> THE WORLD CHAMPIONSHIP ARCHIVE</p><h1>History of Chess<br/>World Championship<br/>Games</h1><p className="intro">Explore the matches that decided the world title. Meet the players and replay their games, move by move.</p><form className="selector" onSubmit={e=>{e.preventDefault();if(selected)location.hash=href(selected)}}><label htmlFor="year">CHAMPIONSHIP EDITION</label><div><select id="year" value={selected} onChange={e=>setSelected(e.target.value)} required><option value="">Choose a year</option>{editions.map(e=><option key={e.id} value={e.id}>{e.label} · {e.field}</option>)}</select><button type="submit">Explore edition <span aria-hidden="true">↗</span></button></div></form></div></section>
 <main className="wrap" id="editions"><div className="section-head"><div><p className="eyebrow">1948–2024</p><h2>Championship editions</h2></div><label className="search"><span aria-hidden="true">⌕</span><input type="search" placeholder="Search year, player, or city" aria-label="Search editions" value={query} onChange={e=>setQuery(e.target.value)}/></label></div>
 <div className="cards">{filtered.map(e=><a className="card" key={e.id} href={href(e.id)}><div className="card-top"><span>{e.label}</span><span className="arrow" aria-hidden="true">↗</span></div><div className="card-meta">{e.place} · {e.format}</div><h3>{e.field}</h3><p>{e.champion} · {e.score}</p></a>)}</div>{!filtered.length&&<p>No editions match your search.</p>}
 <p className="archive-foot">The next championship is scheduled for November–December 2026. <a href={latest}>FIDE schedule ↗</a></p></main></>
}
function EditionPage({edition:e,games}:{edition:Edition;games:Game[]|null}){
 const finalists=e.field.split(' · ')
 const roster=useMemo(()=>Array.from(new Set(games?.flatMap(g=>[name(g.tags.White),name(g.tags.Black)])??[])).sort(),[games])
 const [playerQuery,setPlayerQuery]=useState('')
 const [gameQuery,setGameQuery]=useState('')
 const people=finalists
 const visibleGames=games?.filter(g=>[name(g.tags.White),name(g.tags.Black),gameLabel(g,e)].join(' ').toLowerCase().includes(gameQuery.trim().toLowerCase()))
 const known=profiles.filter(p=>people.some(n=>p.name.includes(n)))
 return <main className="wrap interior"><a className="back" href="#/">← All editions</a><p className="eyebrow">{e.format}</p><h1>{e.label} World Championship</h1><p className="lede">{e.place} · {e.dates}</p><div className="history-grid"><article><h2>Event history</h2><p>{e.history}</p>{e.split&&<p>{splitText}</p>}<a href={e.source}>Event history and results ↗</a></article><aside><p className="eyebrow">RESULT</p><h3>{e.champion}</h3><p>{e.score}</p></aside></div>
 <h2>{e.format==='Knockout'?'Finalists':'Players'}</h2><div className="players">{people.map(n=>{const p=known.find(p=>p.name.includes(n));return <article key={n}><h3>{p?.name??n}</h3>{p?<><p>{p.bio}</p><p>{p.appearances?.[e.id]??p.federation}</p><a href={p.url}>Player biography ↗</a></>:<p>Profile research pending.</p>}</article>})}</div>
 {e.format==='Knockout'&&roster.length>0&&<details className="roster"><summary>Players in recorded games · {roster.length}</summary><label className="search"><input value={playerQuery} onChange={ev=>setPlayerQuery(ev.target.value)} aria-label="Find tournament player" placeholder="Find tournament player"/></label><ul>{roster.filter(n=>n.toLowerCase().includes(playerQuery.trim().toLowerCase())).map(n=><li key={n}>{n}</li>)}</ul></details>}
 <div className="section-head"><h2>Games {games&&<small>{games.length}</small>}</h2>{e.file&&<a href={asset('pgn/'+e.file+'.pgn')} download>Download PGN ↓</a>}</div>
 {games && games.length>50&&<label className="search game-search"><input value={gameQuery} onChange={ev=>setGameQuery(ev.target.value)} aria-label="Filter games" placeholder="Filter by player or round"/></label>}
 {visibleGames ? <div className="game-list">{visibleGames.map(g=><a key={g.id} href={href(e.id,g.id)}><span>{gameLabel(g,e)}{isForfeit(g,e.id)&&<small> · Forfeit</small>}</span><strong>{name(g.tags.White)} <span className="versus">vs</span> {name(g.tags.Black)}</strong><span>{resultText(g.tags.Result)} <span aria-hidden="true">↗</span></span></a>)}</div>:<p>{e.file?'Loading game records…':'No played games for this edition.'}</p>}</main>
}
function gameLabel(g:Game,e:Edition){
  const round=(e.format==='Knockout'?g.tags.Round:g.tags.Round?.replace(/\.1$/,'')) ?? String(g.id)
  const tie=tiebreaks[e.id]
  if(e.format==='Knockout'){
    const [stage,number]=round.split('.').map(Number)
    const finalStage=e.id==='1998'?8:7
    const classical=stage===finalStage?(e.id==='2000'?4:6):stage===finalStage-1?(e.id==='1998'?4:4):2
    return (stage===finalStage?'Final':'Round '+stage)+(number>classical?' · Tiebreak '+(number-classical):' · Game '+(number||1))
  }
  return tie && g.id>tie ? 'Tiebreak '+(g.id-tie) : (e.format.includes('tournament')?'Round ':'Game ')+round
}
const tiebreaks:Record<string,number>={'2023':14,'2018':12,'2016':12,'2012':12,'2006':12}
function GamePage({e,g}:{e:Edition;g:Game}){
 const record=useMemo(()=>{try{return replay(g.pgn)}catch{return null}},[g])
 const [ply,setPly]=useState(0),[flip,setFlip]=useState(false),[playing,setPlaying]=useState(false),[speed,setSpeed]=useState(1000)
 const [line,setLine]=useState<{note:Note;positions:string[];at:number}|null>(null)
 const annotation=annotations[`${e.id}:${g.tags.Round?.split('.')[0]}:${g.tags.White.split(/[ ,]/)[0]}`]
 const length=line?line.positions.length-1:(record?.moves.length??0)
 const cursor=line?line.at:ply
 const jump=(n:number)=>{const next=Math.min(length,Math.max(0,n));if(line)setLine({...line,at:next});else setPly(next)}
 useEffect(()=>{if(!playing)return;if(cursor>=length){setPlaying(false);return}const timer=window.setTimeout(()=>jump(cursor+1),speed);return()=>window.clearTimeout(timer)},[cursor,playing,speed,line,length])
 useEffect(()=>{const key=(ev:KeyboardEvent)=>{if((ev.target as HTMLElement)?.closest('input,select,textarea')||ev.altKey||ev.metaKey||ev.ctrlKey)return;const target:Record<string,number>={ArrowLeft:cursor-1,ArrowRight:cursor+1,Home:0,End:length};if(ev.key in target){ev.preventDefault();setPlaying(false);jump(target[ev.key])}};window.addEventListener('keydown',key);return()=>window.removeEventListener('keydown',key)},[cursor,line,length])
 const startLine=(note:Note)=>{if(!note.variation||!record)return;const board=new Chess(record.positions[note.start??0]);const positions=[board.fen()];for(const move of note.variation){board.move(move);positions.push(board.fen())}setPlaying(false);setLine({note,positions,at:0})}
 const white=name(g.tags.White), black=name(g.tags.Black)
 const opening=g.tags.Opening??openings[e.file??'']?.[g.ordinal]
 const active=annotation?.notes.filter(n=>n.ply===ply)
 const move=record?.moves[ply-1]
 return <main className="wrap interior"><a className="back" href={href(e.id)}>← {e.label} championship</a><p className="eyebrow">{gameLabel(g,e)} · {g.tags.Date?.replaceAll('.','-')}</p><h1 className="game-title">{white} <span>vs</span> {black}</h1><p className="lede">{resultText(g.tags.Result)}{!isForfeit(g,e.id)&&(opening?' · '+opening:g.tags.ECO?' · ECO '+g.tags.ECO:'')}</p>
 {record?.moves.length && !isForfeit(g,e.id) ? <div className="replay"><section className="board-panel"><div className="player-label">{flip?'○':'●'} {flip?white:black}</div><Chessboard options={{position:line?.positions[line.at]??record.positions[ply],boardOrientation:flip?'black':'white',allowDragging:false,lightSquareStyle:{backgroundColor:'#e8d7b7'},darkSquareStyle:{backgroundColor:'#9b7959'},squareStyles:move&&!line?{[move.from]:{backgroundColor:'#bd9c4b'},[move.to]:{backgroundColor:'#d1b15d'}}:{}}}/><div className="player-label">{flip?'●':'○'} {flip?black:white}</div>
 <div className="controls">{[['⏮','First move',0],['◀','Previous move',cursor-1],[playing?'❚❚':'▶',playing?'Pause':'Autoplay',-999],['▶','Next move',cursor+1],['⏭','Last move',length]].map(([symbol,label,n])=><button key={label} type="button" aria-label={String(label)} title={String(label)} onClick={()=>{if(n===-999){if(cursor===length)jump(0);setPlaying(!playing)}else{setPlaying(false);jump(Number(n))}}}>{symbol}</button>)}<button onClick={()=>setFlip(!flip)} aria-label="Flip board" title="Flip board">⇅</button><select aria-label="Autoplay speed" value={speed} onChange={ev=>setSpeed(+ev.target.value)}><option value={2000}>0.5×</option><option value={1000}>1×</option><option value={500}>2×</option><option value={250}>4×</option></select></div>
 {line&&<div className="variation"><button onClick={()=>{setLine(null);setPlaying(false)}}>← Return to main game</button><p>{line.note.variation?.map((m,i)=><button key={i} className={line.at===i+1?'on':''} onClick={()=>jump(i+1)}>{m}</button>)}</p></div>}</section>
 <section className="replay-side"><div className="notation"><h2>Moves</h2><div className="move-table">{record.moves.map((m,i)=><div key={i} className="move-cell">{i%2===0&&<span>{i/2+1}.</span>}<button className={ply===i+1?'on':''} aria-current={ply===i+1?'step':undefined} onClick={()=>{setLine(null);setPlaying(false);setPly(i+1)}}>{m.san}{annotation?.notes.some(n=>n.ply===i+1)&&<b aria-label="Annotated"> •</b>}</button></div>)}</div></div>
 <div className="commentary"><h2>Commentary</h2>{annotation?.overview&&<p>{annotation.overview}</p>}{active?.length ? active.map(n=><article key={n.url+n.location}><p>{n.text}</p><a href={n.url}>{n.analyst} · {n.publication} · {n.location} ↗</a>{n.variation&&<button onClick={()=>startLine(n)}>Play variation</button>}</article>):annotation?<div className="note-links">{annotation.notes.map((n,i)=><button key={i} onClick={()=>{setPlaying(false);setLine(null);setPly(n.ply)}}>{Math.ceil(n.ply/2)}{n.ply%2?'.':'…'}{record.moves[n.ply-1]?.san}</button>)}</div>:<p>Verified published commentary has yet to be added for this game.</p>}</div></section></div>:<p>{isForfeit(g,e.id)?'Forfeit. No moves were played.':'No verified move record is available for this game.'}</p>}
 <p className="game-source">Game record {g.tags.ArchiveSource==='Mark Weeks'||e.id==='2023'&&g.id>14?<a href={e.id==='2023'?'https://www.mark-weeks.com/chess/c1c2$wix.htm':e.source}>Mark Weeks ↗</a>:<a href={mentor+e.file+'.pgn'}>PGN Mentor ↗</a>} · <a href={e.source}>Event results ↗</a></p></main>
}
function App(){
 const route=useRoute()
 const parts=route.split('/')
 const edition=editions.find(e=>e.id===parts[2])
 const [loaded,setLoaded]=useState<{id:string;games:Game[]}|null>(null)
 const [failure,setFailure]=useState('')
 useEffect(()=>{if(!edition?.file)return;const abort=new AbortController();setFailure('');fetch(asset('pgn/'+edition.file+'.pgn'),{signal:abort.signal}).then(r=>{if(!r.ok)throw Error();return r.text()}).then(pgn=>setLoaded({id:edition.id,games:parse(pgn)})).catch(e=>{if(e.name!=='AbortError')setFailure(edition.id)});return()=>abort.abort()},[edition])
 const games=loaded?.id===edition?.id?loaded?.games??null:null
 const game=games?.find(g=>g.id===Number(parts[4]))
 return <><header><a className="brand" href="#/"><span aria-hidden="true">♞</span> <span>World Championship Archive</span></a><nav><a href="#/">Editions</a><a href="#/sources">Sources</a></nav></header>
 {parts[1]==='sources'?<main className="wrap interior"><a className="back" href="#/">← All editions</a><h1>Sources</h1><p>{splitText}</p><ul><li><a href={timeline}>FIDE World Champions Timeline</a></li><li><a href={index}>Mark Weeks championship crosstables</a></li><li><a href="https://www.pgnmentor.com/files.html#worldch">PGN Mentor game collection</a></li><li><a href="https://github.com/lichess-org/chess-openings">Lichess opening names (CC0)</a></li><li><a href={latest}>FIDE 2026 schedule</a></li><li><a href={asset('research-gaps.txt')}>Game and source research status</a></li><li><a href={asset('record-crosscheck.txt')}>Historical PGN comparison</a></li></ul><p>Homepage image generated for this archive.</p></main>:edition?failure===edition.id?<main className="wrap"><p>The game records could not be loaded. Reload to try again.</p></main>:parts[3]==='game'?game?<GamePage key={edition.id+':'+game.id} e={edition} g={game}/>:<main className="wrap"><a href={href(edition.id)}>← {edition.label} championship</a><p>{games?'Game not found.':'Loading game record…'}</p></main>:<EditionPage key={edition.id} edition={edition} games={games}/>:<Home/>}
 <footer><span>♞ World Championship Archive</span><a href="#/sources">Sources & credits</a></footer></>
}
createRoot(document.getElementById('root')!).render(<App/>)
