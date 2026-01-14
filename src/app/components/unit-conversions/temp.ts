import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'unit-conversion-temp-c-f',
  standalone: true,
  imports: [CommonModule],
  styleUrls: [
    '../../shared/styles/converter-card.css'
  ],
  template: `
    <div class="converter-container">
      <div class="card blue">
        <h3>°C → °F</h3>
        <small>(1°C x 9/5) + 32 = 33.8°F</small>

        <div class="row">
          <label>°C</label>
          <input type="number" min="1" (input)="onInputC($event)" />
          <span>°F</span>
          <strong>{{ toF() }}</strong>
        </div>
      </div>

      <div class="card red">
        <h3>°F → °C</h3>
        <small>(123°F − 32) × 5/9 = 50.556°C</small>

        <div class="row">
          <label>°F</label>
          <input type="number" min="1" (input)="onInputF($event)" />
          <span>°C</span>
          <strong>{{ toC() }}</strong>
        </div>
      </div>
    </div>
  `
})
export class UnitConversionTempCFComponent {
  private inputC = 0;
  private inputF = 0;
  toF = signal<number | null>(null);
  toC = signal<number | null>(null);

  onInputC(event: Event) {
    this.inputC = +(event.target as HTMLInputElement).value;
    this.toF.set(Math.round((this.inputC * 9 / 5 + 32 + Number.EPSILON) * 10000) / 10000);
  }

  onInputF(event: Event) {
    this.inputF = +(event.target as HTMLInputElement).value;
    this.toC.set(Math.round(((this.inputF - 32) * 5 / 9 + Number.EPSILON) * 10000) / 10000);
  }
}
