const lin=(c)=>{c/=255;return c<=0.04045?c/12.92:Math.pow((c+0.055)/1.055,2.4)};
const lum=([r,g,b])=>0.2126*lin(r)+0.7152*lin(g)+0.0722*lin(b);
const hex=(h)=>{const n=parseInt(h.slice(1),16);return[(n>>16)&255,(n>>8)&255,n&255]};
const ratio=(a,b)=>{const[x,y]=[lum(a),lum(b)].sort((p,q)=>q-p);return(x+0.05)/(y+0.05)};
const T={bg:'#F4F0E6','bg-2':'#EBE6D9',surface:'#E2DCCC',line:'#C6BFAE',ink:'#0B0A08','ink-2':'#2E2A24',mute:'#5F5A50','mute-2':'#6B6459',accent:'#7A4A16','accent-ink':'#F4F0E6'};
const pairs=[['ink','bg',4.5],['ink-2','bg',4.5],['mute','bg',4.5],['mute-2','bg',4.5],['accent','bg',4.5],['accent-ink','accent',4.5],['ink','surface',4.5],['mute','surface',4.5],['line','bg',1.0]];
let fails=0;
console.log('| texte | fond | ratio | seuil | verdict |');
console.log('|---|---|---|---|---|');
for(const[f,b,min]of pairs){const r=ratio(hex(T[f]),hex(T[b]));const ok=r>=min;if(!ok)fails++;
console.log(`| --${f} | --${b} | **${r.toFixed(2)}:1** | ${min}:1 | ${ok?'PASSE':'ECHEC'} |`);}
console.log('\nechecs :',fails);
process.exitCode=fails?1:0;
