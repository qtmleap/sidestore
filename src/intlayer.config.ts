import { type IntlayerConfig, Locales } from 'intlayer'

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.JAPANESE, Locales.ENGLISH],
    defaultLocale: Locales.ENGLISH
  }
}

export default config
