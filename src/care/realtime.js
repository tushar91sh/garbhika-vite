import { accessToken,get } from '../api/client.js'
let socket,loading
export async function realtime(){
 if(socket)return socket
 if(!loading)loading=(async()=>{
  await get('/auth/me')
  if(!window.io)await new Promise((resolve,reject)=>{const s=document.createElement('script');s.src='https://cdn.socket.io/4.8.1/socket.io.min.js';s.onload=resolve;s.onerror=reject;document.head.appendChild(s)})
  const api=(import.meta.env.VITE_API_URL||'/api'),origin=api.startsWith('http')?new URL(api).origin:undefined
  socket=window.io(origin,{auth:cb=>cb({token:accessToken()}),withCredentials:true,reconnectionAttempts:5})
  socket.on('connect_error',async()=>{try{await get('/auth/me');socket.auth={token:accessToken()}}catch{}})
  return socket
 })().catch(e=>{loading=null;throw e})
 return loading
}
export function stopRealtime(){socket?.disconnect();socket=null;loading=null}
