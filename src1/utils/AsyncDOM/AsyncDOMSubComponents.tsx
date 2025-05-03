import React from 'react';
// import { ErrorComponentProps } from '../ErrorComponent/ErrorComponent';

interface LoaderProps {
  show?: boolean;
  children: React.ReactNode;
}
function AsyncDOMLoader(props: LoaderProps) {
  return <div></div>;
}
AsyncDOMLoader.customType = 'AsyncDOMLoader';

type ErrorCompProps = {
  show?: boolean;
} & ErrorComponentProps;
function AsyncDOMErrorComp(props: ErrorCompProps) {
  return <div></div>;
}
AsyncDOMErrorComp.customType = 'AsyncDOMErrorComp';

interface ContentProps {
  show?: boolean;
  children: React.ReactNode;
}
function AsyncDOMContent(props: ContentProps) {
  return <div></div>;
}
AsyncDOMContent.customType = 'AsyncDOMContent';

interface CompProps {
  show: boolean;
  children: React.ReactNode;
}
function AsyncDOMComp(props: CompProps) {
  return <div></div>;
}
AsyncDOMComp.customType = 'AsyncDOMComp';

export { AsyncDOMLoader, AsyncDOMErrorComp, AsyncDOMContent, AsyncDOMComp };
