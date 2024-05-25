

import { addDoc, collection, serverTimestamp, query, orderBy, onSnapshot, getDocs } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { auth, db, storage } from './config';

// Create a new post
export const createPost = async (content, imageFile) => {
  const user = auth.currentUser;
  if (!user) throw new Error('User not authenticated');

  let post = {
    uid: user.uid,
    content: content,
    timestamp: serverTimestamp()
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

  const commentData = {
    uid: user.uid,
    comment: comment,
    timestamp: serverTimestamp()
  };

  await addDoc(collection(db, `posts/${postId}/comments`), commentData);
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
