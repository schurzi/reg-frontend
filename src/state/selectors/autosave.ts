import { AppState } from '..'

export const getLastSaved = () => (s: AppState) => s.autosave.lastSaved
