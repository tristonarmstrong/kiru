import { createElement } from "../element.js";
import { RouterContext } from "./context.js";
import { FileRouterController } from "./fileRouterController.js";
import { fileRouterInstance } from "./globals.js";
import { onCleanup } from "../hooks/onCleanup.js";
export const FileRouter = ({ config }) => {
    fileRouterInstance.current?.dispose();
    let router = (fileRouterInstance.current = new FileRouterController());
    let configStr = "";
    onCleanup(() => router.dispose());
    const onUpdate = (props) => {
        const newConfigStr = JSON.stringify(props.config);
        if (newConfigStr !== configStr) {
            config = props.config;
            configStr = newConfigStr;
            router.init(config);
        }
    };
    return (nextProps) => (onUpdate(nextProps),
        createElement(RouterContext, { value: router.contextValue }, router.getChildren()));
};
//# sourceMappingURL=fileRouter.js.map