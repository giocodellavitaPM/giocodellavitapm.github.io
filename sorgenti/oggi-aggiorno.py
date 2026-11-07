#!/usr/bin/env python3
"""Dice se oggi va fatto l'aggiornamento. Uso: python3 oggi-aggiorno.py gioco|account|calcio
Legge config/aggiornamenti da Firebase (lo cambia Daniela nell'app account, sezione 🔄 Aggiornamenti).
Tipi: 'sett' (gg = giorno della settimana, 0=domenica), 'mese' (gm = giorni del mese, es. [3,23]), 'ogni' (ogni N giorni dal giorno 'da').
Stampa SI o NO e il motivo. Se Firebase non risponde usa i valori di partenza."""
import sys,json,urllib.request,datetime,calendar
try:
  from zoneinfo import ZoneInfo;oggi=datetime.datetime.now(ZoneInfo('Europe/Rome')).date()
except Exception:oggi=datetime.date.today()
if len(sys.argv)>2:oggi=datetime.date.fromisoformat(sys.argv[2])
k=sys.argv[1] if len(sys.argv)>1 else 'gioco'
c={'gioco':{'tipo':'sett','gg':0,'gm':[1],'ogni':7,'da':'2026-11-08','ora':'10:00','on':True},'account':{'tipo':'mese','gm':[3,23],'gg':0,'ogni':20,'da':'2026-11-23','ora':'9:43','on':True},'calcio':{'tipo':'sett','gg':6,'gm':[1],'ogni':7,'da':'2026-11-14','ora':'10:00','on':False}}[k]
KEY='AIzaSyBJRUlGK_ArYn2K_pJ0ePChTUC3gkikwgY'
def val(v):
  if 'integerValue' in v:return int(v['integerValue'])
  if 'doubleValue' in v:return float(v['doubleValue'])
  if 'stringValue' in v:return v['stringValue']
  if 'booleanValue' in v:return v['booleanValue']
  if 'arrayValue' in v:return [val(x) for x in v['arrayValue'].get('values',[])]
  return None
try:
  u='https://firestore.googleapis.com/v1/projects/gioco-della-vita-pm/databases/(default)/documents/config/aggiornamenti?key='+KEY
  f=json.load(urllib.request.urlopen(u,timeout=20))['fields'][k]['mapValue']['fields']
  for x,v in f.items():c[x]=val(v)
  src='Firebase'
except Exception as e:src='valori di partenza ('+type(e).__name__+')'
si=False
if c.get('on',True):
  if c['tipo']=='sett':si=(oggi.isoweekday()%7)==int(c['gg'])
  elif c['tipo']=='mese':
    fine=calendar.monthrange(oggi.year,oggi.month)[1];si=any(min(int(g),fine)==oggi.day for g in c['gm'])
  else:
    d=(oggi-datetime.date.fromisoformat(c['da'])).days;si=d>=0 and d%max(1,int(c['ogni']))==0
print(('SI' if si else 'NO')+f" — {k}: {c['tipo']} gg={c.get('gg')} gm={c.get('gm')} ogni={c.get('ogni')} da={c.get('da')} ora={c.get('ora')} attivo={c.get('on')}, oggi {oggi} [{src}]")
