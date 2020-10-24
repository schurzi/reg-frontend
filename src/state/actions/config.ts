export const LOAD_CONFIG = '[Config] Load'

export const loadConfig = (config: {}) => ({ type: LOAD_CONFIG, payload: config })
