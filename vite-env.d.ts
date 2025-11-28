/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_N8N_WEBHOOK_URL: string
  readonly VITE_N8N_CHATBOT_URL: string
  readonly VITE_API_TIMEOUT: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
