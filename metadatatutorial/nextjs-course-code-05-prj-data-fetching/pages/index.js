//metadata
import Head from 'next/head'



import { getFeaturedEvents } from '../helpers/api-util';
import EventList from '../components/events/event-list';

function HomePage(props) {
  return (
    <div>
      {/* you can put anything in this head that would go in a normal head */}
      <Head>
        <title>NextJS Events</title>
        {/* <link rel="icon" href="favicon.ico" type="image/x-icon"> this can add an icon */}
        <meta name="description" content="Find a lot of great events that allow you to learn" key="uniqueforindex"/>
        <meta name="author" content="Chris Mills"></meta>
        {/* adding a key makes sure this doesn't clash */}
      </Head>
      <EventList items={props.events} />
    </div>
  );
}

export async function getStaticProps() {
  const featuredEvents = await getFeaturedEvents();

  return {
    props: {
      events: featuredEvents
    },
    revalidate: 1800
  }
}

export default HomePage;
