import React, { useState } from "react";
import { Controlled as CodeMirror } from "react-codemirror2";
import "codemirror/mode/xml/xml";
import 'codemirror/theme/material.css';
import { FullScreenAddon } from "./FullScreenAddon";

// do not know where is the best place to add addon to system
FullScreenAddon();

const ControlledCodeMirror: React.FC = () => {
    const [value, setValue] = useState("this is a test");

    return (
        <CodeMirror
            value={value}
            options={{
                mode: "xml",
                theme: "material",
                lineNumbers: true,
                lineWrapping: true,
                indentWithTabs: true,
                gutter: true,
                tabSize: 4,
                autofocus: true,
            }}
            onBeforeChange={(editor, data, value) => {
                setValue(value);
            }}
            onKeyDown={(editor, event) => {
                if (event.code === "F11") {
                    editor.setOption(
                        "fullScreen",
                        !editor.getOption("fullScreen")
                    );

                    event.preventDefault();
                    event.stopPropagation();
                }
                if (event.code === "Escape") {
                    if (editor.getOption("fullScreen")) {
                        editor.setOption("fullScreen", false);
                    }
                }
            }}
        />
    );
};

export default ControlledCodeMirror;
