

import { addDoc, collection, serverTimestamp, query, orderBy, onSnapshot, getDocs, getDoc, doc, where } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { auth, db, storage } from './config';

export const createPost = async (userUid, content, imageFile) => {
  // Fetch user details based on userUid from both 'doctors' and 'mothers'
  let userDetails;

  // Query to check if userUid exists in 'doctors' collection
  const doctorsQuery = query(collection(db, 'doctors'), where("uid", "==", userUid));
  const doctorsSnapshot = await getDocs(doctorsQuery);

  // Query to check if userUid exists in 'mothers' collection
  const mothersQuery = query(collection(db, 'mothers'), where("uid", "==", userUid));
  const mothersSnapshot = await getDocs(mothersQuery);

  // Check if userUid was found in either collection
  if (!doctorsSnapshot.empty &&!mothersSnapshot.empty) {
    throw new Error('User details not found');
  } else if (!doctorsSnapshot.empty) {
    userDetails = doctorsSnapshot.docs[0].data();
  } else if (!mothersSnapshot.empty) {
    userDetails = mothersSnapshot.docs[0].data();
  } else {
    throw new Error('User details not found');
  }

  console.log('User details:', userDetails);

  let post = {
    uid: userUid,
    content: content,
    firstName: userDetails.firstName,
    secondName: userDetails.secondName,
    timestamp: serverTimestamp(),
  };

  if (imageFile) {
    const storageRef = ref(storage, `images/${imageFile.name}`);
    const snapshot = await uploadBytes(storageRef, imageFile);
    const url = await getDownloadURL(snapshot.ref);
    post.imageUrl = url;
  }

  await addDoc(collection(db, 'posts'), post);
};

// Add a comment to a post
export const addComment = async (postId, comment) => {
  const user = auth.currentUser;
  if (!user) throw new Error('User not authenticated');

  // Determine user type and fetch user details
  let userDetails;
  const mothersDoc = await getDoc(doc(db, 'mothers', user.uid));
  const doctorsDoc = await getDoc(doc(db, 'doctors', user.uid));

  if (mothersDoc.exists()) {
    userDetails = mothersDoc.data();
  } else if (doctorsDoc.exists()) {
    userDetails = doctorsDoc.data();
  } else {
    throw new Error('User details not found');
  }

  const commentData = {
    uid: user.uid,
    firstName: userDetails.firstName,
    secondName: userDetails.secondName,
    comment: comment,
    timestamp: serverTimestamp(),
  };

  await addDoc(collection(db, 'posts', postId, 'comments'), commentData);
};

// Fetch posts with comments
export const fetchPostsWithComments = (callback) => {
  const q = query(collection(db, 'posts'), orderBy('timestamp', 'desc'));
  onSnapshot(q, (snapshot) => {
    const posts = [];
    snapshot.forEach(async (doc) => {
      const post = { ...doc.data(), id: doc.id };
      const commentsSnapshot = await getDocs(collection(db, `posts/${post.id}/comments`));
      post.comments = [];
      commentsSnapshot.forEach(commentDoc => {
        post.comments.push({ ...commentDoc.data(), id: commentDoc.id });
      });
      posts.push(post);
    });
    callback(posts);
  });
};


