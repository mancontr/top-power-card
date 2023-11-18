import { html, css, LitElement } from "lit"
import L from "./intl"
import { ExtendedHomeAssistant, TopPowerCardConfig } from "./types"

class TopPowerCard extends LitElement {
  config: TopPowerCardConfig
  hass: ExtendedHomeAssistant

  static getConfigElement() {
    return document.createElement("top-power-card-editor")
  }

  static getStubConfig() {
    return {
      // ...
    }
  }

  static get properties() {
    return {
      hass: {},
      config: {},
    }
  }

  constructor() {
    super()
  }

  setConfig(config: TopPowerCardConfig) {
    this.config = config
  }

  L(key: string): string {
    return L(this.hass, key)
  }

  render() {
    if (!this.hass || !this.config) return html``

    const sections = this.config.sections.slice()
    sections.sort((a, b) => parseFloat(this.hass.states[a].state) > parseFloat(this.hass.states[b].state) ? 1 : -1)

    return html`
      <ha-card>
        <main>
          ${this.renderEntry(this.config.total)}
          ${sections.map(s => this.renderEntry(s))}
        </main>
      </ha-card>
    `
  }

  renderEntry(device: string) {
    const name = this.hass.entities[device].name || device
    const state = this.hass.states[device]
    const value = parseFloat(state.state)
    const status = value < (this.config.idle_threshold || 5)
      ? 'idle'
      : (value > (this.config.high_threshold || 300)
        ? 'high'
        : 'normal'
      )
    return html`
      <div class="section-entry ${status}">
        <div class="section-icon"><ha-icon icon="mdi:flash"></ha-icon></div>
        <div class="section-title">${name}</div>
        <div class="section-value">${value} W</div>
      </div>
    `
  }

  static get styles() {
    return css`
      ha-card {
        color: var(--primary-text-color,inherit);
      }
      .section-entry {
        display: flex;
        color: var(--state-switch-on-color, var(--state-switch-active-color, var(--state-active-color)));
        --mdc-icon-size: 32px;
      }
      .section-entry.idle {
        color: var(--state-switch-off-color, var(--state-switch-inactive-color, var(--state-inactive-color)));
      }
      .section-title {
        flex: 1 1 auto;
      }
    `
  }

}

customElements.define("top-power-card", TopPowerCard)
