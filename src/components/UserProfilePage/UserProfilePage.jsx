import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { doc, getDoc, updateDoc, getDocs, collection, deleteDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { onAuthStateChanged } from "firebase/auth";
import { auth, db, storage } from '../../firebase'; // Ensure these are correctly configured

const Loader = ({ size = 'medium', color = '#ffffff' }) => (
  <div style={{...styles.loaderContainer, ...(size === 'small' ? styles.loaderSmall : {})}}>
    <div style={{...styles.loader, ...(size === 'small' ? styles.loaderSmall : {}), borderTopColor: color}}></div>
  </div>
);

export default function UserProfilePage() {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState(null);
  const [newName, setNewName] = useState('');
  const [newProfilePicture, setNewProfilePicture] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [properties, setProperties] = useState([]);
  const [loadingProperties, setLoadingProperties] = useState(true);
  const [userId, setUserId] = useState(null);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);
  const [savingProfile, setSavingProfile] = useState(false);
  const [deletingProperty, setDeletingProperty] = useState(null);
  const [signingOut, setSigningOut] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
      } else {
        navigate('/');
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!userId) return;

      try {
        const userRef = doc(db, 'users', userId);
        const userDoc = await getDoc(userRef);
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setUser(userData);
          setNewName(userData.name);
          setNewProfilePicture(userData.profilePhoto || '/def_user_profile.png');
        }
      } catch (err) {
        setErrors({ message: `Failed to load User data: ${err.message}` });
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [userId]);

  useEffect(() => {
    const fetchProperties = async () => {
      if (!userId) return;
  
      try {
        // Get the user's document to retrieve the propertyRefs array
        const userDocRef = doc(db, 'users', userId);
        const userDoc = await getDoc(userDocRef);
  
        if (userDoc.exists()) {
          const { propertyRefs } = userDoc.data();
  
          if (propertyRefs && propertyRefs.length > 0) {
            // Fetch each property document based on the references in propertyRefs
            const propertyPromises = propertyRefs.map(async (propertyRef) => {
              const propertyDoc = await getDoc(propertyRef);
              return { id: propertyDoc.id, ...propertyDoc.data() };
            });
  
            const propertyList = await Promise.all(propertyPromises);
            setProperties(propertyList);
          } else {
            setProperties([]); // No properties listed
          }
        } else {
          console.error("User document doesn't exist");
          setErrors({ message: 'User data not found' });
        }
      } catch (error) {
        console.error('Error fetching properties:', error);
        setErrors({ message: 'Error fetching properties' });
      } finally {
        setLoadingProperties(false);
      }
    };
  
    fetchProperties();
  }, [userId]);

  const handleSaveProfile = async () => {
    setSavingProfile(true);
    const userRef = doc(db, 'users', userId);

    const updatedData = {
      name: newName,
    };

    if (uploadedFile) {
      const storageRef = ref(storage, `profilePictures/${userId}`);
      await uploadBytes(storageRef, uploadedFile);
      const photoURL = await getDownloadURL(storageRef);
      updatedData.profilePhoto = photoURL;
    }

    try {
      await updateDoc(userRef, updatedData);
      setUser(prevUser => ({ ...prevUser, ...updatedData }));
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating user profile:', error);
      setErrors({ message: 'Failed to update profile' });
    } finally {
      setSavingProfile(false);
    }
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    const fileUrl = URL.createObjectURL(file);
    setNewProfilePicture(fileUrl);
    setUploadedFile(file);
  };

  const handleDeleteProperty = async (id) => {
    // Prompt user to confirm deletion
    const confirmDelete = window.confirm("Are you sure you want to delete this property?");
    if (!confirmDelete) return; // Exit if user cancels
  
    setDeletingProperty(id);
    try {
      // Delete the property document from Firestore
      await deleteDoc(doc(db, 'users', userId, 'Properties', id));
  
      // Update the state to remove the deleted property from the list
      setProperties(properties.filter(property => property.id !== id));
    } catch (error) {
      console.error('Error deleting property:', error);
      setErrors({ message: 'Failed to delete property' });
    } finally {
      setDeletingProperty(null);
    }
  };

  const handleLogout = async () => {
    setSigningOut(true);
    try {
      await signOut(auth);
      navigate('/check');
    } catch (error) {
      console.error('Error signing out:', error);
      setErrors({ message: 'Failed to sign out' });
    } finally {
      setSigningOut(false);
    }
  };

  if (loading) return <Loader color="#4F46E5" />;

  if (!user) return <div style={styles.error}>User not found</div>;

  return (
    <div style={styles.userProfile}>
      <div style={styles.container}>
        <div style={styles.sidebar}>
          <div style={styles.profilePictureContainer}>
            <img src={newProfilePicture || user.profilePhoto} alt={user.name} style={styles.profilePicture} />
            {isEditing && (
              <label htmlFor="profile-picture-upload" style={styles.profilePictureUpload}>
                <span style={styles.profilePictureUploadIcon}>📷</span>
                <input
                  id="profile-picture-upload"
                  type="file"
                  onChange={handleProfilePictureChange}
                  accept="image/*"
                  style={styles.fileInput}
                />
              </label>
            )}
          </div>
          <div style={styles.userInfo}>
            {isEditing ? (
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="Name"
                style={styles.input}
              />
            ) : (
              <h1 style={styles.userName}>{user.name}</h1>
            )}
            <p style={styles.userEmail}>{user.email}</p>
            {user.contactNumber && <p style={styles.userContact}>{user.contactNumber}</p>}
          </div>
          {isEditing ? (
            <div style={styles.editForm}>
              <button 
                onClick={handleSaveProfile} 
                style={{...styles.button, ...styles.saveButton}}
                disabled={savingProfile}
              >
                {savingProfile ? <Loader size="small" /> : 'Save Profile'}
              </button>
              <button 
                onClick={() => setIsEditing(false)} 
                style={{...styles.button, ...styles.cancelButton}}
              >
                Cancel
              </button>
            </div>
          ) : (
            <button onClick={() => setIsEditing(true)} style={{...styles.button, ...styles.editButton}}>Edit Profile</button>
          )}
          <div style={styles.logoutButtonContainer}>
            <button 
              onClick={handleLogout} 
              style={{...styles.button, ...styles.logoutButton}}
              disabled={signingOut}
            >
              {signingOut ? <Loader size="small" /> : 'Logout'}
            </button>
          </div>
        </div>
        <div style={styles.content}>
          <h2 style={styles.sectionTitle}>Listed Properties</h2>
          <div style={styles.propertiesList}>
            {loadingProperties ? (
              <Loader color="#4F46E5" />
            ) : properties.length > 0 ? (
              properties.map((property) => (
                <div key={property.id} style={styles.propertyCard}>
                  <h3 style={styles.propertyTitle}>{property.title}</h3>
                  <div style={styles.propertyDetails}>
                    <p><strong>Price:</strong> {property.action === 'Sell' ? `${property.amount} INR` : `${property.rent} INR/month`}</p>
                    <p><strong>Category:</strong> {property.propertyCategory}</p>
                    <p><strong>Location:</strong> {`${property.location}, ${property.district}, ${property.state} - ${property.pincode}`}</p>
                  </div>
                  <p style={styles.propertyDescription}>{property.description}</p>
                  <div style={styles.propertyActions}>
                    <button style={{...styles.button, ...styles.editPropertyButton}}>Edit</button>
                    <button 
                      onClick={() => handleDeleteProperty(property.id)} 
                      style={{...styles.button, ...styles.deletePropertyButton}}
                      disabled={deletingProperty === property.id}
                    >
                      {deletingProperty === property.id ? <Loader size="small" /> : 'Delete'}
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p style={styles.noProperties}>No properties listed.</p>
            )}
          </div>
        </div>
      </div>
      {errors.message && <div style={styles.error}>{errors.message}</div>}
    </div>
  );
}

const styles = {
  userProfile: {
    minHeight: '100vh',
    backgroundColor: '#F3F4F6',
    color: '#1F2937',
    fontFamily: "'Inter', sans-serif",
  },
  container: {
    display: 'flex',
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '40px 20px',
    flexDirection: 'row',
    '@media (max-width: 768px)': {
      flexDirection: 'column',
      padding: '20px',
    },
  },
  sidebar: {
    width: '300px',
    backgroundColor: '#FFFFFF',
    borderRadius: '12px',
    padding: '30px',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'sticky',
    top: '40px',
    height: 'fit-content',
    '@media (max-width: 768px)': {
      width: '100%',
      position: 'static',
      marginBottom: '20px',
      order: 1,
    },
  },
  content: {
    flex: 1,
    marginLeft: '40px',
    '@media (max-width: 768px)': {
      marginLeft: '0',
      order: 2,
    },
  },
  profilePictureContainer: {
    position: 'relative',
    marginBottom: '20px',
  },
  profilePicture: {
    width: '150px',
    height: '150px',
    borderRadius: '50%',
    objectFit: 'cover',
    border: '4px solid #E5E7EB',
    transition: 'transform 0.3s ease',
  },
  profilePictureUpload: {
    position: 'absolute',
    bottom: '5px',
    right: '5px',
    backgroundColor: '#4F46E5',
    color: '#FFFFFF',
    borderRadius: '50%',
    width: '40px',
    height: '40px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  profilePictureUploadIcon: {
    fontSize: '20px',
  },
  fileInput: {
    display: 'none',
  },
  userInfo: {
    textAlign: 'center',
    marginBottom: '20px',
  },
  userName: {
    fontSize: '24px',
    fontWeight: 'bold',
    margin: '0 0 10px 0',
    color: '#111827',
  },
  userEmail: {
    fontSize: '14px',
    color: '#6B7280',
    margin: '5px 0',
  },
  userContact: {
    fontSize: '14px',
    color: '#6B7280',
    margin: '5px 0',
  },
  editForm: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    width: '100%',
  },
  input: {
    width: '100%',
    padding: '10px',
    borderRadius: '6px',
    border: '1px solid #D1D5DB',
    fontSize: '14px',
    transition: 'border-color 0.3s ease',
  },
  button: {
    padding: '10px 20px',
    borderRadius: '6px',
    border: 'none',
    cursor: 'pointer',
    fontWeight: '500',
    fontSize: '14px',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  editButton: {
    backgroundColor: '#4F46E5',
    color: 'white',
    width: '100%',
  },
  saveButton: {
    backgroundColor: '#10B981',
    color: 'white',
  },
  cancelButton: {
    backgroundColor: '#EF4444',
    color: 'white',
  },
  logoutButton: {
    backgroundColor: '#1F2937',
    color: 'white',
    width: '100%',
    marginTop: '20px',
  },
  logoutButtonContainer: {
    width: '100%',
    marginTop: '20px',
    '@media (max-width: 768px)': {
      order: 3,
    },
  },
  sectionTitle: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '20px',
    color: '#111827',
  },
  propertiesList: {
    display: 'grid',
    gap: '20px',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    '@media (max-width: 768px)': {
      gridTemplateColumns: '1fr',
    },
  },
  propertyCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: '8px',
    padding: '20px',
    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  },
  propertyTitle: {
    fontSize: '18px',
    fontWeight: 'bold',
    marginBottom: '10px',
    color: '#111827',
  },
  propertyDetails: {
    fontSize: '14px',
    color: '#4B5563',
    marginBottom: '15px',
  },
  propertyDescription: {
    fontSize: '14px',
    color: '#6B7280',
    marginBottom: '15px',
  },
  propertyActions: {
    display: 'flex',
    gap: '10px',
  },
  editPropertyButton: {
    backgroundColor: '#4F46E5',
    color: 'white',
    flex: 1,
  },
  deletePropertyButton: {
    backgroundColor: '#EF4444',
    color: 'white',
    flex: 1,
  },
  loaderContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  loader: {
    border: '4px solid #F3F3F3',
    borderTop: '4px solid #3498DB',
    borderRadius: '50%',
    width: '30px',
    height: '30px',
    animation: 'spin 1s linear infinite',
  },
  loaderSmall: {
    width: '20px',
    height: '20px',
    border: '3px solid #F3F3F3',
    borderTop: '3px solid #3498DB',
  },
  error: {
    backgroundColor: '#FEE2E2',
    color: '#B91C1C',
    padding: '10px',
    borderRadius: '6px',
    marginTop: '20px',
    textAlign: 'center',
  },
  noProperties: {
    gridColumn: '1 / -1',
    textAlign: 'center',
    color: '#6B7280',
    backgroundColor: '#FFFFFF',
    padding: '40px',
    borderRadius: '8px',
    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
  },
};

const metaTag = document.createElement('meta');
metaTag.name = 'viewport';
metaTag.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no';
document.head.appendChild(metaTag);

const styleTag = document.createElement('style');
styleTag.innerHTML = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  
  /* Add hover effects */
  ${styles.profilePicture}:hover {
    transform: scale(1.05);
  }
  
  ${styles.profilePictureUpload}:hover {
    background-color: #4338CA;
  }
  
  ${styles.propertyCard}:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  }
  
  ${styles.input}:focus {
    outline: none;
    border-color: #4F46E5;
    box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.2);
  }
  
  ${styles.button}:hover:not(:disabled) {
    filter: brightness(110%);
  }
  
  ${styles.button}:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  @media (max-width: 768px) {
    ${styles.container} {
      flex-direction: column;
    }

    ${styles.sidebar} {
      width: 100%;
      margin-bottom: 20px;
      position: static;
      order: 1;
    }

    ${styles.content} {
      margin-left: 0;
      order: 2;
    }

    ${styles.propertiesList} {
      grid-template-columns: 1fr;
    }
    ${styles.logoutButtonContainer} {
      order: 3;
    }
    ${styles.propertyCard} {
      width: 100%;
      max-width: 100%;
      overflow-x: hidden;
    }
  }
`;
document.head.appendChild(styleTag);