import {useSelector} from 'react-redux'
import {Navigate} from 'react-router-dom'
import MotherDashboard from './MotherDashboard.jsx'
import ExpertDashboard from './ExpertDashboard.jsx'
import AdminDashboard from './AdminDashboard.jsx'
export default function Dashboard(){const user=useSelector(s=>s.auth.user);if(!user)return <Navigate to="/login" replace/>;if(['admin','superadmin'].includes(user.role))return <AdminDashboard/>;return user.role==='expert'?<ExpertDashboard/>:<MotherDashboard/>}
