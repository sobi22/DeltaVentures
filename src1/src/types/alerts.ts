import { SnackbarOrigin } from '@mui/material'

export type AlertsData = {
  variant: 'success' | 'warning' | 'error' | 'info'
  message: string
  closeOnTimeout?: boolean
  anchorOrigin?: SnackbarOrigin
}

export type AlertsFunctionType = (
  v: AlertsData['variant'],
  m: AlertsData['message']
) => void
