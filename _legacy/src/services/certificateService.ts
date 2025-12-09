import { collection, getDocs, getDoc, doc, addDoc, updateDoc, deleteDoc, query, where, orderBy, Timestamp } from 'firebase/firestore';
import { db } from './firebase/config'; // Import the initialized db from config

// --- Type Definitions ---
export interface Certificate {
  id?: string; // Optional ID for documents fetched from Firestore
  title: string;
  subtitle: string;
  description: string;
  price: number;
  currency: string;
  features: string[];
  comingSoon: boolean;
  enrollmentUrl?: string;
  imageUrl?: string;
  displayOrder: number;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface PremiumMembership {
  id?: string;
  title: string;
  subtitle: string;
  description: string;
  price: number;
  currency: string;
  billingPeriod: 'month' | 'year';
  features: string[];
  trialDays?: number;
  signupUrl: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

// --- Service Functions ---

/**
 * Creates a new Certificate document in Firestore.
 * @param certificateData The Certificate data to create (without id, createdAt, updatedAt).
 * @returns The ID of the newly created document.
 */
export const createCertificate = async (certificateData: Omit<Certificate, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> => {
  try {
    const now = Timestamp.now();
    const docRef = await addDoc(collection(db, 'certificates'), {
      ...certificateData,
      createdAt: now,
      updatedAt: now,
    });
    return docRef.id;
  } catch (error) {
    console.error('Error creating certificate:', error);
    throw new Error('Failed to create certificate.');
  }
};

/**
 * Fetches all certificates, ordered by display order.
 * @returns An array of Certificate documents.
 */
export const getCertificates = async (): Promise<Certificate[]> => {
  try {
    const q = query(collection(db, 'certificates'), orderBy('displayOrder', 'asc'));
    const querySnapshot = await getDocs(q);
    const certificates: Certificate[] = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data() as Omit<Certificate, 'id'>
    }));
    return certificates;
  } catch (error) {
    console.error('Error fetching certificates:', error);
    return []; // Return empty array as fallback
  }
};

/**
 * Fetches a single certificate by its ID.
 * @param id The ID of the certificate document.
 * @returns The Certificate document or null if not found.
 */
export const getCertificateById = async (id: string): Promise<Certificate | null> => {
  try {
    const docRef = doc(db, 'certificates', id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() as Omit<Certificate, 'id'> };
    } else {
      console.log('No such certificate document!');
      return null;
    }
  } catch (error) {
    console.error('Error fetching certificate by ID:', error);
    return null; // Return null instead of throwing
  }
};

/**
 * Fetches available certificates (not coming soon).
 * @returns An array of available Certificate documents.
 */
export const getAvailableCertificates = async (): Promise<Certificate[]> => {
  try {
    const q = query(
      collection(db, 'certificates'),
      where('comingSoon', '==', false),
      orderBy('displayOrder', 'asc')
    );
    const querySnapshot = await getDocs(q);
    const certificates: Certificate[] = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data() as Omit<Certificate, 'id'>
    }));
    return certificates;
  } catch (error) {
    console.error('Error fetching available certificates:', error);
    return []; // Return empty array as fallback
  }
};

/**
 * Updates an existing Certificate document.
 * @param id The ID of the Certificate document to update.
 * @param updates The fields to update.
 */
export const updateCertificate = async (id: string, updates: Partial<Omit<Certificate, 'id' | 'createdAt'>>): Promise<void> => {
  try {
    const certificateRef = doc(db, 'certificates', id);
    await updateDoc(certificateRef, {
      ...updates,
      updatedAt: Timestamp.now(),
    });
    console.log('Certificate successfully updated:', id);
  } catch (error) {
    console.error('Error updating certificate:', error);
    throw new Error('Failed to update certificate.');
  }
};

/**
 * Deletes a Certificate document from Firestore.
 * @param id The ID of the Certificate document to delete.
 */
export const deleteCertificate = async (id: string): Promise<void> => {
  try {
    await deleteDoc(doc(db, 'certificates', id));
    console.log('Certificate successfully deleted:', id);
  } catch (error) {
    console.error('Error deleting certificate:', error);
    throw new Error('Failed to delete certificate.');
  }
};
