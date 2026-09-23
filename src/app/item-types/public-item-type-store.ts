import { inject, Service } from '@angular/core';
import { PublicApiClient } from '../public-api-client';

@Service()
export class PublicItemTypeStore {
  private readonly _itemTypesResource = inject(PublicApiClient).getItemTypes();

  get itemTypesResource() {
    return this._itemTypesResource.asReadonly();
  }

  public refreshItemTypes() {
    this._itemTypesResource.reload();
  }
}
