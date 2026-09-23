import { Service } from '@angular/core';

const ORDER_NUMBERS_STORAGE_KEY = 'savedOrderNumbers';

@Service()
export class PreviousOrderNumbersStore {
  storeOrderNumber(orderNumber: string) {
    // Only keep the last 5 order numbers
    const storedOrderNumbers = this.loadStringArray(ORDER_NUMBERS_STORAGE_KEY).slice(0, 4);
    storedOrderNumbers.unshift(orderNumber);
    this.saveStringArray(ORDER_NUMBERS_STORAGE_KEY, storedOrderNumbers);
  }

  getStoredOrderNumbers(): string[] {
    return this.loadStringArray(ORDER_NUMBERS_STORAGE_KEY);
  }

  private saveStringArray(key: string, arr: readonly string[]): void {
    localStorage.setItem(key, JSON.stringify(arr));
  }

  private loadStringArray(key: string): string[] {
    try {
      const raw = localStorage.getItem(key);
      if (!raw) return [];

      const parsed: unknown = JSON.parse(raw);
      if (!Array.isArray(parsed)) return [];

      return parsed.filter((item): item is string => typeof item === 'string');
    } catch {
      return [];
    }
  }
}
