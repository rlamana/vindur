/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_USE_API_FIXTURES: boolean
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}