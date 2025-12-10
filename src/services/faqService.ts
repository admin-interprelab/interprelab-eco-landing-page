import { collection, getDocs, getDoc, doc, addDoc, updateDoc, deleteDoc, query, where, orderBy, Timestamp } from 'firebase/firestore';
import { db } from './firebase/config'; // Import the initialized db from config

// --- Type Definitions ---
export interface FAQ {
  id?: string; // Optional ID for documents fetched from Firestore
  question: string;
  answer: string;
  category: 'general' | 'products' | 'pricing' | 'technical' | 'privacy' | 'support';
  priority: number; // 1-100 (higher = shown first)
  helpfulCount: number;
  notHelpfulCount: number;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

// --- Caching Mechanism (Simple in-memory cache) ---
const faqCache = new Map<string, FAQ[]>(); // Cache for lists of FAQs
const faqItemCache = new Map<string, FAQ>(); // Cache for individual FAQ items

const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes Time-To-Live for cache
let lastCacheUpdate = 0;

function isCacheValid(): boolean {
  return (Date.now() - lastCacheUpdate) < CACHE_TTL_MS;
}

function invalidateCache() {
  faqCache.clear();
  faqItemCache.clear();
  lastCacheUpdate = 0;
  console.log('FAQ cache invalidated.');
}

// --- Service Functions ---

/**
 * Creates a new FAQ document in Firestore.
 * @param faqData The FAQ data to create (without id, createdAt, updatedAt).
 * @returns The ID of the newly created document.
 */
export const createFAQ = async (faqData: Omit<FAQ, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> => {
  try {
    const now = Timestamp.now();
    const docRef = await addDoc(collection(db, 'faqs'), {
      ...faqData,
      helpfulCount: faqData.helpfulCount || 0,
      notHelpfulCount: faqData.notHelpfulCount || 0,
      createdAt: now,
      updatedAt: now,
    });
    invalidateCache(); // Invalidate cache on write
    return docRef.id;
  } catch (error) {
    console.error('Error creating FAQ:', error);
    throw new Error('Failed to create FAQ.');
  }
};

/**
 * Fetches all FAQs, with optional category filtering, limit, and caching.
 * @param category Optional category to filter FAQs by.
 * @param limitCount Optional limit on number of FAQs to return.
 * @returns An array of FAQ documents.
 */
export const getFAQs = async (category?: string, limitCount?: number): Promise<FAQ[]> => {
  const cacheKey = category ? `faqs-${category}-${limitCount || 'all'}` : `faqs-all-${limitCount || 'all'}`;

  if (isCacheValid() && faqCache.has(cacheKey)) {
    console.log('Serving FAQs from cache:', cacheKey);
    return faqCache.get(cacheKey)!;
  }

  try {
    const faqsRef = collection(db, 'faqs');
    let q;

    if (category && limitCount) {
      q = query(faqsRef, where('category', '==', category), orderBy('priority', 'desc'), orderBy('createdAt', 'desc'));
    } else if (category) {
      q = query(faqsRef, where('category', '==', category), orderBy('priority', 'desc'), orderBy('createdAt', 'desc'));
    } else if (limitCount) {
      q = query(faqsRef, orderBy('priority', 'desc'), orderBy('createdAt', 'desc'));
    } else {
      q = query(faqsRef, orderBy('priority', 'desc'), orderBy('createdAt', 'desc'));
    }

    const querySnapshot = await getDocs(q);
    let faqs: FAQ[] = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data() as Omit<FAQ, 'id'>
    }));

    // Apply limit after fetching if specified
    if (limitCount) {
      faqs = faqs.slice(0, limitCount);
    }

    faqCache.set(cacheKey, faqs);
    if (lastCacheUpdate === 0) lastCacheUpdate = Date.now(); // Set initial cache timestamp
    console.log('Fetched FAQs from Firestore and cached:', cacheKey);
    return faqs;
  } catch (error) {
    console.error('Error fetching FAQs:', error);
    // Return empty array as fallback instead of throwing
    return [];
  }
};

/**
 * Fetches a single FAQ by its ID.
 * @param id The ID of the FAQ document.
 * @returns The FAQ document or null if not found.
 */
export const getFAQById = async (id: string): Promise<FAQ | null> => {
  if (isCacheValid() && faqItemCache.has(id)) {
    console.log('Serving single FAQ from cache:', id);
    return faqItemCache.get(id)!;
  }

  try {
    const docRef = doc(db, 'faqs', id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const faq = { id: docSnap.id, ...docSnap.data() as Omit<FAQ, 'id'> };
      faqItemCache.set(id, faq);
      if (lastCacheUpdate === 0) lastCacheUpdate = Date.now(); // Set initial cache timestamp
      console.log('Fetched single FAQ from Firestore and cached:', id);
      return faq;
    } else {
      console.log('No such FAQ document!');
      return null;
    }
  } catch (error) {
    console.error('Error fetching FAQ by ID:', error);
    return null; // Return null instead of throwing
  }
};

/**
 * Updates an existing FAQ document.
 * @param id The ID of the FAQ document to update.
 * @param updates The fields to update.
 */
export const updateFAQ = async (id: string, updates: Partial<Omit<FAQ, 'id' | 'createdAt'>>): Promise<void> => {
  try {
    const faqRef = doc(db, 'faqs', id);
    await updateDoc(faqRef, {
      ...updates,
      updatedAt: Timestamp.now(),
    });
    invalidateCache(); // Invalidate cache on write
    // Also invalidate specific item from cache if it exists
    faqItemCache.delete(id);
    console.log('FAQ successfully updated:', id);
  } catch (error) {
    console.error('Error updating FAQ:', error);
    throw new Error('Failed to update FAQ.');
  }
};

/**
 * Deletes an FAQ document from Firestore.
 * @param id The ID of the FAQ document to delete.
 */
export const deleteFAQ = async (id: string): Promise<void> => {
  try {
    await deleteDoc(doc(db, 'faqs', id));
    invalidateCache(); // Invalidate cache on write
    // Also invalidate specific item from cache if it exists
    faqItemCache.delete(id);
    console.log('FAQ successfully deleted:', id);
  } catch (error) {
    console.error('Error deleting FAQ:', error);
    throw new Error('Failed to delete FAQ.');
  }
};

/**
 * Fetches FAQs by category with caching.
 * @param category The category to filter by.
 * @returns An array of FAQ documents in the specified category.
 */
export const getFAQsByCategory = async (category: string): Promise<FAQ[]> => {
  return getFAQs(category);
};

// Function to manually invalidate all FAQ related caches if needed (e.g., after an external data change)
export const invalidateFAQCacheManually = () => {
  invalidateCache();
};
