import { useEffect } from 'react'
import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
  Link,
} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Layout from './components/layout/Layout.jsx'
import BookingModal from './components/forms/BookingModal.jsx'
import Seo from './components/common/Seo.jsx'
import {
  RequireAdmin,
  RequireAuth,
  GuestOnly,
} from './components/routing/Guards.jsx'
import { fetchMe, logout } from './features/auth/authSlice.js'

import VerifyEmail from './pages/VerifyEmail.jsx'
import Onboarding from './pages/Onboarding.jsx'
import Home from './pages/Home.jsx'
import AboutUs from './pages/AboutUs.jsx'
import Services from './pages/Services.jsx'
import GarbhSanskar from './pages/services/GarbhSanskar.jsx'
import PregnancyYoga from './pages/services/PregnancyYoga.jsx'
import PregnancyNutrition from './pages/services/PregnancyNutrition.jsx'
import PsychologicalSupport from './pages/services/PsychologicalSupport.jsx'
import MentalWellness from './pages/services/MentalWellness.jsx'
import PregnancyGuidance from './pages/services/PregnancyGuidance.jsx'
import Experts from './pages/Experts.jsx'
import Journey from './pages/Journey.jsx'
import Community from './pages/Community.jsx'
import Resources from './pages/Resources.jsx'
import SuccessStories from './pages/SuccessStories.jsx'
import FAQs from './pages/FAQs.jsx'
import Contact from './pages/Contact.jsx'
import BookConsultation from './pages/BookConsultation.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import ForgotPassword from './pages/ForgotPassword.jsx'
import ResetPassword from './pages/ResetPassword.jsx'
import Unsubscribe from './pages/Unsubscribe.jsx'
import CustomerDashboard from './pages/dashboard/CustomerDashboard.jsx'
import AdminDashboard from './pages/admin/AdminDashboard.jsx'
import PrivacyPolicy from './pages/PrivacyPolicy.jsx'
import TermsOfService from './pages/TermsOfService.jsx'
import NotFound from './pages/NotFound.jsx'

// Keeps the signed-in user current and signs out when the API reports an expired session.
function SessionWatcher() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector((state) => state.auth.user)

  useEffect(() => {
    if (user) dispatch(fetchMe())
    // Only check once per page load; the user object is refreshed by fetchMe.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const expired = () => {
      dispatch(logout())
      navigate(
        window.location.pathname.startsWith('/admin')
          ? '/admin/login'
          : '/login',
        { replace: true },
      )
    }
    window.addEventListener('garbhika:session-expired', expired)
    return () => window.removeEventListener('garbhika:session-expired', expired)
  }, [dispatch, navigate])

  return null
}

function RouteLayout({ children }) {
  const { pathname } = useLocation()
  const dashboard =
    /^\/(admin|dashboard)(\/|$)/.test(pathname) &&
    pathname !== '/admin/login' &&
    pathname !== '/admin/login/'
  const auth =
    /^\/(login|signup|verify-email|forgot-password|reset-password|onboarding)(\/|$)/.test(
      pathname,
    ) || /^\/admin\/login\/?$/.test(pathname)
  if (dashboard) return <>{children}</>
  if (auth)
    return (
      <div className="min-h-screen bg-[#fcf8fd]">
        <header className="mx-auto flex max-w-[1100px] items-center justify-between px-6 py-5">
          <Link
            to="/"
            className="flex items-center gap-3 text-[#330d3b] no-underline"
          >
            <span
              aria-hidden="true"
              className="material-symbols-outlined rounded-xl bg-[#330d3b] p-2 text-white"
            >
              spa
            </span>
            <span className="font-serif text-2xl font-semibold">Garbhika</span>
          </Link>
          <Link to="/" className="text-sm text-[#75577f] underline">
            Back to website
          </Link>
        </header>
        {children}
      </div>
    )
  return <Layout>{children}</Layout>
}
export default function App() {
  return (
    <RouteLayout>
      <Seo />
      <SessionWatcher />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about-us/" element={<AboutUs />} />
        <Route path="/services/" element={<Services />} />
        <Route path="/services/garbh-sanskar/" element={<GarbhSanskar />} />
        <Route path="/services/pregnancy-yoga/" element={<PregnancyYoga />} />
        <Route
          path="/services/pregnancy-nutrition/"
          element={<PregnancyNutrition />}
        />
        <Route
          path="/services/psychological-support/"
          element={<PsychologicalSupport />}
        />
        <Route path="/services/mental-wellness/" element={<MentalWellness />} />
        <Route
          path="/services/pregnancy-guidance/"
          element={<PregnancyGuidance />}
        />
        <Route path="/experts/" element={<Experts />} />
        <Route path="/pregnancy-journey/" element={<Journey />} />
        <Route path="/community/" element={<Community />} />
        <Route path="/resources/" element={<Resources />} />
        <Route path="/success-stories/" element={<SuccessStories />} />
        <Route path="/faqs/" element={<FAQs />} />
        <Route path="/contact-us/" element={<Contact />} />
        <Route path="/book-consultation/" element={<BookConsultation />} />

        {/* Backward-compat redirects from the previous prototype's routes */}
        <Route
          path="/journey"
          element={<Navigate to="/pregnancy-journey/" replace />}
        />
        <Route
          path="/contact"
          element={<Navigate to="/contact-us/" replace />}
        />
        <Route
          path="/how-it-works"
          element={<Navigate to="/services/" replace />}
        />
        <Route
          path="/our-support"
          element={<Navigate to="/services/" replace />}
        />
        <Route
          path="/pricing"
          element={<Navigate to="/book-consultation/" replace />}
        />

        <Route
          path="/verify-email"
          element={
            <GuestOnly>
              <VerifyEmail />
            </GuestOnly>
          }
        />
        <Route
          path="/admin/login"
          element={
            <GuestOnly>
              <Login admin />
            </GuestOnly>
          }
        />
        <Route
          path="/onboarding"
          element={
            <RequireAuth>
              <Onboarding />
            </RequireAuth>
          }
        />
        <Route
          path="/login"
          element={
            <GuestOnly>
              <Login />
            </GuestOnly>
          }
        />
        <Route
          path="/signup"
          element={
            <GuestOnly>
              <Signup />
            </GuestOnly>
          }
        />
        <Route
          path="/forgot-password"
          element={
            <GuestOnly>
              <ForgotPassword />
            </GuestOnly>
          }
        />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/newsletter/unsubscribe" element={<Unsubscribe />} />

        <Route
          path="/dashboard/*"
          element={
            <RequireAuth>
              <CustomerDashboard />
            </RequireAuth>
          }
        />
        <Route
          path="/admin/*"
          element={
            <RequireAdmin>
              <AdminDashboard />
            </RequireAdmin>
          }
        />

        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <BookingModal />
      <ToastContainer position="bottom-right" autoClose={4000} newestOnTop />
    </RouteLayout>
  )
}
