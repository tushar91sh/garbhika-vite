import {test} from 'node:test'
import assert from 'node:assert/strict'
import {approvalState,checklistRows} from '../src/care/verification.js'
const now=Date.parse('2030-01-01T12:00:00Z'),checks=[true,true,true,true,true]
const profile=()=>({verification:{status:'pending',documentPolicyVersion:2,documents:['insurance','degree','identity','registration'].map(kind=>({kind,name:kind+'.pdf',status:'verified',expiresOn:['insurance','registration'].includes(kind)?'2030-01-02':null}))}})
test('documents map by kind, with no file attached to clinical interview',()=>{
 const rows=checklistRows(profile(),checks,()=>{},now)
 assert.match(rows[0].doc,/identity.pdf/);assert.match(rows[1].doc,/degree.pdf/);assert.match(rows[2].doc,/registration.pdf/);assert.match(rows[4].doc,/insurance.pdf/);assert.equal(rows[3].doc,'Interview check completed')
})
test('manual green checks cannot enable approval for pending or missing documents',()=>{
 const p=profile();p.verification.documents[0].status='pending'
 assert.equal(approvalState(p,checks,now).canApprove,false);assert.match(approvalState(p,checks,now).blockers.join(' '),/Insurance: pending review/)
 assert.equal(checklistRows(p,checks,()=>{},now)[4].icon,'schedule')
 p.verification.documents=p.verification.documents.filter(x=>x.kind!=='identity')
 assert.match(approvalState(p,checks,now).blockers.join(' '),/Identity: missing/)
})
test('latest replacement overrides a previously verified document',()=>{
 const p=profile();p.verification.documents.push({kind:'degree',name:'replacement.pdf',status:'rejected'})
 assert.equal(approvalState(p,checks,now).canApprove,false);assert.match(checklistRows(p,checks,()=>{},now)[1].doc,/replacement.pdf · Rejected/)
})
test('registration expiry remains valid through end of the day in IST',()=>{
 const p=profile();assert.equal(approvalState(p,checks,Date.parse('2030-01-02T18:29:59.999Z')).canApprove,true)
 assert.equal(approvalState(p,checks,Date.parse('2030-01-02T18:30:00Z')).canApprove,false)
 p.verification.documents.find(x=>x.kind==='insurance').expiresOn=null
 assert.match(approvalState(p,checks,now).blockers.join(' '),/expiry date required/)
})
test('approval requires five explicit manual checks and a submitted application',()=>{
 assert.equal(approvalState(profile(),checks,now).canApprove,true)
 assert.equal(approvalState(profile(),checks.slice(1),now).canApprove,false)
 const p=profile();p.verification.status='draft';assert.equal(approvalState(p,checks,now).canApprove,false)
})
test('refreshed verification changes eligibility without altering manual checklist state',()=>{
 const p=profile();p.verification.documents[0].status='pending';assert.equal(approvalState(p,checks,now).canApprove,false)
 p.verification.documents[0].status='verified';assert.equal(approvalState(p,checks,now).canApprove,true)
 assert.deepEqual(checks,[true,true,true,true,true])
})
