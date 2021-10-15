import UserProfile from '../components/profile/user-profile';
import {getSession} from 'next-auth/client'


function ProfilePage() {
  return <UserProfile />;
}

export async function getServerSideProps(context){
  const session = await getSession({req: context.req}) // extracts the session token cookie if it exists

  if (!session) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false,
      }
    }
  }
  else {
    return {
      props: {session}
    }
  }

}

export default ProfilePage;
