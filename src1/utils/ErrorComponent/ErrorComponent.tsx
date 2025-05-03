// import { CustomError, isNetworkError } from 'utils'
import React, { Fragment, ReactNode } from 'react'
import ErrorIllustrations from '../ErrorIllustrations'
import styles from './ErrorComponent.module.css'
import { SerializedError } from '@reduxjs/toolkit'
// import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query'
import ServiceUnavailable from '../ErrorBoundary/ServiceUnavailable'
import { ErrorIllustrationsProps } from '../ErrorIllustrations/ErrorIllustrations'

export interface ErrorComponentProps {
  error:
    | boolean
    | Error
    | Response
    // | CustomError<any>
    // | FetchBaseQueryError
    | SerializedError
  children: ReactNode
}

const ErrorComponent = (props: ErrorComponentProps) => {
  // if (props.error instanceof Error && isNetworkError(props.error.message))
  //   return <ErrorIllustrations type="network" />

  if (typeof props.error !== 'boolean') {
    // if ('error' in props.error && isNetworkError(props.error.error))
    //   return <ErrorIllustrations type="network" />
    if ('status' in props.error && typeof props.error.status === 'number') {
      if ([401, 403, 412, 419, 500].includes(props.error.status))
        return (
          <ErrorIllustrations
            type={
              props.error.status.toString() as ErrorIllustrationsProps['type']
            }
          />
        )
    }
  }

  if (props.error instanceof Response) {
    if (props.error.status === 401) {
      return <ErrorIllustrations type="401" />
    }
    if (props.error.status === 503)
      return <ServiceUnavailable error={props.error} />
    if (props.error.status === 404) return <ErrorIllustrations type="404" />
  }

  if (
    props.error instanceof Error &&
    props.error.message.includes('Invalid access token')
  ) {
    return <ErrorIllustrations type="401" />
  }

  return <Fragment>{props.children}</Fragment>
}

export default ErrorComponent
