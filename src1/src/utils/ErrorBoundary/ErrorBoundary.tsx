import React from 'react';
import { CustomError, stringMatchAgainstArrayOfStrings } from 'utils';
import ErrorIllustrations from '../ErrorIllustrations';
import Loader from '../Loader';

interface Props {
  children: React.ReactNode;
}

interface State {
  error: false | Error | Response | CustomError<any>;
  pageHidden: boolean;
}

class ErrorBoundary extends React.Component<Props, State> {
  state: State = { error: false, pageHidden: false };

  static getDerivedStateFromError(error: Error) {
    // Update state so the next render will show the fallback UI.
    return { error };
  }

  visibilityChangeHandler = () => {
    if (this.state.error && this.state.pageHidden && !document.hidden) {
      window.location.reload();
    }
    if (this.state.pageHidden !== document.hidden)
      this.setState({
        pageHidden: document.hidden,
      });
  };

  componentDidMount() {
    document.addEventListener('visibilitychange', this.visibilityChangeHandler, false);
  }

  render() {
    if (this.state.error) {
      if (
        this.state.error instanceof Error &&
        stringMatchAgainstArrayOfStrings(this.state.error.message.toLowerCase(), ['loading', 'chunk', 'failed'])
      )
        return <Loader />;

      return <ErrorIllustrations type="error" />;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
