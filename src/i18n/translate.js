import {catalog} from './catalog.js'
export {languages} from './languages.js'
// Exact UI phrases only: never machine-translate messages, health notes or names.
const aliases={
 'Home page':'Home','About us':'About','About Us':'About','Contact us':'Contact','Contact Us':'Contact','Contact us →':'Contact',
 'Log in / Sign up':'Log in','Login':'Log in','Sign in':'Log in','Log out':'Sign out','Sign Out':'Sign out','Full name':'Name','Your name':'Name','Email address':'Email','Email Address':'Email','Your email':'Email','Mobile number':'Phone',
 'Book a Session':'Book a session','Book a consultation':'Book a session','Book a Consultation':'Book a session','Book consultation':'Book a session',
 'Your sessions':'Sessions','Your care plan':'Care plan','Your profile':'Profile','Your messages':'Messages','Your journal':'Journal','Your membership':'Membership','Your reviews':'Reviews','Your services':'Services',
 'Save changes':'Save','Save profile':'Save','Save availability':'Save','Save task changes':'Save','Save document review':'Save','Cancel edit':'Cancel','Close dialog':'Close','Go back':'Back','Loading…':'Loading','Loading...':'Loading',
 'Retry loading':'Retry','Search resources':'Search','Registration documents':'Documents','Verified document':'Verified',
 'Decline request':'Decline','Accept selected time':'Accept','Accept a time':'Accept','Propose 1–3 times':'Propose times','Propose available times':'Propose times','Propose selected times':'Propose times',
 'Documents & individual expiry':'Documents','No expiry recorded':'Expiry date','Date (IST)':'Date','Start date (IST)':'Date','Expiry date (valid through this day, IST)':'Expiry date',
}
const lowerStates={verified:'Verified',pending:'Pending',rejected:'Rejected',daily:'Daily',weekly:'Weekly','as needed':'As needed'}
export function translate(text,locale='en'){
 if(typeof text!=='string'||locale==='en')return text
 const key=text.trim(),dictionary=catalog[locale]
 if(!dictionary)return text
 const replacement=dictionary[key]||dictionary[aliases[key]]||dictionary[lowerStates[key]]
 return replacement?text.replace(key,replacement):text
}
