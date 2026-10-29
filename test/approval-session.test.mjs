import {test} from 'node:test'
import assert from 'node:assert/strict'
import {readFile} from 'node:fs/promises'
import {createAsyncThunk,createSlice,configureStore} from '@reduxjs/toolkit'

async function sessionFixture(){
 const raw=await readFile(new URL('../src/features/auth/authSlice.js',import.meta.url),'utf8')
 const source=raw.replace(/^import .*\n/gm,'').replace(/export default slice.reducer/,'').replace(/\bexport /g,'')
 const pending={id:'expert-1',role:'expert',name:'Test Expert',status:'pending'}
 const values=new Map([['garbhika_user',JSON.stringify(pending)]])
 let resolve, reject
 const api=()=>new Promise((ok,bad)=>{resolve=ok;reject=bad})
 const storage={getItem:k=>values.get(k),setItem:(k,v)=>values.set(k,v),removeItem:k=>values.delete(k)}
 const module=new Function('createAsyncThunk','createSlice','get','post','setSessionToken','localStorage',source+'\nreturn {reducer:slice.reducer,syncSession,logout};')(createAsyncThunk,createSlice,api,api,()=>{},storage)
 const store=configureStore({reducer:{auth:module.reducer}})
 return {store,...module,resolve:value=>resolve(value),reject:error=>reject(error),values}
}
test('background approval refresh unlocks account without changing checked or dropping session',async()=>{
 const f=await sessionFixture()
 // Initial page-load validation has completed before background polling starts.
 f.store.dispatch({type:'auth/me/fulfilled',payload:{id:'expert-1',role:'expert',status:'pending'}})
 const task=f.store.dispatch(f.syncSession())
 assert.equal(f.store.getState().auth.checked,true)
 f.resolve({user:{id:'expert-1',role:'expert',status:'active'}})
 await task.unwrap()
 assert.equal(f.store.getState().auth.checked,true)
 assert.equal(f.store.getState().auth.user.status,'active')
 assert.equal(JSON.parse(f.values.get('garbhika_user')).status,'active')
})
test('temporary refresh failure preserves expert session; 401 revokes it',async()=>{
 const f=await sessionFixture()
 let task=f.store.dispatch(f.syncSession());f.reject(Object.assign(new Error('Offline'),{status:503}));await task
 assert.equal(f.store.getState().auth.user.status,'pending')
 task=f.store.dispatch(f.syncSession());f.reject(Object.assign(new Error('Expired'),{status:401}));await task
 assert.equal(f.store.getState().auth.user,null)
 assert.equal(f.values.has('garbhika_user'),false)
})
test('approval status change reloads protected dashboard data while retaining unsaved state',async()=>{
 const raw=await readFile(new URL('../src/ui/bridge.js',import.meta.url),'utf8')
 const source=raw.replace(/^import .*\n/gm,'').replace(/\bexport /g,'')
 const called=[]
 const bridge=new Function('get',source+'\nreturn {updateBridge};')(async path=>{called.push(path);return {items:[]}})
 const before={user:{role:'expert',status:'pending'},location:{pathname:'/expert/profile'}}
 const state={view:'profile',_data:{},draft:'Unsent message',_alive:true}
 const c={props:{...before,user:{role:'expert',status:'active'}},state,_alive:true,setState(value){Object.assign(this.state,typeof value==='function'?value(this.state):value)}}
 bridge.updateBridge(c,'Expert Dashboard',before,{...state})
 await new Promise(resolve=>setImmediate(resolve))
 assert.ok(called.includes('/care/bookings?limit=100'))
 assert.equal(c.state.draft,'Unsent message')
})
