import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "./config";

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