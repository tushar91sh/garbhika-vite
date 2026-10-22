import React,{createContext,useContext,useEffect,useMemo,useState} from 'react'
import {useSelector} from 'react-redux'
import {patch} from '../api/client.js'
import {languages} from './languages.js'
import {translate} from './translate.js'
import './locale.css'
import './fonts.css'
const Context=createContext({locale:'en',t:x=>x})
function stored(){try{const c=localStorage.getItem('garbhika_locale');return languages.some(l=>l.code===c)?c:'en'}catch{return 'en'}}
export function LocaleProvider({children}){
 const [locale,setLocale]=useState(stored),[error,setError]=useState(''),[open,setOpen]=useState(false),user=useSelector(s=>s.auth.user)
 useEffect(()=>{if(user?.interfaceLanguage&&languages.some(l=>l.code===user.interfaceLanguage))setLocale(user.interfaceLanguage)},[user?.id,user?.interfaceLanguage])
 useEffect(()=>{const language=languages.find(l=>l.code===locale);document.documentElement.lang=locale;document.documentElement.dir=language?.dir||'ltr';try{localStorage.setItem('garbhika_locale',locale)}catch{}},[locale])
 const value=useMemo(()=>({locale,t:text=>translate(text,locale)}),[locale])
 async function change(code){setLocale(code);setError('');if(user)try{await patch('/me/interface-language',{language:code})}catch(e){setError('Language saved on this device. Account preference could not be synced.')}}
 return <Context.Provider value={value}>{children}<div className="language-control" translate="no"><button type="button" aria-expanded={open} aria-controls="language-panel" onClick={()=>setOpen(v=>!v)}>{value.t('Language')} · {languages.find(l=>l.code===locale)?.native}</button>{open&&<section id="language-panel" aria-label="Interface language"><label htmlFor="interface-language">{value.t('Language')}</label><select id="interface-language" value={locale} onChange={e=>change(e.target.value)}>{languages.map(l=><option key={l.code} value={l.code} lang={l.code}>{l.native} — {l.name}</option>)}</select><button type="button" onClick={()=>setOpen(false)}>{value.t('Close')}</button><p>Navigation and common controls are translated. Other content stays in its original language.</p>{error&&<p role="status">{error}</p>}</section>}</div></Context.Provider>
}
export const useLocale=()=>useContext(Context)
export function translateChildren(children,t){return React.Children.map(children,c=>typeof c==='string'?t(c):c)}
export function L({as='span',children,...props}){const {t}=useLocale();const extra={...props};for(const key of ['title','aria-label','placeholder'])if(typeof extra[key]==='string')extra[key]=t(extra[key]);if(as==='option'&&extra.value===undefined&&typeof children==='string')extra.value=children;return React.createElement(as,extra,props.translate==='no'?children:translateChildren(children,t))}
export function T({children}){const {t}=useLocale();return <>{translateChildren(children,t)}</>}
