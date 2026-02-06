import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-telex-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="page-wrapper">
      <div class="converter-card">
        <header>
          <h1>VN Telex Converter</h1>
          <p>Type in English/German to get Vietnamese characters.</p>
        </header>

        <main>
          <div class="input-section">
            <label for="telex-input">Input (Telex Rules)</label>
            <textarea
              id="telex-input"
              [(ngModel)]="rawText"
              (input)="convert()"
              placeholder="e.g. Tieesng vieejt, not 'Tieengs Vieetj'"
            >
            </textarea>
          </div>

          <div class="output-section" *ngIf="convertedText">
            <label>Vietnamese Result</label>
            <div class="result-display">
              {{ convertedText }}
            </div>
            <button class="copy-btn" (click)="copy()">
              {{ copyStatus }}
            </button>
          </div>
        </main>

        <footer>
          <small>Rules: aa=â, aw=ă, ee=ê, oo=ô, ow=ơ, uw=ư, dd=đ | s, f, r, x, j for tones</small>
        </footer>
      </div>
    </div>
  `,
  styles: [
    `
      .page-wrapper {
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
        background-color: #f0f2f5;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        padding: 20px;
      }
      .converter-card {
        background: white;
        width: 100%;
        max-width: 700px;
        padding: 2rem;
        border-radius: 16px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
      }
      header h1 {
        margin: 0;
        color: #1a73e8;
        font-size: 1.8rem;
      }
      header p {
        color: #5f6368;
        margin-top: 5px;
      }

      .input-section {
        margin-top: 25px;
      }
      label {
        display: block;
        font-weight: 600;
        margin-bottom: 8px;
        color: #3c4043;
        font-size: 0.9rem;
      }

      textarea {
        width: 100%;
        height: 150px;
        padding: 15px;
        border: 2px solid #dadce0;
        border-radius: 8px;
        font-size: 1.1rem;
        box-sizing: border-box;
        transition: border-color 0.2s;
        outline: none;
      }
      textarea:focus {
        border-color: #1a73e8;
      }

      .output-section {
        margin-top: 25px;
        padding: 20px;
        background: #f8f9fa;
        border-radius: 8px;
        border: 1px dashed #dadce0;
      }
      .result-display {
        font-size: 1.2rem;
        color: #202124;
        line-height: 1.6;
        white-space: pre-wrap;
        margin-bottom: 15px;
      }
      .copy-btn {
        background: #1a73e8;
        color: white;
        border: none;
        padding: 10px 20px;
        border-radius: 6px;
        cursor: pointer;
        font-weight: 500;
      }
      .copy-btn:hover {
        background: #1557b0;
      }
      footer {
        margin-top: 30px;
        border-top: 1px solid #eee;
        padding-top: 15px;
        color: #70757a;
      }
    `,
  ],
})
export class TelexPageComponent {
  rawText: string = '';
  convertedText: string = '';
  copyStatus: string = 'Copy to Clipboard';

  private rules = [
    { raw: 'aa', res: 'â' },
    { raw: 'aw', res: 'ă' },
    { raw: 'ee', res: 'ê' },
    { raw: 'oo', res: 'ô' },
    { raw: 'ow', res: 'ơ' },
    { raw: 'uw', res: 'ư' },
    { raw: 'dd', res: 'đ' },
    { raw: 'as', res: 'á' },
    { raw: 'af', res: 'à' },
    { raw: 'ar', res: 'ả' },
    { raw: 'ax', res: 'ã' },
    { raw: 'aj', res: 'ạ' },
    { raw: 'âs', res: 'ấ' },
    { raw: 'âf', res: 'ầ' },
    { raw: 'âr', res: 'ẩ' },
    { raw: 'âx', res: 'ẫ' },
    { raw: 'âj', res: 'ậ' },
    { raw: 'ăs', res: 'ắ' },
    { raw: 'ăf', res: 'ằ' },
    { raw: 'ăr', res: 'ẳ' },
    { raw: 'ăx', res: 'ẵ' },
    { raw: 'ăj', res: 'ặ' },
    { raw: 'es', res: 'é' },
    { raw: 'ef', res: 'è' },
    { raw: 'er', res: 'ẻ' },
    { raw: 'ex', res: 'ẽ' },
    { raw: 'ej', res: 'ẹ' },
    { raw: 'ês', res: 'ế' },
    { raw: 'êf', res: 'ề' },
    { raw: 'êr', res: 'ể' },
    { raw: 'êx', res: 'ễ' },
    { raw: 'êj', res: 'ệ' },
    { raw: 'os', res: 'ó' },
    { raw: 'of', res: 'ò' },
    { raw: 'or', res: 'ỏ' },
    { raw: 'ox', res: 'õ' },
    { raw: 'oj', res: 'ọ' },
    { raw: 'ôs', res: 'ố' },
    { raw: 'ôf', res: 'ồ' },
    { raw: 'ôr', res: 'ổ' },
    { raw: 'ôx', res: 'ỗ' },
    { raw: 'ôj', res: 'ộ' },
    { raw: 'ơs', res: 'ớ' },
    { raw: 'ơf', res: 'ờ' },
    { raw: 'ơr', res: 'ở' },
    { raw: 'ơx', res: 'ỡ' },
    { raw: 'ơj', res: 'ợ' },
    { raw: 'us', res: 'ú' },
    { raw: 'uf', res: 'ù' },
    { raw: 'ur', res: 'ủ' },
    { raw: 'ux', res: 'ũ' },
    { raw: 'uj', res: 'ụ' },
    { raw: 'ưs', res: 'ứ' },
    { raw: 'ưf', res: 'ừ' },
    { raw: 'ưr', res: 'ử' },
    { raw: 'ưx', res: 'ữ' },
    { raw: 'ưj', res: 'ự' },
    { raw: 'is', res: 'í' },
    { raw: 'if', res: 'ì' },
    { raw: 'ir', res: 'ỉ' },
    { raw: 'ix', res: 'ĩ' },
    { raw: 'ij', res: 'ị' },
    { raw: 'ys', res: 'ý' },
    { raw: 'yf', res: 'ỳ' },
    { raw: 'yr', res: 'ỷ' },
    { raw: 'yx', res: 'ỹ' },
    { raw: 'yj', res: 'ỵ' },
  ];

  convert() {
    let text = this.rawText;
    this.rules.forEach((rule) => {
      const regex = new RegExp(rule.raw, 'gi');
      text = text.replace(regex, (match) => {
        return match[0] === match[0].toUpperCase() ? rule.res.toUpperCase() : rule.res;
      });
    });
    this.convertedText = text;
  }

  async copy() {
    await navigator.clipboard.writeText(this.convertedText);
    this.copyStatus = 'Copied!';
    setTimeout(() => (this.copyStatus = 'Copy to Clipboard'), 2000);
  }
}