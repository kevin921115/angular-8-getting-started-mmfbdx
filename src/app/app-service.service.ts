import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { TableElement } from './models/table-element.interface';

@Injectable({ providedIn: 'root' })
export class AppService {
  dataForTableSubject = new BehaviorSubject<TableElement[]>([
    { name: 'Concrete', unit: 'kg', price: 25.0, amount: 300, id: 121 },
    { name: 'Wooden panel', unit: 'm3', price: 3.89, amount: 110, id: 252 },
    { name: 'Copper wire', unit: 'cm', price: 0.11, amount: 900, id: 312 },
    { name: 'Documentation', unit: 'hours', price: 199, amount: 1, id: 1 },
  ]);
  dataForTable$: Observable<TableElement[]> =
    this.dataForTableSubject.asObservable();

  setDataForTable(id: number, field: string, value: number) {
    const data = this.dataForTableSubject.getValue();
    const index = data.findIndex((i) => i.id === id);
    data[index][field] = value;
    this.dataForTableSubject.next(data);
  }
}
