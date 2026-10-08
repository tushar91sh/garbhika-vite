import { Routes, Route, Navigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Layout from './components/layout/Layout.jsx'
import BookingModal from './components/forms/BookingModal.jsx'
import Seo from './components/common/Seo.jsx'

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
import PrivacyPolicy from './pages/PrivacyPolicy.jsx'
import TermsOfService from './pages/TermsOfService.jsx'
import NotFound from './pages/NotFound.jsx'

export default function App() {
  return (
    <Layout>
      <Seo />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about-us/" element={<AboutUs />} />
        <Route path="/services/" element={<Services />} />
        <Route path="/services/garbh-sanskar/" element={<GarbhSanskar />} />
        <Route path="/services/pregnancy-yoga/" element={<PregnancyYoga />} />
        <Route path="/services/pregnancy-nutrition/" element={<PregnancyNutrition />} />
        <Route path="/services/psychological-support/" element={<PsychologicalSupport />} />
        <Route path="/services/mental-wellness/" element={<MentalWellness />} />
        <Route path="/services/pregnancy-guidance/" element={<PregnancyGuidance />} />
        <Route path="/experts/" element={<Experts />} />
        <Route path="/pregnancy-journey/" element={<Journey />} />
        <Route path="/community/" element={<Community />} />
        <Route path="/resources/" element={<Resources />} />
        <Route path="/success-stories/" element={<SuccessStories />} />
        <Route path="/faqs/" element={<FAQs />} />
        <Route path="/contact-us/" element={<Contact />} />
        <Route path="/book-consultation/" element={<BookConsultation />} />

        {/* Backward-compat redirects from the previous prototype's routes */}
        <Route path="/journey" element={<Navigate to="/pregnancy-journey/" replace />} />
        <Route path="/contact" element={<Navigate to="/contact-us/" replace />} />
        <Route path="/how-it-works" element={<Navigate to="/services/" replace />} />
        <Route path="/our-support" element={<Navigate to="/services/" replace />} />
        <Route path="/pricing" element={<Navigate to="/book-consultation/" replace />} />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <BookingModal />
      <ToastContainer position="bottom-right" autoClose={4000} newestOnTop />
    </Layout>
  )
}
