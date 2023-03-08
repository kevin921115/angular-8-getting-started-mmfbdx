import { Component, OnInit } from '@angular/core';
import { AppService } from '../app-service.service';
import { TableElement } from '../models/table-element.interface';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css'],
})
export class DataTableComponent implements OnInit {
  items: TableElement[] = [];
  columns: any[] = [
    { data: 'name', readOnly: true },
    { data: 'unit', readOnly: true },
    {
      data: 'price',
      type: 'numeric',
      format: '0,0.00',
    },
    {
      data: 'amount',
      type: 'numeric',
      format: '0,0.00',
    },
    {
      data: 'subtotal',
      type: 'numeric',
      format: '0,0.00',
      readOnly: true,
    },
  ];
  headers = ['Name', 'Unit', 'Price', 'Amount', 'Subtotal'];
  isShowMessage: boolean = false;
  message: string = '';
  timer: number = 0;

  constructor(private service: AppService) {}

  ngOnInit() {
    this.service.dataForTable$.subscribe({
      next: (x: TableElement[]) => {
        this.items = x
          .filter((item) => item.id !== 1)
          .map((item) => ({
            ...item,
            subtotal: item.price * item.amount,
          }));
      },
    });
  }

  onAfterChange($event) {
    const [changes, source] = $event;
    if (changes) {
      changes.forEach((item) => {
        const index = item[0];
        this.service.setDataForTable(this.items[index].id, item[1], item[3]);
      });
    }
  }

  onClickSummary() {
    if (this.timer) clearTimeout(this.timer);
    if (this.items.length === 0) return;

    this.isShowMessage = true;

    let sum = 0;
    let cheapest = this.items[0].subtotal;
    let expensive = this.items[0].subtotal;
    let cheapestP = this.items[0].name;
    let expensiveP = this.items[0].name;
    this.items.forEach((item) => {
      sum += item.subtotal;
      if (item.subtotal < cheapest) {
        cheapest = item.subtotal;
        cheapestP = item.name;
      } else if (item.subtotal > expensive) {
        expensive = item.subtotal;
        expensiveP = item.name;
      }
    });
    this.message = `The sum is: ${sum}. The cheapest product is ${cheapestP} and the most expensive is ${expensiveP}`;

    this.timer = setTimeout(() => {
      this.isShowMessage = false;
      this.message = '';
    }, 5000);
  }
}
