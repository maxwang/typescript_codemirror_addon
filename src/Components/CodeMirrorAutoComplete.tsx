import React, { useState } from "react";
import { Controlled as CodeMirror } from "react-codemirror2";
import "codemirror/mode/xml/xml";
import "codemirror/addon/hint/show-hint.js";
import "codemirror/addon/hint/html-hint.js"
import 'codemirror/theme/material.css';
import 'codemirror/addon/hint/show-hint.css';

const CodeMirrorAutoComplete: React.FC = () => {
    const [value, setValue] = useState("this is a test");

    return (
        <CodeMirror
            value={value}
            options={{
                mode: "text/html",
                theme: "material",
                lineNumbers: true,
                lineWrapping: true,
                indentWithTabs: true,
                gutter: true,
                tabSize: 4,
                autofocus: true,
                extraKeys: {
                    "Ctrl-Space": "autocomplete"
                }
            }}
            onBeforeChange={(editor, data, value) => {
                setValue(value);
            }}
        />
    );
};

export default CodeMirrorAutoComplete;
