import { Fragment, useContext } from 'react';
import Notification from '../ui/notification';
import NotificationContext from '../../store/notification-context';
import MainHeader from './main-header';

function Layout(props) {
  const notificationCtx = useContext(NotificationContext)

  const activeNotification = notificationCtx.notification

  return (
    <Fragment>
      <MainHeader />
      <main>{props.children}</main>
      {activeNotification && (
        <Notification 
          title={activeNotification.title}
          message={activeNotification.title}
          status={activeNotification.title}/>
      )}
    </Fragment>
  );
}

export default Layout;
