import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'mass-conversion',
  standalone: true,
  imports: [CommonModule],
  styleUrls: [
    '../../shared/styles/converter-card.css'
  ],
  template: `
    <div class="converter-container">
      <div class="card green">
        <h3>Lbs → Kg</h3>
        <small>(1 Lbs = 0.453592 Kg)</small>
        <div class="row">
          <label>Lbs</label>
          <input type="number" min="1" (input)="onInputLbsToKg($event)" />
          <span>Kg</span>
          <strong>{{ toKg() }}</strong>
        </div>
      </div>

      <div class="card blue">
        <h3>Kg → Lbs</h3>
        <small>(1 Kg = 2.20462 Lbs)</small>
        <div class="row">
          <label>Kg</label>
          <input type="number" min="1" (input)="onInputKgToLbs($event)" />
          <span>Lbs</span>
          <strong>{{ toLbs() }}</strong>
        </div>
      </div>
    </div>
  `
})
export class MassConversionComponent {
  private inputLbs = 0;
  private inputKg = 0;
  toKg = signal<number | null>(null);
  toLbs = signal<number | null>(null);

  onInputLbsToKg(event: Event) {
    this.inputLbs = +(event.target as HTMLInputElement).value;
    this.toKg.set(this.inputLbs * 0.453592);
  }

  onInputKgToLbs(event: Event) {
    this.inputKg = +(event.target as HTMLInputElement).value;
    this.toLbs.set(Math.round((this.inputKg / 0.453592 + Number.EPSILON) * 10000) / 10000);
  }
}
