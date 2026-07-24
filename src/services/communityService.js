import {
  addDoc,
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase";

export async function createCommunityPost(post) {
  const documentReference = await addDoc(collection(db, "communityPosts"), {
    authorName: post.authorName || "Anonymous Farmer",
    location: post.location || "",
    crop: post.crop || "",
    message: post.message,
    language: post.language || "en",
    createdAt: serverTimestamp(),
  });

  return documentReference.id;
}

export async function getCommunityPosts() {
  const postsQuery = query(
    collection(db, "communityPosts"),
    orderBy("createdAt", "desc"),
    limit(30)
  );

  const snapshot = await getDocs(postsQuery);

  return snapshot.docs.map((document) => ({
    id: document.id,
    ...document.data(),
  }));
}