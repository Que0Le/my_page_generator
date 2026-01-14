import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-countdown',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div style="max-width:300px;margin:2rem auto;text-align:center">
      <h2>Countdown</h2>

      <input
        type="number"
        min="1"
        (input)="onInput($event)"
      />

      <br /><br />

      <button (click)="start()">Start</button>

      @if (remaining() !== null) {
        <p>
          Remaining: <strong>{{ remaining() }}</strong>
        </p>
      }
    </div>
  `
})
export class CountdownComponent {
  private inputSeconds = 0;
  remaining = signal<number | null>(null);
  private timerId: any;

  onInput(event: Event) {
    this.inputSeconds = +(event.target as HTMLInputElement).value;
  }

  start() {
    if (this.timerId) clearInterval(this.timerId);

    this.remaining.set(this.inputSeconds);

    this.timerId = setInterval(() => {
      const value = this.remaining();

      if (value !== null && value > 0) {
        this.remaining.set(value - 1);
      } else {
        clearInterval(this.timerId);
        this.timerId = null;
      }
    }, 1000);
  }
}
