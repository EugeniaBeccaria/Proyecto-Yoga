// a revisar xq no anda

declare module "react-scroll" {
  import * as React from "react";

  export interface LinkProps {
    to: string;
    smooth?: boolean;
    duration?: number;
    offset?: number;
    children?: React.ReactNode;
    [key: string]: unknown;
  }

  export const Link: React.FC<LinkProps>;

  export interface ElementProps {
    name: string;
    children?: React.ReactNode;
    [key: string]: unknown;
  }

  export const Element: React.FC<ElementProps>;
}
