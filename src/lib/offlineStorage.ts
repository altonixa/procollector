/**
 * Simple IndexedDB wrapper for offline collection storage
 */

const DB_NAME = 'ProCollectorOffline';
const DB_VERSION = 1;
const STORE_NAME = 'pending_collections';

export interface PendingCollection {
    id: string;
    clientId: string;
    amount: number;
    description: string;
    paymentMethod: string;
    latitude?: number;
    longitude?: number;
    collectedAt: string;
    status: 'pending_sync';
    proofFile?: File;
    proofFileName?: string;
}

class OfflineStorage {
    private db: IDBDatabase | null = null;

    async init(): Promise<void> {
        if (this.db) return;

        return new Promise((resolve, reject) => {
            const request = indexedDB.open(DB_NAME, DB_VERSION);

            request.onerror = () => reject(new Error('Failed to open IndexedDB'));

            request.onsuccess = (event) => {
                this.db = (event.target as IDBOpenDBRequest).result;
                resolve();
            };

            request.onupgradeneeded = (event) => {
                const db = (event.target as IDBOpenDBRequest).result;
                if (!db.objectStoreNames.contains(STORE_NAME)) {
                    db.createObjectStore(STORE_NAME, { keyPath: 'id' });
                }
            };
        });
    }

    async saveCollection(collection: PendingCollection): Promise<void> {
        await this.init();
        return new Promise((resolve, reject) => {
            if (!this.db) return reject(new Error('DB not initialized'));

            const transaction = this.db.transaction([STORE_NAME], 'readwrite');
            const store = transaction.objectStore(STORE_NAME);
            const request = store.add(collection);

            request.onsuccess = () => resolve();
            request.onerror = () => reject(new Error('Failed to save collection offline'));
        });
    }

    async getPendingCollections(): Promise<PendingCollection[]> {
        await this.init();
        return new Promise((resolve, reject) => {
            if (!this.db) return reject(new Error('DB not initialized'));

            const transaction = this.db.transaction([STORE_NAME], 'readonly');
            const store = transaction.objectStore(STORE_NAME);
            const request = store.getAll();

            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(new Error('Failed to fetch offline collections'));
        });
    }

    async getPendingCount(): Promise<number> {
        await this.init();
        return new Promise((resolve, reject) => {
            if (!this.db) return reject(new Error('DB not initialized'));

            const transaction = this.db.transaction([STORE_NAME], 'readonly');
            const store = transaction.objectStore(STORE_NAME);
            const request = store.count();

            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(new Error('Failed to count pending items'));
        });
    }

    async removeCollection(id: string): Promise<void> {
        await this.init();
        return new Promise((resolve, reject) => {
            if (!this.db) return reject(new Error('DB not initialized'));

            const transaction = this.db.transaction([STORE_NAME], 'readwrite');
            const store = transaction.objectStore(STORE_NAME);
            const request = store.delete(id);

            request.onsuccess = () => resolve();
            request.onerror = () => reject(new Error('Failed to delete offline collection'));
        });
    }

    async clearAll(): Promise<void> {
        await this.init();
        return new Promise((resolve, reject) => {
            if (!this.db) return reject(new Error('DB not initialized'));

            const transaction = this.db.transaction([STORE_NAME], 'readwrite');
            const store = transaction.objectStore(STORE_NAME);
            const request = store.clear();

            request.onsuccess = () => resolve();
            request.onerror = () => reject(new Error('Failed to clear offline storage'));
        });
    }
}

export const offlineStorage = new OfflineStorage();
