## Firebase Functions for Posts and Comments (Frontend Documentation)

This document describes three Firebase functions you can use in your frontend application to interact with posts and comments:

**1. createPost(userUid, content, imageFile):**

This function creates a new post in the Firestore database.

* **Parameters:**
    * `userUid (string)`: The unique identifier of the user creating the post.
    * `content (string)`: The content of the post.
    * `imageFile (File object, optional)`: An image file to upload with the post.
* **Returns:** (Nothing) - This function is asynchronous and does not return a value.
* **Behavior:**
    * The function first tries to find the user's details (first name and last name) by searching for `userUid` in both the `doctors` and `mothers` collections.
    * If the user is not found in either collection, it throws an error.
    * Otherwise, it creates a new post object with the following properties:
        * `uid`: The user's ID (`userUid`)
        * `content`: The post content (`content`)
        * `firstName`: The user's first name (from user details)
        * `secondName`: The user's last name (from user details)
        * `timestamp`: A server-generated timestamp for the post creation time.
    * If an image file is provided (`imageFile`), it uploads the image to Firebase Storage and adds the download URL to the `imageUrl` property of the post object.
    * Finally, the function adds the new post document to the `posts` collection in Firestore.

**2. addComment(userUid, postId, comment):**

This function adds a comment to an existing post.

* **Parameters:**
    * `userUid (string)`: The unique identifier of the user adding the comment.
    * `postId (string)`: The ID of the post to comment on.
    * `comment (string)`: The content of the comment.
* **Returns:** (Nothing) - This function is asynchronous and does not return a value.
* **Behavior:**
    * Similar to `createPost`, this function first tries to find the user's details (first name and last name) by searching for `userUid` in both the `doctors` and `mothers` collections.
    * If the user is not found, it throws an error.
    * Otherwise, it creates a new comment object with the following properties:
        * `uid`: The user's ID (`userUid`)
        * `firstName`: The user's first name (from user details)
        * `secondName`: The user's last name (from user details)
        * `comment`: The comment content (`comment`)
        * `timestamp`: A server-generated timestamp for the comment creation time.
    * The function then adds the new comment document to the `comments` subcollection within the specified post document (using `postId`) in the `posts` collection.

**3. fetchPostsWithComments(callback):**

This function retrieves all posts from the Firestore database, ordered by creation time (descending), and populates them with their corresponding comments.

* **Parameters:**
    * `callback (function(posts))`: A function to be called with an array of post objects after fetching and processing the data.
* **Returns:** (Nothing) - This function is asynchronous and calls the provided callback function.
* **Behavior:**
    * The function creates a query to fetch all posts from the `posts` collection, ordered by their `timestamp` property in descending order.
    * It sets up a Firestore listener on the query. Whenever there is a change in the data (new post, updated post, etc.), the listener triggers the callback function.
    * Inside the callback, the function iterates through each retrieved post document.
    * For each post, it fetches all comments from the corresponding `comments` subcollection within the post document.
    * It then creates a complete post object with the following properties:
        * All properties from the original post document.
        * An additional property `id`: containing the post document ID.
        * An additional property `comments`: containing an array of comment objects for that post. Each comment object has its own properties like `id`, `uid`, `firstName`, `lastName`, `comment`, and `timestamp`.
    * Finally, the function calls the provided `callback` function and passes the array of complete post objects containing comments.
