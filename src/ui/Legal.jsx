import React from 'react'
import { UiTag,UiHead,css,routeHref,invoke,connectPage } from './runtime.jsx'
import { adapt,mountBridge,updateBridge,unmountBridge,captureField } from './bridge.js'
import { InlineBookingFields,AuthFields,ExtraView,UiSignOut } from './extras.jsx'
import Footer from './Footer.jsx'
import Navigation from './Navigation.jsx'
class Component extends React.Component {
  state = { doc: (() => { try { return (this.props.doc || new URLSearchParams(window.location.search).get('doc')) === 'terms' ? 'terms' : 'privacy'; } catch (e) { return 'privacy'; } })() };
  renderVals() {
    const D = {
      privacy: { label: 'Privacy Policy', title: 'Privacy Policy', intro: 'Garbhika ("we," "our," "us") respects your privacy. This policy explains what information we collect when you use our website and services, how we use it, and the choices you have.', sections: [
        { h: 'Information We Collect', p: 'We collect information you provide directly — such as your name, email address, and messages sent through our contact and booking forms — along with basic usage data to help us improve the site.' },
        { h: 'How We Use Information', p: 'We use your information to respond to inquiries, schedule sessions with experts, send you requested updates, and improve the Garbhika experience. We do not sell your personal information.' },
        { h: 'Medical Disclaimer', p: 'Garbhika is complementary to clinical care and does not replace medical advice. Any health information shared through the platform is for support purposes only.' },
        { h: 'Contact Us', p: 'Questions about this policy can be sent to', mail: true },
      ] },
      terms: { label: 'Terms of Service', title: 'Terms of Service', intro: '', sections: [
        { h: 'Acceptance of Terms', p: 'By accessing or using Garbhika, you agree to be bound by these Terms of Service. If you do not agree, please do not use our services.' },
        { h: 'Not a Medical Provider', p: 'Garbhika provides holistic wellness coaching, community, and complementary support. We are not a substitute for licensed medical care. Always consult a qualified healthcare provider for medical decisions.' },
        { h: 'Bookings & Memberships', p: 'Sessions booked through Garbhika are subject to expert availability. Membership plans renew automatically unless cancelled prior to the renewal date.' },
        { h: 'Changes to These Terms', p: 'We may update these terms from time to time. Continued use of Garbhika after changes constitutes acceptance of the revised terms.' },
      ] },
    };
    const k = this.state.doc;
    return {
      doc: D[k],
      tabs: Object.keys(D).map(key => ({ label: D[key].label, sel: key === k, bg: key === k ? '#fff' : 'transparent', color: key === k ? '#0f0014' : '#4d444c', go: () => this.setState({ doc: key }) })),
    };
  }
}
class Connected extends Component {
 constructor(props){super(props);this.state=this.state||{}}
 componentDidMount(){super.componentDidMount?.();mountBridge(this,"Legal")}
 componentDidUpdate(prevProps,prevState){updateBridge(this,"Legal",prevProps,prevState)}
 componentWillUnmount(){unmountBridge(this);super.componentWillUnmount?.()}
 render(){const v=adapt(this,this.renderVals(),"Legal");return <div className="zip-ui zip-Legal"><><UiHead title={"Legal — Garbhika"} links={[{"rel": "stylesheet", "href": "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Inter:wght@400;500;600;700&display=swap"}, {"rel": "stylesheet", "href": "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0..1,0&display=swap"}]} css={"*{box-sizing:border-box}body{margin:0;background:#fff7fd;color:#1e1a20;font-family:Inter,sans-serif;-webkit-font-smoothing:antialiased}a{color:#330d3b}a:hover{color:#7a4f80}::selection{background:#330d3b;color:#fff}"}/><Navigation active={""}/><UiTag tag="main" style={css("padding:clamp(130px,14vw,170px) 24px 0")}><UiTag tag="div" style={css("max-width:760px;margin:0 auto")}><UiTag tag="div" role={"tablist"} style={css("display:flex;width:fit-content;padding:4px;margin-bottom:32px;border-radius:999px;background:#f4ebf4")}>{(v.tabs || []).map((t, uiIndex) => <React.Fragment key={t?.id || t?._id || uiIndex}><UiTag tag="button" type={"button"} role={"tab"} aria-selected={t.sel} onClick={event => invoke(this, t.go, event)} style={css(("padding:10px 20px;border:0;border-radius:999px;background:" + String(t.bg ?? "") + ";color:" + String(t.color ?? "") + ";font:inherit;font-size:14px;font-weight:500;cursor:pointer"))}>{t.label}</UiTag></React.Fragment>)}</UiTag><UiTag tag="h1" style={css("margin:0;font-family:'Playfair Display',serif;font-weight:500;font-size:clamp(40px,5vw,56px);line-height:1.08;letter-spacing:-0.02em;color:#0f0014")}>{v.doc.title}</UiTag><UiTag tag="p" style={css("margin:12px 0 40px;font-size:14px;color:#7f747d")}>{"Last updated: August 2026"}</UiTag>{Boolean(v.doc.intro) && <><UiTag tag="p" style={css("margin:0 0 32px;font-size:18px;line-height:1.7;color:#4d444c")}>{v.doc.intro}</UiTag></>}<UiTag tag="div" style={css("display:flex;flex-direction:column;gap:12px")}>{(v.doc.sections || []).map((s, uiIndex) => <React.Fragment key={s?.id || s?._id || uiIndex}><UiTag tag="section" style={css("padding:28px;border-radius:22px;background:#fff;border:1px solid rgba(208,195,205,0.55)")}><UiTag tag="h2" style={css("margin:0 0 10px;font-family:'Playfair Display',serif;font-weight:500;font-size:24px;color:#0f0014")}>{s.h}</UiTag><UiTag tag="p" style={css("margin:0;font-size:16px;line-height:1.7;color:#4d444c")}>{s.p}{Boolean(s.mail) && <><UiTag tag="a" href={routeHref("mailto:hello@garbhika.com")}>{"hello@garbhika.com"}</UiTag>{"."}</>}</UiTag></UiTag></React.Fragment>)}</UiTag></UiTag></UiTag><Footer /></><BridgeStatus logic={this}/></div>}
}
import { BridgeStatus } from './extras.jsx'
export default connectPage(Connected,"Legal")
