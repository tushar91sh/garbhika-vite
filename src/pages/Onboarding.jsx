import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { MotherProfile } from '../care/Mother.jsx'
import '../care/care.css'
export default function Onboarding(){const navigate=useNavigate(),user=useSelector(s=>s.auth.user);if(user?.role==='expert')return <Navigate to="/expert" replace/>;if(['admin','superadmin'].includes(user?.role))return <Navigate to="/admin" replace/>;return <section className="care-root care-public"><h1>Personalize your journey</h1><p>Tell us your stage and choose how you want to share information with your care team.</p><MotherProfile onSaved={()=>navigate('/dashboard',{replace:true})}/></section>}
