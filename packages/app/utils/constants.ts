export const CARD_HEIGHT = 70

// BLE constants
export const SCAN_TIMEOUT = 10000 // 10 seconds
export const RETRY_INTERVAL = 60000 // 1 minute
export const COMPANY_ID = 0x0E0
export const MAJOR = 1234;
export const MINOR = 4321;
export const SHOULD_ADVERTISE = true;

export const BACKGROUND_BLE_TASK = 'background-ble-scan'

// External links
export const LINKS = {
  FEEDBACK_FORM: 'https://app.formbricks.com/s/cmbgfzsx80ut7sm01an3v7bz3',
  GITHUB_REPO: 'https://github.com/psycho-baller/exo',
  GITHUB_ISSUES: 'https://github.com/psycho-baller/exo/issues',
  YOUTUBE_TUTORIAL: 'https://youtube.com/shorts/FhcSiat6ihM', // TODO: Replace with actual YouTube tutorial link
  KOFI_DONATION: 'https://ko-fi.com/ramimaalouf'
} as const
