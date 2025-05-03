import { useState, useEffect } from 'react'
import ErrorIllustrations from '../ErrorIllustrations'

const ServiceUnavailable = (props: { error: Response }) => {
  const [isMaintenance, updateIsMaintenance] = useState(false)

  const checkGatewayError = () => {
    return fetch(props.error.url || `${process.env.REACT_APP_LMS_URL}`)
      .then((response: Response) => {
        if (response) {
          const xMaintenanceHeaderValue = response.headers.get('x-maintenance')
          if (xMaintenanceHeaderValue === 'true') {
            return true
          }
        }
        return false
      })
      .catch((e) => {
        return false
      })
  }

  useEffect(() => {
    checkGatewayError().then((isUnderMaintenance: boolean) => {
      if (isUnderMaintenance) {
        updateIsMaintenance(true)
      } else {
      }
    })
  }, [])

  return isMaintenance ? (
    <ErrorIllustrations type="underMaintenance" />
  ) : (
    <ErrorIllustrations type="serverUnavailable" />
  )
}

export default ServiceUnavailable
