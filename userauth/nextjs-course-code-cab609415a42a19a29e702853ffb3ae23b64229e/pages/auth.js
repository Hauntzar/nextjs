import AuthForm from '../components/auth/auth-form';
import {getSession} from 'next-auth/client'
import {useSession,useState} from 'react'
import {useRouter} from 'next/router'

function AuthPage() {
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(()=> {
    getSession().then(session => {
      if (session) { 
        router.replace('/')
      }
      else{
        setIsLoading(false)
      }
    })
  },[session])
  if (isLoading) {
    return <AuthForm />;
  }
}

export default AuthPage;
