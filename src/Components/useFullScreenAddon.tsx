import CodeMirror, { Editor } from "codemirror";
import "./FullScreenAddon.css";

export const useFullScreenAddon = (): void => {
    CodeMirror.defineOption(
        "fullScreen",
        false,
        (editor: Editor, val: boolean, old: boolean) => {
            if (old === CodeMirror.Init) old = false;
            if (!old === !val) return;
            if (val) {
                setFullscreen(editor);
            } else {
                setNormal(editor);
            }
        }
    );

    const setFullscreen = (editor: Editor) => {
        const wrap = editor.getWrapperElement();
        editor.state.fullScreenRestore = {
            scrollTop: window.pageYOffset,
            scrollLeft: window.pageXOffset,
            width: wrap.style.width,
            height: wrap.style.height,
        };
        wrap.style.width = "";
        wrap.style.height = "auto";
        wrap.className += " CodeMirror-fullscreen";
        document.documentElement.style.overflow = "hidden";
        editor.refresh();
    };

    const setNormal = (editor: Editor) => {
        const wrap = editor.getWrapperElement();
        wrap.className = wrap.className.replace(
            /\s*CodeMirror-fullscreen\b/,
            ""
        );
        document.documentElement.style.overflow = "";
        const info = editor.state.fullScreenRestore;
        wrap.style.width = info.width;
        wrap.style.height = info.height;
        window.scrollTo(info.scrollLeft, info.scrollTop);
        editor.refresh();
    };
};
