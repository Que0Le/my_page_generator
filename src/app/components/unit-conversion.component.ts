import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'unit-conversion-inch-cm',
  standalone: true,
  imports: [CommonModule],
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
  `,
  styles: [
    `
      .converter-container {
        max-width: 360px;
        margin: 2rem auto;
        display: grid;
        gap: 1.25rem;
        font-family: system-ui, sans-serif;
      }

      .card {
        padding: 1.25rem;
        border-radius: 12px;
        background: #fff;
        box-shadow: 0 6px 18px rgba(0, 0, 0, 0.08);
        transition: transform 0.15s ease, box-shadow 0.15s ease;
      }

      .card:hover {
        transform: translateY(-2px);
        box-shadow: 0 10px 24px rgba(0, 0, 0, 0.12);
      }

      .card h3 {
        margin: 0 0 0.75rem;
        font-size: 1.1rem;
      }

      .card small {
        display: block;
        margin-bottom: 0.75rem;
        color: #666;
      }

      .row {
        display: grid;
        grid-template-columns: auto 1fr auto max-content;
        align-items: center;
        gap: 0.5rem;
      }

      label,
      span {
        font-weight: 500;
      }

      input {
        padding: 0.45rem 0.5rem;
        border-radius: 6px;
        border: 1px solid #ccc;
        font-size: 0.95rem;
      }

      strong {
        padding: 0.45rem 0.6rem;
        border-radius: 6px;
        background: rgba(0, 0, 0, 0.05);
        white-space: nowrap; /* make sure to wrap text */
        font-variant-numeric: tabular-nums;
        text-align: right;
      }

      /* Color themes */
      .card.green {
        border-left: 6px solid #2ecc71;
      }

      .card.blue {
        border-left: 6px solid #3498db;
      }
    `,
  ],
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
