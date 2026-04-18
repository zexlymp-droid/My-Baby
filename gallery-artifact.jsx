import { useState, useEffect, useRef, useCallback } from "react";
const ICONS = ["✦","✿","♡","✧","❋","⊹","✶","⋆"];
const PHOTOS = [
  {id:1,src:"https://picsum.photos/seed/rb1/400/500",caption:"Hari ini dia pakai dress biru... hati gw langsung bergetar.",mood:"✦ cantik banget",date:"12 Apr 2025",tilt:-3,hearts:24},
  {id:2,src:"https://picsum.photos/seed/rb2/380/460",caption:"Senyumnya waktu ketawa itu... gak ada obatnya.",mood:"✧ senyumnya",date:"28 Mar 2025",tilt:2,hearts:31},
  {id:3,src:"https://picsum.photos/seed/rb3/400/480",caption:"Momen biasa yang gak pernah gw lupain.",mood:"♡ detail favoritku",date:"15 Mar 2025",tilt:-2,hearts:18},
  {id:4,src:"https://picsum.photos/seed/rb4/360/440",caption:"Dia gak tau betapa indahnya dia di hari itu.",mood:"✿ secret moment",date:"02 Mar 2025",tilt:3,hearts:42},
  {id:5,src:"https://picsum.photos/seed/rb5/400/500",caption:"Golden hour + dia = gw hilang kata-kata.",mood:"✦ golden hour",date:"18 Feb 2025",tilt:-1,hearts:55},
  {id:6,src:"https://picsum.photos/seed/rb6/380/450",caption:"Bukan foto terbaik, tapi momen paling gw sayang.",mood:"❋ memory keabadian",date:"01 Feb 2025",tilt:2,hearts:29},
];
function Sp({x,y,done}){
  useEffect(()=>{const t=setTimeout(done,800);return()=>clearTimeout(t)},[done]);
  return <div style={{position:"fixed",left:x,top:y,pointerEvents:"none",zIndex:9999,transform:"translate(-50%,-50%)"}}>
    {["✦","✧","⋆"].map((s,i)=><span key={i} style={{position:"absolute",fontSize:`${10+i*4}px`,color:["#a8d8ff","#fff","#7bb8e8"][i],animation:`spk .8s ease-out ${i*80}ms both`,"--dx":`${(i-1)*20}px`,"--dy":`${-20-i*10}px`}}>{s}</span>)}
  </div>;
}
function Card({p,onHeart,hd}){
  const [hov,setHov]=useState(false);
  const [open,setOpen]=useState(false);
  const [spk,setSpk]=useState([]);
  const mm=useCallback(e=>{if(hov&&Math.random()<.15)setSpk(v=>[...v.slice(-5),{id:Date.now()+Math.random(),x:e.clientX,y:e.clientY}]);},[hov]);
  return <>
    {spk.map(s=><Sp key={s.id} x={s.x} y={s.y} done={()=>setSpk(v=>v.filter(x=>x.id!==s.id))}/>)}
    <div className={`card${hov?" hov":""}`} style={{"--t":`${p.tilt}deg`}} onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)} onMouseMove={mm}>
      <div className="rib">✦</div>
      <div className="pw"><img src={p.src} alt="" loading="lazy"/>
        <div className="ov"><button className="lb" onClick={()=>setOpen(true)}>✉ buka surat</button></div>
      </div>
      <div className="pb">
        <span className="mtag">{p.mood}</span>
        <span className="dt">{p.date}</span>
        <button className={`hb${hd?" hrt":""}`} onClick={()=>onHeart(p.id)}>{hd?"♥":"♡"} {p.hearts+(hd?1:0)}</button>
      </div>
      {["tl","tr","bl","br"].map(c=><div key={c} className={`dot ${c}`}/>)}
    </div>
    {open&&<div className="lo" onClick={()=>setOpen(false)}>
      <div className="lm" onClick={e=>e.stopPropagation()}>
        <div style={{fontFamily:"'Gochi Hand',cursive",fontSize:13,color:"#7bb8e8",letterSpacing:3,marginBottom:8,opacity:.7}}>✦ catatan kecil ✦</div>
        <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:11,color:"rgba(240,246,255,.4)",marginBottom:24}}>{p.date}</div>
        <p style={{fontFamily:"'Cormorant Garamond',serif",fontSize:20,fontStyle:"italic",fontWeight:300,color:"#f0f6ff",lineHeight:1.6,marginBottom:20}}>{p.caption}</p>
        <div style={{fontFamily:"'Gochi Hand',cursive",fontSize:12,color:"#a8d8ff",marginBottom:28,opacity:.7}}>{p.mood}</div>
        <button style={{fontFamily:"'Gochi Hand',cursive",fontSize:13,background:"none",border:"1px solid rgba(168,216,255,.2)",color:"rgba(240,246,255,.7)",padding:"8px 24px",borderRadius:20,cursor:"pointer"}} onClick={()=>setOpen(false)}>tutup ✧</button>
      </div>
    </div>}
  </>;
}
function Upload({onClose,onAdd}){
  const [dg,setDg]=useState(false);
  const [prev,setPrev]=useState(null);
  const [cap,setCap]=useState("");
  const [mood,setMood]=useState("✦ cantik banget");
  const ref=useRef();
  const mds=["✦ cantik banget","✧ senyumnya","♡ detail favoritku","✿ secret moment","❋ memory keabadian","⋆ golden hour"];
  const hf=f=>{if(!f?.type.startsWith("image/"))return;setPrev(URL.createObjectURL(f));};
  return <div className="lo" onClick={onClose}>
    <div className="lm" style={{maxWidth:460,padding:"36px 32px"}} onClick={e=>e.stopPropagation()}>
      <div style={{fontFamily:"'Gochi Hand',cursive",fontSize:18,color:"#a8d8ff",textAlign:"center",marginBottom:24,letterSpacing:2}}>✦ tambah kenangan ✦</div>
      <div style={{border:`2px dashed ${dg?"#a8d8ff":"rgba(168,216,255,.2)"}`,borderRadius:8,padding:prev?"0":"32px",textAlign:"center",cursor:"pointer",marginBottom:18,overflow:"hidden",transition:"all .2s"}}
        onDragOver={e=>{e.preventDefault();setDg(true)}} onDragLeave={()=>setDg(false)} onDrop={e=>{e.preventDefault();setDg(false);hf(e.dataTransfer.files[0]);}} onClick={()=>ref.current.click()}>
        {prev?<img src={prev} style={{width:"100%",height:180,objectFit:"cover",display:"block"}} alt=""/>:
        <><div style={{fontSize:32,color:"#7bb8e8",opacity:.5,marginBottom:10}}>✧</div>
        <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:13,color:"rgba(240,246,255,.5)",lineHeight:1.6}}>drag foto kesini<br/><small>atau klik untuk pilih</small></div></>}
        <input ref={ref} type="file" accept="image/*" hidden onChange={e=>hf(e.target.files[0])}/>
      </div>
      <textarea style={{width:"100%",background:"rgba(168,216,255,.04)",border:"1px solid rgba(168,216,255,.1)",borderRadius:6,padding:"12px 14px",color:"#f0f6ff",fontFamily:"'DM Sans',sans-serif",fontSize:13,resize:"none",outline:"none",marginBottom:14}} placeholder="cerita singkat..." rows={3} value={cap} onChange={e=>setCap(e.target.value)}/>
      <div style={{display:"flex",flexWrap:"wrap",gap:6,marginBottom:20}}>
        {mds.map(m=><button key={m} style={{fontFamily:"'Gochi Hand',cursive",fontSize:11,background:mood===m?"rgba(168,216,255,.08)":"none",border:`1px solid ${mood===m?"#a8d8ff":"rgba(168,216,255,.15)"}`,color:mood===m?"#a8d8ff":"rgba(240,246,255,.5)",padding:"5px 12px",borderRadius:20,cursor:"pointer",transition:"all .2s"}} onClick={()=>setMood(m)}>{m}</button>)}
      </div>
      <div style={{display:"flex",gap:10,justifyContent:"flex-end"}}>
        <button style={{fontFamily:"'DM Sans',sans-serif",fontSize:13,background:"none",border:"1px solid rgba(168,216,255,.15)",color:"rgba(240,246,255,.6)",padding:"10px 20px",borderRadius:6,cursor:"pointer"}} onClick={onClose}>batal</button>
        <button style={{fontFamily:"'Gochi Hand',cursive",fontSize:14,background:"rgba(168,216,255,.12)",border:"1px solid rgba(168,216,255,.3)",color:"#a8d8ff",padding:"10px 22px",borderRadius:6,cursor:"pointer",opacity:prev?1:.35}} disabled={!prev}
          onClick={()=>{if(!prev)return;onAdd({id:Date.now(),src:prev,caption:cap||"momen yang gak terlupakan.",mood,date:new Date().toLocaleDateString("id-ID",{day:"2-digit",month:"short",year:"numeric"}),tilt:(Math.random()-.5)*6,hearts:0});onClose();}}>
          simpan kenangan ✦</button>
      </div>
    </div>
  </div>;
}
export default function App(){
  const [photos,setPhotos]=useState(PHOTOS);
  const [hd,setHd]=useState({});
  const [up,setUp]=useState(false);
  const [pts]=useState(()=>Array.from({length:20},(_,i)=>({id:i,icon:ICONS[i%ICONS.length],left:`${Math.random()*100}%`,top:`${Math.random()*100}%`,sz:10+Math.random()*14,op:.1+Math.random()*.18,dur:4+Math.random()*5,del:Math.random()*4,col:["#a8d8ff","#c9e8ff","#7bb8e8","#fff"][Math.floor(Math.random()*4)]})));
  const cur=useRef();
  useEffect(()=>{const m=e=>{if(cur.current){cur.current.style.left=e.clientX+"px";cur.current.style.top=e.clientY+"px";}};window.addEventListener("mousemove",m);return()=>window.removeEventListener("mousemove",m);},[]);
  return <>
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;1,300;1,400&family=Gochi+Hand&family=DM+Sans:wght@300;400&display=swap');
      *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
      body{background:#0a0f1e;min-height:100vh;cursor:none;overflow-x:hidden}
      body::before{content:'';position:fixed;inset:0;background:radial-gradient(ellipse 80% 50% at 20% 30%,rgba(123,184,232,.07),transparent 60%),radial-gradient(ellipse 60% 40% at 80% 70%,rgba(168,216,255,.05),transparent 60%);pointer-events:none;z-index:0}
      .cur{position:fixed;pointer-events:none;z-index:99999;transform:translate(-50%,-50%);font-size:14px;color:#a8d8ff;filter:drop-shadow(0 0 4px #a8d8ff)}
      .hdr{position:relative;z-index:10;text-align:center;padding:56px 24px 32px}
      .eye{font-family:'Gochi Hand',cursive;font-size:13px;color:#7bb8e8;letter-spacing:4px;text-transform:uppercase;margin-bottom:12px;opacity:.8}
      .htl{font-family:'Cormorant Garamond',serif;font-size:clamp(36px,7vw,60px);font-weight:300;color:#f0f6ff;line-height:1.1;letter-spacing:-1px}
      .htl em{font-style:italic;color:#a8d8ff}
      .hsub{font-family:'DM Sans',sans-serif;font-size:13px;color:rgba(240,246,255,.7);margin-top:14px;font-weight:300;letter-spacing:1px}
      .hdiv{display:flex;align-items:center;justify-content:center;gap:12px;margin-top:20px;color:#7bb8e8;opacity:.5;font-size:12px;letter-spacing:3px}
      .hdiv::before,.hdiv::after{content:'';width:60px;height:1px}
      .hdiv::before{background:linear-gradient(90deg,transparent,#7bb8e8)}.hdiv::after{background:linear-gradient(90deg,#7bb8e8,transparent)}
      .glry{position:relative;z-index:10;columns:3;column-gap:24px;max-width:1100px;margin:0 auto;padding:20px 28px 60px}
      @media(max-width:820px){.glry{columns:2;padding:16px 18px 40px}}
      @media(max-width:500px){.glry{columns:1;padding:16px 20px 40px}}
      .card{break-inside:avoid;position:relative;background:linear-gradient(135deg,#141e3a,#0f1829);border-radius:4px;padding:12px 12px 48px;margin-bottom:24px;transform:rotate(var(--t));transition:transform .4s cubic-bezier(.34,1.56,.64,1),box-shadow .4s;cursor:none;box-shadow:0 8px 32px rgba(0,0,0,.5),0 0 0 1px rgba(168,216,255,.06),inset 0 1px 0 rgba(168,216,255,.08);animation:ci .6s ease both}
      .card.hov{transform:rotate(0deg) scale(1.03);box-shadow:0 20px 60px rgba(0,0,0,.6),0 0 0 1px rgba(168,216,255,.2),0 0 40px rgba(168,216,255,.07),inset 0 1px 0 rgba(168,216,255,.15);z-index:100}
      @keyframes ci{from{opacity:0;transform:rotate(var(--t)) translateY(20px)}to{opacity:1;transform:rotate(var(--t)) translateY(0)}}
      .rib{position:absolute;top:-10px;right:16px;width:20px;height:32px;background:linear-gradient(180deg,#a8d8ff,#7bb8e8);border-radius:0 0 10px 10px;display:flex;align-items:flex-end;justify-content:center;padding-bottom:4px;font-size:9px;color:#0a0f1e;box-shadow:0 4px 12px rgba(168,216,255,.3);z-index:2}
      .pw{position:relative;border-radius:2px;overflow:hidden;line-height:0}
      .pw img{width:100%;height:auto;display:block;filter:brightness(.9) saturate(.8);transition:filter .4s,transform .4s}
      .hov .pw img{filter:brightness(1) saturate(1);transform:scale(1.02)}
      .ov{position:absolute;inset:0;background:linear-gradient(0deg,rgba(10,15,30,.7),transparent 50%);display:flex;align-items:flex-end;justify-content:center;padding-bottom:10px;opacity:0;transition:opacity .3s}
      .hov .ov{opacity:1}
      .lb{font-family:'Gochi Hand',cursive;font-size:12px;background:rgba(168,216,255,.15);border:1px solid rgba(168,216,255,.3);color:#a8d8ff;padding:5px 12px;border-radius:20px;cursor:pointer;backdrop-filter:blur(4px);transition:background .2s}
      .lb:hover{background:rgba(168,216,255,.25)}
      .pb{position:absolute;bottom:0;left:0;right:0;padding:7px 12px 9px;display:flex;align-items:center;gap:7px}
      .mtag{font-family:'Gochi Hand',cursive;font-size:10px;color:#a8d8ff;flex:1;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
      .dt{font-family:'DM Sans',sans-serif;font-size:9px;color:rgba(240,246,255,.35);white-space:nowrap}
      .hb{font-family:'Gochi Hand',cursive;font-size:11px;background:none;border:none;color:rgba(168,216,255,.45);cursor:pointer;transition:color .2s,transform .2s;white-space:nowrap;padding:0}
      .hb.hrt{color:#ff8fa3}.hb:hover{transform:scale(1.2)}
      .dot{position:absolute;width:5px;height:5px;border-radius:50%;background:rgba(168,216,255,.18)}
      .dot.tl{top:7px;left:7px}.dot.tr{top:7px;right:7px}.dot.bl{bottom:42px;left:7px}.dot.br{bottom:42px;right:7px}
      .lo{position:fixed;inset:0;background:rgba(5,8,18,.88);backdrop-filter:blur(10px);z-index:1000;display:flex;align-items:center;justify-content:center;padding:20px;cursor:none}
      .lm{background:linear-gradient(135deg,#111d3c,#0d1530);border:1px solid rgba(168,216,255,.12);border-radius:8px;padding:40px 36px;max-width:420px;width:100%;text-align:center;box-shadow:0 32px 80px rgba(0,0,0,.6);animation:mi .4s cubic-bezier(.34,1.56,.64,1)}
      @keyframes mi{from{opacity:0;transform:scale(.85) translateY(20px)}to{opacity:1;transform:scale(1) translateY(0)}}
      .fab{position:fixed;bottom:28px;right:28px;z-index:200;width:50px;height:50px;border-radius:50%;background:linear-gradient(135deg,#1a2f5e,#0f1e40);border:1px solid rgba(168,216,255,.25);color:#a8d8ff;font-size:18px;cursor:pointer;display:flex;align-items:center;justify-content:center;box-shadow:0 8px 24px rgba(0,0,0,.4),0 0 20px rgba(168,216,255,.1);transition:all .3s}
      .fab:hover{transform:scale(1.12) rotate(15deg);box-shadow:0 12px 32px rgba(0,0,0,.5),0 0 30px rgba(168,216,255,.2)}
      .ftr{position:relative;z-index:10;text-align:center;padding:0 0 44px;font-family:'Gochi Hand',cursive;font-size:13px;color:#7bb8e8;opacity:.3;letter-spacing:2px}
      @keyframes spk{0%{opacity:1;transform:translate(0,0) scale(1)}100%{opacity:0;transform:translate(var(--dx),var(--dy)) scale(.3)}}
      @keyframes flt{from{transform:translateY(0) rotate(0)}to{transform:translateY(-16px) rotate(12deg)}}
    `}</style>
    <div ref={cur} className="cur">✦</div>
    {pts.map(p=><div key={p.id} style={{position:"fixed",fontSize:p.sz,color:p.col,left:p.left,top:p.top,opacity:p.op,animation:`flt ${p.dur}s ${p.del}s ease-in-out infinite alternate`,pointerEvents:"none",zIndex:1,userSelect:"none"}}>{p.icon}</div>)}
    <header className="hdr">
      <div className="eye">✦ midnight ribbon gallery ✦</div>
      <h1 className="htl">Digital <em>Shrine</em></h1>
      <p className="hsub">ruang kecil untuk menyimpan kenangan yang tidak akan pernah cukup kata-kata</p>
      <div className="hdiv">✦ ✦ ✦</div>
    </header>
    <main className="glry">
      {photos.map((p,i)=><div key={p.id} style={{animationDelay:`${i*90}ms`}}><Card p={p} onHeart={id=>setHd(h=>({...h,[id]:!h[id]}))} hd={!!hd[p.id]}/></div>)}
    </main>
    <footer className="ftr">made with ♡ · hanya untukmu</footer>
    <button className="fab" onClick={()=>setUp(true)}>✦</button>
    {up&&<Upload onClose={()=>setUp(false)} onAdd={p=>setPhotos(v=>[p,...v])}/>}
  </>;
}
