/* ===== v9: guida col mouse anche nella vista 3D da dietro: mouse a destra = giri a destra, mouse a sinistra = giri a sinistra ===== */
{const _ci9m=carInput;carInput=function(){const v=_ci9m();try{
  if(!ui.mouseDrive||!ui.pedMode||!ui.mAim||!carNow9()||typeof tdActive!=='function'||!tdActive())return v;
  if(inputDir())return v; // le freccette vincono sempre
  const st=S.drive&&S.drive.man?S.drive:ui.car;if(!st)return v;
  let o=(ui.mAim.x-innerWidth/2)/(innerWidth/2);o=Math.max(-1,Math.min(1,o));if(Math.abs(o)<.08)o=0;
  const a=(st.ang||0)+o*1.1;return [Math.cos(a),Math.sin(a)]}catch(e){return v}}}
// il messaggio spiega anche le freccette e il touchpad
setInterval(()=>{try{if(carNow9()&&ui.mHint===1&&matchMedia('(pointer:fine)').matches){ui.mHint=2;setTimeout(()=>toast('🖱️ Tasto DESTRO accelera, SINISTRO rallenta. Giri con il mouse o con le freccette. Col touchpad: premi con due dita per accelerare.'),1500)}}catch(e){}},700);
