// import React, { useState, useEffect } from 'react';
// import './AdminPickAndDrop.css';
// import { db } from '../../../firebase'; // Import your Firebase config
// import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore'; // Firestore functions

// function AdminPickandDrop() {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const querySnapshot = await getDocs(collection(db, "PickandDropRequests"));
//         const ordersData = querySnapshot.docs.map(doc => ({
//           id: doc.id, // Firestore document ID
//           ...doc.data() // Document data
//         }));
//         setOrders(ordersData);
//       } catch (error) {
//         console.error("Error fetching orders: ", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchOrders();
//   }, []);

//   const handleDelete = async (id) => {
//     try {
//       await deleteDoc(doc(db, "PickandDropRequests", id)); // Delete the document from Firestore
//       setOrders(orders.filter(order => order.id !== id)); // Remove deleted order from state
//     } catch (error) {
//       console.error("Error deleting order: ", error);
//     }
//   };

//   return (
//     <div className="admin-pickanddrop">
//       <h1>Admin Pick and Drop</h1>
//       {loading ? (
//         <p>Loading...</p>
//       ) : (
//         <table>
//           <thead>
//             <tr>
//               <th>Name</th>
//               <th>Contact</th>
//               <th>Pickup Address</th>
//               <th>Date</th>
//               <th>Drop-Off Address</th>
//               <th>Item Description</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {orders.map(order => (
//               <tr key={order.id}>
//                 <td>{order.name}</td>
//                 <td>{order.contact}</td>
//                 <td>{order.pickupAddress}</td>
//                 <td>{order.pickupDate}</td> {/* Changed to pickupDate to match form data */}
//                 <td>{order.dropoffAddress}</td> {/* Changed to dropoffAddress to match form data */}
//                 <td>{order.itemDescription}</td>
//                 <td>
//                   <button onClick={() => handleDelete(order.id)}>Delete</button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// }

// export default AdminPickandDrop;

import React, { useState, useEffect } from 'react';
import { db } from '../../../firebase'; // Import your Firebase config
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore'; // Firestore functions
import './AdminPickAndDrop.css';

function AdminPickandDrop() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "PickandDropRequests"));
        const ordersData = querySnapshot.docs.map(doc => ({
          id: doc.id, // Firestore document ID
          ...doc.data() // Document data
        }));
        setOrders(ordersData);
      } catch (error) {
        console.error("Error fetching orders: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "PickandDropRequests", id)); // Delete the document from Firestore
      setOrders(orders.filter(order => order.id !== id)); // Remove deleted order from state
    } catch (error) {
      console.error("Error deleting order: ", error);
    }
  };

  return (
    <div className="admin-pickanddrop">
      <h1>Admin Pick and Drop</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="order-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Contact</th>
              <th>Pickup Address</th>
              <th>Date</th>
              <th>Drop-Off Address</th>
              <th>Item Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.id}>
                <td>{order.name}</td>
                <td>{order.contact}</td>
                <td>{order.pickupAddress}</td>
                <td>{order.pickupDate}</td> {/* Changed to pickupDate to match form data */}
                <td>{order.dropoffAddress}</td> {/* Changed to dropoffAddress to match form data */}
                <td>{order.itemDescription}</td>
                <td>
                  <button className="delete-button" onClick={() => handleDelete(order.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default AdminPickandDrop;