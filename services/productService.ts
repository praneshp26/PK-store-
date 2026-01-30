import {
    collection,
    doc,
    getDocs,
    addDoc,
    deleteDoc,
    onSnapshot,
    serverTimestamp,
    query,
    orderBy,
    Unsubscribe
} from 'firebase/firestore';
import { db } from '../firebase';
import { Product } from '../types';

const PRODUCTS_COLLECTION = 'products';

/**
 * Fetch all products from Firestore (one-time)
 */
export const getProducts = async (): Promise<Product[]> => {
    try {
        const q = query(collection(db, PRODUCTS_COLLECTION), orderBy('createdAt', 'desc'));
        const snapshot = await getDocs(q);
        return snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        } as Product));
    } catch (error) {
        console.error('Error fetching products:', error);
        return [];
    }
};

/**
 * Subscribe to real-time product updates
 */
export const subscribeToProducts = (
    onUpdate: (products: Product[]) => void,
    onError?: (error: Error) => void
): Unsubscribe => {
    const q = query(collection(db, PRODUCTS_COLLECTION), orderBy('createdAt', 'desc'));

    return onSnapshot(
        q,
        (snapshot) => {
            const products = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            } as Product));
            onUpdate(products);
        },
        (error) => {
            console.error('Products subscription error:', error);
            if (onError) onError(error);
        }
    );
};

/**
 * Add a new product to Firestore
 */
export const addProductToFirestore = async (product: Omit<Product, 'id'>): Promise<Product> => {
    try {
        const docRef = await addDoc(collection(db, PRODUCTS_COLLECTION), {
            ...product,
            createdAt: serverTimestamp(),
        });
        return { id: docRef.id, ...product };
    } catch (error) {
        console.error('Error adding product:', error);
        throw error;
    }
};

/**
 * Delete a product from Firestore
 */
export const deleteProductFromFirestore = async (productId: string): Promise<void> => {
    try {
        await deleteDoc(doc(db, PRODUCTS_COLLECTION, productId));
    } catch (error) {
        console.error('Error deleting product:', error);
        throw error;
    }
};
