import { 
  collection, 
  addDoc, 
  getDocs, 
  updateDoc, 
  deleteDoc, 
  doc, 
  query, 
  orderBy, 
  onSnapshot,
  Timestamp,
  QuerySnapshot,
  DocumentData
} from 'firebase/firestore';
// Firebase disabled - using Supabase instead
// import { db } from '@/services/firebase/config';
import { CallRecord } from '../types';

const COLLECTION_NAME = 'calls';

export class FirestoreCallService {
  // Convert Firestore document to CallRecord
  private docToCallRecord(doc: DocumentData): CallRecord {
    const data = doc.data();
    return {
      id: doc.id,
      ...data,
      startTime: data.startTime instanceof Timestamp ? data.startTime.toDate() : new Date(data.startTime),
      endTime: data.endTime instanceof Timestamp ? data.endTime.toDate() : new Date(data.endTime),
    } as CallRecord;
  }

  async createCall(call: Omit<CallRecord, 'id'>): Promise<CallRecord> {
    try {
      const docRef = await addDoc(collection(db, COLLECTION_NAME), {
        ...call,
        startTime: Timestamp.fromDate(call.startTime),
        endTime: Timestamp.fromDate(call.endTime),
        createdAt: Timestamp.now(),
      });
      
      return {
        ...call,
        id: docRef.id,
      };
    } catch (error) {
      console.error('Error adding call to Firestore:', error);
      throw error;
    }
  }

  async getCalls(): Promise<CallRecord[]> {
    try {
      const q = query(collection(db, COLLECTION_NAME), orderBy('startTime', 'desc'));
      const querySnapshot = await getDocs(q);
      
      return querySnapshot.docs.map(doc => this.docToCallRecord(doc));
    } catch (error) {
      console.error('Error getting calls from Firestore:', error);
      throw error;
    }
  }

  async updateCall(id: string, updates: Partial<CallRecord>): Promise<CallRecord | null> {
    try {
      const docRef = doc(db, COLLECTION_NAME, id);
      const updateData: Record<string, unknown> = { ...updates };
      
      if (updates.startTime) {
        updateData.startTime = Timestamp.fromDate(updates.startTime);
      }
      if (updates.endTime) {
        updateData.endTime = Timestamp.fromDate(updates.endTime);
      }

      await updateDoc(docRef, updateData);
      
      // Return updated record (in a real app, might want to fetch it back or merge)
      // For now, we'll merge manually to save a read
      return {
        id,
        ...updates,
      } as CallRecord;
    } catch (error) {
      console.error('Error updating call in Firestore:', error);
      throw error;
    }
  }

  async deleteCall(id: string): Promise<boolean> {
    try {
      await deleteDoc(doc(db, COLLECTION_NAME, id));
      return true;
    } catch (error) {
      console.error('Error deleting call from Firestore:', error);
      return false;
    }
  }

  // Real-time subscription
  subscribeToCalls(onUpdate: (calls: CallRecord[]) => void): () => void {
    const q = query(collection(db, COLLECTION_NAME), orderBy('startTime', 'desc'));
    
    const unsubscribe = onSnapshot(q, (querySnapshot: QuerySnapshot<DocumentData>) => {
      const calls = querySnapshot.docs.map(doc => this.docToCallRecord(doc));
      onUpdate(calls);
    }, (error) => {
      console.error('Error subscribing to calls:', error);
    });

    return unsubscribe;
  }
}

export const firestoreCallService = new FirestoreCallService();


