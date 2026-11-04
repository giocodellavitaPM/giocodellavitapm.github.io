# v9: più lauree
rep("const lau=(...f)=>s=>s.edu>=3&&f.includes(s.laurea);","const lau=(...f)=>s=>s.edu>=3&&(f.includes(s.laurea)||(s.lauree||[]).some(x=>f.includes(x)));\nfunction lauList(){if(!S||S.edu<3)return [];const L=[...(S.lauree||[])];if(S.laurea&&!L.includes(S.laurea))L.unshift(S.laurea);return L}")
rep("    S.edu=3;S.laurea=u.fac;S.uni=null;add('fel',12);","    S.lauree=lauList();if(!S.lauree.includes(u.fac))S.lauree.push(u.fac);S.edu=3;S.laurea=u.fac;S.uni=null;add('fel',12);")
rep("  choices:()=>Object.entries(FAC).map(([k,f])=>({t:`${f.n} (${f.d} anni)`","  choices:()=>Object.entries(FAC).filter(([k])=>!lauList().includes(k)).map(([k,f])=>({t:`${f.n} (${f.d} anni)`")
rep("ok:()=>!S.uni&&!S.school&&S.edu===2,run:()=>{S.pending='scelta_facolta'","ok:()=>!S.uni&&!S.school&&(S.edu===2||(S.edu>=3&&lauList().length<Object.keys(FAC).length)),run:()=>{S.pending='scelta_facolta'")
rep("   if(S.edu>=3)return `<p class=\"note\">Sei laureat${o()} in ${FAC[S.laurea].n}! 🎓</p>`;",
    "   if(S.edu>=3){const L=lauList();return `<p class=\"note\">Sei laureat${o()} in ${L.map(k=>FAC[k].n).join(', ')}! 🎓${L.length>1?' ('+L.length+' lauree!)':''}</p>`+(L.length<Object.keys(FAC).length?`<p class=\"note\">Vuoi un'altra laurea? Puoi iscriverti di nuovo! 📚</p>`+paBtn('iscriviUni'):'')}")
rep("${S.laurea?' · '+FAC[S.laurea].n:''}</span></div></div>`;","${lauList().length?' · '+lauList().map(k=>FAC[k].n).join(', '):''}</span></div></div>`;")
rep("<span>${S.laurea?FAC[S.laurea].n:S.diploma","<span>${lauList().length>1?lauList().length+' lauree':S.laurea?FAC[S.laurea].n:S.diploma")
