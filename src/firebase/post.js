

import { addDoc, collection, serverTimestamp, query, orderBy, onSnapshot, getDocs, where } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import {db, storage } from './config';

export const createPost = async (userUid, content, imageFile) => {
  // Fetch user details based on userUid from both 'doctors' and 'mothers'
  let userDetails;
  console.log( imageFile[0].name)

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

  // console.log('User details:', userDetails);

  let post = {
    uid: userUid,
    content: content,
    firstName: userDetails.firstName,
    secondName: userDetails.secondName,
    timestamp: serverTimestamp(),
  };

  if (imageFile) {
    const storageRef = ref(storage, `images/${imageFile[0].name}`);
    console.log(storageRef)
    const snapshot = await uploadBytes(storageRef, imageFile);
    // console.log(snapshot)
    const url = await getDownloadURL(snapshot.ref);
    post.imageUrl = url;
    console.log(post.imageUrl)
  }

  await addDoc(collection(db, 'posts'), post);
};

// Add a comment to a post
export const addComment = async (  userUid, postId, comment) => {
 

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

  const commentData = {
    uid: userUid,
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
  onSnapshot(q, async (snapshot) => {
    const posts = [];
    for (const doc of snapshot.docs) {
      const post = { ...doc.data(), id: doc.id };
      const commentsSnapshot = await getDocs(collection(db, `posts/${post.id}/comments`));
      post.comments = commentsSnapshot.docs.map(commentDoc => ({ ...commentDoc.data(), id: commentDoc.id }));
      posts.push(post);
    }
    callback(posts);
  });
};


