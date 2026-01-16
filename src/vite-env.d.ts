/// <reference types="vite/client" />

// CSS Module type definitions
declare module '*.module.scss' {
  const classes: { [key: string]: string };
  export default classes;
}

// Allow importing SCSS files
declare module '*.scss' {
  const content: string;
  export default content;
}

// SVG as React components (using ?react suffix)
declare module '*.svg?react' {
  import type { FC, SVGProps } from 'react';
  const ReactComponent: FC<SVGProps<SVGSVGElement>>;
  export default ReactComponent;
}

// SVG as URL
declare module '*.svg' {
  const src: string;
  export default src;
}
