# CodeMirror addon with TypeScript

This project is a demo project to show how to create [CodeMirror](https://codemirror.net/) addon with TypeScript. The addon source code come from [Fullscreen addon](https://codemirror.net/addon/display/fullscreen.js).

## Development requirement

-   React
-   [react-codemirror2](https://github.com/scniro/react-codemirror2)
-   [codemirror](https://codemirror.net/)

## enable ESLint 7 with create-react-app 3

-   remove eslint from node_modules
-   add `"noImplicitAny": false,` to tsconfig.json
