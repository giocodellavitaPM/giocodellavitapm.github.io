/* ================= v9: grafica più realistica: terra con chiazze e erba viva, cielo più profondo, colori da film ================= */
// macchie grandi e morbide (per non avere prati e marciapiedi tutti uguali)
function tdMacroTex(){if(TD.macroT)return TD.macroT;const N=256,[c,g]=tdCan(N,N),r=seeded(4242);g.fillStyle='#777';g.fillRect(0,0,N,N);
  for(let i=0;i<70;i++){const x=r()*N,y=r()*N,R=12+r()*46,v=r()<.5?0:255;for(const [dx,dy] of [[0,0],[N,0],[-N,0],[0,N],[0,-N],[N,N],[-N,-N],[N,-N],[-N,N]]){const rg=g.createRadialGradient(x+dx,y+dy,0,x+dx,y+dy,R);rg.addColorStop(0,`rgba(${v},${v},${v},.22)`);rg.addColorStop(1,`rgba(${v},${v},${v},0)`);g.fillStyle=rg;g.fillRect(x+dx-R,y+dy-R,R*2,R*2)}}
  const t=new THREE.CanvasTexture(c);t.wrapS=t.wrapT=THREE.RepeatWrapping;return TD.macroT=t}
{const _g=tdGrain;tdGrain=function(m){_g(m);const ob=m.onBeforeCompile,mt=tdMacroTex();m.customProgramCacheKey=()=>'grain9r';
  m.onBeforeCompile=sh=>{ob(sh);sh.uniforms.macroT={value:mt};sh.fragmentShader=sh.fragmentShader.replace('uniform sampler2D grainT;','uniform sampler2D grainT;\nuniform sampler2D macroT;').replace('#include <roughnessmap_fragment>',`#include <roughnessmap_fragment>
  {vec2 wu=vUv*16.;float q1r=texture2D(macroT,wu*.06).r,q2r=texture2D(macroT,wu*.021+.37).r;float mac=mix(.88,1.1,smoothstep(.3,.62,q1r*.6+q2r*.4));
   vec3 cc=diffuseColor.rgb;float gre=smoothstep(.015,.07,cc.g-max(cc.r,cc.b));
   float bl=texture2D(grainT,vec2(wu.x*7.,wu.y*1.6)).r,bl2=texture2D(grainT,vec2(wu.y*5.3,wu.x*1.3)+.21).r;
   vec3 gc=mix(cc*vec3(.8,1.04,.84),cc*vec3(1.16,1.06,.74),smoothstep(.36,.62,q2r))*mix(.78,1.22,bl*.55+bl2*.45);
   diffuseColor.rgb=mix(cc*mac,gc*mix(.92,1.06,q1r),gre*.9);
   roughnessFactor=min(1.,roughnessFactor+gre*.15);}`)}}}
// cielo più profondo: blu intenso in alto, chiaro all'orizzonte
{const _s=tdSky;tdSky=function(sc){const m=_s(sc);try{const img=m.material.map.image,g=img.getContext('2d'),gr=g.createLinearGradient(0,0,0,256);
  gr.addColorStop(0,'rgba(22,82,178,.85)');gr.addColorStop(.45,'rgba(60,130,214,.45)');gr.addColorStop(.8,'rgba(150,196,236,0)');g.globalCompositeOperation='multiply';g.fillStyle=gr;g.fillRect(0,0,img.width,256);g.globalCompositeOperation='source-over';m.material.map.needsUpdate=true}catch(e){}return m}}
// colori da film: un po' più di contrasto, luci calde e ombre fredde
{const _p=tdPostInit;tdPostInit=function(){const r=_p.apply(this,arguments);try{const f=TD.pp&&TD.pp.fin;if(f&&!f.userData.r9){f.userData.r9=1;
  f.fragmentShader=f.fragmentShader.replace('c=(c-.5)*1.13+.5;','c=(c-.5)*1.16+.5;c+=vec3(.022,.008,-.018)*smoothstep(.45,1.,l)+vec3(-.012,.0,.016)*(1.-smoothstep(.0,.4,l));');f.needsUpdate=true}}catch(e){}return r}}
