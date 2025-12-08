import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { createFAQ, getFAQs, getFAQById, updateFAQ, deleteFAQ, invalidateFAQCacheManually, FAQ } from './faqService';
import { Timestamp } from 'firebase/firestore';

// Define and IMMEDIATELY INITIALIZE firestoreMocks as a const.
// This ensures it's available at the top level before vi.mock factory runs.
const firestoreMocks = {
  mockAddDoc: vi.fn(),
  mockGetDocs: vi.fn(),
  mockGetDoc: vi.fn(),
  mockUpdateDoc: vi.fn(),
  mockDeleteDoc: vi.fn(),
  mockCollection: vi.fn(),
  mockDoc: vi.fn(),
  mockQuery: vi.fn(),
  mockWhere: vi.fn(),
  mockOrderBy: vi.fn(),
  mockTimestampNow: vi.fn(() => ({
    toDate: () => new Date('2023-01-01T12:00:00Z'),
    seconds: 1672588800,
    nanoseconds: 0
  }))
};

// Mock firebase/firestore. Its factory function can now safely reference firestoreMocks.
vi.mock('firebase/firestore', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    collection: firestoreMocks.mockCollection,
    addDoc: firestoreMocks.mockAddDoc,
    getDocs: firestoreMocks.mockGetDocs,
    getDoc: firestoreMocks.mockGetDoc,
    updateDoc: firestoreMocks.mockUpdateDoc,
    deleteDoc: firestoreMocks.mockDeleteDoc,
    doc: firestoreMocks.mockDoc,
    query: firestoreMocks.mockQuery,
    where: firestoreMocks.mockWhere,
    orderBy: firestoreMocks.mockOrderBy,
    Timestamp: {
      now: firestoreMocks.mockTimestampNow,
    }
  };
});

// Mock the firebase/config to provide a mock db instance
vi.mock('./firebase/config', () => ({
  db: {} as Record<string, unknown>, // Mock db object, methods are mocked globally via firebase/firestore
}));


describe('FAQ Service', () => {
  let mockFaqs: FAQ[]; // Declare as 'let' so it can be initialized in beforeEach

  beforeEach(() => {
    // Reset all mocks before each test
    vi.clearAllMocks();
    invalidateFAQCacheManually(); // Ensure cache is clear before each test

    // Initialize mockFaqs here, after firestoreMocks is guaranteed to be initialized and mocked Timestamp.now() is ready
    mockFaqs = [
      {
        id: 'faq1',
        question: 'Q1',
        answer: 'A1',
        category: 'general',
        priority: 100,
        helpfulCount: 0,
        notHelpfulCount: 0,
        createdAt: firestoreMocks.mockTimestampNow(),
        updatedAt: firestoreMocks.mockTimestampNow(),
      },
      {
        id: 'faq2',
        question: 'Q2',
        answer: 'A2',
        category: 'technical',
        priority: 90,
        helpfulCount: 0,
        notHelpfulCount: 0,
        createdAt: firestoreMocks.mockTimestampNow(),
        updatedAt: firestoreMocks.mockTimestampNow(),
      },
    ];

    // Default mock implementations for query constraints
    firestoreMocks.mockCollection.mockReturnValue({}); // A placeholder object for collection reference
    firestoreMocks.mockQuery.mockImplementation((_col, ..._constraints) => ({ /* mock query object */ }));
    firestoreMocks.mockWhere.mockImplementation((_field, _op, _value) => ({ /* mock where constraint */ }));
    firestoreMocks.mockOrderBy.mockImplementation((_field, _direction) => ({ /* mock orderBy constraint */ }));
    firestoreMocks.mockDoc.mockImplementation((_db, _collection, id) => ({ id }));
  });

  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
  });

  // --- Test Create FAQ ---
  it('should create a new FAQ', async () => {
    firestoreMocks.mockAddDoc.mockResolvedValueOnce({ id: 'newFaqId' });

    const newFaqData = {
      question: 'New Q',
      answer: 'New A',
      category: 'General',
      order: 3,
    };

    const id = await createFAQ(newFaqData);
    expect(id).toBe('newFaqId');
    expect(firestoreMocks.mockAddDoc).toHaveBeenCalledWith(
      {}, // Mocked collection reference
      expect.objectContaining({
        ...newFaqData,
        createdAt: expect.any(Timestamp),
        updatedAt: expect.any(Timestamp),
      })
    );
  });

  it('should throw an error if createFAQ fails', async () => {
    const errorMessage = 'Firebase write error';
    firestoreMocks.mockAddDoc.mockRejectedValueOnce(new Error(errorMessage));

    const newFaqData = {
      question: 'New Q',
      answer: 'New A',
      category: 'general' as const,
      priority: 80,
      helpfulCount: 0,
      notHelpfulCount: 0,
    };

    await expect(createFAQ(newFaqData)).rejects.toThrow('Failed to create FAQ.');
  });

  // --- Test Get FAQs ---
  it('should fetch all FAQs', async () => {
    firestoreMocks.mockGetDocs.mockResolvedValueOnce({
      docs: mockFaqs.map(faq => ({
        id: faq.id,
        data: () => faq,
        exists: true,
      })),
    });

    const faqs = await getFAQs();
    expect(faqs).toEqual(mockFaqs);
    expect(firestoreMocks.mockGetDocs).toHaveBeenCalled();
  });

  it('should fetch FAQs by category', async () => {
    const technicalFaqs = mockFaqs.filter(f => f.category === 'technical');
    firestoreMocks.mockGetDocs.mockResolvedValueOnce({
      docs: technicalFaqs.map(faq => ({
        id: faq.id,
        data: () => faq,
        exists: true,
      })),
    });

    const faqs = await getFAQs('technical');
    expect(faqs).toEqual(technicalFaqs);
    expect(firestoreMocks.mockGetDocs).toHaveBeenCalled();
    expect(firestoreMocks.mockQuery).toHaveBeenCalled();
    expect(firestoreMocks.mockWhere).toHaveBeenCalledWith('category', '==', 'technical');
  });

  it('should return empty array if getFAQs fails', async () => {
    const errorMessage = 'Firebase read error';
    firestoreMocks.mockGetDocs.mockRejectedValueOnce(new Error(errorMessage));

    const faqs = await getFAQs();
    expect(faqs).toEqual([]);
  });

  // --- Test Get FAQ by ID ---
  it('should fetch an FAQ by ID', async () => {
    const targetFaq = mockFaqs[0];
    firestoreMocks.mockGetDoc.mockResolvedValueOnce({
      id: targetFaq.id,
      data: () => targetFaq,
      exists: true,
    });

    const faq = await getFAQById('faq1');
    expect(faq).toEqual(targetFaq);
    expect(firestoreMocks.mockGetDoc).toHaveBeenCalledWith({ id: 'faq1' }); // Mocked doc ref
  });

  it('should return null if FAQ by ID is not found', async () => {
    firestoreMocks.mockGetDoc.mockResolvedValueOnce({
      exists: false,
    });

    const faq = await getFAQById('nonExistentId');
    expect(faq).toBeNull();
  });

  it('should return null if getFAQById fails', async () => {
    const errorMessage = 'Firebase read error';
    firestoreMocks.mockGetDoc.mockRejectedValueOnce(new Error(errorMessage));

    const faq = await getFAQById('faq1');
    expect(faq).toBeNull();
  });

  // --- Test Update FAQ ---
  it('should update an FAQ', async () => {
    firestoreMocks.mockUpdateDoc.mockResolvedValueOnce(undefined); // updateDoc returns void

    const updates = { question: 'Updated Q1' };
    await updateFAQ('faq1', updates);
    expect(firestoreMocks.mockUpdateDoc).toHaveBeenCalledWith(
      { id: 'faq1' }, // Mocked doc ref
      expect.objectContaining({
        ...updates,
        updatedAt: expect.any(Timestamp),
      })
    );
  });

  it('should throw an error if updateFAQ fails', async () => {
    const errorMessage = 'Firebase update error';
    firestoreMocks.mockUpdateDoc.mockRejectedValueOnce(new Error(errorMessage));

    await expect(updateFAQ('faq1', { question: 'Fail update' })).rejects.toThrow('Failed to update FAQ.');
  });

  // --- Test Delete FAQ ---
  it('should delete an FAQ', async () => {
    firestoreMocks.mockDeleteDoc.mockResolvedValueOnce(undefined); // deleteDoc returns void

    await deleteFAQ('faq1');
    expect(firestoreMocks.mockDeleteDoc).toHaveBeenCalledWith({ id: 'faq1' }); // Mocked doc ref
  });

  it('should throw an error if deleteFAQ fails', async () => {
    const errorMessage = 'Firebase delete error';
    firestoreMocks.mockDeleteDoc.mockRejectedValueOnce(new Error(errorMessage));

    await expect(deleteFAQ('faq1')).rejects.toThrow('Failed to delete FAQ.');
  });

  // --- Test Caching Mechanism ---
  it('should cache FAQs and return from cache on subsequent calls', async () => {
    firestoreMocks.mockGetDocs.mockResolvedValueOnce({
      docs: mockFaqs.map(faq => ({
        id: faq.id,
        data: () => faq,
        exists: true,
      })),
    });

    // First call, should hit Firestore
    const faqs1 = await getFAQs();
    expect(faqs1).toEqual(mockFaqs);
    expect(firestoreMocks.mockGetDocs).toHaveBeenCalledTimes(1);

    // Second call, should return from cache
    const faqs2 = await getFAQs();
    expect(faqs2).toEqual(mockFaqs);
    expect(firestoreMocks.mockGetDocs).toHaveBeenCalledTimes(1); // Still 1 call
  });

  it('should cache a single FAQ and return from cache on subsequent calls', async () => {
    const targetFaq = mockFaqs[0];
    firestoreMocks.mockGetDoc.mockResolvedValueOnce({
      id: targetFaq.id,
      data: () => targetFaq,
      exists: true,
    });

    // First call, should hit Firestore
    const faq1 = await getFAQById('faq1');
    expect(faq1).toEqual(targetFaq);
    expect(firestoreMocks.mockGetDoc).toHaveBeenCalledTimes(1);

    // Second call, should return from cache
    const faq2 = await getFAQById('faq1');
    expect(faq2).toEqual(targetFaq);
    expect(firestoreMocks.mockGetDoc).toHaveBeenCalledTimes(1); // Still 1 call
  });

  it('should invalidate cache on create, update, or delete operations', async () => {
    firestoreMocks.mockGetDocs.mockResolvedValueOnce({
      docs: mockFaqs.map(faq => ({
        id: faq.id,
        data: () => faq,
        exists: true,
      })),
    });

    // Populate cache
    await getFAQs();
    expect(firestoreMocks.mockGetDocs).toHaveBeenCalledTimes(1);

    // Create operation should invalidate cache
    firestoreMocks.mockAddDoc.mockResolvedValueOnce({ id: 'newFaqId' });
    await createFAQ({ question: 'New Q', answer: 'New A', category: 'general', priority: 80, helpfulCount: 0, notHelpfulCount: 0 });
    expect(firestoreMocks.mockGetDocs).toHaveBeenCalledTimes(1); // Still 1 call, but cache should be invalid

    // Next getFAQs should hit Firestore again
    firestoreMocks.mockGetDocs.mockResolvedValueOnce({ docs: [] }); // Simulate empty result after invalidation
    await getFAQs();
    expect(firestoreMocks.mockGetDocs).toHaveBeenCalledTimes(2);

    // Populate cache again
    firestoreMocks.mockGetDocs.mockResolvedValueOnce({ docs: [] });
    await getFAQs();
    expect(firestoreMocks.mockGetDocs).toHaveBeenCalledTimes(3);

    // Update operation should invalidate cache
    firestoreMocks.mockUpdateDoc.mockResolvedValueOnce(undefined);
    await updateFAQ('faq1', { question: 'Updated Q' });
    expect(firestoreMocks.mockGetDocs).toHaveBeenCalledTimes(3); // Cache invalid, still 3 getDocs calls

    // Next getFAQs should hit Firestore again
    firestoreMocks.mockGetDocs.mockResolvedValueOnce({ docs: [] });
    await getFAQs();
    expect(firestoreMocks.mockGetDocs).toHaveBeenCalledTimes(4);

    // Populate cache again
    firestoreMocks.mockGetDocs.mockResolvedValueOnce({ docs: [] });
    await getFAQs();
    expect(firestoreMocks.mockGetDocs).toHaveBeenCalledTimes(5);

    // Delete operation should invalidate cache
    firestoreMocks.mockDeleteDoc.mockResolvedValueOnce(undefined);
    await deleteFAQ('faq1');
    expect(firestoreMocks.mockGetDocs).toHaveBeenCalledTimes(5); // Cache invalid, still 5 getDocs calls

    // Next getFAQs should hit Firestore again
    firestoreMocks.mockGetDocs.mockResolvedValueOnce({ docs: [] });
    await getFAQs();
    expect(firestoreMocks.mockGetDocs).toHaveBeenCalledTimes(6);
  });
});
