import { collection, getDocs } from "firebase/firestore";

//function for getting all the doctors 
  export const getAllUsers = async () => {
    try {
      const doctorsCollection = collection(db, 'mothers');
      const doctorsSnapshot = await getDocs(doctorsCollection);
      const doctorsList = doctorsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  
      return doctorsList;
    } catch (error) {
      console.error('Error fetching doctors:', error);
      throw new Error('Failed to fetch doctors');
    }
  }