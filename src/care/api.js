import { api,post } from '../api/client.js'
export const call=(path,body,method='POST')=>api(path,{method,...(body!==undefined?{body}:{})})
export async function checkout(data,refresh) {
 if(data.mock){if(data.registration?.amount)await post(`/group-registrations/${data.registration._id}/mock-payment`,{});if(data.booking)await post(`/bookings/${data.booking._id}/mock-payment`,{});refresh?.();return}
 if(!window.Razorpay)await new Promise((resolve,reject)=>{let s=document.querySelector('script[data-razorpay]');if(!s){s=document.createElement('script');s.src='https://checkout.razorpay.com/v1/checkout.js';s.dataset.razorpay='true';document.head.appendChild(s)}s.addEventListener('load',resolve,{once:true});s.addEventListener('error',()=>reject(new Error('Could not load payment checkout. Check your connection.')),{once:true})})
 await new Promise((resolve,reject)=>{
   const options={key:data.keyId,name:'Garbhika',description:data.subscriptionId?'Garbhika membership':'Expert consultation',...(data.subscriptionId?{subscription_id:data.subscriptionId}:{order_id:data.booking?.payment.orderId||data.registration?.orderId,currency:'INR',amount:Math.round((data.booking?.payment.amount||data.registration?.amount)*100)}),handler:()=>{refresh?.();resolve()},modal:{ondismiss:()=>reject(new Error('Checkout closed. You can resume payment from Sessions.'))},theme:{color:'#330d3b'}}
   const r=new window.Razorpay(options);r.on('payment.failed',()=>reject(new Error('Payment failed. Please try again.')));r.open()
 })
}
