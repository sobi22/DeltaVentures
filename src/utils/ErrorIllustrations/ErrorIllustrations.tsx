import styles from './ErrorIllustrations.module.css';
import { Box, Button, Stack, Typography } from '@mui/material';
import ServerError from 'images/errorIllustrations/500Page.svg?react';
import PageNotFound from 'images/errorIllustrations/404Page.svg?react';
import Unauthorized from 'images/errorIllustrations/401Page.svg?react';
import ErrorPage from 'images/errorIllustrations/errorPage.svg?react';
import NoInternet from 'images/errorIllustrations/noInternet.svg?react';
import OtpError from 'images/errorIllustrations/otpError.svg?react';
import { generatePath, useNavigate } from 'react-router-dom';
import routes from 'routes';

export interface ErrorIllustrationsProps {
  type:
    | '404'
    | '401'
    | '403'
    | '412'
    | '419'
    | '500'
    | 'network'
    | 'error'
    | 'serverUnreachable'
    | 'underMaintenance'
    | 'serverUnavailable'
    | 'paymentNotFound';
}
const ErrorIllustrations = ({ type }: ErrorIllustrationsProps) => {
  const navigate = useNavigate();

  const icon = () => {
    const iconProps = { width: '100%', height: '100%' };
    switch (type) {
      case '404':
        return <PageNotFound {...iconProps} />;
      case '401':
      case '403':
      case '412':
        return <Unauthorized {...iconProps} />;
      case '419':
        return <OtpError {...iconProps} />;
      case '500':
      case 'serverUnreachable':
        return <ServerError {...iconProps} />;
      case 'network':
        return <NoInternet {...iconProps} />;
      case 'error':
        return <ErrorPage {...iconProps} />;
      case 'underMaintenance':
        return '';
      case 'serverUnavailable':
        return <ServerError {...iconProps} />;
      case 'paymentNotFound':
        return <ServerError {...iconProps} />;
      default:
        return <PageNotFound {...iconProps} />;
    }
  };

  const title = () => {
    switch (type) {
      case '404':
        return `Page not found`;
      case '401':
      case '403':
        return `Not Authorised`;
      case '412':
        return `Masquerade Session Expired`;
      case '419':
        return 'OTP Expired';
      case '500':
        return `Error 500: Internal server error`;
      case 'network':
        return `Slow or no internet connection`;
      case 'serverUnreachable':
        return `Server Unreachable`;
      case 'error':
        return `Something went wrong`;
      case 'underMaintenance':
        return <h1>We’ll be back soon!</h1>;
      case 'serverUnavailable':
        return `Server Unavailable`;
      case 'paymentNotFound':
        return `Payment is not available`;
      default:
        return `Sorry the page you asked couldn't be found`;
    }
  };

  const underMaintenanceText = (
    <Typography variant="body1">
      <Typography variant="body1">
        We are busy working to make the experience even more awesome, and be back online after the short maintenance break
      </Typography>
      <Typography>
        <br />
      </Typography>
      <Typography variant="body1">
        We apologize for the inconvenience and appreciate your patience. Thank you for giving us the opportunity to support you in your learning
        journey!
      </Typography>
    </Typography>
  );

  const text = () => {
    switch (type) {
      case '404':
        return `We're sorry, but the page you're looking for cannot be found. Please ensure that the URL is correct or try navigating back to the dashboard.`;
      case '403':
        return `Maybe you tried to access something you don't have access to`;
      case '401':
        return `This page is not publicly available.
        To access it please login first.`;
      case '412':
        return `It seems that your masquerade session has expired. To continue, please masquerade again.`;
      case '419':
        return 'Your OTP has expired. We have sent a new one to your email. You will be redirected to the OTP page now...';
      case '500':
        return `Our server encountered an unexpected error.
        This could be due to a technical issue, maintenance, or a problem with our system.
        We are actively working to resolve this. Please try again later.`;
      case 'network':
        return `Please check your internet settings and try again.`;
      case 'serverUnreachable':
        return `Our server didn't respond. Try reloading the page`;
      case 'error':
        return `Please try again later.`;
      case 'underMaintenance':
        return underMaintenanceText;
      case 'serverUnavailable':
        return `Server is unavailable at the moment. Please try again in some time.`;
      case 'paymentNotFound':
        return `Payment is not available for this learner in this batch.`;
      default:
        return `Sorry the page you asked for couldn't be found.`;
    }
  };

  return (
    <div className={styles.container}>
      <Box maxWidth={{ xs: '6rem', sm: '8rem', md: '10rem', lg: '12rem' }}>{icon()}</Box>
      <Stack gap={{ xs: 1, sm: 2 }} alignItems={{ xs: 'center', sm: 'start' }}>
        <Typography variant="h2" fontSize={{ xs: 24, sm: 32 }} textAlign={{ xs: 'center', sm: 'left' }}>
          {title()}
        </Typography>
        <Typography variant="subtitle1" className={styles.subText}>
          {text()}
        </Typography>
        <Box mt={2}>
          {type === '404' || type === '403' ? (
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                navigate(generatePath(routes.ROOT));
              }}
            >
              Visit dashboard
            </Button>
          ) : null}
          {type === '401' ? (
            <Button variant="contained" color="primary">
              <Typography>LOGIN AGAIN</Typography>
            </Button>
          ) : null}
          {type === 'network' || type === 'serverUnreachable' ? (
            <Button onClick={() => window.location.reload()} variant="contained" color="primary">
              <Typography>RETRY</Typography>
            </Button>
          ) : null}
        </Box>
      </Stack>
    </div>
  );
};

export default ErrorIllustrations;
