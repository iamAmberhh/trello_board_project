// i18n language  match title
import { i18n } from '@/lang'
import langZhtw from '@/lang/zh-tw'
import settings from '@/settings'

const { t, te } = i18n.global
export const langTitle = (title) => {
  if (!title) {
    return settings.title
  }
  for (const key of Object.keys(langZhtw)) {
    if (te(`${key}.${title}`) && t(`${key}.${title}`)) {
      return t(`${key}.${title}`)
    }
  }

  return title
}

export const getLangInstance = () => {
  return i18n.global
}