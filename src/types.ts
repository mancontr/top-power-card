import { HomeAssistant } from "custom-card-helpers"

export interface TopPowerCardConfig {
  total: string
  sections: string[]
  limit?: number
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
