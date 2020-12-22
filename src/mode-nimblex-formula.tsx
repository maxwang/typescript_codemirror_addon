import CodeMirror from "codemirror";
import "codemirror/addon/mode/simple";

let filterKeywords = [
    "IN",
    "AND",
    "OR",
    "NOT",
    "IS",
    "OF",
    "EMPTY",
    "THIS",
    "ARRAY",
    "ARRAY_LITERAL",
    "HASH_LITERAL",
    "CASE",
    "WHEN",
    "ELSE",
    "THEN",
    "END",
    "FINANCIAL",
    "YEAR",
    "STARTS",
    "ENDS",
    "WITH",
    "CONTAINS",
    "ROLE",
    "SUPERVISOR",
    "DIRECT",
    "CURRENT_DATE",
    "CURRENT_USER",
    "CURRENT_USER_IDENTITY",

    "INSENSITIVE",
    "DEPT_CONTAINS",
    "GET_USER_DEPARTMENT",
    "GET_USER_POSITION",
    "GET_USER_SUPERVISOR",
    "IS_ANCESTOR",
    "IS_PARENT",
    "CAST",
    "AS",
    "FAST_EQUAL_TO",
    "COUNT",
    "COUNT_DISTINCT",
    "MIN",
    "MAX",
    "FIRST",
    "LAST",
    "SUM",
    "AVERAGE",
    "TO_STR_DAY",
    "TO_STR_MONTH",
    "TO_STR_WEEK_STARTING",
    "TO_STR_WEEK_ENDING",

    "BOOLEAN",
    "NUMBER",
    "STRING",
    "DATETIME",
    "STEP",
    "TO",
    "ON",
    "GET",
    "PARENT",
    "CHILD",
    "LEFT",
    "ROUND",
    "COALESCE",
];
const filterFunctionRegex = new RegExp(
    "(?:" + filterKeywords.join("|") + ")",
    "i"
);

let formulaFunctions = [
    "NULL",

    "NOT",
    "AND",
    "OR",

    "NOW",

    "ARRAY",
    "ARRAY_WHERE",
    "ARRAY_SELECT",
    "ARRAY_INDEXOF",
    "ARRAY_INDEX",
    "ARRAY_FIRST",
    "ARRAY_LAST",
    "ARRAY_SKIP",
    "ARRAY_TAKE",
    "ARRAY_SLICE",
    "ARRAY_SORT",
    "ARRAY_SORTDESC",
    "ARRAY_LENGTH",
    "ARRAY_TO_HASH",
    "ARRAY_TO_HASHGROUPED",

    "HASH",
    "HASH_GET",

    "MAX",
    "MIN",
    "LEAST",
    "GREATEST",
    "LEN",
    "LEFT",
    "RIGHT",
    "DB_LOOKUP",
    "DB_LOOKUPALL",
    "DB_REPORT",
    "DB_ENCODECONSTANT",
    "DB_ENCODEIDENTIFIER",

    "CURRENT_VALUE",
    "CURRENT_EACHVALUE",
    "CURRENT_LOADEDVALUE",
    "CURRENT_EACHLOADEDVALUE",

    "EBMS_GET_EFORMRECORD_URL",
    "EBMS_GET_CURRENT_USER",
    "EBMS_IS_USER_IN_ROLE",

    "URLENCODE",
    "IFERROR",
];
const formulaFunctionRegex = new RegExp(
    "(?:" + formulaFunctions.join("|") + ")(?=\\()",
    "i"
);

CodeMirror.defineSimpleMode("nimblex-formula", {
    start: [
        { regex: /\/\/.*/, token: "comment" }, // single line comment
        // A next property will cause the mode to move to a different state
        { regex: /\/\*/, token: "comment", next: "comment" },

        { regex: formulaFunctionRegex, token: "property" }, // function call to a known function
        { regex: /(?:LET|RETURN|IF|EACH)/i, token: "keyword" },

        { regex: /[-+/*=<>&%]+|<=|>=|==|!=|:=|;/, token: "operator" },

        { regex: /"([^"]|"")*"/, token: "string" },
        { regex: /[0-9]+(\.[0-9]+)?/, token: "number" },
        { regex: /(?:TRUE|FALSE|NULL)/i, token: "atom" },

        { regex: /(?:\$[A-Za-z_][A-Za-z0-9_]*)/, token: "variable" },
        {
            regex: /(?:[A-Za-z_][A-Za-z0-9_]*|\[(?:\]\]|[^\]])+\])/,
            token: "meta",
        }, // field reference

        { regex: /\$\([^\)]*\)/, token: "attribute" }, // whole lambda specifier

        { regex: /\(/, token: "bracket", indent: true },
        {
            regex: /\)/,
            token: "bracket",
            dedent: true,
            dedentIfLineStart: true,
        },
    ],
    // The multi-line comment state.
    comment: [
        { regex: /.*?\*\//, token: "comment", next: "start" },
        { regex: /.*/, token: "comment" },
    ],
});

CodeMirror.defineSimpleMode("nimblex-filter", {
    start: [
        { regex: /--.*/, token: "comment" }, // single line comment

        { regex: filterFunctionRegex, token: "keyword" }, // keywords call to a known function

        { regex: /[-+/*=<>&%]|<=|>=|<>|=/, token: "operator" },

        { regex: /'([^']|'')*'/, token: "string" },
        { regex: /[0-9]+(\.[0-9]+)?/, token: "number" },
        { regex: /TRUE|FALSE|NULL/i, token: "atom" },

        {
            regex: /(?:[A-Za-z_][A-Za-z0-9_]*|\[(?:\]\]|[^\]])+\])/,
            token: "meta",
        }, // field reference

        {
            regex: /#[0-9][0-9][0-9][0-9]-[0-9][0-9]-[0-9][0-9]T[0-9][0-9]:[0-9][0-9]:[0-9][0-9]#/,
            token: "string",
        },

        { regex: /\(/, token: "bracket", indent: true },
        {
            regex: /\)/,
            token: "bracket",
            dedent: true,
            dedentIfLineStart: true,
        },
    ],
});

CodeMirror.defineSimpleMode("nimblex-template", {
    start: [
        { regex: /{{/, token: "atom" }, // excaped { so that it doesn't trigger formula
        {
            regex: /{/,
            token: "tag",
            mode: { spec: "nimblex-formula", end: /}/, persistent: false },
        },
        { regex: /[^{]*/, token: "atom" }, // single line comment
    ],
});
