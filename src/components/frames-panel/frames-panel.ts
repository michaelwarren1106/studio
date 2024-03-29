import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import studioConfig from '../../config/config';
import { unsafeCSS } from 'lit';
import { Store } from '../../store/store';
import { compressParams } from '../../utils';
import framesPanelStyles from './frames-panel.css?inline';

declare global {
  interface HTMLElementTagNameMap {
    'studio-frames-panel': FramesPanel
  }
}

@customElement('studio-frames-panel')
export class FramesPanel extends LitElement {
  static styles = [css`${unsafeCSS(framesPanelStyles)}`];

  connectedCallback(){
    super.connectedCallback()
    Store.attach(this);
  }

  render() {
    console.log('STORE CODE: ',Store.code)
    return html`
      <div class="frames-container">
        ${Store.visibleWidths?.map((width) => {
          return html`
          <div class="frame">
            <iframe width="${width}" src="/frame.html?env=${compressParams({code: Store.code})}" sandbox?="${ifDefined(studioConfig.iframeSandbox)}"></iframe>
            <small class="frame-width">${width}px</small>
          </div>`
        })}
      </div>
    `;
  }
}
