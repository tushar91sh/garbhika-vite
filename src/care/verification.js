export const verificationKinds=['identity','degree','registration','insurance']
export const verificationLabels={identity:'Identity',degree:'Degree',registration:'Professional registration',insurance:'Insurance'}

export function documentState(profile,kind,now=Date.now()){
 const doc=(profile?.verification?.documents||[]).filter(d=>d.kind===kind).at(-1)
 if(!doc)return {kind,doc:null,status:'Missing',verified:false}
 const expiry=doc.expiresOn?+new Date(doc.expiresOn+'T23:59:59.999+05:30'):doc.expiresAt?+new Date(doc.expiresAt):null
 const invalid=expiry!==null&&!Number.isFinite(expiry),expired=expiry!==null&&expiry<now
 const missingExpiry=['registration','insurance'].includes(kind)&&expiry===null
 const status=invalid?'Invalid expiry':expired?'Expired':missingExpiry?'Expiry date required':doc.status==='verified'?'Verified':doc.status==='rejected'?'Rejected':'Pending review'
 return {kind,doc,status,verified:status==='Verified',expiryLabel:doc.expiresOn||doc.expiresAt?.slice(0,10)||''}
}

export function approvalState(profile,checks=[],now=Date.now()){
 const documents=Object.fromEntries(verificationKinds.map(kind=>[kind,documentState(profile,kind,now)]))
 const blockers=[]
 if(!profile)blockers.push('Select an application.')
 if(profile?.verification?.status==='draft')blockers.push('The expert must submit the completed application.')
 if(profile?.verification?.documentPolicyVersion===2)for(const kind of verificationKinds){const item=documents[kind];if(!item.verified)blockers.push(verificationLabels[kind]+': '+item.status.toLowerCase()+'.')}
 if(checks.length!==5||!checks.every(x=>x===true))blockers.push('Complete all five manual checklist checks.')
 return {documents,blockers,canApprove:blockers.length===0}
}

export function checklistRows(profile,checks=[],toggle,now=Date.now()){
 const labels=['Identity (Aadhaar / PAN)','Degree certificate','Professional registration','Clinical interview','Insurance & agreement']
 const kinds=['identity','degree','registration',null,'insurance']
 return labels.map((label,i)=>{
  const item=kinds[i]?documentState(profile,kinds[i],now):null
  const checked=checks[i]===true,verified=!item||item.verified
  return {label,doc:item?[item.doc?.name||'No document uploaded',item.status,item.expiryLabel?'Expires '+item.expiryLabel+' IST':'',checked?'Manual check ticked':'Manual check not ticked'].filter(Boolean).join(' · '):checked?'Interview check completed':'Manual interview check required',icon:checked&&verified?'check_circle':checked?'schedule':'radio_button_unchecked',color:checked&&verified?'#1b7a4b':'#9a5b00',toggle:()=>toggle(i)}
 })
}
