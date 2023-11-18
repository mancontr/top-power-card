import { HomeAssistant } from "custom-card-helpers"

export interface TopPowerCardConfig {
  total: CircuitEntry
  circuits: CircuitEntry[]
  title?: string
  limit?: number
  idle_threshold?: number
  high_threshold?: number
}

export interface CircuitEntry {
  entity: string
  name?: string
  idle_threshold?: number
  high_threshold?: number
}

export interface EntityHistoryEntry {
  s: string
  lu: number
}

export interface ExtendedHomeAssistant extends HomeAssistant {
  entities: {
    [k: string]: {
      entity_id: string
      name?: string
    }
  }
}
