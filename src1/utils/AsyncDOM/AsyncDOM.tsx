import React, { Fragment } from 'react';
import { AsyncDOMLoader, AsyncDOMErrorComp, AsyncDOMComp, AsyncDOMContent } from './AsyncDOMSubComponents';
// import ErrorComponent from '../ErrorComponent/ErrorComponent';
import Loader from '../Loader';

interface Props {
  loading?: boolean;
  error?: boolean;
  data?: boolean;
  children: any;
  loaderProps?: any;
}

class AsyncDOM extends React.Component<Props> {
  static Loader = AsyncDOMLoader;

  static Error = AsyncDOMErrorComp;

  static Content = AsyncDOMContent;

  static Comp = AsyncDOMComp;

  hasLoaderComp: boolean = false;

  hasErrorComp: boolean = false;

  canShowLoader = (show?: boolean) => {
    if (typeof show === 'boolean') {
      return show;
    }
    return this.props.loading === true && !this.props.data;
  };

  canShowError = (show?: boolean) => {
    if (typeof show === 'boolean') {
      return show;
    }
    return this.props.error === true && !this.props.loading;
  };

  canShowContent = (show?: boolean) => {
    if (typeof show === 'boolean') {
      return show;
    }
    if (this.props.error) {
      return false;
    }
    if (this.props.data) {
      return true;
    }
    return this.props.data !== false && !this.props.loading;
  };

  renderChild = (child: React.ReactElement) => {
    if (!child) {
      return null;
    }

    if ((child.type as any).customType === AsyncDOM.Loader.customType) {
      if (this.canShowLoader(child.props.show)) {
        return <Fragment key="loader">{child.props.children}</Fragment>;
      }
      return null;
    }
    if ((child.type as any).customType === AsyncDOM.Error.customType) {
      // if (this.canShowError(child.props.show)) {
      //   return (
      //     <ErrorComponent error={child.props.error} key="error">
      //       {child.props.children}
      //     </ErrorComponent>
      //   );
      }
      return null;
    }
    // if ((child.type as any).customType === AsyncDOM.Content.customType) {
    //   if (this.canShowContent(child.props.show)) {
    //     return <Fragment key="content">{child.props.children}</Fragment>;
    //   }
    // }
    // if (child.props.show) {
    //   return <Fragment key="other">{child.props.children}</Fragment>;
    // }

    // return null;
  };

  render() {
    if (!this.props.children) {
      return null;
    }
    const children = [];

    React.Children.forEach(this.props.children, (child) => {
      if (!child) {
        return;
      }
      if (child.type.customType === AsyncDOM.Loader.customType) {
        this.hasLoaderComp = true;
      }
      children.push(child);
    });

    if (!this.hasLoaderComp) {
      children.unshift(
        <AsyncDOMLoader>
          <Loader loaderProps={this.props.loaderProps} />
        </AsyncDOMLoader>
      );
    }
    return <Fragment>{children.map((child) => this.renderChild(child))}</Fragment>;
  }
}

export default AsyncDOM;
