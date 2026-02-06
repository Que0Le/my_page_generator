import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'volume-conversion',
  standalone: true,
  imports: [CommonModule],
  styleUrls: [
    '../../shared/styles/converter-card.css'
  ],
  template: `
    <div class="converter-container">
      <div class="card green">
        <h3>Gallons → Liters</h3>
        <small>(1 Gallon = 3.78541 Liters)</small>
        <div class="row">
          <label>Gallons</label>
          <input type="number" min="1" (input)="onInputGallonsToLiters($event)" />
          <span>Liters</span>
          <strong>{{ toLiters() }}</strong>
        </div>
      </div>

      <div class="card blue">
        <h3>Liters → Gallons</h3>
        <small>(1 Liter = 0.264172 Gallons)</small>
        <div class="row">
          <label>Liters</label>
          <input type="number" min="1" (input)="onInputLitersToGallons($event)" />
          <span>Gallons</span>
          <strong>{{ toGallons() }}</strong>
        </div>
      </div>
    </div>
  `
})
export class VolumeConversionComponent {
  private inputGallons = 0;
  private inputLiters = 0;
  toLiters = signal<number | null>(null);
  toGallons = signal<number | null>(null);

  onInputGallonsToLiters(event: Event) {
    this.inputGallons = +(event.target as HTMLInputElement).value;
    this.toLiters.set(this.inputGallons * 3.78541);
  }

  onInputLitersToGallons(event: Event) {
    this.inputLiters = +(event.target as HTMLInputElement).value;
    this.toGallons.set(Math.round((this.inputLiters / 3.78541 + Number.EPSILON) * 10000) / 10000);
  }
}
