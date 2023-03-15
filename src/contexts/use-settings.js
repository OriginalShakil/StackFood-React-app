import { SettingsContext } from './settings-context'
import { useContext } from 'react'

export const useSettings = () => useContext(SettingsContext)
