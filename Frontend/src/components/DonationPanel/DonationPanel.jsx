import React, { useEffect, useState } from 'react';
import API from '../../api/api';

const DonationPanel = () => {
  const [donations, setDonations] = useState([]);

  useEffect(() => {
    API.get('/donations').then((res) => setDonations(res.data));
  }, []);

  return (
    <div>
      <h4>Donation Items</h4>
      <ul>
        {donations.map((don) => (
          <li key={don._id}>{don.product?.name} - {don.status}</li>
        ))}
      </ul>
    </div>
  );
};

export default DonationPanel;
