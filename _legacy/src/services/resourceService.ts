import { collection, getDocs, getDoc, doc, addDoc, updateDoc, deleteDoc, query, where, orderBy, Timestamp, increment } from 'firebase/firestore';
import { db } from './firebase/config'; // Import the initialized db from config

// --- Type Definitions ---
export interface Resource {
  id?: string; // Optional ID for documents fetched from Firestore
  title: string;
  description: string;
  content: string;
  category: 'article' | 'report' | 'documentation' | 'guide';
  featured: boolean;
  thumbnailUrl: string;
  href: string;
  publishedDate: Timestamp;
  author?: string;
  tags: string[];
  viewCount: number;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

// --- Service Functions ---

/**
 * Creates a new Resource document in Firestore.
 * @param resourceData The Resource data to create (without id, createdAt, updatedAt).
 * @returns The ID of the newly created document.
 */
export const createResource = async (resourceData: Omit<Resource, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> => {
  try {
    const now = Timestamp.now();
    const docRef = await addDoc(collection(db, 'resources'), {
      ...resourceData,
      viewCount: resourceData.viewCount || 0,
      createdAt: now,
      updatedAt: now,
    });
    return docRef.id;
  } catch (error) {
    console.error('Error creating resource:', error);
    throw new Error('Failed to create resource.');
  }
};

/**
 * Fetches all resources, ordered by featured status and published date.
 * @param category Optional category to filter by.
 * @returns An array of Resource documents.
 */
export const getResources = async (category?: string): Promise<Resource[]> => {
  try {
    const resourcesRef = collection(db, 'resources');
    let q;

    if (category) {
      q = query(
        resourcesRef,
        where('category', '==', category),
        orderBy('publishedDate', 'desc')
      );
    } else {
      q = query(
        resourcesRef,
        orderBy('featured', 'desc'),
        orderBy('publishedDate', 'desc')
      );
    }

    const querySnapshot = await getDocs(q);
    const resources: Resource[] = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data() as Omit<Resource, 'id'>
    }));
    return resources;
  } catch (error) {
    console.error('Error fetching resources:', error);
    return []; // Return empty array as fallback
  }
};

/**
 * Fetches a single resource by its ID.
 * @param id The ID of the resource document.
 * @returns The Resource document or null if not found.
 */
export const getResourceById = async (id: string): Promise<Resource | null> => {
  try {
    const docRef = doc(db, 'resources', id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() as Omit<Resource, 'id'> };
    } else {
      console.log('No such resource document!');
      return null;
    }
  } catch (error) {
    console.error('Error fetching resource by ID:', error);
    return null; // Return null instead of throwing
  }
};

/**
 * Increments the view count for a resource.
 * @param id The ID of the resource document.
 */
export const incrementResourceViewCount = async (id: string): Promise<void> => {
  try {
    const resourceRef = doc(db, 'resources', id);
    await updateDoc(resourceRef, {
      viewCount: increment(1),
    });
    console.log('Resource view count incremented:', id);
  } catch (error) {
    console.error('Error incrementing resource view count:', error);
    // Don't throw - view count is not critical
  }
};

/**
 * Fetches featured resources.
 * @returns An array of featured Resource documents.
 */
export const getFeaturedResources = async (): Promise<Resource[]> => {
  try {
    const q = query(
      collection(db, 'resources'),
      where('featured', '==', true),
      orderBy('publishedDate', 'desc')
    );
    const querySnapshot = await getDocs(q);
    const resources: Resource[] = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data() as Omit<Resource, 'id'>
    }));
    return resources;
  } catch (error) {
    console.error('Error fetching featured resources:', error);
    return []; // Return empty array as fallback
  }
};

/**
 * Updates an existing Resource document.
 * @param id The ID of the Resource document to update.
 * @param updates The fields to update.
 */
export const updateResource = async (id: string, updates: Partial<Omit<Resource, 'id' | 'createdAt'>>): Promise<void> => {
  try {
    const resourceRef = doc(db, 'resources', id);
    await updateDoc(resourceRef, {
      ...updates,
      updatedAt: Timestamp.now(),
    });
    console.log('Resource successfully updated:', id);
  } catch (error) {
    console.error('Error updating resource:', error);
    throw new Error('Failed to update resource.');
  }
};

/**
 * Deletes a Resource document from Firestore.
 * @param id The ID of the Resource document to delete.
 */
export const deleteResource = async (id: string): Promise<void> => {
  try {
    await deleteDoc(doc(db, 'resources', id));
    console.log('Resource successfully deleted:', id);
  } catch (error) {
    console.error('Error deleting resource:', error);
    throw new Error('Failed to delete resource.');
  }
};
