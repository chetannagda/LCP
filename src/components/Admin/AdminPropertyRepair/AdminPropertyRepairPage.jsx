import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../firebase'; // Ensure this is correctly pointing to your Firebase configuration file

const AdminPropertyRepairPage = () => {
  const [repairs, setRepairs] = useState([]);

  // Function to fetch data from Firestore
  const fetchRepairs = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'PropertyRepairInquiries'));
      const repairList = querySnapshot.docs.map(doc => doc.data());
      setRepairs(repairList);
    } catch (error) {
      console.error('Error fetching repair data: ', error);
    }
  };

  // UseEffect hook to fetch data on component mount
  useEffect(() => {
    fetchRepairs();
  }, []);

  return (
    <div className="admin-property-repair-page">
      <h1>Admin Property Repair Page</h1>
      <h2>Repairs:</h2>
      <ul>
        {repairs.length > 0 ? (
          repairs.map((repair, index) => (
            <li key={index}>
              <h3>{repair.name}</h3>
              <p>Number: {repair.contactNumber}</p>
              <p>Service: {repair.service}</p>
              <p>Message: {repair.message}</p>
            </li>
          ))
        ) : (
          <p>No repairs found.</p>
        )}
      </ul>
    </div>
  );
};

export default AdminPropertyRepairPage;
