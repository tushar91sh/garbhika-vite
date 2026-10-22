import { useDispatch,useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { closeBookingModal } from '../../features/booking/bookingSlice.js'
import { Modal } from '../../care/ui.jsx'
import BookingWizard from '../../care/Booking.jsx'
export default function BookingModal(){const dispatch=useDispatch(),navigate=useNavigate(),open=useSelector(s=>s.booking.isModalOpen);if(!open)return null;const close=()=>dispatch(closeBookingModal());return <div className="care-root"><Modal title="Book an expert session" close={close}><BookingWizard onDone={()=>{close();navigate('/dashboard/sessions')}}/></Modal></div>}
