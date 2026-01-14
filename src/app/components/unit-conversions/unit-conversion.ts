import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'unit-conversion-inch-cm',
  standalone: true,
  imports: [CommonModule],
  styleUrls: [
    '../../shared/styles/converter-card.css'
  ],
  template: `
    <div class="converter-container">
      <div class="card green">
        <h3>Inch → Cm</h3>

        <div class="row">
          <label>Inch</label>
          <input type="number" min="1" (input)="onInputInchToCm($event)" />
          <span>Cm</span>
          <strong>{{ toCm() }}</strong>
        </div>
      </div>

      <div class="card blue">
        <h3>Cm → Inch</h3>
        <small>(Round to 4 decimal places)</small>

        <div class="row">
          <label>Cm</label>
          <input type="number" min="1" (input)="onInputCmToInch($event)" />
          <span>Inch</span>
          <strong>{{ toInch() }}</strong>
        </div>
      </div>
    </div>
  `
})
export class UnitConversionInchToCmComponent {
  private inputInch = 0;
  private inputCm = 0;
  toCm = signal<number | null>(null);
  toInch = signal<number | null>(null);

  onInputInchToCm(event: Event) {
    this.inputInch = +(event.target as HTMLInputElement).value;
    this.toCm.set(this.inputInch * 2.54);
  }

  onInputCmToInch(event: Event) {
    this.inputCm = +(event.target as HTMLInputElement).value;
    this.toInch.set(Math.round((this.inputCm / 2.54 + Number.EPSILON) * 10000) / 10000);
  }
}
