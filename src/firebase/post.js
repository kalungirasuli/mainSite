import {
  addDoc,
  collection,
  serverTimestamp,
  query,
  getDocs,
  where,
  orderBy,
  onSnapshot,
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from './config';

// Cache to store user details fetched from Firestore
const userDetailsCache = new Map();

// Function to fetch user details from Firestore or cache
const getUserDetails = async (userUid) => {
  if (userDetailsCache.has(userUid)) {
    return userDetailsCache.get(userUid);
  } else {
    const cachedUserDetails = localStorage.getItem(`userDetails_${userUid}`);
    if (cachedUserDetails) {
      const userDetails = JSON.parse(cachedUserDetails);
      userDetailsCache.set(userUid, userDetails);
      return userDetails;
    } else {
      // Query to fetch user details from 'doctors' collection
      const doctorsQuery = query(collection(db, 'doctors'), where('uid', '==', userUid));
      const doctorsSnapshot = await getDocs(doctorsQuery);

      // Query to fetch user details from 'mothers' collection if not found in 'doctors'
      if (!doctorsSnapshot.empty) {
        const userDetails = doctorsSnapshot.docs[0].data();
        userDetailsCache.set(userUid, userDetails);
        localStorage.setItem(`userDetails_${userUid}`, JSON.stringify(userDetails));
        return userDetails;
      } else {
        const mothersQuery = query(collection(db, 'mothers'), where('uid', '==', userUid));
        const mothersSnapshot = await getDocs(mothersQuery);
        if (!mothersSnapshot.empty) {
          const userDetails = mothersSnapshot.docs[0].data();
          userDetailsCache.set(userUid, userDetails);
          localStorage.setItem(`userDetails_${userUid}`, JSON.stringify(userDetails));
          return userDetails;
        } else {
          throw new Error('User details not found');
        }
      }
    }
  }
};

// Function to create a new post
export const createPost = async (userUid, content, imageFiles) => {
  let userDetails = await getUserDetails(userUid);

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

// Function to add a comment to a post
export const addComment = async (userUid, postId, comment) => {
  let userDetails = await getUserDetails(userUid);

  const commentData = {
    uid: userUid,
    firstName: userDetails.firstName,
    secondName: userDetails.secondName,
    comment: comment,
    timestamp: serverTimestamp(),
  };

  await addDoc(collection(db, 'posts', postId, 'comments'), commentData);
};

// Function to fetch posts with comments
export const fetchPostsWithComments = (callback) => {
  const q = query(collection(db, 'posts'), orderBy('timestamp', 'desc'));
  onSnapshot(q, async (snapshot) => {
    const posts = [];
    for (const doc of snapshot.docs) {
      const post = { ...doc.data(), id: doc.id };

      // Fetch comments for the post
      const commentsSnapshot = await getDocs(collection(db, `posts/${post.id}/comments`));
      post.comments = commentsSnapshot.docs.map((commentDoc) => ({
        ...commentDoc.data(),
        id: commentDoc.id,
      }));

      // Ensure user details for the post author are cached
      if (!userDetailsCache.has(post.uid)) {
        try {
          const userDetails = await getUserDetails(post.uid);
          userDetailsCache.set(post.uid, userDetails);
        } catch (error) {
          console.error('Error fetching user details:', error);
        }
      }

      posts.push(post);
    }
    callback(posts);
  });
};
