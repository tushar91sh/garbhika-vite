import {useState} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {Link,useNavigate} from 'react-router-dom'
import {loginUser} from '../features/auth/authSlice.js'
import {post} from '../api/client.js'
import {Card,Field,ActionForm,Status,useData} from './ui.jsx'
import {CredentialDocuments} from './AdvancedCare.jsx'

const labels={identity:'Identity document (Aadhaar / PAN)',degree:'Degree certificate',registration:'Professional registration',insurance:'Professional insurance'}
const names={draft:'Complete your application',pending:'Pending admin review',more_info:'More information requested',rejected:'Changes needed before resubmission',approved:'Approved'}

export function ExpertApplication(){
 const user=useSelector(s=>s.auth.user),dispatch=useDispatch(),navigate=useNavigate()
 const [busy,setBusy]=useState(false),[error,setError]=useState(''),[saved,setSaved]=useState(false)
 async function save(e){
  e.preventDefault();if(busy)return
  const f=new FormData(e.currentTarget);setBusy(true);setError('')
  try{
   await post('/expert/apply',{name:f.get('name'),email:f.get('email'),password:f.get('password'),registration:f.get('registration'),yearsExp:Number(f.get('yearsExp')),city:f.get('city'),languages:String(f.get('languages')).split(',').map(x=>x.trim()).filter(Boolean),headline:f.get('headline'),bio:f.get('bio'),acceptTerms:f.get('acceptTerms')==='on'})
   setSaved(true)
   await dispatch(loginUser({email:f.get('email'),password:f.get('password')})).unwrap()
   navigate('/join-as-expert')
  }catch(e){setError(e.message||'Could not continue. Please try again.')}finally{setBusy(false)}
 }
 return <div className="care-root care-public"><Card title="Become a Garbhika expert">
  <p><strong>1. Professional details → 2. Required documents → 3. Submit for review</strong></p>
  <p>You need identity proof, a degree certificate, professional registration and insurance. Registration and insurance must have valid expiry dates. Files: PDF, JPG or PNG, up to 10 MB each.</p>
  <p>Saving details creates your account. Your application reaches the admin review queue after you upload the documents and submit it.</p>
  {user?(user.role==='expert'?<><p>Your account details are saved. Complete the document and submission steps below. <Link to="/expert/profile">Open expert profile</Link></p><ApplicationPanel/></>:<p>You are signed in with a {user.role} account. Sign out before creating a separate expert account.</p>):saved?<div role="status"><p>Your details are saved. Sign in with the email and password you just entered to finish the document step.</p><Link to="/login">Sign in to continue</Link></div>:<form className="care-form" onSubmit={save}>
   <div className="care-grid"><Field label="Full name" name="name" required minLength={2}/><Field label="Email" name="email" type="email" required/><Field label="Password" name="password" type="password" required minLength={8} autoComplete="new-password"/><Field label="Professional role / headline" name="headline" required/><Field label="Registration body and number" name="registration" required minLength={3}/><Field label="Years of experience" name="yearsExp" type="number" min={0} step={1} required/><Field label="City" name="city" required/><Field label="Languages (comma separated)" name="languages" required/></div>
   <Field label="Professional background"><textarea name="bio" maxLength={2000}/></Field>
   <label><input name="acceptTerms" type="checkbox" required/> I accept the <Link to="/terms-of-service">expert terms</Link> and <Link to="/privacy-policy">privacy policy</Link>.</label>
   <button className="primary" disabled={busy}>{busy?'Saving details…':'Save details & continue to documents'}</button>
  </form>}
  {error&&<p role="alert" className="care-error">{error}</p>}
  {!user&&!saved&&<p>Already started? <Link to="/login">Sign in to continue your application</Link>.</p>}
 </Card></div>
}

export function ApplicationPanel(){
 const r=useData('/expert/profile/application')
 return <Status resource={r}>{d=>d.status==='approved'?<CredentialDocuments/>:<Card title={names[d.status]||'Expert application'}>
  <p><strong>Step 2: Upload all four required documents. Step 3: Submit for review.</strong></p>
  {d.reason&&<p role="status" className="care-warning">Admin feedback: {d.reason}</p>}
  {d.status==='pending'&&d.submittedAt?<p role="status">Your application has been submitted and is pending admin review. Uploading a replacement returns it to draft; submit again when finished.</p>:<p>Your application needs a final submission before admin review. You can leave and return here after signing in.</p>}
  <div className="care-stack">{d.checklist.map(item=><ApplicationUpload key={item.kind} item={item} onDone={r.reload}/>)}</div>
  <h3>Step 3: Submit application</h3>
  <p>{d.checklist.every(x=>x.ready)?'All required documents are uploaded. The administrator will verify them after submission.':'Upload or replace the missing, rejected or expired documents listed above.'}</p>
  {!(d.status==='pending'&&d.submittedAt)&&<SubmitApplication ready={d.checklist.every(x=>x.ready)} onDone={r.reload}/>}
 </Card>}</Status>
}

function SubmitApplication({ready,onDone}){
 const [busy,setBusy]=useState(false),[error,setError]=useState('')
 return <><button type="button" className="primary" disabled={!ready||busy} onClick={async()=>{setBusy(true);setError('');try{await post('/expert/profile/application/submit',{});onDone()}catch(e){setError(e.message)}finally{setBusy(false)}}}>{busy?'Submitting…':'Submit application for admin review'}</button>{error&&<p role="alert" className="care-error">{error}</p>}</>
}

function ApplicationUpload({item,onDone}){
 const [file,setFile]=useState(null)
 async function upload(f){
  if(!file)throw new Error('Choose a document first.')
  if(!['application/pdf','image/jpeg','image/png'].includes(file.type)||file.size<1||file.size>10*1024*1024)throw new Error('Choose a PDF, JPG or PNG between 1 byte and 10 MB.')
  const base64=await new Promise((resolve,reject)=>{const reader=new FileReader();reader.onload=()=>resolve(String(reader.result).split(',')[1]);reader.onerror=()=>reject(new Error('Could not read the file.'));reader.readAsDataURL(file)})
  const uploaded=await post('/care/documents',{name:file.name,mime:file.type,base64})
  await post('/expert/profile/credentials',{documentId:uploaded.document._id,kind:item.kind,expiresOn:f.get('expiresOn')||null})
 }
 return <section className="care-card"><h3>{labels[item.kind]}</h3><p><strong>Status: {item.status}</strong>{item.name?' · '+item.name:''}{item.expiresOn?' · Expires '+item.expiresOn:''}</p>{item.reason&&<p className="care-warning">Admin feedback: {item.reason}</p>}
  <ActionForm label={item.documentId?'Upload replacement':'Upload document'} onSubmit={upload} onDone={onDone}>
   <Field label={labels[item.kind]+' file (PDF/JPG/PNG, max 10 MB)'} type="file" accept="application/pdf,image/jpeg,image/png" required onChange={e=>setFile(e.target.files?.[0]||null)}/>
   {['registration','insurance'].includes(item.kind)&&<Field label={labels[item.kind]+' expiry date'} name="expiresOn" type="date" min={new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Kolkata',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date())} required/>}
  </ActionForm>
 </section>
}
