export { useFileRouter, type FileRouterContextType } from "./context.js";
export * from "./errors.js";
export { FileRouter, type FileRouterProps } from "./fileRouter.js";
export * from "./link.js";
export * from "./pageConfig.js";
export type * from "./types.js";
import { HeadContent, HeadOutlet } from "./head.js";
export declare const Head: {
    /**
   * - During SSG, renders content to the document head via a corresponding `<Head.Outlet>` component placed in your `document.tsx`.
   * - During CSR, updates document title.
   * @example
   * // src/pages/index.tsx
   * export default function Index() {
   *   return (
   *     <div>
   *       <Head.Content>
   *         <title>My App - Home</title>
   *       </Head.Content>
   *       <h1>Home</h1>
   *     </div>
   *   )
   }
   */
    Content: typeof HeadContent;
    /**
   * Used with SSG. Renders content to the document head from a `<Head>` component in the currently rendered page.
   * @example
   * // src/pages/document.tsx
   * export default function Document() {
   *   return (
   *     <html lang="en">
   *       <head>
   *         <meta charset="utf-8" />
   *         <meta name="viewport" content="width=device-width, initial-scale=1" />
   *         <Head.Outlet />
   *       </head>
   *       <Body.Outlet />
   *     </html>
   *   )
   }
   */
    Outlet: typeof HeadOutlet;
};
export declare const Body: {
    /**
     * Used with SSG 'document' files. Renders content to the document body via a corresponding `<Body.Outlet>` component placed in your `document.tsx`.
     * @example
     * // src/pages/document.tsx
     * export default function Document() {
     *   return (
     *     <html lang="en">
     *       <head>
     *         <meta charset="utf-8" />
     *         <meta name="viewport" content="width=device-width, initial-scale=1" />
     *         <Head.Outlet />
     *       </head>
     *       <Body.Outlet />
     *     </html>
     *   )
     }
     */
    Outlet: typeof BodyOutlet;
};
declare function BodyOutlet(): Kiru.Element;
//# sourceMappingURL=index.d.ts.map