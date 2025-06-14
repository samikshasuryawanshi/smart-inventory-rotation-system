import React, { useEffect, useState } from 'react';
import API from '../../api/api';

const NotificationPanel = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    API.get('/notifications').then((res) => setNotifications(res.data));
  }, []);

  return (
    <div>
      <h4>Notifications</h4>
      <ul>
        {notifications.map((note) => (
          <li key={note._id}>{note.message}</li>
        ))}
      </ul>
    </div>
  );
};

export default NotificationPanel;
