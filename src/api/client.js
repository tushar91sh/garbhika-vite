const API_URL=(import.meta.env.VITE_API_URL||'/api').replace(/\/$/,'')
export const TOKEN_KEY='garbhika_token'
let memoryToken=null,refreshing=null
try{localStorage.removeItem(TOKEN_KEY)}catch{}
export const accessToken=()=>memoryToken
export function setSessionToken(token){memoryToken=token||null;try{localStorage.removeItem(TOKEN_KEY)}catch{}}
export class ApiError extends Error{constructor(message,status){super(message);this.status=status}}
async function refresh(){if(!refreshing)refreshing=fetch(API_URL+'/auth/refresh',{method:'POST',credentials:'include',headers:{'Content-Type':'application/json'},body:'{}'}).then(async r=>{const d=await r.json();if(!r.ok)throw new ApiError(d.message||'Session expired.',r.status);setSessionToken(d.token);return d}).finally(()=>{refreshing=null});return refreshing}
export async function api(path,options={}){
 const {body,headers,...rest}=options
 const send=()=>fetch(API_URL+path,{...rest,credentials:'include',headers:{...(body!==undefined?{'Content-Type':'application/json'}:{}),...(memoryToken?{Authorization:'Bearer '+memoryToken}:{}),...headers},...(body!==undefined?{body:JSON.stringify(body)}:{})})
 let response=await send()
 if(response.status===401&&!/^\/auth\/(login|admin\/login|register|refresh|verification)/.test(path)){
   try{await refresh();response=await send()}catch(e){if(e.status===401)window.dispatchEvent(new Event('garbhika:session-expired'));throw e}
 }
 const data=await response.json().catch(()=>({}));if(!response.ok)throw new ApiError(data.message||'Request failed. Please try again.',response.status);return data
}
export const get=path=>api(path)
export const post=(path,body)=>api(path,{method:'POST',body})
export const patch=(path,body)=>api(path,{method:'PATCH',body})
export async function download(path,filename){const data=await api(path);const url=URL.createObjectURL(new Blob([JSON.stringify(data)],{type:'application/json'})),a=document.createElement('a');a.href=url;a.download=filename;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000)}
