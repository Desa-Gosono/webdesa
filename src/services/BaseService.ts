import { BaseRepository } from '@/repositories/BaseRepository';
import { BaseModel } from '@/models/types';

export class BaseService<T extends BaseModel> {
  protected repository: BaseRepository<T>;

  constructor(collectionName: string) {
    this.repository = new BaseRepository<T>(collectionName);
  }

  public async getAll(): Promise<T[]> {
    return this.repository.getAll();
  }

  public async getById(id: string): Promise<T | null> {
    return this.repository.getById(id);
  }

  public async create(item: Omit<T, 'id' | 'createdAt' | 'updatedAt'>): Promise<T> {
    return this.repository.create(item);
  }

  public async update(id: string, item: Partial<Omit<T, 'id' | 'createdAt' | 'updatedAt'>>): Promise<T | null> {
    return this.repository.update(id, item);
  }

  public async delete(id: string): Promise<boolean> {
    return this.repository.delete(id);
  }
}
