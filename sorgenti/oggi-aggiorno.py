#!/usr/bin/env python3
"""Dice se oggi va fatto l'aggiornamento. Uso: python3 oggi-aggiorno.py gioco|account
Legge config/aggiornamenti da Firebase (lo cambia Daniela nell'app account, sezione 🔄 Aggiornamenti).
Stampa SI o NO (e il motivo). Se Firebase non risponde usa i valori di partenza."""
import sys,json,urllib.request,datetime
try:
  from zoneinfo import ZoneInfo;oggi=datetime.datetime.now(ZoneInfo('Europe/Rome')).date()
except Exception:oggi=datetime.date.today()
k=sys.argv[1] if len(sys.argv)>1 else 'gioco'
c={'gioco':{'ogni':5,'da':'2026-11-10','on':True},'account':{'ogni':20,'da':'2026-11-23','on':True}}[k]
KEY='AIzaSyBJRUlGK_ArYn2K_pJ0ePChTUC3gkikwgY'
try:
  u='https://firestore.googleapis.com/v1/projects/gioco-della-vita-pm/databases/(default)/documents/config/aggiornamenti?key='+KEY
  f=json.load(urllib.request.urlopen(u,timeout=20))['fields'][k]['mapValue']['fields']
  c={'ogni':int(f['ogni'].get('integerValue',f['ogni'].get('doubleValue',c['ogni']))),'da':f['da']['stringValue'],'on':f.get('on',{}).get('booleanValue',True)};src='Firebase'
except Exception as e:src='valori di partenza ('+type(e).__name__+')'
da=datetime.date.fromisoformat(c['da']);o=max(1,c['ogni']);d=(oggi-da).days
si=c['on'] and d>=0 and d%o==0
print(('SI' if si else 'NO')+f" — {k}: ogni {o} giorni dal {da}, attivo={c['on']}, oggi {oggi} [{src}]")
