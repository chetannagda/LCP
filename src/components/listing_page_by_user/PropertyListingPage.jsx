import React, { useState, useEffect } from 'react';
import './PropertyListingPage.css';
import { db, auth, storage } from '../../firebase'; // Ensure you're importing your Firebase config
import { collection, addDoc, doc, getDocs, query, where, updateDoc, arrayUnion } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { onAuthStateChanged } from "firebase/auth";

const PropertyListingPage = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [propertyData, setPropertyData] = useState({
    title: '',
    location: '',
    landmark: '',
    description: '',
    size: '',
    district: '',
    state: '',
    pincode: '',
    propertyType: '',
    propertyCategory: '',
    action: '',
    amount: '',
    rent: '',
    parkingAvailable: false,
  });

  const [fileNames, setFileNames] = useState([]);
  const [properties, setProperties] = useState([]);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [activeStep, setActiveStep] = useState(1);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log('User authenticated:', user);
        setCurrentUser(user);
        fetchProperties(user.uid);
      } else {
        console.log("User is not signed in.");
        setCurrentUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setPropertyData((prevState) => ({ ...prevState, [name]: value }));
  };

  useEffect(() => {
    if (propertyData.pincode.length === 6) {
      fetch(`https://api.postalpincode.in/pincode/${propertyData.pincode}`)
        .then((response) => response.json())
        .then((data) => {
          if (data[0].Status === 'Success') {
            const postOffice = data[0].PostOffice[0];
            setPropertyData((prevState) => ({
              ...prevState,
              district: postOffice.District,
              state: postOffice.State,
            }));
          }
        })
        .catch((error) => console.error('Error fetching data:', error));
    }
  }, [propertyData.pincode]);

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setPropertyData((prevState) => ({ ...prevState, [name]: checked }));
  };

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    if (files.length > 20) {
      alert("You can only select up to 20 files.");
      return;
    }
    setFileNames(files);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrors({});
    setIsLoading(true);

    const requiredFields = [
      'title', 
      'location', 
      'description', 
      'size', 
      'propertyType', 
      'propertyCategory', 
      'action',
    ];

    const validationErrors = {};
    requiredFields.forEach((field) => {
      if (!propertyData[field]) {
        validationErrors[field] = 'This field is required';
      }
    });

    if (propertyData.action === 'Sell' && !propertyData.amount) {
      validationErrors.amount = 'This field is required';
    }
    if (propertyData.action === 'Rent' && !propertyData.rent) {
      validationErrors.rent = 'This field is required';
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setIsLoading(false);
      return;
    }

    if (!currentUser) {
      console.error('User not authenticated');
      alert('User not authenticated');
      setIsLoading(false);
      return;
    }

    try {
      const imageUrls = await Promise.all(
        fileNames.map(async (file) => {
          const storageRef = ref(storage, `property-images/${currentUser.uid}/${file.name}`);
          await uploadBytes(storageRef, file);
          return getDownloadURL(storageRef);
        })
      );

      const propertyRef = await addDoc(collection(db, 'properties'), {
        userId: currentUser.uid,
        ...propertyData,
        images: imageUrls,
        createdAt: new Date(),
      });

      // Link the property in the user's document
      const userDocRef = doc(db, 'users', currentUser.uid);
      await updateDoc(userDocRef, {
      propertyRefs: arrayUnion(propertyRef) // Adds the property reference to an array
      });

      console.log('Property successfully stored:', propertyRef.id);
      alert('Property successfully listed!');
      setPropertyData({
        title: '',
        location: '',
        landmark: '',
        description: '',
        size: '',
        district: '',
        state: '',
        pincode: '',
        propertyType: '',
        propertyCategory: '',
        action: '',
        amount: '',
        rent: '',
        parkingAvailable: false,
      });
      setFileNames([]);
      fetchProperties(currentUser.uid);
    } catch (error) {
      console.error('Error storing property:', error);
      alert('Error storing property. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchProperties = async (userId) => {
    try {
      const q = query(collection(db, 'properties'), where("userId", "==", userId));
      const querySnapshot = await getDocs(q);

      const propertyList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));

      setProperties(propertyList);
    } catch (error) {
      console.error('Error fetching properties:', error);
      setErrors({ message: 'Error fetching properties' });
    }
  };

  const renderFormStep = () => {
    switch(activeStep) {
      case 1:
        return (
          <>
            <div className="listing-form-group">
              <label>Title:</label>
              <input
                type="text"
                name="title"
                value={propertyData.title}
                onChange={handleInputChange}
                className={`listing-form-input ${errors.title ? 'listing-error' : ''}`}
                required
              />
              {errors.title && <span className="listing-error-message">{errors.title}</span>}
            </div>

            <div className="listing-form-group">
              <label>Location:</label>
              <input
                type="text"
                name="location"
                value={propertyData.location}
                onChange={handleInputChange}
                className={`listing-form-input ${errors.location ? 'listing-error' : ''}`}
                required
              />
              {errors.location && <span className="listing-error-message">{errors.location}</span>}
            </div>

            <div className="listing-form-group">
              <label>Landmark:</label>
              <input
                type="text"
                name="landmark"
                value={propertyData.landmark}
                onChange={handleInputChange}
                className="listing-form-input"
              />
            </div>
          </>
        );
      case 2:
        return (
          <>
            <div className="listing-form-group">
              <label>Description:</label>
              <textarea
                name="description"
                value={propertyData.description}
                onChange={handleInputChange}
                className={`listing-form-input ${errors.description ? 'listing-error' : ''}`}
                required
              />
              {errors.description && <span className="listing-error-message">{errors.description}</span>}
            </div>

            <div className="listing-form-group">
              <label>Size (in Sq Feet):</label>
              <input
                type="text"
                name="size"
                value={propertyData.size}
                onChange={handleInputChange}
                className={`listing-form-input ${errors.size ? 'listing-error' : ''}`}
                required
              />
              {errors.size && <span className="listing-error-message">{errors.size}</span>}
            </div>

            <div className="listing-form-group">
              <label>Pincode:</label>
              <input
                type="text"
                name="pincode"
                value={propertyData.pincode}
                onChange={handleInputChange}
                className="listing-form-input"
                required
              />
            </div>
          </>
        );
      case 3:
        return (
          <>
            <div className="listing-form-group">
              <label>Property Type:</label>
              <select
                name="propertyType"
                value={propertyData.propertyType}
                onChange={handleInputChange}
                className={`listing-form-input ${errors.propertyType ? 'listing-error' : ''}`}
                required
              >
                <option value="">Select Property Type</option>
                <option value="Residential">Residential</option>
                <option value="Commercial">Commercial</option>
              </select>
              {errors.propertyType && <span className="listing-error-message">{errors.propertyType}</span>}
            </div>

            <div className="listing-form-group">
              <label>Property Category:</label>
              <select
                name="propertyCategory"
                value={propertyData.propertyCategory}
                onChange={handleInputChange}
                className={`listing-form-input ${errors.propertyCategory ? 'listing-error' : ''}`}
                required
              >
                <option value="">Select Property Category</option>
                <option value="Flat">Flat</option>
                <option value="House">House</option>
                <option value="Office">Office</option>
                <option value="Shop">Shop</option>
              </select>
              {errors.propertyCategory && <span className="listing-error-message">{errors.propertyCategory}</span>}
            </div>

            <div className="listing-form-group">
              <label>Action:</label>
              <select
                name="action"
                value={propertyData.action}
                onChange={handleInputChange}
                className={`listing-form-input ${errors.action ? 'listing-error' : ''}`}
                required
              >
                <option value="">Select Action</option>
                <option value="Sell">Sell</option>
                <option value="Rent">Rent</option>
              </select>
              {errors.action && <span className="listing-error-message">{errors.action}</span>}
            </div>

            {propertyData.action === 'Sell' && (
              <div className="listing-form-group">
                <label>Amount:</label>
                <input
                  type="text"
                  name="amount"
                  value={propertyData.amount}
                  onChange={handleInputChange}
                  className={`listing-form-input ${errors.amount ? 'listing-error' : ''}`}
                  required
                />
                {errors.amount && <span className="listing-error-message">{errors.amount}</span>}
              </div>
            )}

            {propertyData.action === 'Rent' && (
              <div className="listing-form-group">
                <label>Rent:</label>
                <input
                  type="text"
                  name="rent"
                  value={propertyData.rent}
                  onChange={handleInputChange}
                  className={`listing-form-input ${errors.rent ? 'listing-error' : ''}`}
                  required
                />
                {errors.rent && <span className="listing-error-message">{errors.rent}</span>}
              </div>
            )}

            <div className="listing-form-group">
              <label>
                <input
                  type="checkbox"
                  name="parkingAvailable"
                  checked={propertyData.parkingAvailable}
                  onChange={handleCheckboxChange}
                  className="listing-form-checkbox"
                />
                Parking Available
              </label>
            </div>
          </>
        );
      case 4:
        return (
          <div className="listing-form-group">
            <label>Upload Images (Max 20):</label>
            <div className="listing-file-upload-container">
              <button type="button" className="listing-file-upload-button">
                Choose Files
              </button>
              <input
                type="file"
                onChange={handleFileChange}
                multiple
                className="listing-file-upload-input"
                accept="image/*"
              />
            </div>
            <div className="listing-file-names">
              {fileNames.map((file, index) => (
                <div key={index} className="listing-file-name">{file.name}</div>
              ))}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="listing-property-listing-container">
      <h2 className="listing-property-listing-header">List Your Property <span className='listing-free'>FREE!</span></h2>
      <form onSubmit={handleSubmit} className="listing-property-form">
        <div className="listing-form-progress">
          <div className={`listing-progress-step ${activeStep >= 1 ? 'active' : ''}`}>1</div>
          <div className={`listing-progress-step ${activeStep >= 2 ? 'active' : ''}`}>2</div>
          <div className={`listing-progress-step ${activeStep >= 3 ? 'active' : ''}`}>3</div>
          <div className={`listing-progress-step ${activeStep >= 4 ? 'active' : ''}`}>4</div>
        </div>

        {renderFormStep()}

        <div className="listing-form-navigation">
          {activeStep > 1 && (
            <button type="button" onClick={() => setActiveStep(activeStep - 1)} className="listing-nav-button prev">
              Previous
            </button>
          )}
          {activeStep < 4 && (
            <button type="button" onClick={() => setActiveStep(activeStep + 1)} className="listing-nav-button next">
              Next
            </button>
          )}
          {activeStep === 4 && (
            <button type="submit" className="listing-submit-button" disabled={isLoading}>
              {isLoading ? 'Submitting...' : 'Submit'}
            </button>
          )}
        </div>
      </form>

      <div className="listing-properties-list">
        <h3>Your Listed Properties:</h3>
        {properties.length > 0 ? (
          properties.map((property) => (
            <div key={property.id} className="listing-property-card">
              <h4>{property.title}</h4>
              <p>{property.description}</p>
              <p>Location: {property.location}</p>
              <p>Price: {property.amount || property.rent}</p>
              <p>Action: {property.action}</p>
              <p>Property Type: {property.propertyType}</p>
              <p>Size: {property.size} Sq. Ft.</p>
              <p>Parking Available: {property.parkingAvailable ? 'Yes' : 'No'}</p>
              <div className="listing-property-images">
                {property.images && property.images.map((image, index) => (
                  <img key={index} src={image} alt={`Property ${index + 1}`} className="listing-property-image" />
                ))}
              </div>
            </div>
          ))
        ) : (
          <p>No properties listed yet.</p>
        )}
      </div>

      {errors.message && <p className="listing-error-message">{errors.message}</p>}
    </div>
  );
};

export default PropertyListingPage;