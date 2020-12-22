import CodeMirror, { Editor } from "codemirror";
import "codemirror/addon/hint/show-hint.js";
// import "codemirror/addon/hint/sql-hint";
import "codemirror/addon/hint/show-hint.css";

export const useNimblexTemplateAutoCompleteAddon = (): void => {
    // CodeMirror.commands.autocomplete = function(cm) {
    //     cm.showHint({hint: CodeMirror.hint.sql});
    // }

    CodeMirror.registerHelper("hint", "nimblex-template", function (
        editor: Editor,
        options
    ) {
        // var spec = CodeMirror.resolveMode("text/x-sql");
        const cur = editor.getCursor();
        const token = editor.getTokenAt(cur);

        let inner = CodeMirror.innerMode(editor.getMode(), token.state);
        if (inner.mode.name != "nimblex-template") return;

        let start = token.start,
            end = cur.ch,
            word = token.string.slice(0, end - start);

        if (/[^\w$_-]/.test(word)) {
            word = "";
            start = end = cur.ch;
        }
        
        if (token.end > cur.ch) {
            token.end = cur.ch;
            token.string = token.string.slice(0, cur.ch - token.start);
        }

        // if (token.string.match(/^[.`"'\w@][\w$#]*$/g)) {
        //     search = token.string;
        //     start = token.start;
        //     end = token.end;
        // } else {
        //     start = end = cur.ch;
        //     search = "";
        // }

        // console.log(search);
        const list = ["hah", "foo", "bar"];
        return {
            list: list,
            from: CodeMirror.Pos(cur.line, start),
            to: CodeMirror.Pos(cur.line, end),
        };
    });
};


export const useFilterTemplateAutoCompleteAddon = (): void => {
    CodeMirror.registerHelper("hint", "nimblex-filter", function (
        editor: Editor,
        options
    ) {
        // var spec = CodeMirror.resolveMode("text/x-sql");
        const cur = editor.getCursor();
        const token = editor.getTokenAt(cur);

        let inner = CodeMirror.innerMode(editor.getMode(), token.state);
        if (inner.mode.name != "nimblex-filter") return;

        let start = token.start,
            end = cur.ch,
            word = token.string.slice(0, end - start);

        if (/[^\w$_-]/.test(word)) {
            word = "";
            start = end = cur.ch;
        }
        
        if (token.end > cur.ch) {
            token.end = cur.ch;
            token.string = token.string.slice(0, cur.ch - token.start);
        }

        // if (token.string.match(/^[.`"'\w@][\w$#]*$/g)) {
        //     search = token.string;
        //     start = token.start;
        //     end = token.end;
        // } else {
        //     start = end = cur.ch;
        //     search = "";
        // }

        // console.log(search);
        const list = ["hah", "foo", "bar"];
        return {
            list: list,
            from: CodeMirror.Pos(cur.line, start),
            to: CodeMirror.Pos(cur.line, end),
        };
    });

};

export const useFormulaTemplateAutoCompleteAddon = (): void => {
    CodeMirror.registerHelper("hint", "nimblex-formula", function (
        editor: Editor,
        options
    ) {
        // var spec = CodeMirror.resolveMode("text/x-sql");
        const cur = editor.getCursor();
        const token = editor.getTokenAt(cur);

        let inner = CodeMirror.innerMode(editor.getMode(), token.state);
        if (inner.mode.name != "nimblex-formula") return;

        let start = token.start,
            end = cur.ch,
            word = token.string.slice(0, end - start);

        if (/[^\w$_-]/.test(word)) {
            word = "";
            start = end = cur.ch;
        }
        
        if (token.end > cur.ch) {
            token.end = cur.ch;
            token.string = token.string.slice(0, cur.ch - token.start);
        }

        // if (token.string.match(/^[.`"'\w@][\w$#]*$/g)) {
        //     search = token.string;
        //     start = token.start;
        //     end = token.end;
        // } else {
        //     start = end = cur.ch;
        //     search = "";
        // }

        // console.log(search);
        const list = ["hah", "foo", "bar"];
        return {
            list: list,
            from: CodeMirror.Pos(cur.line, start),
            to: CodeMirror.Pos(cur.line, end),
        };
    });

};