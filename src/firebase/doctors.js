import { addDoc, collection, doc, getDoc, getDocs, serverTimestamp } from "firebase/firestore";
import { auth, db, storage } from "./config";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

// Function to get a specific doctor's details by their UID
export const getDoctorById = async (doctorId) => {
    try {
      const docRef = doc(db, 'doctors', doctorId);
      const docSnap = await getDoc(docRef);
  
      if (docSnap.exists()) {
        return docSnap.data();
      } else {
        throw new Error('No such doctor exists!');
      }
    } catch (error) {
      console.error("Error getting doctor's details: ", error);
      throw error;
    }
  };
// function for getting all the doctors 
  export const getAllDoctors = async () => {
    try {
      const doctorsCollection = collection(db, 'doctors');
      const doctorsSnapshot = await getDocs(doctorsCollection);
      const doctorsList = doctorsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  
      return doctorsList;
    } catch (error) {
      console.error('Error fetching doctors:', error);
      throw new Error('Failed to fetch doctors');
    }
  }
  //function for booking a doctor

  export const bookAppointment = async (firstName, secondName, description, time, day, documentFile) => {
    const user = auth.currentUser;
    if (!user) throw new Error('User not authenticated');
  
    let booking = {
      uid: user.uid,
      firstName: firstName,
      secondName: secondName,
      description: description,
      time: time,
      day: day,
      timestamp: serverTimestamp()
    };
  
    if (documentFile) {
      const storageRef = ref(storage, `documents/${documentFile.name}`);
      const snapshot = await uploadBytes(storageRef, documentFile);
      const url = await getDownloadURL(snapshot.ref);
      booking.documentUrl = url;
    }
  
    await addDoc(collection(db, 'bookings'), booking);
  };
  