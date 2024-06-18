

import { addDoc, collection, serverTimestamp, query, orderBy, onSnapshot, getDocs, where, deleteDoc, doc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import {db, storage } from './config';


export const createPost = async (userUid, content, imageFiles) => {
  let userDetails;

  const doctorsQuery = query(collection(db, 'doctors'), where("uid", "==", userUid));
  const doctorsSnapshot = await getDocs(doctorsQuery);

  const mothersQuery = query(collection(db, 'mothers'), where("uid", "==", userUid));
  const mothersSnapshot = await getDocs(mothersQuery);

  if (!doctorsSnapshot.empty) {
    userDetails = doctorsSnapshot.docs[0].data();
  } else if (!mothersSnapshot.empty) {
    userDetails = mothersSnapshot.docs[0].data();
  } else {
    throw new Error('User details not found');
  }

  let post = {
    uid: userUid,
    content: content,
    firstName: userDetails.firstName,
    secondName: userDetails.secondName,
    timestamp: serverTimestamp(),
  };

  if (imageFiles.length > 0) {
    const fileUrls = await Promise.all(
      imageFiles.map(async (file) => {
        const storageRef = ref(storage, `images/${file.name}`);
        const snapshot = await uploadBytes(storageRef, file);
        return await getDownloadURL(snapshot.ref);
      })
    );
    post.imageUrls = fileUrls;
  }

  await addDoc(collection(db, 'posts'), post);
};

// Add a comment to a post
export const addComment = async ( postId, comment) => {
 



  await addDoc(collection(db, 'posts', postId, 'comments'), comment);
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


export const deletePost = async (postId) => {
  const postRef = doc(collection(db, 'posts'), postId);
  await deleteDoc(postRef);
};

export const deleteComment = async (commentId) => {
  const commentRef = doc(db, 'comments', commentId); // Adjust path if necessary
  await deleteDoc(commentRef);
};