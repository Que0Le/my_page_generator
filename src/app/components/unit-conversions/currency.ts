import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigService } from '../../config/config.service';

@Component({
  selector: 'unit-conversion-currency',
  standalone: true,
  imports: [CommonModule],
  styleUrls: ['../../shared/styles/converter-card.css'],
  template: `
    <div class="converter-container-single-row">
      <div class="card blue">
        <h3>USD conversion</h3>
        <small>VND: {{ formatNumber(rate_USD_VND()) }} EUR: {{ rate_USD_EUR() }}</small>
        <small>last updated: {{ lastUpdatedUSD() }} </small>
        <div class="row-6">
          <input type="number" min="1" (input)="onInputUSD($event)" />
          <label>USD => </label>
          <strong>{{ formatNumber(conversion_USD_VND()) }}</strong>
          <span>VND</span>
          <strong>{{ conversion_USD_EUR() }}</strong>
          <span>EUR</span>
        </div>
      </div>

      <div class="card red">
        <h3>EUR conversion</h3>
        <small>VND: {{ formatNumber(rate_EUR_VND()) }} USD: {{ rate_EUR_USD() }}</small>
        <small>last updated: {{ lastUpdatedEUR() }} </small>
        <div class="row-6">
          <input type="number" min="1" (input)="onInputEUR($event)" />
          <label>EUR =></label>
          <strong>{{ formatNumber(conversion_EUR_VND()) }}</strong>
          <span>VND</span>
          <strong>{{ conversion_EUR_USD() }}</strong>
          <span>USD</span>
        </div>
      </div>
      <a href="https://www.exchangerate-api.com">Rates By Exchange Rate API</a>
    </div>
  `,
})

export class UnitConversionCurrencyComponent {
  private input_USD = 0;
  private input_EUR = 0;
  lastUpdatedUSD = signal<string | null>(null);
  lastUpdatedEUR = signal<string | null>(null);
  rate_USD_VND = signal<number | null>(null);
  rate_USD_EUR = signal<number | null>(null);
  rate_EUR_VND = signal<number | null>(null);
  rate_EUR_USD = signal<number | null>(null);
  conversion_USD_VND = signal<number | null>(null);
  conversion_USD_EUR = signal<number | null>(null);
  conversion_EUR_VND = signal<number | null>(null);
  conversion_EUR_USD = signal<number | null>(null);

  constructor(private config: ConfigService) {}

  async ngOnInit() {
    this.getRate();
  }

  onInputUSD(event: Event) {
    this.input_USD = +(event.target as HTMLInputElement).value;
    const rate_usd_vnd = this.rate_USD_VND();
    const rate_usd_eur = this.rate_USD_EUR();
    if (rate_usd_vnd == null || rate_usd_eur == null) return;
    this.conversion_USD_VND.set(
      Math.round((this.input_USD * rate_usd_vnd + Number.EPSILON) * 1000000) / 1000000
    );
    this.conversion_USD_EUR.set(
      Math.round((this.input_USD * rate_usd_eur + Number.EPSILON) * 1000000) / 1000000
    );
  }

  onInputEUR(event: Event) {
    this.input_EUR = +(event.target as HTMLInputElement).value;
    const rate_eur_vnd = this.rate_EUR_VND();
    const rate_eur_usd = this.rate_EUR_USD();
    if (rate_eur_vnd == null || rate_eur_usd == null) return;
    this.conversion_EUR_VND.set(
      Math.round((this.input_EUR * rate_eur_vnd + Number.EPSILON) * 1000000) / 1000000
    );
    this.conversion_EUR_USD.set(
      Math.round((this.input_EUR * rate_eur_usd + Number.EPSILON) * 1000000) / 1000000
    );
  }

  async getRate(): Promise<number> {
    const mocked_raw_obj_USD = {
      result: 'success',
      time_last_update_unix: 1768435351,
      time_last_update_utc: 'Thu, 15 Jan 2026 00:02:31 +0000',
      time_next_update_unix: 1768522301,
      time_next_update_utc: 'Fri, 16 Jan 2026 00:11:41 +0000',
      time_eol_unix: 0,
      base_code: 'USD',
      rates: { USD: 1, EUR: 0.858506, VND: 26201.575316 },
    };

    const mocked_raw_obj_EUR = {
      result: 'success',
      time_last_update_unix: 1768435351,
      time_last_update_utc: 'Thu, 15 Jan 2026 00:02:31 +0000',
      time_next_update_unix: 1768522301,
      time_next_update_utc: 'Fri, 16 Jan 2026 00:11:41 +0000',
      time_eol_unix: 0,
      base_code: 'USD',
      rates: { EUR: 1, USD: 1.164815, VND: 30514.688939 },
    };
    let rate_USD_obj = null;
    let rate_EUR_obj = null;
    // USD
    if (this.config.isMocked) {
      const res_USD = await fetch(`https://open.er-api.com/v6/latest/USD`);
      if (!res_USD.ok) {
        console.log('Error loading USD rate: ', res_USD);
        return -1;
      }
      rate_USD_obj = await res_USD.json();
    } else {
      rate_USD_obj = mocked_raw_obj_USD;
    }
    this.lastUpdatedUSD.set(new Date(rate_USD_obj.time_last_update_unix * 1000).toString());
    this.rate_USD_EUR.set(rate_USD_obj.rates.EUR);
    this.rate_USD_VND.set(rate_USD_obj.rates.VND);
    // EUR
    if (this.config.isMocked) {
      const res_EUR = await fetch(`https://open.er-api.com/v6/latest/EUR`);
      if (!res_EUR.ok) {
        console.log('Error loading USD rate: ', res_EUR);
        return -1;
      }
      rate_EUR_obj = await res_EUR.json();
    } else {
      rate_EUR_obj = mocked_raw_obj_EUR;
    }
    this.lastUpdatedEUR.set(new Date(rate_EUR_obj.time_last_update_unix * 1000).toString());
    this.rate_EUR_USD.set(rate_EUR_obj.rates.USD);
    this.rate_EUR_VND.set(rate_EUR_obj.rates.VND);
    //
    return 0;
  }

  // Represent a large number as i.e 5,816,749.7202
  formatNumber(value: number | null): string {
    if (value == null) return '';
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 4,
    }).format(value);
  }
}
