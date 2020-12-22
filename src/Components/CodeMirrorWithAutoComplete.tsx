import React, { useState } from "react";
import { Controlled as CodeMirror } from "react-codemirror2";
import "codemirror/mode/xml/xml";
import "codemirror/theme/material.css";
import "../mode-nimblex-formula";

import "codemirror/addon/hint/show-hint.js";
// import "codemirror/addon/hint/sql-hint";
import "codemirror/addon/hint/show-hint.css";

import { useNimblexTemplateAutoCompleteAddon, useFormulaTemplateAutoCompleteAddon } from "./useAutoCompleteAddon";

const CodeMirrorWithAutoComplete: React.FC = () => {
    const [value, setValue] = useState("this is a test");
    useFormulaTemplateAutoCompleteAddon();
    return (
        <CodeMirror
            value={value}
            options={{
                mode: "nimblex-formula",
                theme: "material",
                lineNumbers: true,
                lineWrapping: true,
                indentWithTabs: true,
                gutter: true,
                tabSize: 4,
                autofocus: true,
                extraKeys: {
                    "Ctrl-Space": "autocomplete",
                },
            }}
            onBeforeChange={(editor, data, value) => {
                setValue(value);
            }}
        />
    );
};

export default CodeMirrorWithAutoComplete;
