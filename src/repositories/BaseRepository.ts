import { BaseModel } from '@/models/types';

export class BaseRepository<T extends BaseModel> {
  private collectionName: string;
  private storageKey: string;

  constructor(collectionName: string) {
    this.collectionName = collectionName;
    this.storageKey = `gosono_${collectionName}`;
    this.initialize();
  }

  private initialize() {
    const data = localStorage.getItem(this.storageKey);
    if (!data) {
      localStorage.setItem(this.storageKey, JSON.stringify([]));
    }
  }

  private getData(): T[] {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : [];
  }

  private saveData(data: T[]) {
    localStorage.setItem(this.storageKey, JSON.stringify(data));
  }

  public async getAll(): Promise<T[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.getData());
      }, 300); // simulate network delay
    });
  }

  public async getById(id: string): Promise<T | null> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const data = this.getData();
        const item = data.find((d) => d.id === id);
        resolve(item || null);
      }, 200);
    });
  }

  public async create(item: Omit<T, 'id' | 'createdAt' | 'updatedAt'>): Promise<T> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const data = this.getData();
        const newItem = {
          ...item,
          id: crypto.randomUUID(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        } as unknown as T;
        data.push(newItem);
        this.saveData(data);
        resolve(newItem);
      }, 500);
    });
  }

  public async update(id: string, item: Partial<Omit<T, 'id' | 'createdAt' | 'updatedAt'>>): Promise<T | null> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const data = this.getData();
        const index = data.findIndex((d) => d.id === id);
        if (index === -1) {
          resolve(null);
          return;
        }
        
        const updatedItem = {
          ...data[index],
          ...item,
          updatedAt: new Date().toISOString(),
        };
        
        data[index] = updatedItem;
        this.saveData(data);
        resolve(updatedItem);
      }, 500);
    });
  }

  public async delete(id: string): Promise<boolean> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const data = this.getData();
        const initialLength = data.length;
        const filteredData = data.filter((d) => d.id !== id);
        
        if (filteredData.length === initialLength) {
          resolve(false);
          return;
        }
        
        this.saveData(filteredData);
        resolve(true);
      }, 400);
    });
  }
}
