import classes from './newsletter-registration.module.css';
import {useRef, useContext} from 'react'
import NotificationContext from '../../store/notification-context';


function NewsletterRegistration() {
  const userEmail = useRef();
  const notificationCtx = useContext(NotificationContext)

  function registrationHandler(event) {
    event.preventDefault();
    const emailEntered = userEmail.current.value

    notificationCtx.showNotification({
      title: 'Signing Up',
      message: 'Registering for newsletter',
      status: 'pending'
    })
    fetch('/api/newsletter',{
      method: 'POST',
      body: JSON.stringify({email: emailEntered}),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((response) => {
        if (response.ok){
          response.json()
        }
        return response.json().then(data => {
          throw new Error(data.message || 'something went wrong')
        })
      })
      .then((data)=>{
        notificationCtx.showNotification({
          title: 'Success',
          message: 'Registered for newsletter',
          status: 'success'
        })
      })
      .catch((err) => {
        console.log("error reading the data" + err);
        notificationCtx.showNotification({
          title: 'Error',
          message: err.message || 'Something went wrong',
          status: 'Error'
        })
      })
    
    
  }

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            type='email'
            id='email'
            placeholder='Your email'
            aria-label='Your email'
            ref={userEmail}
          />
          <button>Register</button>
        </div>
      </form>
    </section>
  );
}

export default NewsletterRegistration;
