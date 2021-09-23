import { BehaviorSubject } from 'rxjs';

export const saveToStorage = <T>(key: string, item: T) =>
  localStorage.setItem(key, JSON.stringify(item));
export const readFromStorage = <T>(key: string, defaultValue: T): T => {
  const storagedItem = localStorage.getItem(key);
  return storagedItem ? JSON.parse(storagedItem) : defaultValue;
};

export class LocalStorageBehaviorSubject<T> extends BehaviorSubject<T> {
  constructor(key: string, defaultValue: T) {
    super(readFromStorage(key, defaultValue));
    this.subscribe((value) => saveToStorage(key, value));
  }
}