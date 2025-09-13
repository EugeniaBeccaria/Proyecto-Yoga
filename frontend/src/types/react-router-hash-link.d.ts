declare module 'react-router-hash-link' {
  import * as React from 'react';
  import { HashLinkProps } from 'react-router-hash-link/dist/react-router-hash-link';
  export * from 'react-router-hash-link/dist/react-router-hash-link';
  export const HashLink: React.ForwardRefExoticComponent<HashLinkProps & React.RefAttributes<HTMLAnchorElement>>;
}
