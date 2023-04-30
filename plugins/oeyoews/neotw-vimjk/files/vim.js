// CodeMirror, copyright (c) by Marijn Haverbeke and others
// Distributed under an MIT license: https://codemirror.net/LICENSE
!(function (e) {
  "object" == typeof exports && "object" == typeof module
    ? e(
        require("../lib/codemirror"),
        require("../addon/search/searchcursor"),
        require("../addon/dialog/dialog"),
        require("../addon/edit/matchbrackets.js")
      )
    : "function" == typeof define && define.amd
    ? define(
        [
          "../lib/codemirror",
          "../addon/search/searchcursor",
          "../addon/dialog/dialog",
          "../addon/edit/matchbrackets",
        ],
        e
      )
    : e(CodeMirror);
})(function (Ze) {
  "use strict";
  var Ge = [
      { keys: "<Left>", type: "keyToKey", toKeys: "h" },
      { keys: "<Right>", type: "keyToKey", toKeys: "l" },
      { keys: "<Up>", type: "keyToKey", toKeys: "k" },
      { keys: "<Down>", type: "keyToKey", toKeys: "j" },
      { keys: "<Space>", type: "keyToKey", toKeys: "l" },
      { keys: "<BS>", type: "keyToKey", toKeys: "h", context: "normal" },
      { keys: "<Del>", type: "keyToKey", toKeys: "x", context: "normal" },
      { keys: "<C-Space>", type: "keyToKey", toKeys: "W" },
      { keys: "<C-BS>", type: "keyToKey", toKeys: "B", context: "normal" },
      { keys: "<S-Space>", type: "keyToKey", toKeys: "w" },
      { keys: "<S-BS>", type: "keyToKey", toKeys: "b", context: "normal" },
      { keys: "<C-n>", type: "keyToKey", toKeys: "j" },
      { keys: "<C-p>", type: "keyToKey", toKeys: "k" },
      { keys: "jk", type: "keyToKey", toKeys: "<Esc>" },
      { keys: "<C-[>", type: "keyToKey", toKeys: "<Esc>" },
      { keys: "<C-c>", type: "keyToKey", toKeys: "<Esc>" },
      { keys: "jk", type: "keyToKey", toKeys: "<Esc>", context: "insert" },
      { keys: "<C-[>", type: "keyToKey", toKeys: "<Esc>", context: "insert" },
      { keys: "<C-c>", type: "keyToKey", toKeys: "<Esc>", context: "insert" },
      { keys: "s", type: "keyToKey", toKeys: "cl", context: "normal" },
      { keys: "s", type: "keyToKey", toKeys: "c", context: "visual" },
      { keys: "H", type: "keyToKey", toKeys: "0", context: "normal" },
      { keys: "L", type: "keyToKey", toKeys: "$", context: "normal" },
      { keys: "S", type: "keyToKey", toKeys: "cc", context: "normal" },
      { keys: "S", type: "keyToKey", toKeys: "VdO", context: "visual" },
      { keys: "<Home>", type: "keyToKey", toKeys: "0" },
      { keys: "<End>", type: "keyToKey", toKeys: "$" },
      { keys: "<PageUp>", type: "keyToKey", toKeys: "<C-b>" },
      { keys: "<PageDown>", type: "keyToKey", toKeys: "<C-f>" },
      { keys: "<CR>", type: "keyToKey", toKeys: "j^", context: "normal" },
      {
        keys: "<Ins>",
        type: "action",
        action: "toggleOverwrite",
        context: "insert",
      },
      {
        keys: "H",
        type: "motion",
        motion: "moveToTopLine",
        motionArgs: { linewise: !0, toJumplist: !0 },
      },
      {
        keys: "M",
        type: "motion",
        motion: "moveToMiddleLine",
        motionArgs: { linewise: !0, toJumplist: !0 },
      },
      {
        keys: "L",
        type: "motion",
        motion: "moveToBottomLine",
        motionArgs: { linewise: !0, toJumplist: !0 },
      },
      {
        keys: "h",
        type: "motion",
        motion: "moveByCharacters",
        motionArgs: { forward: !1 },
      },
      {
        keys: "l",
        type: "motion",
        motion: "moveByCharacters",
        motionArgs: { forward: !0 },
      },
      {
        keys: "j",
        type: "motion",
        motion: "moveByLines",
        motionArgs: { forward: !0, linewise: !0 },
      },
      {
        keys: "k",
        type: "motion",
        motion: "moveByLines",
        motionArgs: { forward: !1, linewise: !0 },
      },
      {
        keys: "gj",
        type: "motion",
        motion: "moveByDisplayLines",
        motionArgs: { forward: !0 },
      },
      {
        keys: "gk",
        type: "motion",
        motion: "moveByDisplayLines",
        motionArgs: { forward: !1 },
      },
      {
        keys: "w",
        type: "motion",
        motion: "moveByWords",
        motionArgs: { forward: !0, wordEnd: !1 },
      },
      {
        keys: "W",
        type: "motion",
        motion: "moveByWords",
        motionArgs: { forward: !0, wordEnd: !1, bigWord: !0 },
      },
      {
        keys: "e",
        type: "motion",
        motion: "moveByWords",
        motionArgs: { forward: !0, wordEnd: !0, inclusive: !0 },
      },
      {
        keys: "E",
        type: "motion",
        motion: "moveByWords",
        motionArgs: { forward: !0, wordEnd: !0, bigWord: !0, inclusive: !0 },
      },
      {
        keys: "b",
        type: "motion",
        motion: "moveByWords",
        motionArgs: { forward: !1, wordEnd: !1 },
      },
      {
        keys: "B",
        type: "motion",
        motion: "moveByWords",
        motionArgs: { forward: !1, wordEnd: !1, bigWord: !0 },
      },
      {
        keys: "ge",
        type: "motion",
        motion: "moveByWords",
        motionArgs: { forward: !1, wordEnd: !0, inclusive: !0 },
      },
      {
        keys: "gE",
        type: "motion",
        motion: "moveByWords",
        motionArgs: { forward: !1, wordEnd: !0, bigWord: !0, inclusive: !0 },
      },
      {
        keys: "{",
        type: "motion",
        motion: "moveByParagraph",
        motionArgs: { forward: !1, toJumplist: !0 },
      },
      {
        keys: "}",
        type: "motion",
        motion: "moveByParagraph",
        motionArgs: { forward: !0, toJumplist: !0 },
      },
      {
        keys: "(",
        type: "motion",
        motion: "moveBySentence",
        motionArgs: { forward: !1 },
      },
      {
        keys: ")",
        type: "motion",
        motion: "moveBySentence",
        motionArgs: { forward: !0 },
      },
      {
        keys: "<C-f>",
        type: "motion",
        motion: "moveByPage",
        motionArgs: { forward: !0 },
      },
      {
        keys: "<C-b>",
        type: "motion",
        motion: "moveByPage",
        motionArgs: { forward: !1 },
      },
      {
        keys: "<C-d>",
        type: "motion",
        motion: "moveByScroll",
        motionArgs: { forward: !0, explicitRepeat: !0 },
      },
      {
        keys: "<C-u>",
        type: "motion",
        motion: "moveByScroll",
        motionArgs: { forward: !1, explicitRepeat: !0 },
      },
      {
        keys: "gg",
        type: "motion",
        motion: "moveToLineOrEdgeOfDocument",
        motionArgs: {
          forward: !1,
          explicitRepeat: !0,
          linewise: !0,
          toJumplist: !0,
        },
      },
      {
        keys: "G",
        type: "motion",
        motion: "moveToLineOrEdgeOfDocument",
        motionArgs: {
          forward: !0,
          explicitRepeat: !0,
          linewise: !0,
          toJumplist: !0,
        },
      },
      { keys: "0", type: "motion", motion: "moveToStartOfLine" },
      {
        keys: "^",
        type: "motion",
        motion: "moveToFirstNonWhiteSpaceCharacter",
      },
      {
        keys: "+",
        type: "motion",
        motion: "moveByLines",
        motionArgs: { forward: !0, toFirstChar: !0 },
      },
      {
        keys: "-",
        type: "motion",
        motion: "moveByLines",
        motionArgs: { forward: !1, toFirstChar: !0 },
      },
      {
        keys: "_",
        type: "motion",
        motion: "moveByLines",
        motionArgs: { forward: !0, toFirstChar: !0, repeatOffset: -1 },
      },
      {
        keys: "$",
        type: "motion",
        motion: "moveToEol",
        motionArgs: { inclusive: !0 },
      },
      {
        keys: "%",
        type: "motion",
        motion: "moveToMatchedSymbol",
        motionArgs: { inclusive: !0, toJumplist: !0 },
      },
      {
        keys: "f<character>",
        type: "motion",
        motion: "moveToCharacter",
        motionArgs: { forward: !0, inclusive: !0 },
      },
      {
        keys: "F<character>",
        type: "motion",
        motion: "moveToCharacter",
        motionArgs: { forward: !1 },
      },
      {
        keys: "t<character>",
        type: "motion",
        motion: "moveTillCharacter",
        motionArgs: { forward: !0, inclusive: !0 },
      },
      {
        keys: "T<character>",
        type: "motion",
        motion: "moveTillCharacter",
        motionArgs: { forward: !1 },
      },
      {
        keys: ";",
        type: "motion",
        motion: "repeatLastCharacterSearch",
        motionArgs: { forward: !0 },
      },
      {
        keys: ",",
        type: "motion",
        motion: "repeatLastCharacterSearch",
        motionArgs: { forward: !1 },
      },
      {
        keys: "'<character>",
        type: "motion",
        motion: "goToMark",
        motionArgs: { toJumplist: !0, linewise: !0 },
      },
      {
        keys: "`<character>",
        type: "motion",
        motion: "goToMark",
        motionArgs: { toJumplist: !0 },
      },
      {
        keys: "]`",
        type: "motion",
        motion: "jumpToMark",
        motionArgs: { forward: !0 },
      },
      {
        keys: "[`",
        type: "motion",
        motion: "jumpToMark",
        motionArgs: { forward: !1 },
      },
      {
        keys: "]'",
        type: "motion",
        motion: "jumpToMark",
        motionArgs: { forward: !0, linewise: !0 },
      },
      {
        keys: "['",
        type: "motion",
        motion: "jumpToMark",
        motionArgs: { forward: !1, linewise: !0 },
      },
      {
        keys: "]p",
        type: "action",
        action: "paste",
        isEdit: !0,
        actionArgs: { after: !0, isEdit: !0, matchIndent: !0 },
      },
      {
        keys: "[p",
        type: "action",
        action: "paste",
        isEdit: !0,
        actionArgs: { after: !1, isEdit: !0, matchIndent: !0 },
      },
      {
        keys: "]<character>",
        type: "motion",
        motion: "moveToSymbol",
        motionArgs: { forward: !0, toJumplist: !0 },
      },
      {
        keys: "[<character>",
        type: "motion",
        motion: "moveToSymbol",
        motionArgs: { forward: !1, toJumplist: !0 },
      },
      { keys: "|", type: "motion", motion: "moveToColumn" },
      {
        keys: "o",
        type: "motion",
        motion: "moveToOtherHighlightedEnd",
        context: "visual",
      },
      {
        keys: "O",
        type: "motion",
        motion: "moveToOtherHighlightedEnd",
        motionArgs: { sameLine: !0 },
        context: "visual",
      },
      { keys: "d", type: "operator", operator: "delete" },
      { keys: "y", type: "operator", operator: "yank" },
      { keys: "c", type: "operator", operator: "change" },
      { keys: "=", type: "operator", operator: "indentAuto" },
      {
        keys: ">",
        type: "operator",
        operator: "indent",
        operatorArgs: { indentRight: !0 },
      },
      {
        keys: "<",
        type: "operator",
        operator: "indent",
        operatorArgs: { indentRight: !1 },
      },
      { keys: "g~", type: "operator", operator: "changeCase" },
      {
        keys: "gu",
        type: "operator",
        operator: "changeCase",
        operatorArgs: { toLower: !0 },
        isEdit: !0,
      },
      {
        keys: "gU",
        type: "operator",
        operator: "changeCase",
        operatorArgs: { toLower: !1 },
        isEdit: !0,
      },
      {
        keys: "n",
        type: "motion",
        motion: "findNext",
        motionArgs: { forward: !0, toJumplist: !0 },
      },
      {
        keys: "N",
        type: "motion",
        motion: "findNext",
        motionArgs: { forward: !1, toJumplist: !0 },
      },
      {
        keys: "gn",
        type: "motion",
        motion: "findAndSelectNextInclusive",
        motionArgs: { forward: !0 },
      },
      {
        keys: "gN",
        type: "motion",
        motion: "findAndSelectNextInclusive",
        motionArgs: { forward: !1 },
      },
      {
        keys: "x",
        type: "operatorMotion",
        operator: "delete",
        motion: "moveByCharacters",
        motionArgs: { forward: !0 },
        operatorMotionArgs: { visualLine: !1 },
      },
      {
        keys: "X",
        type: "operatorMotion",
        operator: "delete",
        motion: "moveByCharacters",
        motionArgs: { forward: !1 },
        operatorMotionArgs: { visualLine: !0 },
      },
      {
        keys: "D",
        type: "operatorMotion",
        operator: "delete",
        motion: "moveToEol",
        motionArgs: { inclusive: !0 },
        context: "normal",
      },
      {
        keys: "D",
        type: "operator",
        operator: "delete",
        operatorArgs: { linewise: !0 },
        context: "visual",
      },
      {
        keys: "Y",
        type: "operatorMotion",
        operator: "yank",
        motion: "expandToLine",
        motionArgs: { linewise: !0 },
        context: "normal",
      },
      {
        keys: "Y",
        type: "operator",
        operator: "yank",
        operatorArgs: { linewise: !0 },
        context: "visual",
      },
      {
        keys: "C",
        type: "operatorMotion",
        operator: "change",
        motion: "moveToEol",
        motionArgs: { inclusive: !0 },
        context: "normal",
      },
      {
        keys: "C",
        type: "operator",
        operator: "change",
        operatorArgs: { linewise: !0 },
        context: "visual",
      },
      {
        keys: "~",
        type: "operatorMotion",
        operator: "changeCase",
        motion: "moveByCharacters",
        motionArgs: { forward: !0 },
        operatorArgs: { shouldMoveCursor: !0 },
        context: "normal",
      },
      {
        keys: "~",
        type: "operator",
        operator: "changeCase",
        context: "visual",
      },
      {
        keys: "<C-w>",
        type: "operatorMotion",
        operator: "delete",
        motion: "moveByWords",
        motionArgs: { forward: !1, wordEnd: !1 },
        context: "insert",
      },
      { keys: "<C-w>", type: "idle", context: "normal" },
      {
        keys: "<C-i>",
        type: "action",
        action: "jumpListWalk",
        actionArgs: { forward: !0 },
      },
      {
        keys: "<C-o>",
        type: "action",
        action: "jumpListWalk",
        actionArgs: { forward: !1 },
      },
      {
        keys: "<C-e>",
        type: "action",
        action: "scroll",
        actionArgs: { forward: !0, linewise: !0 },
      },
      {
        keys: "<C-y>",
        type: "action",
        action: "scroll",
        actionArgs: { forward: !1, linewise: !0 },
      },
      {
        keys: "a",
        type: "action",
        action: "enterInsertMode",
        isEdit: !0,
        actionArgs: { insertAt: "charAfter" },
        context: "normal",
      },
      {
        keys: "A",
        type: "action",
        action: "enterInsertMode",
        isEdit: !0,
        actionArgs: { insertAt: "eol" },
        context: "normal",
      },
      {
        keys: "A",
        type: "action",
        action: "enterInsertMode",
        isEdit: !0,
        actionArgs: { insertAt: "endOfSelectedArea" },
        context: "visual",
      },
      {
        keys: "i",
        type: "action",
        action: "enterInsertMode",
        isEdit: !0,
        actionArgs: { insertAt: "inplace" },
        context: "normal",
      },
      {
        keys: "gi",
        type: "action",
        action: "enterInsertMode",
        isEdit: !0,
        actionArgs: { insertAt: "lastEdit" },
        context: "normal",
      },
      {
        keys: "I",
        type: "action",
        action: "enterInsertMode",
        isEdit: !0,
        actionArgs: { insertAt: "firstNonBlank" },
        context: "normal",
      },
      {
        keys: "gI",
        type: "action",
        action: "enterInsertMode",
        isEdit: !0,
        actionArgs: { insertAt: "bol" },
        context: "normal",
      },
      {
        keys: "I",
        type: "action",
        action: "enterInsertMode",
        isEdit: !0,
        actionArgs: { insertAt: "startOfSelectedArea" },
        context: "visual",
      },
      {
        keys: "o",
        type: "action",
        action: "newLineAndEnterInsertMode",
        isEdit: !0,
        interlaceInsertRepeat: !0,
        actionArgs: { after: !0 },
        context: "normal",
      },
      {
        keys: "O",
        type: "action",
        action: "newLineAndEnterInsertMode",
        isEdit: !0,
        interlaceInsertRepeat: !0,
        actionArgs: { after: !1 },
        context: "normal",
      },
      { keys: "v", type: "action", action: "toggleVisualMode" },
      {
        keys: "V",
        type: "action",
        action: "toggleVisualMode",
        actionArgs: { linewise: !0 },
      },
      {
        keys: "<C-v>",
        type: "action",
        action: "toggleVisualMode",
        actionArgs: { blockwise: !0 },
      },
      {
        keys: "<C-q>",
        type: "action",
        action: "toggleVisualMode",
        actionArgs: { blockwise: !0 },
      },
      { keys: "gv", type: "action", action: "reselectLastSelection" },
      { keys: "J", type: "action", action: "joinLines", isEdit: !0 },
      {
        keys: "gJ",
        type: "action",
        action: "joinLines",
        actionArgs: { keepSpaces: !0 },
        isEdit: !0,
      },
      {
        keys: "p",
        type: "action",
        action: "paste",
        isEdit: !0,
        actionArgs: { after: !0, isEdit: !0 },
      },
      {
        keys: "P",
        type: "action",
        action: "paste",
        isEdit: !0,
        actionArgs: { after: !1, isEdit: !0 },
      },
      { keys: "r<character>", type: "action", action: "replace", isEdit: !0 },
      { keys: "@<character>", type: "action", action: "replayMacro" },
      { keys: "q<character>", type: "action", action: "enterMacroRecordMode" },
      {
        keys: "R",
        type: "action",
        action: "enterInsertMode",
        isEdit: !0,
        actionArgs: { replace: !0 },
        context: "normal",
      },
      {
        keys: "R",
        type: "operator",
        operator: "change",
        operatorArgs: { linewise: !0, fullLine: !0 },
        context: "visual",
        exitVisualBlock: !0,
      },
      { keys: "u", type: "action", action: "undo", context: "normal" },
      {
        keys: "u",
        type: "operator",
        operator: "changeCase",
        operatorArgs: { toLower: !0 },
        context: "visual",
        isEdit: !0,
      },
      {
        keys: "U",
        type: "operator",
        operator: "changeCase",
        operatorArgs: { toLower: !1 },
        context: "visual",
        isEdit: !0,
      },
      { keys: "<C-r>", type: "action", action: "redo" },
      { keys: "m<character>", type: "action", action: "setMark" },
      { keys: '"<character>', type: "action", action: "setRegister" },
      {
        keys: "zz",
        type: "action",
        action: "scrollToCursor",
        actionArgs: { position: "center" },
      },
      {
        keys: "z.",
        type: "action",
        action: "scrollToCursor",
        actionArgs: { position: "center" },
        motion: "moveToFirstNonWhiteSpaceCharacter",
      },
      {
        keys: "zt",
        type: "action",
        action: "scrollToCursor",
        actionArgs: { position: "top" },
      },
      {
        keys: "z<CR>",
        type: "action",
        action: "scrollToCursor",
        actionArgs: { position: "top" },
        motion: "moveToFirstNonWhiteSpaceCharacter",
      },
      {
        keys: "z-",
        type: "action",
        action: "scrollToCursor",
        actionArgs: { position: "bottom" },
      },
      {
        keys: "zb",
        type: "action",
        action: "scrollToCursor",
        actionArgs: { position: "bottom" },
        motion: "moveToFirstNonWhiteSpaceCharacter",
      },
      { keys: ".", type: "action", action: "repeatLastEdit" },
      {
        keys: "<C-a>",
        type: "action",
        action: "incrementNumberToken",
        isEdit: !0,
        actionArgs: { increase: !0, backtrack: !1 },
      },
      {
        keys: "<C-x>",
        type: "action",
        action: "incrementNumberToken",
        isEdit: !0,
        actionArgs: { increase: !1, backtrack: !1 },
      },
      {
        keys: "<C-t>",
        type: "action",
        action: "indent",
        actionArgs: { indentRight: !0 },
        context: "insert",
      },
      {
        keys: "<C-d>",
        type: "action",
        action: "indent",
        actionArgs: { indentRight: !1 },
        context: "insert",
      },
      {
        keys: "a<character>",
        type: "motion",
        motion: "textObjectManipulation",
      },
      {
        keys: "i<character>",
        type: "motion",
        motion: "textObjectManipulation",
        motionArgs: { textObjectInner: !0 },
      },
      {
        keys: "/",
        type: "search",
        searchArgs: { forward: !0, querySrc: "prompt", toJumplist: !0 },
      },
      {
        keys: "?",
        type: "search",
        searchArgs: { forward: !1, querySrc: "prompt", toJumplist: !0 },
      },
      {
        keys: "*",
        type: "search",
        searchArgs: {
          forward: !0,
          querySrc: "wordUnderCursor",
          wholeWordOnly: !0,
          toJumplist: !0,
        },
      },
      {
        keys: "#",
        type: "search",
        searchArgs: {
          forward: !1,
          querySrc: "wordUnderCursor",
          wholeWordOnly: !0,
          toJumplist: !0,
        },
      },
      {
        keys: "g*",
        type: "search",
        searchArgs: {
          forward: !0,
          querySrc: "wordUnderCursor",
          toJumplist: !0,
        },
      },
      {
        keys: "g#",
        type: "search",
        searchArgs: {
          forward: !1,
          querySrc: "wordUnderCursor",
          toJumplist: !0,
        },
      },
      { keys: ":", type: "ex" },
    ],
    Ye = Ge.length,
    et = [
      { name: "colorscheme", shortName: "colo" },
      { name: "map" },
      { name: "imap", shortName: "im" },
      { name: "nmap", shortName: "nm" },
      { name: "vmap", shortName: "vm" },
      { name: "unmap" },
      { name: "write", shortName: "w" },
      { name: "undo", shortName: "u" },
      { name: "redo", shortName: "red" },
      { name: "set", shortName: "se" },
      { name: "setlocal", shortName: "setl" },
      { name: "setglobal", shortName: "setg" },
      { name: "sort", shortName: "sor" },
      { name: "substitute", shortName: "s", possiblyAsync: !0 },
      { name: "nohlsearch", shortName: "noh" },
      { name: "yank", shortName: "y" },
      { name: "delmarks", shortName: "delm" },
      { name: "registers", shortName: "reg", excludeFromCommandHistory: !0 },
      { name: "global", shortName: "g" },
    ],
    tt = Ze.Pos;
  Ze.Vim = (function () {
    function e(e, t) {
      var r, n;
      this == Ze.keyMap.vim &&
        (Ze.rmClass(e.getWrapperElement(), "cm-fat-cursor"),
        "contenteditable" == e.getOption("inputStyle") &&
          null != document.body.style.caretColor &&
          (a((r = e)),
          r.off("cursorActivity", i),
          (r.state.fatCursorMarks = null),
          (e.getInputField().style.caretColor = ""))),
        (t && t.attach == o) ||
          ((n = e).setOption("disableInput", !1),
          n.off("cursorActivity", Ue),
          Ze.off(n.getInputField(), "paste", c(n)),
          (n.state.vim = null));
    }
    function o(e, t) {
      var r, n;
      this == Ze.keyMap.vim &&
        (Ze.addClass(e.getWrapperElement(), "cm-fat-cursor"),
        "contenteditable" == e.getOption("inputStyle") &&
          null != document.body.style.caretColor &&
          (((r = e).state.fatCursorMarks = []),
          i(r),
          r.on("cursorActivity", i),
          (e.getInputField().style.caretColor = "transparent"))),
        (t && t.attach == o) ||
          ((n = e).setOption("disableInput", !0),
          n.setOption("showCursorWhenSelecting", !1),
          Ze.signal(n, "vim-mode-change", { mode: "normal" }),
          n.on("cursorActivity", Ue),
          E(n),
          Ze.on(n.getInputField(), "paste", c(n)));
    }
    function i(e) {
      if (e.state.fatCursorMarks) {
        a(e);
        for (var t = e.listSelections(), r = [], n = 0; n < t.length; n++) {
          var o,
            i = t[n];
          i.empty() &&
            ((o = e.getLine(i.anchor.line).length),
            i.anchor.ch < o
              ? r.push(
                  e.markText(i.anchor, tt(i.anchor.line, i.anchor.ch + 1), {
                    className: "cm-fat-cursor-mark",
                  })
                )
              : r.push(
                  e.markText(tt(i.anchor.line, o - 1), tt(i.anchor.line, o), {
                    className: "cm-fat-cursor-mark",
                  })
                ));
        }
        e.state.fatCursorMarks = r;
      }
    }
    function a(e) {
      var t = e.state.fatCursorMarks;
      if (t) for (var r = 0; r < t.length; r++) t[r].clear();
    }
    function t(e, t) {
      if (t) {
        if (this[e]) return this[e];
        var r = (function (e) {
          if ("'" == e.charAt(0)) return e.charAt(1);
          var t = e.split(/-(?!$)/),
            r = t[t.length - 1];
          {
            if (1 == t.length && 1 == t[0].length) return !1;
            if (2 == t.length && "Shift" == t[0] && 1 == r.length) return !1;
          }
          for (var n = !1, o = 0; o < t.length; o++) {
            var i = t[o];
            i in s ? (t[o] = s[i]) : (n = !0), i in l && (t[o] = l[i]);
          }
          if (!n) return !1;
          k(r) && (t[t.length - 1] = r.toLowerCase());
          return "<" + t.join("-") + ">";
        })(e);
        if (!r) return !1;
        var n = Ze.Vim.findKey(t, r);
        return "function" == typeof n && Ze.signal(t, "vim-keypress", r), n;
      }
    }
    Ze.defineOption("vimMode", !1, function (e, t, r) {
      t && "vim" != e.getOption("keyMap")
        ? e.setOption("keyMap", "vim")
        : !t &&
          r != Ze.Init &&
          /^vim/.test(e.getOption("keyMap")) &&
          e.setOption("keyMap", "default");
    });
    var s = { Shift: "S", Ctrl: "C", Alt: "A", Cmd: "D", Mod: "A" },
      l = { Enter: "CR", Backspace: "BS", Delete: "Del", Insert: "Ins" };
    function c(e) {
      var t = e.state.vim;
      return (
        t.onPasteFn ||
          (t.onPasteFn = function () {
            t.insertMode ||
              (e.setCursor(q(e.getCursor(), 0, 1)),
              U.enterInsertMode(e, {}, t));
          }),
        t.onPasteFn
      );
    }
    var u = /[\d]/,
      m = [
        Ze.isWordChar,
        function (e) {
          return e && !Ze.isWordChar(e) && !/\s/.test(e);
        },
      ],
      g = [
        function (e) {
          return /\S/.test(e);
        },
      ];
    function r(e, t) {
      for (var r = [], n = e; n < e + t; n++) r.push(String.fromCharCode(n));
      return r;
    }
    var n = r(65, 26),
      h = r(97, 26),
      p = r(48, 10),
      f = [].concat(n, h, p, ["<", ">"]),
      d = [].concat(n, h, p, ["-", '"', ".", ":", "_", "/"]);
    function v(e, t) {
      return t >= e.firstLine() && t <= e.lastLine();
    }
    function y(e) {
      return /^[a-z]$/.test(e);
    }
    function k(e) {
      return /^[A-Z]$/.test(e);
    }
    function B(e) {
      return /^\s*$/.test(e);
    }
    function C(e) {
      return -1 != ".?!".indexOf(e);
    }
    function w(e, t) {
      for (var r = 0; r < t.length; r++) if (t[r] == e) return !0;
      return !1;
    }
    var x = {};
    function M(e, t, r, n, o) {
      if (void 0 === t && !o)
        throw Error("defaultValue is required unless callback is provided");
      if (
        ((r = r || "string"),
        (x[e] = { type: r, defaultValue: t, callback: o }),
        n)
      )
        for (var i = 0; i < n.length; i++) x[n[i]] = x[e];
      t && S(e, t);
    }
    function S(e, t, r, n) {
      var o = x[e],
        i = (n = n || {}).scope;
      if (!o) return new Error("Unknown option: " + e);
      if ("boolean" == o.type) {
        if (t && !0 !== t) return new Error("Invalid argument: " + e + "=" + t);
        !1 !== t && (t = !0);
      }
      o.callback
        ? ("local" !== i && o.callback(t, void 0),
          "global" !== i && r && o.callback(t, r))
        : ("local" !== i && (o.value = "boolean" == o.type ? !!t : t),
          "global" !== i && r && (r.state.vim.options[e] = { value: t }));
    }
    function A(e, t, r) {
      var n = x[e],
        o = (r = r || {}).scope;
      if (!n) return new Error("Unknown option: " + e);
      if (n.callback) {
        var i = t && n.callback(void 0, t);
        return "global" !== o && void 0 !== i
          ? i
          : "local" !== o
          ? n.callback()
          : void 0;
      }
      return (
        (i = "global" !== o && t && t.state.vim.options[e]) ||
        ("local" !== o && n) ||
        {}
      ).value;
    }
    M("filetype", void 0, "string", ["ft"], function (e, t) {
      if (void 0 !== t) {
        if (void 0 === e) return "null" == (r = t.getOption("mode")) ? "" : r;
        var r = "" == e ? "null" : e;
        t.setOption("mode", r);
      }
    });
    function b() {
      var a = 100,
        s = -1,
        l = 0,
        c = 0,
        u = new Array(a);
      function o(e, t) {
        l < (s += t) ? (s = l) : s < c && (s = c);
        var r = u[(a + s) % a];
        if (r && !r.find()) {
          var n,
            o = 0 < t ? 1 : -1,
            i = e.getCursor();
          do {
            if ((r = u[(a + (s += o)) % a]) && (n = r.find()) && !X(i, n))
              break;
          } while (s < l && c < s);
        }
        return r;
      }
      return {
        cachedCursor: void 0,
        add: function (n, e, t) {
          var r,
            o = u[s % a];
          function i(e) {
            var t = ++s % a,
              r = u[t];
            r && r.clear(), (u[t] = n.setBookmark(e));
          }
          (o && (!(r = o.find()) || X(r, e))) || i(e),
            i(t),
            (c = (l = s) - a + 1) < 0 && (c = 0);
        },
        find: function (e, t) {
          var r = s,
            n = o(e, t);
          return (s = r), n && n.find();
        },
        move: o,
      };
    }
    var K,
      L,
      T = function (e) {
        return e
          ? {
              changes: e.changes,
              expectCursorActivityForChange: e.expectCursorActivityForChange,
            }
          : { changes: [], expectCursorActivityForChange: !1 };
      };
    function R() {
      (this.latestRegister = void 0),
        (this.isPlaying = !1),
        (this.isRecording = !1),
        (this.replaySearchQueries = []),
        (this.onRecordingDone = void 0),
        (this.lastInsertModeChanges = T());
    }
    function E(e) {
      return (
        e.state.vim ||
          (e.state.vim = {
            inputState: new N(),
            lastEditInputState: void 0,
            lastEditActionCommand: void 0,
            lastHPos: -1,
            lastHSPos: -1,
            lastMotion: null,
            marks: {},
            fakeCursor: null,
            insertMode: !1,
            insertModeRepeat: void 0,
            visualMode: !1,
            visualLine: !1,
            visualBlock: !1,
            lastSelection: null,
            lastPastedText: null,
            sel: {},
            options: {},
          }),
        e.state.vim
      );
    }
    function O() {
      for (var e in ((K = {
        searchQuery: null,
        searchIsReversed: !1,
        lastSubstituteReplacePart: void 0,
        jumpList: b(),
        macroModeState: new R(),
        lastCharacterSearch: {
          increment: 0,
          forward: !0,
          selectedCharacter: "",
        },
        registerController: new j({}),
        searchHistoryController: new H(),
        exCommandHistoryController: new H(),
      }),
      x)) {
        var t = x[e];
        t.value = t.defaultValue;
      }
    }
    var I = {
      buildKeyMap: function () {},
      getRegisterController: function () {
        return K.registerController;
      },
      resetVimGlobalState_: O,
      getVimGlobalState_: function () {
        return K;
      },
      maybeInitVimState_: E,
      suppressErrorLogging: !(R.prototype = {
        exitMacroRecordMode: function () {
          var e = K.macroModeState;
          e.onRecordingDone && e.onRecordingDone(),
            (e.onRecordingDone = void 0),
            (e.isRecording = !1);
        },
        enterMacroRecordMode: function (e, t) {
          var r = K.registerController.getRegister(t);
          r &&
            (r.clear(),
            (this.latestRegister = t),
            e.openDialog &&
              (this.onRecordingDone = e.openDialog(
                "(recording)[" + t + "]",
                null,
                { bottom: !0 }
              )),
            (this.isRecording = !0));
        },
      }),
      InsertModeKey: qe,
      map: function (e, t, r) {
        Fe.map(e, t, r);
      },
      unmap: function (e, t) {
        Fe.unmap(e, t);
      },
      noremap: function (e, t, r) {
        function n(e) {
          return e ? [e] : ["normal", "insert", "visual"];
        }
        for (var o = n(r), i = Ge.length, a = i - Ye; a < i && o.length; a++) {
          var s = Ge[a];
          if (
            !(
              s.keys != t ||
              (r && s.context && s.context !== r) ||
              "ex" === s.type.substr(0, 2) ||
              "key" === s.type.substr(0, 3)
            )
          ) {
            var l = {};
            for (var c in s) l[c] = s[c];
            (l.keys = e),
              r && !l.context && (l.context = r),
              this._mapCommand(l);
            var u = n(s.context),
              o = o.filter(function (e) {
                return -1 === u.indexOf(e);
              });
          }
        }
      },
      mapclear: function (e) {
        var t = Ge.length,
          r = Ye,
          n = Ge.slice(0, t - r);
        if (((Ge = Ge.slice(t - r)), e))
          for (var o = n.length - 1; 0 <= o; o--) {
            var i = n[o];
            if (e !== i.context)
              if (i.context) this._mapCommand(i);
              else {
                var a = ["normal", "insert", "visual"];
                for (var s in a)
                  if (a[s] !== e) {
                    var l = {};
                    for (var c in i) l[c] = i[c];
                    (l.context = a[s]), this._mapCommand(l);
                  }
              }
          }
      },
      setOption: S,
      getOption: A,
      defineOption: M,
      defineEx: function (e, t, r) {
        if (t) {
          if (0 !== e.indexOf(t))
            throw new Error(
              '(Vim.defineEx) "' +
                t +
                '" is not a prefix of "' +
                e +
                '", command not registered'
            );
        } else t = e;
        (He[e] = r),
          (Fe.commandMap_[t] = { name: e, shortName: t, type: "api" });
      },
      handleKey: function (e, t, r) {
        var n = this.findKey(e, t, r);
        if ("function" == typeof n) return n();
      },
      findKey: function (s, l, t) {
        var e,
          c = E(s);
        function o() {
          var e = K.macroModeState;
          if (e.isRecording) {
            if ("q" == l) return e.exitMacroRecordMode(), P(s), 1;
            "mapping" != t &&
              (function (e, t) {
                if (e.isPlaying) return;
                var r = e.latestRegister,
                  n = K.registerController.getRegister(r);
                n && n.pushText(t);
              })(e, l);
          }
        }
        function u() {
          return (
            "<Esc>" == l &&
            (P(s), c.visualMode ? le(s) : c.insertMode && We(s), 1)
          );
        }
        return !1 ===
          (e = (
            c.insertMode
              ? function () {
                  if (u()) return !0;
                  for (
                    var e = (c.inputState.keyBuffer =
                        c.inputState.keyBuffer + l),
                      t = 1 == l.length,
                      r = F.matchCommand(e, Ge, c.inputState, "insert");
                    1 < e.length && "full" != r.type;

                  ) {
                    var e = (c.inputState.keyBuffer = e.slice(1)),
                      n = F.matchCommand(e, Ge, c.inputState, "insert");
                    "none" != n.type && (r = n);
                  }
                  if ("none" == r.type) return P(s), !1;
                  if ("partial" == r.type)
                    return (
                      L && window.clearTimeout(L),
                      (L = window.setTimeout(function () {
                        c.insertMode && c.inputState.keyBuffer && P(s);
                      }, A("insertModeEscKeysTimeout"))),
                      !t
                    );
                  if ((L && window.clearTimeout(L), t)) {
                    for (var o = s.listSelections(), i = 0; i < o.length; i++) {
                      var a = o[i].head;
                      s.replaceRange("", q(a, 0, -(e.length - 1)), a, "+input");
                    }
                    K.macroModeState.lastInsertModeChanges.changes.pop();
                  }
                  return P(s), r.command;
                }
              : function () {
                  if (o() || u()) return !0;
                  var e = (c.inputState.keyBuffer = c.inputState.keyBuffer + l);
                  if (/^[1-9]\d*$/.test(e)) return !0;
                  var t = /^(\d*)(.*)$/.exec(e);
                  if (!t) return P(s), !1;
                  var r = c.visualMode ? "visual" : "normal",
                    n = F.matchCommand(t[2] || t[1], Ge, c.inputState, r);
                  return "none" == n.type
                    ? (P(s), !1)
                    : "partial" == n.type ||
                        ((c.inputState.keyBuffer = ""),
                        (t = /^(\d*)(.*)$/.exec(e))[1] &&
                          "0" != t[1] &&
                          c.inputState.pushRepeatDigit(t[1]),
                        n.command);
                }
          )())
          ? c.insertMode || 1 !== l.length
            ? void 0
            : function () {
                return !0;
              }
          : !0 === e
          ? function () {
              return !0;
            }
          : function () {
              return s.operation(function () {
                s.curOp.isVimOp = !0;
                try {
                  "keyToKey" == e.type
                    ? (function (e) {
                        for (var t; e; )
                          (t = /<\w+-.+?>|<\w+>|./.exec(e)),
                            (l = t[0]),
                            (e = e.substring(t.index + l.length)),
                            Ze.Vim.handleKey(s, l, "mapping");
                      })(e.toKeys)
                    : F.processCommand(s, c, e);
                } catch (e) {
                  throw (
                    ((s.state.vim = void 0),
                    E(s),
                    Ze.Vim.suppressErrorLogging || console.log(e),
                    e)
                  );
                }
                return !0;
              });
            };
      },
      handleEx: function (e, t) {
        Fe.processCommand(e, t);
      },
      defineMotion: function (e, t) {
        W[e] = t;
      },
      defineAction: function (e, t) {
        U[e] = t;
      },
      defineOperator: function (e, t) {
        D[e] = t;
      },
      mapCommand: function (e, t, r, n, o) {
        var i = { keys: e, type: t };
        for (var a in ((i[t] = r), (i[t + "Args"] = n), o)) i[a] = o[a];
        Ve(i);
      },
      _mapCommand: Ve,
      defineRegister: function (e, t) {
        var r = K.registerController.registers;
        if (!e || 1 != e.length)
          throw Error("Register name must be 1 character");
        if (r[e]) throw Error("Register already defined " + e);
        (r[e] = t), d.push(e);
      },
      exitVisualMode: le,
      exitInsertMode: We,
    };
    function N() {
      (this.prefixRepeat = []),
        (this.motionRepeat = []),
        (this.operator = null),
        (this.operatorArgs = null),
        (this.motion = null),
        (this.motionArgs = null),
        (this.keyBuffer = []),
        (this.registerName = null);
    }
    function P(e, t) {
      (e.state.vim.inputState = new N()), Ze.signal(e, "vim-command-done", t);
    }
    function _(e, t, r) {
      this.clear(),
        (this.keyBuffer = [e || ""]),
        (this.insertModeChanges = []),
        (this.searchQueries = []),
        (this.linewise = !!t),
        (this.blockwise = !!r);
    }
    function j(e) {
      (this.registers = e),
        (this.unnamedRegister = e['"'] = new _()),
        (e["."] = new _()),
        (e[":"] = new _()),
        (e["/"] = new _());
    }
    function H() {
      (this.historyBuffer = []),
        (this.iterator = 0),
        (this.initialPrefix = null);
    }
    (N.prototype.pushRepeatDigit = function (e) {
      this.operator
        ? (this.motionRepeat = this.motionRepeat.concat(e))
        : (this.prefixRepeat = this.prefixRepeat.concat(e));
    }),
      (N.prototype.getRepeat = function () {
        var e = 0;
        return (
          (0 < this.prefixRepeat.length || 0 < this.motionRepeat.length) &&
            ((e = 1),
            0 < this.prefixRepeat.length &&
              (e *= parseInt(this.prefixRepeat.join(""), 10)),
            0 < this.motionRepeat.length &&
              (e *= parseInt(this.motionRepeat.join(""), 10))),
          e
        );
      }),
      (_.prototype = {
        setText: function (e, t, r) {
          (this.keyBuffer = [e || ""]),
            (this.linewise = !!t),
            (this.blockwise = !!r);
        },
        pushText: function (e, t) {
          t &&
            (this.linewise || this.keyBuffer.push("\n"), (this.linewise = !0)),
            this.keyBuffer.push(e);
        },
        pushInsertModeChanges: function (e) {
          this.insertModeChanges.push(T(e));
        },
        pushSearchQuery: function (e) {
          this.searchQueries.push(e);
        },
        clear: function () {
          (this.keyBuffer = []),
            (this.insertModeChanges = []),
            (this.searchQueries = []),
            (this.linewise = !1);
        },
        toString: function() {
          return this.keyBuffer.join("");
        },
      }),
      (j.prototype = {
        pushText: function(e, t, r, n, o) {
          if ("_" !== e) {
            n && "\n" !== r.charAt(r.length - 1) && (r += "\n");
            var i = this.isValidRegister(e) ? this.getRegister(e) : null;
            if (i) {
              k(e) ? i.pushText(r, n) : i.setText(r, n, o),
                this.unnamedRegister.setText(i.toString(), n);
            } else {
              switch (t) {
                case "yank":
                  this.registers[0] = new _(r, n, o);
                  break;
                case "delete":
                case "change":
                  -1 == r.indexOf("\n")
                    ? (this.registers["-"] = new _(r, n))
                    : (this.shiftNumericRegisters_(),
                      (this.registers[1] = new _(r, n)));
              }
              this.unnamedRegister.setText(r, n, o);
            }
          }
        },
        getRegister: function(e) {
          return this.isValidRegister(e)
            ? ((e = e.toLowerCase()),
              this.registers[e] || (this.registers[e] = new _()),
              this.registers[e])
            : this.unnamedRegister;
        },
        isValidRegister: function(e) {
          return e && w(e, d);
        },
        shiftNumericRegisters_: function() {
          for (var e = 9; 2 <= e; e--)
            this.registers[e] = this.getRegister("" + (e - 1));
        },
      }),
      (H.prototype = {
        nextMatch: function(e, t) {
          var r = this.historyBuffer,
            n = t ? -1 : 1;
          null === this.initialPrefix && (this.initialPrefix = e);
          for (var o = this.iterator + n; t ? 0 <= o : o < r.length; o += n)
            for (var i = r[o], a = 0; a <= i.length; a++)
              if (this.initialPrefix == i.substring(0, a))
                return (this.iterator = o), i;
          return o >= r.length
            ? ((this.iterator = r.length), this.initialPrefix)
            : o < 0
              ? e
              : void 0;
        },
        pushInput: function(e) {
          var t = this.historyBuffer.indexOf(e);
          -1 < t && this.historyBuffer.splice(t, 1),
            e.length && this.historyBuffer.push(e);
        },
        reset: function() {
          (this.initialPrefix = null),
            (this.iterator = this.historyBuffer.length);
        },
      });
    var F = {
      matchCommand: function(e, t, r, n) {
        var o = (function(e, t, r, n) {
          for (var o, i = [], a = [], s = 0; s < t.length; s++) {
            var l = t[s];
            ("insert" == r && "insert" != l.context) ||
              (l.context && l.context != r) ||
              (n.operator && "action" == l.type) ||
              !(o = (function(e, t) {
                {
                  if ("<character>" != t.slice(-11))
                    return e == t ? "full" : 0 == t.indexOf(e) && "partial";
                  var r = t.length - 11,
                    n = e.slice(0, r),
                    o = t.slice(0, r);
                  return n == o && e.length > r
                    ? "full"
                    : 0 == o.indexOf(n) && "partial";
                }
              })(e, l.keys)) ||
              ("partial" == o && i.push(l), "full" == o && a.push(l));
          }
          return { partial: i.length && i, full: a.length && a };
        })(e, t, n, r);
        if (!o.full && !o.partial) return { type: "none" };
        if (!o.full && o.partial) return { type: "partial" };
        for (var i = 0; i < o.full.length; i++) var a = o.full[i], s = s || a;
        if ("<character>" == s.keys.slice(-11)) {
          var l = (function(e) {
            var t = /^.*(<[^>]+>)$/.exec(e),
              r = t ? t[1] : e.slice(-1);
            if (1 < r.length)
              switch (r) {
                case "<CR>":
                  r = "\n";
                  break;
                case "<Space>":
                  r = " ";
                  break;
                default:
                  r = "";
              }
            return r;
          })(e);
          if (!l) return { type: "none" };
          r.selectedCharacter = l;
        }
        return { type: "full", command: s };
      },
      processCommand: function(e, t, r) {
        switch (((t.inputState.repeatOverride = r.repeatOverride), r.type)) {
          case "motion":
            this.processMotion(e, t, r);
            break;
          case "operator":
            this.processOperator(e, t, r);
            break;
          case "operatorMotion":
            this.processOperatorMotion(e, t, r);
            break;
          case "action":
            this.processAction(e, t, r);
            break;
          case "search":
            this.processSearch(e, t, r);
            break;
          case "ex":
          case "keyToEx":
            this.processEx(e, t, r);
        }
      },
      processMotion: function(e, t, r) {
        (t.inputState.motion = r.motion),
          (t.inputState.motionArgs = $(r.motionArgs)),
          this.evalInput(e, t);
      },
      processOperator: function(e, t, r) {
        var n = t.inputState;
        if (n.operator) {
          if (n.operator == r.operator)
            return (
              (n.motion = "expandToLine"),
              (n.motionArgs = { linewise: !0 }),
              void this.evalInput(e, t)
            );
          P(e);
        }
        (n.operator = r.operator),
          (n.operatorArgs = $(r.operatorArgs)),
          r.exitVisualBlock && ((t.visualBlock = !1), ae(e)),
          t.visualMode && this.evalInput(e, t);
      },
      processOperatorMotion: function(e, t, r) {
        var n = t.visualMode,
          o = $(r.operatorMotionArgs);
        o && n && o.visualLine && (t.visualLine = !0),
          this.processOperator(e, t, r),
          n || this.processMotion(e, t, r);
      },
      processAction: function(e, t, r) {
        var n = t.inputState,
          o = n.getRepeat(),
          i = !!o,
          a = $(r.actionArgs) || {};
        n.selectedCharacter && (a.selectedCharacter = n.selectedCharacter),
          r.operator && this.processOperator(e, t, r),
          r.motion && this.processMotion(e, t, r),
          (r.motion || r.operator) && this.evalInput(e, t),
          (a.repeat = o || 1),
          (a.repeatIsExplicit = i),
          (a.registerName = n.registerName),
          P(e),
          (t.lastMotion = null),
          r.isEdit && this.recordLastEdit(t, n, r),
          U[r.action](e, a, t);
      },
      processSearch: function(s, n, o) {
        if (s.getSearchCursor) {
          var l = o.searchArgs.forward,
            e = o.searchArgs.wholeWordOnly;
          Ce(s).setReversed(!l);
          var t = l ? "/" : "?",
            i = Ce(s).getQuery(),
            c = s.getScrollInfo();
          switch (o.searchArgs.querySrc) {
            case "prompt":
              var r = K.macroModeState;
              r.isPlaying
                ? p((h = r.replaySearchQueries.shift()), !0, !1)
                : Re(s, {
                  onClose: function(e) {
                    s.scrollTo(c.left, c.top), p(e, !0, !0);
                    var t = K.macroModeState;
                    t.isRecording &&
                      (function(e, t) {
                        if (e.isPlaying) return;
                        var r = e.latestRegister,
                          n = K.registerController.getRegister(r);
                        n && n.pushSearchQuery && n.pushSearchQuery(t);
                      })(t, e);
                  },
                  prefix: t,
                  desc: Te,
                  onKeyUp: function(e, t, r) {
                    var n,
                      o,
                      i,
                      a = Ze.keyName(e);
                    "Up" == a || "Down" == a
                      ? ((n = "Up" == a),
                        (o = e.target ? e.target.selectionEnd : 0),
                        r(
                          (t =
                            K.searchHistoryController.nextMatch(t, n) || "")
                        ),
                        o &&
                        e.target &&
                        (e.target.selectionEnd = e.target.selectionStart =
                          Math.min(o, e.target.value.length)))
                      : "Left" != a &&
                      "Right" != a &&
                      "Ctrl" != a &&
                      "Alt" != a &&
                      "Shift" != a &&
                      K.searchHistoryController.reset();
                    try {
                      i = Ee(s, t, !0, !0);
                    } catch (e) { }
                    i
                      ? s.scrollIntoView(Ie(s, !l, i), 30)
                      : (Ke(s), s.scrollTo(c.left, c.top));
                  },
                  onKeyDown: function(e, t, r) {
                    var n = Ze.keyName(e);
                    "Esc" == n ||
                      "Ctrl-C" == n ||
                      "Ctrl-[" == n ||
                      ("Backspace" == n && "" == t)
                      ? (K.searchHistoryController.pushInput(t),
                        K.searchHistoryController.reset(),
                        Ee(s, i),
                        Ke(s),
                        s.scrollTo(c.left, c.top),
                        Ze.e_stop(e),
                        P(s),
                        r(),
                        s.focus())
                      : "Up" == n || "Down" == n
                        ? Ze.e_stop(e)
                        : "Ctrl-U" == n && (Ze.e_stop(e), r(""));
                  },
                });
              break;
            case "wordUnderCursor":
              var a = ue(s, !1, 0, !1, !0),
                u = !0;
              if ((a || ((a = ue(s, !1, 0, !1, !1)), (u = !1)), !a)) return;
              var h = s.getLine(a.start.line).substring(a.start.ch, a.end.ch);
              (h =
                u && e
                  ? "\\b" + h + "\\b"
                  : h.replace(/([.?*+$\[\]\/\\(){}|\-])/g, "\\$1")),
                (K.jumpList.cachedCursor = s.getCursor()),
                s.setCursor(a.start),
                p(h, !0, !1);
          }
        }
        function p(t, e, r) {
          K.searchHistoryController.pushInput(t),
            K.searchHistoryController.reset();
          try {
            Ee(s, t, e, r);
          } catch (e) {
            return Le(s, "Invalid regex: " + t), void P(s);
          }
          F.processMotion(s, n, {
            type: "motion",
            motion: "findNext",
            motionArgs: { forward: !0, toJumplist: o.searchArgs.toJumplist },
          });
        }
      },
      processEx: function(a, e, t) {
        function r(e) {
          K.exCommandHistoryController.pushInput(e),
            K.exCommandHistoryController.reset(),
            Fe.processCommand(a, e);
        }
        function n(e, t, r) {
          var n,
            o,
            i = Ze.keyName(e);
          ("Esc" == i ||
            "Ctrl-C" == i ||
            "Ctrl-[" == i ||
            ("Backspace" == i && "" == t)) &&
            (K.exCommandHistoryController.pushInput(t),
              K.exCommandHistoryController.reset(),
              Ze.e_stop(e),
              P(a),
              r(),
              a.focus()),
            "Up" == i || "Down" == i
              ? (Ze.e_stop(e),
                (n = "Up" == i),
                (o = e.target ? e.target.selectionEnd : 0),
                r((t = K.exCommandHistoryController.nextMatch(t, n) || "")),
                o &&
                e.target &&
                (e.target.selectionEnd = e.target.selectionStart =
                  Math.min(o, e.target.value.length)))
              : "Ctrl-U" == i
                ? (Ze.e_stop(e), r(""))
                : "Left" != i &&
                "Right" != i &&
                "Ctrl" != i &&
                "Alt" != i &&
                "Shift" != i &&
                K.exCommandHistoryController.reset();
        }
        "keyToEx" == t.type
          ? Fe.processCommand(a, t.exArgs.input)
          : e.visualMode
            ? Re(a, {
              onClose: r,
              prefix: ":",
              value: "'<,'>",
              onKeyDown: n,
              selectValueOnOpen: !1,
            })
            : Re(a, { onClose: r, prefix: ":", onKeyDown: n });
      },
      evalInput: function(e, t) {
        var r,
          n,
          o,
          i,
          a,
          s,
          l,
          c,
          u,
          h,
          p,
          f,
          d = t.inputState,
          m = d.motion,
          g = d.motionArgs || {},
          v = d.operator,
          y = d.operatorArgs || {},
          k = d.registerName,
          C = t.sel,
          w = z(t.visualMode ? J(e, C.head) : e.getCursor("head")),
          x = z(t.visualMode ? J(e, C.anchor) : e.getCursor("anchor")),
          M = z(w),
          S = z(x);
        if (
          (v && this.recordLastEdit(t, d),
            0 <
              (n =
                void 0 !== d.repeatOverride
                  ? d.repeatOverride
                  : d.getRepeat()) && g.explicitRepeat
              ? (g.repeatIsExplicit = !0)
              : (g.noRepeat || (!g.explicitRepeat && 0 === n)) &&
              ((n = 1), (g.repeatIsExplicit = !1)),
            d.selectedCharacter &&
            (g.selectedCharacter = y.selectedCharacter = d.selectedCharacter),
            (g.repeat = n),
            P(e),
            m)
        ) {
          var A,
            b,
            L = W[m](e, w, g, t, d);
          if (((t.lastMotion = W[m]), !L)) return;
          g.toJumplist &&
            ((b = (A = K.jumpList).cachedCursor)
              ? (he(e, b, L), delete A.cachedCursor)
              : he(e, w, L)),
            (s = (s = L instanceof Array ? ((r = L[0]), L[1]) : L) || z(w)),
            t.visualMode
              ? ((t.visualBlock && s.ch === 1 / 0) || (s = J(e, s)),
                (r = (r = r && J(e, r)) || S),
                (C.anchor = r),
                (C.head = s),
                ae(e),
                ve(e, t, "<", Z(r, s) ? r : s),
                ve(e, t, ">", Z(r, s) ? s : r))
              : v || ((s = J(e, s)), e.setCursor(s.line, s.ch));
        }
        if (v) {
          if (
            (y.lastSel
              ? ((r = S),
                (o = y.lastSel),
                (i = Math.abs(o.head.line - o.anchor.line)),
                (a = Math.abs(o.head.ch - o.anchor.ch)),
                (s = o.visualLine
                  ? tt(S.line + i, S.ch)
                  : o.visualBlock
                    ? tt(S.line + i, S.ch + a)
                    : o.head.line == o.anchor.line
                      ? tt(S.line, S.ch + a)
                      : tt(S.line + i, S.ch)),
                (t.visualMode = !0),
                (t.visualLine = o.visualLine),
                (t.visualBlock = o.visualBlock),
                (C = t.sel = { anchor: r, head: s }),
                ae(e))
              : t.visualMode &&
              (y.lastSel = {
                anchor: z(C.anchor),
                head: z(C.head),
                visualBlock: t.visualBlock,
                visualLine: t.visualLine,
              }),
              t.visualMode)
          ) {
            if (
              ((h = G(C.head, C.anchor)),
                (p = Y(C.head, C.anchor)),
                (l = t.visualLine || y.linewise),
                (E = se(
                  e,
                  { anchor: h, head: p },
                  (c = t.visualBlock ? "block" : l ? "line" : "char")
                )),
                l)
            ) {
              var T = E.ranges;
              if ("block" == c)
                for (var R = 0; R < T.length; R++)
                  T[R].head.ch = te(e, T[R].head.line);
              else "line" == c && (T[0].head = tt(T[0].head.line + 1, 0));
            }
          } else {
            (h = z(r || S)),
              Z((p = z(s || M)), h) && ((u = h), (h = p), (p = u)),
              (l = g.linewise || y.linewise)
                ? ((f = p), (h.ch = 0), (f.ch = 0), f.line++)
                : g.forward &&
                (function(e, t, r) {
                  var n = e.getRange(t, r);
                  if (/\n\s*$/.test(n)) {
                    var o = n.split("\n");
                    o.pop();
                    for (
                      var i = o.pop();
                      0 < o.length && i && B(i);
                      i = o.pop()
                    )
                      r.line--, (r.ch = 0);
                    i ? (r.line--, (r.ch = te(e, r.line))) : (r.ch = 0);
                  }
                })(e, h, p);
            var E = se(
              e,
              { anchor: h, head: p },
              (c = "char"),
              !g.inclusive || l
            );
          }
          e.setSelections(E.ranges, E.primary),
            (t.lastMotion = null),
            (y.repeat = n),
            (y.registerName = k),
            (y.linewise = l);
          var O = D[v](e, y, E.ranges, S, s);
          t.visualMode && le(e, null != O), O && e.setCursor(O);
        }
      },
      recordLastEdit: function(e, t, r) {
        var n = K.macroModeState;
        n.isPlaying ||
          ((e.lastEditInputState = t),
            (e.lastEditActionCommand = r),
            (n.lastInsertModeChanges.changes = []),
            (n.lastInsertModeChanges.expectCursorActivityForChange = !1),
            (n.lastInsertModeChanges.visualBlock = e.visualBlock
              ? e.sel.head.line - e.sel.anchor.line
              : 0));
      },
    },
      W = {
        moveToTopLine: function(e, t, r) {
          var n = Ne(e).top + r.repeat - 1;
          return tt(n, ce(e.getLine(n)));
        },
        moveToMiddleLine: function(e) {
          var t = Ne(e),
            r = Math.floor(0.5 * (t.top + t.bottom));
          return tt(r, ce(e.getLine(r)));
        },
        moveToBottomLine: function(e, t, r) {
          var n = Ne(e).bottom - r.repeat + 1;
          return tt(n, ce(e.getLine(n)));
        },
        expandToLine: function(e, t, r) {
          return tt(t.line + r.repeat - 1, 1 / 0);
        },
        findNext: function(e, t, r) {
          var n = Ce(e),
            o = n.getQuery();
          if (o) {
            var i = !r.forward,
              i = n.isReversed() ? !i : i;
            return Be(e, o), Ie(e, i, o, r.repeat);
          }
        },
        findAndSelectNextInclusive: function(e, t, r, n, o) {
          var i = Ce(e),
            a = i.getQuery();
          if (a) {
            var s = !r.forward,
              l = (function(o, i, a, s, l) {
                void 0 === s && (s = 1);
                return o.operation(function() {
                  var e = o.getCursor(),
                    t = o.getSearchCursor(a, e),
                    r = t.find(!i);
                  !l.visualMode && r && X(t.from(), e) && t.find(!i);
                  for (var n = 0; n < s; n++)
                    if (
                      !(r = t.find(i)) &&
                      !(t = o.getSearchCursor(
                        a,
                        i ? tt(o.lastLine()) : tt(o.firstLine(), 0)
                      )).find(i)
                    )
                      return;
                  return [t.from(), t.to()];
                });
              })(e, (s = i.isReversed() ? !s : s), a, r.repeat, n);
            if (l) {
              if (o.operator) return l;
              var c = l[0],
                u = tt(l[1].line, l[1].ch - 1);
              if (n.visualMode) {
                (n.visualLine || n.visualBlock) &&
                  ((n.visualLine = !1),
                    (n.visualBlock = !1),
                    Ze.signal(e, "vim-mode-change", {
                      mode: "visual",
                      subMode: "",
                    }));
                var h = n.sel.anchor;
                if (h)
                  return i.isReversed()
                    ? r.forward
                      ? [h, c]
                      : [h, u]
                    : r.forward
                      ? [h, u]
                      : [h, c];
              } else
                (n.visualMode = !0),
                  (n.visualLine = !1),
                  (n.visualBlock = !1),
                  Ze.signal(e, "vim-mode-change", {
                    mode: "visual",
                    subMode: "",
                  });
              return s ? [u, c] : [c, u];
            }
          }
        },
        goToMark: function(e, t, r, n) {
          var o = Pe(e, n, r.selectedCharacter);
          return o
            ? r.linewise
              ? { line: o.line, ch: ce(e.getLine(o.line)) }
              : o
            : null;
        },
        moveToOtherHighlightedEnd: function(e, t, r, n) {
          if (n.visualBlock && r.sameLine) {
            var o = n.sel;
            return [
              J(e, tt(o.anchor.line, o.head.ch)),
              J(e, tt(o.head.line, o.anchor.ch)),
            ];
          }
          return [n.sel.head, n.sel.anchor];
        },
        jumpToMark: function(e, t, r, n) {
          for (var o = t, i = 0; i < r.repeat; i++) {
            var a,
              s,
              l,
              c = o;
            for (var u in n.marks) {
              y(u) &&
                ((a = n.marks[u].find()),
                  (r.forward ? Z(a, c) : Z(c, a)) ||
                  (r.linewise && a.line == c.line) ||
                  ((s = X(c, o)),
                    (l = r.forward ? ee(c, a, o) : ee(o, a, c)),
                    (s || l) && (o = a)));
            }
          }
          return r.linewise && (o = tt(o.line, ce(e.getLine(o.line)))), o;
        },
        moveByCharacters: function(e, t, r) {
          var n = r.repeat,
            o = r.forward ? t.ch + n : t.ch - n;
          return tt(t.line, o);
        },
        moveByLines: function(e, t, r, n) {
          var o = t,
            i = o.ch;
          switch (n.lastMotion) {
            case this.moveByLines:
            case this.moveByDisplayLines:
            case this.moveByScroll:
            case this.moveToColumn:
            case this.moveToEol:
              i = n.lastHPos;
              break;
            default:
              n.lastHPos = i;
          }
          var a = r.repeat + (r.repeatOffset || 0),
            s = r.forward ? o.line + a : o.line - a,
            l = e.firstLine(),
            c = e.lastLine(),
            u = e.findPosV(o, r.forward ? a : -a, "line", n.lastHSPos);
          return (
            (r.forward ? u.line > s : u.line < s) && ((s = u.line), (i = u.ch)),
            s < l && o.line == l
              ? this.moveToStartOfLine(e, t, r, n)
              : c < s && o.line == c
                ? me(e, t, r, n, !0)
                : (r.toFirstChar && ((i = ce(e.getLine(s))), (n.lastHPos = i)),
                  (n.lastHSPos = e.charCoords(tt(s, i), "div").left),
                  tt(s, i))
          );
        },
        moveByDisplayLines: function(e, t, r, n) {
          var o = t;
          switch (n.lastMotion) {
            case this.moveByDisplayLines:
            case this.moveByScroll:
            case this.moveByLines:
            case this.moveToColumn:
            case this.moveToEol:
              break;
            default:
              n.lastHSPos = e.charCoords(o, "div").left;
          }
          var i,
            a,
            s = r.repeat,
            l = e.findPosV(o, r.forward ? s : -s, "line", n.lastHSPos);
          return (
            l.hitSide &&
            (l = r.forward
              ? ((i = {
                top: e.charCoords(l, "div").top + 8,
                left: n.lastHSPos,
              }),
                e.coordsChar(i, "div"))
              : (((a = e.charCoords(tt(e.firstLine(), 0), "div")).left =
                n.lastHSPos),
                e.coordsChar(a, "div"))),
            (n.lastHPos = l.ch),
            l
          );
        },
        moveByPage: function(e, t, r) {
          var n = r.repeat;
          return e.findPosV(t, r.forward ? n : -n, "page");
        },
        moveByParagraph: function(e, t, r) {
          var n = r.forward ? 1 : -1;
          return ye(e, t, r.repeat, n);
        },
        moveBySentence: function(e, t, r) {
          var n = r.forward ? 1 : -1;
          return (function(e, t, r, n) {
            function u(e, t) {
              if (t.pos + t.dir < 0 || t.pos + t.dir >= t.line.length) {
                if (((t.ln += t.dir), !v(e, t.ln)))
                  return (t.line = null), (t.ln = null), void (t.pos = null);
                (t.line = e.getLine(t.ln)),
                  (t.pos = 0 < t.dir ? 0 : t.line.length - 1);
              } else t.pos += t.dir;
            }
            var o = { ln: t.line, pos: t.ch };
            for (; 0 < r;)
              (o = (
                n < 0
                  ? function(e, t, r, n) {
                    var o = {
                      line: (s = e.getLine(t)),
                      ln: t,
                      pos: r,
                      dir: n,
                    },
                      i = { ln: o.ln, pos: null },
                      a = "" === o.line;
                    for (u(e, o); null !== o.line;) {
                      if ("" === o.line && !a)
                        return null !== i.pos ? i : { ln: o.ln, pos: o.pos };
                      if (
                        C(o.line[o.pos]) &&
                        null !== i.pos &&
                        (o.ln !== i.ln || o.pos + 1 !== i.pos)
                      )
                        return i;
                      "" === o.line ||
                        B(o.line[o.pos]) ||
                        ((a = !1), (i = { ln: o.ln, pos: o.pos })),
                        u(e, o);
                    }
                    for (
                      var s = e.getLine(i.ln), l = (i.pos = 0);
                      l < s.length;
                      ++l
                    )
                      if (!B(s[l])) {
                        i.pos = l;
                        break;
                      }
                    return i;
                  }
                  : function(e, t, r, n) {
                    var o = "" === (l = e.getLine(t)),
                      i = { line: l, ln: t, pos: r, dir: n },
                      a = { ln: i.ln, pos: i.pos },
                      s = "" === i.line;
                    for (u(e, i); null !== i.line;) {
                      if (
                        ((a.ln = i.ln), (a.pos = i.pos), "" === i.line && !s)
                      )
                        return { ln: i.ln, pos: i.pos };
                      if (o && "" !== i.line && !B(i.line[i.pos]))
                        return { ln: i.ln, pos: i.pos };
                      !C(i.line[i.pos]) ||
                        o ||
                        (i.pos !== i.line.length - 1 &&
                          !B(i.line[i.pos + 1])) ||
                        (o = !0),
                        u(e, i);
                    }
                    var l = e.getLine(a.ln);
                    a.pos = 0;
                    for (var c = l.length - 1; 0 <= c; --c)
                      if (!B(l[c])) {
                        a.pos = c;
                        break;
                      }
                    return a;
                  }
              )(e, o.ln, o.pos, n)),
                r--;
            return tt(o.ln, o.pos);
          })(e, t, r.repeat, n);
        },
        moveByScroll: function(e, t, r, n) {
          var o = e.getScrollInfo(),
            i = null,
            a = (a = r.repeat) || o.clientHeight / (2 * e.defaultTextHeight()),
            s = e.charCoords(t, "local");
          if (((r.repeat = a), !(i = W.moveByDisplayLines(e, t, r, n))))
            return null;
          var l = e.charCoords(i, "local");
          return e.scrollTo(null, o.top + l.top - s.top), i;
        },
        moveByWords: function(e, t, r) {
          return (function(e, t, r, n, o, i) {
            var a = z(t),
              s = [];
            ((n && !o) || (!n && o)) && r++;
            for (var l = !(n && o), c = 0; c < r; c++) {
              var u = (function(e, t, r, n, o) {
                var i = t.line,
                  a = t.ch,
                  s = e.getLine(i),
                  l = r ? 1 : -1,
                  c = n ? g : m;
                if (o && "" == s) {
                  if (((i += l), (s = e.getLine(i)), !v(e, i))) return null;
                  a = r ? 0 : s.length;
                }
                for (; ;) {
                  if (o && "" == s) return { from: 0, to: 0, line: i };
                  for (var u = 0 < l ? s.length : -1, h = u, p = u; a != u;) {
                    for (var f = !1, d = 0; d < c.length && !f; ++d)
                      if (c[d](s.charAt(a))) {
                        for (h = a; a != u && c[d](s.charAt(a));) a += l;
                        if (
                          ((f = h != (p = a)),
                            h == t.ch && i == t.line && p == h + l)
                        )
                          continue;
                        return {
                          from: Math.min(h, p + 1),
                          to: Math.max(h, p),
                          line: i,
                        };
                      }
                    f || (a += l);
                  }
                  if (!v(e, (i += l))) return null;
                  (s = e.getLine(i)), (a = 0 < l ? 0 : s.length);
                }
              })(e, t, n, i, l);
              if (!u) {
                var h = te(e, e.lastLine());
                s.push(
                  n
                    ? { line: e.lastLine(), from: h, to: h }
                    : { line: 0, from: 0, to: 0 }
                );
                break;
              }
              s.push(u), (t = tt(u.line, n ? u.to - 1 : u.from));
            }
            var p = s.length != r,
              f = s[0],
              d = s.pop();
            return n && !o
              ? (p || (f.from == a.ch && f.line == a.line) || (d = s.pop()),
                tt(d.line, d.from))
              : n && o
                ? tt(d.line, d.to - 1)
                : !n && o
                  ? (p || (f.to == a.ch && f.line == a.line) || (d = s.pop()),
                    tt(d.line, d.to))
                  : tt(d.line, d.from);
          })(e, t, r.repeat, !!r.forward, !!r.wordEnd, !!r.bigWord);
        },
        moveTillCharacter: function(e, t, r) {
          var n = ge(e, r.repeat, r.forward, r.selectedCharacter),
            o = r.forward ? -1 : 1;
          return pe(o, r), n ? ((n.ch += o), n) : null;
        },
        moveToCharacter: function(e, t, r) {
          var n = r.repeat;
          return pe(0, r), ge(e, n, r.forward, r.selectedCharacter) || t;
        },
        moveToSymbol: function(e, t, r) {
          return (
            (function(e, t, r, n) {
              var o = z(e.getCursor()),
                i = r ? 1 : -1,
                a = r ? e.lineCount() : -1,
                s = o.ch,
                l = o.line,
                c = e.getLine(l),
                u = {
                  lineText: c,
                  nextCh: c.charAt(s),
                  lastCh: null,
                  index: s,
                  symb: n,
                  reverseSymb: (r
                    ? { ")": "(", "}": "{" }
                    : { "(": ")", "{": "}" })[n],
                  forward: r,
                  depth: 0,
                  curMoveThrough: !1,
                },
                h = fe[n];
              if (!h) return o;
              var p = de[h].init,
                f = de[h].isComplete;
              p && p(u);
              for (; l !== a && t;) {
                var d;
                (u.index += i),
                  (u.nextCh = u.lineText.charAt(u.index)),
                  u.nextCh ||
                  ((l += i),
                    (u.lineText = e.getLine(l) || ""),
                    0 < i
                      ? (u.index = 0)
                      : ((d = u.lineText.length),
                        (u.index = 0 < d ? d - 1 : 0)),
                    (u.nextCh = u.lineText.charAt(u.index))),
                  f(u) && ((o.line = l), (o.ch = u.index), t--);
              }
              if (u.nextCh || u.curMoveThrough) return tt(l, u.index);
              return o;
            })(e, r.repeat, r.forward, r.selectedCharacter) || t
          );
        },
        moveToColumn: function(e, t, r, n) {
          var o,
            i,
            a,
            s = r.repeat;
          return (
            (n.lastHPos = s - 1),
            (n.lastHSPos = e.charCoords(t, "div").left),
            (i = s),
            (a = (o = e).getCursor().line),
            J(o, tt(a, i - 1))
          );
        },
        moveToEol: function(e, t, r, n) {
          return me(e, t, r, n, !1);
        },
        moveToFirstNonWhiteSpaceCharacter: function(e, t) {
          return tt(t.line, ce(e.getLine(t.line)));
        },
        moveToMatchedSymbol: function(e, t) {
          for (
            var r, n = t, o = n.line, i = n.ch, a = e.getLine(o);
            i < a.length;
            i++
          )
            if ((r = a.charAt(i)) && -1 != "()[]{}".indexOf(r)) {
              var s = e.getTokenTypeAt(tt(o, i + 1));
              if ("string" !== s && "comment" !== s) break;
            }
          if (i < a.length) {
            var l = "<" === i || ">" === i ? /[(){}[\]<>]/ : /[(){}[\]]/;
            return e.findMatchingBracket(tt(o, i), { bracketRegex: l }).to;
          }
          return n;
        },
        moveToStartOfLine: function(e, t) {
          return tt(t.line, 0);
        },
        moveToLineOrEdgeOfDocument: function(e, t, r) {
          var n = r.forward ? e.lastLine() : e.firstLine();
          return (
            r.repeatIsExplicit &&
            (n = r.repeat - e.getOption("firstLineNumber")),
            tt(n, ce(e.getLine(n)))
          );
        },
        textObjectManipulation: function(e, t, r, n) {
          var o = r.selectedCharacter;
          "b" == o ? (o = "(") : "B" == o && (o = "{");
          var i = !r.textObjectInner;
          if (
            {
              "(": ")",
              ")": "(",
              "{": "}",
              "}": "{",
              "[": "]",
              "]": "[",
              "<": ">",
              ">": "<",
            }[o]
          )
            s = (function(e, t, r, n) {
              var o,
                i,
                a = t,
                s = {
                  "(": /[()]/,
                  ")": /[()]/,
                  "[": /[[\]]/,
                  "]": /[[\]]/,
                  "{": /[{}]/,
                  "}": /[{}]/,
                  "<": /[<>]/,
                  ">": /[<>]/,
                }[r],
                l = {
                  "(": "(",
                  ")": "(",
                  "[": "[",
                  "]": "[",
                  "{": "{",
                  "}": "{",
                  "<": "<",
                  ">": "<",
                }[r],
                c = e.getLine(a.line).charAt(a.ch) === l ? 1 : 0;
              if (
                ((o = e.scanForBracket(tt(a.line, a.ch + c), -1, void 0, {
                  bracketRegex: s,
                })),
                  (i = e.scanForBracket(tt(a.line, a.ch + c), 1, void 0, {
                    bracketRegex: s,
                  })),
                  !o || !i)
              )
                return { start: a, end: a };
              {
                var u;
                (o = o.pos),
                  (i = i.pos),
                  ((o.line == i.line && o.ch > i.ch) || o.line > i.line) &&
                  ((u = o), (o = i), (i = u));
              }
              n ? (i.ch += 1) : (o.ch += 1);
              return { start: o, end: i };
            })(e, t, o, i);
          else if ({ "'": !0, '"': !0, "`": !0 }[o])
            s = (function(e, t, r, n) {
              var o,
                i,
                a,
                s,
                l = z(t),
                c = e.getLine(l.line).split(""),
                u = c.indexOf(r);
              l.ch < u
                ? (l.ch = u)
                : u < l.ch && c[l.ch] == r && ((i = l.ch), --l.ch);
              if (c[l.ch] != r || i)
                for (a = l.ch; -1 < a && !o; a--) c[a] == r && (o = a + 1);
              else o = l.ch + 1;
              if (o && !i)
                for (a = o, s = c.length; a < s && !i; a++)
                  c[a] == r && (i = a);
              if (!o || !i) return { start: l, end: l };
              n && (--o, ++i);
              return { start: tt(l.line, o), end: tt(l.line, i) };
            })(e, t, o, i);
          else if ("W" === o) s = ue(e, i, 0, !0);
          else if ("w" === o) s = ue(e, i, 0, !1);
          else if ("p" === o) {
            var a,
              s = ye(e, t, r.repeat, 0, i);
            (r.linewise = !0),
              n.visualMode
                ? n.visualLine || (n.visualLine = !0)
                : ((a = n.inputState.operatorArgs) && (a.linewise = !0),
                  s.end.line--);
          } else {
            if ("t" !== o) return null;
            s = (function(e, t, r) {
              var n = t;
              if (!Ze.findMatchingTag || !Ze.findEnclosingTag)
                return { start: n, end: n };
              var o = Ze.findMatchingTag(e, t) || Ze.findEnclosingTag(e, t);
              if (!o || !o.open || !o.close) return { start: n, end: n };
              if (r) return { start: o.open.from, end: o.close.to };
              return { start: o.open.to, end: o.close.from };
            })(e, t, i);
          }
          return e.state.vim.visualMode
            ? (function(e, t, r) {
              var n,
                o = e.state.vim.sel,
                i = o.head,
                a = o.anchor;
              Z(r, t) && ((n = r), (r = t), (t = n));
              Z(i, a)
                ? ((i = G(t, i)), (a = Y(a, r)))
                : ((a = G(t, a)),
                  -1 == (i = q((i = Y(i, r)), 0, -1)).ch &&
                  i.line != e.firstLine() &&
                  (i = tt(i.line - 1, te(e, i.line - 1))));
              return [a, i];
            })(e, s.start, s.end)
            : [s.start, s.end];
        },
        repeatLastCharacterSearch: function(e, t, r) {
          var n = K.lastCharacterSearch,
            o = r.repeat,
            i = r.forward === n.forward,
            a = (n.increment ? 1 : 0) * (i ? -1 : 1);
          e.moveH(-a, "char");
          var s = ge(e, o, (r.inclusive = i), n.selectedCharacter);
          return s ? ((s.ch += a), s) : (e.moveH(a, "char"), t);
        },
      };
    function V(e, t) {
      for (var r = [], n = 0; n < t; n++) r.push(e);
      return r;
    }
    var D = {
      change: function(e, t, r) {
        var n,
          o,
          i,
          a,
          s,
          l,
          c = e.state.vim,
          u = r[0].anchor,
          h = r[0].head,
          p = c.visualMode
            ? t.fullLine
              ? ((h.ch = Number.MAX_VALUE),
                h.line--,
                e.setSelection(u, h),
                (n = e.getSelection()),
                e.replaceSelection(""),
                u)
              : ((n = e.getSelection()),
                (o = V("", r.length)),
                e.replaceSelections(o),
                G(r[0].head, r[0].anchor))
            : ((n = e.getRange(u, h)),
              "moveByWords" != (i = c.lastEditInputState || {}).motion ||
              B(n) ||
              ((a = /\s+$/.exec(n)) &&
                i.motionArgs &&
                i.motionArgs.forward &&
                ((h = q(h, 0, -a[0].length)),
                  (n = n.slice(0, -a[0].length)))),
              (s = new tt(u.line - 1, Number.MAX_VALUE)),
              (l = e.firstLine() == e.lastLine()),
              h.line > e.lastLine() && t.linewise && !l
                ? e.replaceRange("", s, h)
                : e.replaceRange("", u, h),
              t.linewise &&
              (l || (e.setCursor(s), Ze.commands.newlineAndIndent(e)),
                (u.ch = Number.MAX_VALUE)),
              u);
        K.registerController.pushText(
          t.registerName,
          "change",
          n,
          t.linewise,
          1 < r.length
        ),
          U.enterInsertMode(e, { head: p }, e.state.vim);
      },
      delete: function(e, t, r) {
        var n,
          o,
          i,
          a,
          s,
          l = e.state.vim;
        return (
          l.visualBlock
            ? ((o = e.getSelection()),
              (i = V("", r.length)),
              e.replaceSelections(i),
              (n = r[0].anchor))
            : ((a = r[0].anchor),
              (s = r[0].head),
              t.linewise &&
              s.line != e.firstLine() &&
              a.line == e.lastLine() &&
              a.line == s.line - 1 &&
              (a.line == e.firstLine()
                ? (a.ch = 0)
                : (a = tt(a.line - 1, te(e, a.line - 1)))),
              (o = e.getRange(a, s)),
              e.replaceRange("", a, s),
              (n = a),
              t.linewise && (n = W.moveToFirstNonWhiteSpaceCharacter(e, a))),
          K.registerController.pushText(
            t.registerName,
            "delete",
            o,
            t.linewise,
            l.visualBlock
          ),
          J(e, n)
        );
      },
      indent: function(e, t, r) {
        var n = e.state.vim,
          o = r[0].anchor.line,
          i = n.visualBlock ? r[r.length - 1].anchor.line : r[0].head.line,
          a = n.visualMode ? t.repeat : 1;
        t.linewise && i--;
        for (var s = o; s <= i; s++)
          for (var l = 0; l < a; l++) e.indentLine(s, t.indentRight);
        return W.moveToFirstNonWhiteSpaceCharacter(e, r[0].anchor);
      },
      indentAuto: function(e, t, r) {
        return (
          e.execCommand("indentAuto"),
          W.moveToFirstNonWhiteSpaceCharacter(e, r[0].anchor)
        );
      },
      changeCase: function(e, t, r, n, o) {
        for (
          var i = e.getSelections(), a = [], s = t.toLower, l = 0;
          l < i.length;
          l++
        ) {
          var c = i[l],
            u = "";
          if (!0 === s) u = c.toLowerCase();
          else if (!1 === s) u = c.toUpperCase();
          else
            for (var h = 0; h < c.length; h++) {
              var p = c.charAt(h);
              u += k(p) ? p.toLowerCase() : p.toUpperCase();
            }
          a.push(u);
        }
        return (
          e.replaceSelections(a),
          t.shouldMoveCursor
            ? o
            : !e.state.vim.visualMode &&
              t.linewise &&
              r[0].anchor.line + 1 == r[0].head.line
              ? W.moveToFirstNonWhiteSpaceCharacter(e, n)
              : t.linewise
                ? n
                : G(r[0].anchor, r[0].head)
        );
      },
      yank: function(e, t, r, n) {
        var o = e.state.vim,
          i = e.getSelection(),
          a = o.visualMode
            ? G(o.sel.anchor, o.sel.head, r[0].head, r[0].anchor)
            : n;
        return (
          K.registerController.pushText(
            t.registerName,
            "yank",
            i,
            t.linewise,
            o.visualBlock
          ),
          a
        );
      },
    };
    var U = {
      jumpListWalk: function(e, t, r) {
        var n, o, i, a;
        r.visualMode ||
          ((n = t.repeat),
            (o = t.forward),
            (a =
              (a = (i = K.jumpList.move(e, o ? n : -n)) ? i.find() : void 0) ||
              e.getCursor()),
            e.setCursor(a));
      },
      scroll: function(e, t, r) {
        var n, o, i, a, s, l, c, u;
        r.visualMode ||
          ((n = t.repeat || 1),
            (o = e.defaultTextHeight()),
            (i = e.getScrollInfo().top),
            (a = o * n),
            (s = t.forward ? i + a : i - a),
            (l = z(e.getCursor())),
            (c = e.charCoords(l, "local")),
            t.forward
              ? s > c.top
                ? ((l.line += (s - c.top) / o),
                  (l.line = Math.ceil(l.line)),
                  e.setCursor(l),
                  (c = e.charCoords(l, "local")),
                  e.scrollTo(null, c.top))
                : e.scrollTo(null, s)
              : (u = s + e.getScrollInfo().clientHeight) < c.bottom
                ? ((l.line -= (c.bottom - u) / o),
                  (l.line = Math.floor(l.line)),
                  e.setCursor(l),
                  (c = e.charCoords(l, "local")),
                  e.scrollTo(null, c.bottom - e.getScrollInfo().clientHeight))
                : e.scrollTo(null, s));
      },
      scrollToCursor: function(e, t) {
        var r = e.getCursor().line,
          n = e.charCoords(tt(r, 0), "local"),
          o = e.getScrollInfo().clientHeight,
          i = n.top,
          a = n.bottom - i;
        switch (t.position) {
          case "center":
            i = i - o / 2 + a;
            break;
          case "bottom":
            i = i - o + a;
        }
        e.scrollTo(null, i);
      },
      replayMacro: function(e, t, r) {
        var n = t.selectedCharacter,
          o = t.repeat,
          i = K.macroModeState;
        for ("@" == n ? (n = i.latestRegister) : (i.latestRegister = n); o--;)
          !(function(e, t, r, n) {
            var o = K.registerController.getRegister(n);
            if (":" == n)
              return (
                o.keyBuffer[0] && Fe.processCommand(e, o.keyBuffer[0]),
                (r.isPlaying = !1)
              );
            var i = o.keyBuffer,
              a = 0;
            (r.isPlaying = !0),
              (r.replaySearchQueries = o.searchQueries.slice(0));
            for (var s, l, c = 0; c < i.length; c++)
              for (var u, h = i[c]; h;) {
                (s = /<\w+-.+?>|<\w+>|./.exec(h)),
                  (l = s[0]),
                  (h = h.substring(s.index + l.length)),
                  Ze.Vim.handleKey(e, l, "macro"),
                  t.insertMode &&
                  ((u = o.insertModeChanges[a++].changes),
                    (K.macroModeState.lastInsertModeChanges.changes = u),
                    Xe(e, u, 1),
                    We(e));
              }
            r.isPlaying = !1;
          })(e, r, i, n);
      },
      enterMacroRecordMode: function(e, t) {
        var r = K.macroModeState,
          n = t.selectedCharacter;
        K.registerController.isValidRegister(n) && r.enterMacroRecordMode(e, n);
      },
      toggleOverwrite: function(e) {
        e.state.overwrite
          ? (e.toggleOverwrite(!1),
            e.setOption("keyMap", "vim-insert"),
            Ze.signal(e, "vim-mode-change", { mode: "insert" }))
          : (e.toggleOverwrite(!0),
            e.setOption("keyMap", "vim-replace"),
            Ze.signal(e, "vim-mode-change", { mode: "replace" }));
      },
      enterInsertMode: function(e, t, r) {
        if (!e.getOption("readOnly")) {
          (r.insertMode = !0), (r.insertModeRepeat = (t && t.repeat) || 1);
          var n = t ? t.insertAt : null,
            o = r.sel,
            i = t.head || e.getCursor("head"),
            a = e.listSelections().length;
          if ("eol" == n) i = tt(i.line, te(e, i.line));
          else if ("bol" == n) i = tt(i.line, 0);
          else if ("charAfter" == n) i = q(i, 0, 1);
          else if ("firstNonBlank" == n)
            i = W.moveToFirstNonWhiteSpaceCharacter(e, i);
          else if ("startOfSelectedArea" == n) {
            if (!r.visualMode) return;
            r.visualBlock
              ? ((i = tt(
                Math.min(o.head.line, o.anchor.line),
                Math.min(o.head.ch, o.anchor.ch)
              )),
                (a = Math.abs(o.head.line - o.anchor.line) + 1))
              : (i =
                o.head.line < o.anchor.line ? o.head : tt(o.anchor.line, 0));
          } else if ("endOfSelectedArea" == n) {
            if (!r.visualMode) return;
            r.visualBlock
              ? ((i = tt(
                Math.min(o.head.line, o.anchor.line),
                Math.max(o.head.ch + 1, o.anchor.ch)
              )),
                (a = Math.abs(o.head.line - o.anchor.line) + 1))
              : (i =
                o.head.line >= o.anchor.line
                  ? q(o.head, 0, 1)
                  : tt(o.anchor.line, 0));
          } else if ("inplace" == n) {
            if (r.visualMode) return;
          } else "lastEdit" == n && (i = _e(e) || i);
          e.setOption("disableInput", !1),
            t && t.replace
              ? (e.toggleOverwrite(!0),
                e.setOption("keyMap", "vim-replace"),
                Ze.signal(e, "vim-mode-change", { mode: "replace" }))
              : (e.toggleOverwrite(!1),
                e.setOption("keyMap", "vim-insert"),
                Ze.signal(e, "vim-mode-change", { mode: "insert" })),
            K.macroModeState.isPlaying ||
            (e.on("change", De), Ze.on(e.getInputField(), "keydown", Qe)),
            r.visualMode && le(e),
            oe(e, i, a);
        }
      },
      toggleVisualMode: function(e, t, r) {
        var n,
          o = t.repeat,
          i = e.getCursor();
        r.visualMode
          ? r.visualLine ^ t.linewise || r.visualBlock ^ t.blockwise
            ? ((r.visualLine = !!t.linewise),
              (r.visualBlock = !!t.blockwise),
              Ze.signal(e, "vim-mode-change", {
                mode: "visual",
                subMode: r.visualLine
                  ? "linewise"
                  : r.visualBlock
                    ? "blockwise"
                    : "",
              }),
              ae(e))
            : le(e)
          : ((r.visualMode = !0),
            (r.visualLine = !!t.linewise),
            (r.visualBlock = !!t.blockwise),
            (n = J(e, tt(i.line, i.ch + o - 1))),
            (r.sel = { anchor: i, head: n }),
            Ze.signal(e, "vim-mode-change", {
              mode: "visual",
              subMode: r.visualLine
                ? "linewise"
                : r.visualBlock
                  ? "blockwise"
                  : "",
            }),
            ae(e),
            ve(e, r, "<", G(i, n)),
            ve(e, r, ">", Y(i, n)));
      },
      reselectLastSelection: function(e, t, r) {
        var n = r.lastSelection;
        if ((r.visualMode && ie(e, r), n)) {
          var o = n.anchorMark.find(),
            i = n.headMark.find();
          if (!o || !i) return;
          (r.sel = { anchor: o, head: i }),
            (r.visualMode = !0),
            (r.visualLine = n.visualLine),
            (r.visualBlock = n.visualBlock),
            ae(e),
            ve(e, r, "<", G(o, i)),
            ve(e, r, ">", Y(o, i)),
            Ze.signal(e, "vim-mode-change", {
              mode: "visual",
              subMode: r.visualLine
                ? "linewise"
                : r.visualBlock
                  ? "blockwise"
                  : "",
            });
        }
      },
      joinLines: function(e, t, r) {
        var n, o, i;
        r.visualMode
          ? ((o = e.getCursor("anchor")),
            Z((n = e.getCursor("head")), o) && ((l = n), (n = o), (o = l)),
            (n.ch = te(e, n.line) - 1))
          : ((i = Math.max(t.repeat, 2)),
            (o = e.getCursor()),
            (n = J(e, tt(o.line + i - 1, 1 / 0))));
        for (var a = 0, s = o.line; s < n.line; s++) {
          a = te(e, o.line);
          var l = tt(o.line + 1, te(e, o.line + 1)),
            c = e.getRange(o, l),
            c = t.keepSpaces
              ? c.replace(/\n\r?/g, "")
              : c.replace(/\n\s*/g, " ");
          e.replaceRange(c, o, l);
        }
        var u = tt(o.line, a);
        r.visualMode && le(e, !1), e.setCursor(u);
      },
      newLineAndEnterInsertMode: function(e, t, r) {
        r.insertMode = !0;
        var n = z(e.getCursor());
        n.line !== e.firstLine() || t.after
          ? ((n.line = t.after ? n.line : n.line - 1),
            (n.ch = te(e, n.line)),
            e.setCursor(n),
            (
              Ze.commands.newlineAndIndentContinueComment ||
              Ze.commands.newlineAndIndent
            )(e))
          : (e.replaceRange("\n", tt(e.firstLine(), 0)),
            e.setCursor(e.firstLine(), 0)),
          this.enterInsertMode(e, { repeat: t.repeat }, r);
      },
      paste: function(n, e, t) {
        var o,
          i,
          r,
          a,
          s,
          l,
          c,
          u = z(n.getCursor()),
          h = K.registerController.getRegister(e.registerName),
          p = h.toString();
        if (p) {
          e.matchIndent &&
            ((o = n.getOption("tabSize")),
              (i = function(e) {
                var t = e.split("\t").length - 1,
                  r = e.split(" ").length - 1;
                return t * o + r;
              }),
              (r = n.getLine(n.getCursor().line)),
              (a = i(r.match(/^\s*/)[0])),
              (s = p.replace(/\n$/, "")),
              (l = p !== s),
              (c = i(p.match(/^\s*/)[0])),
              (p = s.replace(/^\s*/gm, function(e) {
                var t = a + (i(e) - c);
                if (t < 0) return "";
                if (n.getOption("indentWithTabs")) {
                  var r = Math.floor(t / o);
                  return Array(r + 1).join("\t");
                }
                return Array(t + 1).join(" ");
              })),
              (p += l ? "\n" : "")),
            1 < e.repeat && (p = Array(e.repeat + 1).join(p));
          var f,
            d,
            m,
            g,
            v,
            y,
            k,
            C,
            w,
            x,
            M,
            S = h.linewise,
            A = h.blockwise;
          if (A) {
            (p = p.split("\n")), S && p.pop();
            for (var b = 0; b < p.length; b++) p[b] = "" == p[b] ? " " : p[b];
            (u.ch += e.after ? 1 : 0), (u.ch = Math.min(te(n, u.line), u.ch));
          } else
            S
              ? t.visualMode
                ? (p = t.visualLine
                  ? p.slice(0, -1)
                  : "\n" + p.slice(0, p.length - 1) + "\n")
                : e.after
                  ? ((p = "\n" + p.slice(0, p.length - 1)),
                    (u.ch = te(n, u.line)))
                  : (u.ch = 0)
              : (u.ch += e.after ? 1 : 0);
          if (t.visualMode) {
            t.lastPastedText = p;
            var L =
              ((w = n),
                (M = (x = t).lastSelection),
                (x.visualMode
                  ? function() {
                    var e = w.listSelections(),
                      t = e[0],
                      r = e[e.length - 1];
                    return [
                      Z(t.anchor, t.head) ? t.anchor : t.head,
                      Z(r.anchor, r.head) ? r.head : r.anchor,
                    ];
                  }
                  : function() {
                    var e = w.getCursor(),
                      t = w.getCursor(),
                      r = M.visualBlock;
                    if (r) {
                      for (
                        var n = r.width,
                        o = r.height,
                        t = tt(e.line + o, e.ch + n),
                        i = [],
                        a = e.line;
                        a < t.line;
                        a++
                      ) {
                        var s = { anchor: tt(a, e.ch), head: tt(a, t.ch) };
                        i.push(s);
                      }
                      w.setSelections(i);
                    } else {
                      var l = M.anchorMark.find(),
                        c = M.headMark.find(),
                        u = c.line - l.line,
                        h = c.ch - l.ch;
                      (t = { line: t.line + u, ch: u ? t.ch : h + t.ch }),
                        M.visualLine &&
                        ((e = tt(e.line, 0)),
                          (t = tt(t.line, te(w, t.line)))),
                        w.setSelection(e, t);
                    }
                    return [e, t];
                  })()),
              T = L[0],
              R = L[1],
              E = n.getSelection(),
              O = n.listSelections(),
              B = new Array(O.length).join("1").split("1");
            t.lastSelection && (m = t.lastSelection.headMark.find()),
              K.registerController.unnamedRegister.setText(E),
              (f = A
                ? (n.replaceSelections(B),
                  (R = tt(T.line + p.length - 1, T.ch)),
                  n.setCursor(T),
                  ne(n, R),
                  n.replaceSelections(p),
                  T)
                : t.visualBlock
                  ? (n.replaceSelections(B),
                    n.setCursor(T),
                    n.replaceRange(p, T, T),
                    T)
                  : (n.replaceRange(p, T, R),
                    n.posFromIndex(n.indexFromPos(T) + p.length - 1))),
              m && (t.lastSelection.headMark = n.setBookmark(m)),
              S && (f.ch = 0);
          } else if (A) {
            n.setCursor(u);
            for (b = 0; b < p.length; b++) {
              var I = u.line + b;
              I > n.lastLine() && n.replaceRange("\n", tt(I, 0)),
                te(n, I) < u.ch &&
                ((g = n),
                  (v = I),
                  (y = u.ch),
                  0,
                  (k = te(g, v)),
                  (C = new Array(y - k + 1).join(" ")),
                  g.setCursor(tt(v, k)),
                  g.replaceRange(C, g.getCursor()));
            }
            n.setCursor(u),
              ne(n, tt(u.line + p.length - 1, u.ch)),
              n.replaceSelections(p),
              (f = u);
          } else
            n.replaceRange(p, u),
              (f =
                S && e.after
                  ? tt(u.line + 1, ce(n.getLine(u.line + 1)))
                  : S && !e.after
                    ? tt(u.line, ce(n.getLine(u.line)))
                    : !S && e.after
                      ? ((d = n.indexFromPos(u)), n.posFromIndex(d + p.length - 1))
                      : ((d = n.indexFromPos(u)), n.posFromIndex(d + p.length)));
          t.visualMode && le(n, !1), n.setCursor(f);
        }
      },
      undo: function(e, t) {
        e.operation(function() {
          Q(e, Ze.commands.undo, t.repeat)(),
            e.setCursor(e.getCursor("anchor"));
        });
      },
      redo: function(e, t) {
        Q(e, Ze.commands.redo, t.repeat)();
      },
      setRegister: function(e, t, r) {
        r.inputState.registerName = t.selectedCharacter;
      },
      setMark: function(e, t, r) {
        ve(e, r, t.selectedCharacter, e.getCursor());
      },
      replace: function(e, t, r) {
        var n,
          o,
          i,
          a,
          s = t.selectedCharacter,
          l = e.getCursor(),
          c = e.listSelections(),
          u = r.visualMode
            ? ((l = e.getCursor("start")), e.getCursor("end"))
            : ((n = e.getLine(l.line)),
              (o = l.ch + t.repeat) > n.length && (o = n.length),
              tt(l.line, o));
        "\n" == s
          ? (r.visualMode || e.replaceRange("", l, u),
            (
              Ze.commands.newlineAndIndentContinueComment ||
              Ze.commands.newlineAndIndent
            )(e))
          : ((a = (a = e.getRange(l, u)).replace(/[^\n]/g, s)),
            r.visualBlock
              ? ((i = new Array(e.getOption("tabSize") + 1).join(" ")),
                (a = (a = e.getSelection())
                  .replace(/\t/g, i)
                  .replace(/[^\n]/g, s)
                  .split("\n")),
                e.replaceSelections(a))
              : e.replaceRange(a, l, u),
            r.visualMode
              ? ((l = Z(c[0].anchor, c[0].head) ? c[0].anchor : c[0].head),
                e.setCursor(l),
                le(e, !1))
              : e.setCursor(q(u, 0, -1)));
      },
      incrementNumberToken: function(e, t) {
        for (
          var r,
          n,
          o,
          i,
          a,
          s,
          l,
          c,
          u,
          h,
          p,
          f = e.getCursor(),
          d = e.getLine(f.line),
          m = /(-?)(?:(0x)([\da-f]+)|(0b|0|)(\d+))/gi;
          null !== (r = m.exec(d)) &&
          ((o = (n = r.index) + r[0].length), !(f.ch < o));

        );
        (!t.backtrack && o <= f.ch) ||
          (r &&
            ((i = r[2] || r[4]),
              (a = r[3] || r[5]),
              (s = t.increase ? 1 : -1),
              (l = { "0b": 2, 0: 8, "": 10, "0x": 16 }[i.toLowerCase()]),
              (c = (parseInt(r[1] + a, l) + s * t.repeat).toString(l)),
              (u = i
                ? new Array(a.length - c.length + 1 + r[1].length).join("0")
                : ""),
              (c = "-" === c.charAt(0) ? "-" + i + u + c.substr(1) : i + u + c),
              (h = tt(f.line, n)),
              (p = tt(f.line, o)),
              e.replaceRange(c, h, p),
              e.setCursor(tt(f.line, n + c.length - 1))));
      },
      repeatLastEdit: function(e, t, r) {
        var n;
        r.lastEditInputState &&
          ((n = t.repeat) && t.repeatIsExplicit
            ? (r.lastEditInputState.repeatOverride = n)
            : (n = r.lastEditInputState.repeatOverride || n),
            ze(e, r, n, !1));
      },
      indent: function(e, t) {
        e.indentLine(e.getCursor().line, t.indentRight);
      },
      exitInsertMode: We,
    };
    function J(e, t) {
      var r = e.state.vim,
        n = r.insertMode || r.visualMode,
        o = Math.min(Math.max(e.firstLine(), t.line), e.lastLine()),
        i = te(e, o) - 1 + !!n,
        a = Math.min(Math.max(0, t.ch), i);
      return tt(o, a);
    }
    function $(e) {
      var t = {};
      for (var r in e) e.hasOwnProperty(r) && (t[r] = e[r]);
      return t;
    }
    function q(e, t, r) {
      return (
        "object" == typeof t && ((r = t.ch), (t = t.line)),
        tt(e.line + t, e.ch + r)
      );
    }
    function Q(t, r, n) {
      return function() {
        for (var e = 0; e < n; e++) r(t);
      };
    }
    function z(e) {
      return tt(e.line, e.ch);
    }
    function X(e, t) {
      return e.ch == t.ch && e.line == t.line;
    }
    function Z(e, t) {
      return e.line < t.line || (e.line == t.line && e.ch < t.ch);
    }
    function G(e, t) {
      return (
        2 < arguments.length &&
        (t = G.apply(void 0, Array.prototype.slice.call(arguments, 1))),
        Z(e, t) ? e : t
      );
    }
    function Y(e, t) {
      return (
        2 < arguments.length &&
        (t = Y.apply(void 0, Array.prototype.slice.call(arguments, 1))),
        Z(e, t) ? t : e
      );
    }
    function ee(e, t, r) {
      var n = Z(e, t),
        o = Z(t, r);
      return n && o;
    }
    function te(e, t) {
      return e.getLine(t).length;
    }
    function re(e) {
      return e.trim ? e.trim() : e.replace(/^\s+|\s+$/g, "");
    }
    function ne(e, t) {
      var r = [],
        n = e.listSelections(),
        o = z(e.clipPos(t)),
        i = !X(t, o),
        a = (function(e, t, r) {
          for (var n = 0; n < e.length; n++) {
            var o = "head" != r && X(e[n].anchor, t),
              i = "anchor" != r && X(e[n].head, t);
            if (o || i) return n;
          }
          return -1;
        })(n, e.getCursor("head")),
        s = X(n[a].head, n[a].anchor),
        l = n.length - 1,
        c = a < l - a ? l : 0,
        u = n[c].anchor,
        h = Math.min(u.line, o.line),
        p = Math.max(u.line, o.line),
        f = u.ch,
        d = o.ch,
        m = n[c].head.ch - f,
        g = d - f;
      0 < m && g <= 0
        ? (f++, i || d--)
        : m < 0 && 0 <= g
          ? (f--, s || d++)
          : m < 0 && -1 == g && (f--, d++);
      for (var v = h; v <= p; v++) {
        var y = { anchor: new tt(v, f), head: new tt(v, d) };
        r.push(y);
      }
      return e.setSelections(r), (t.ch = d), (u.ch = f), u;
    }
    function oe(e, t, r) {
      for (var n = [], o = 0; o < r; o++) {
        var i = q(t, o, 0);
        n.push({ anchor: i, head: i });
      }
      e.setSelections(n, 0);
    }
    function ie(e, t) {
      var r = t.sel.anchor,
        n = t.sel.head;
      t.lastPastedText &&
        ((n = e.posFromIndex(e.indexFromPos(r) + t.lastPastedText.length)),
          (t.lastPastedText = null)),
        (t.lastSelection = {
          anchorMark: e.setBookmark(r),
          headMark: e.setBookmark(n),
          anchor: z(r),
          head: z(n),
          visualMode: t.visualMode,
          visualLine: t.visualLine,
          visualBlock: t.visualBlock,
        });
    }
    function ae(e, t, r) {
      var n = e.state.vim,
        o = se(
          e,
          (t = t || n.sel),
          (r = r || n.visualLine ? "line" : n.visualBlock ? "block" : "char")
        );
      e.setSelections(o.ranges, o.primary), Je(e);
    }
    function se(e, t, r, n) {
      var o,
        i = z(t.head),
        a = z(t.anchor);
      if ("char" == r) {
        var s = n || Z(t.head, t.anchor) ? 0 : 1,
          l = Z(t.head, t.anchor) ? 1 : 0,
          i = q(t.head, 0, s);
        return {
          ranges: [{ anchor: (a = q(t.anchor, 0, l)), head: i }],
          primary: 0,
        };
      }
      if ("line" == r)
        return (
          Z(t.head, t.anchor)
            ? ((i.ch = 0), (a.ch = te(e, a.line)))
            : ((a.ch = 0),
              (o = e.lastLine()),
              i.line > o && (i.line = o),
              (i.ch = te(e, i.line))),
          { ranges: [{ anchor: a, head: i }], primary: 0 }
        );
      if ("block" == r) {
        for (
          var c = Math.min(a.line, i.line),
          u = Math.min(a.ch, i.ch),
          h = Math.max(a.line, i.line),
          p = Math.max(a.ch, i.ch) + 1,
          f = h - c + 1,
          d = i.line == c ? 0 : f - 1,
          m = [],
          g = 0;
          g < f;
          g++
        )
          m.push({ anchor: tt(c + g, u), head: tt(c + g, p) });
        return { ranges: m, primary: d };
      }
    }
    function le(e, t) {
      var r = e.state.vim;
      !1 !== t && e.setCursor(J(e, r.sel.head)),
        ie(e, r),
        (r.visualMode = !1),
        (r.visualLine = !1),
        (r.visualBlock = !1),
        r.insertMode || Ze.signal(e, "vim-mode-change", { mode: "normal" }),
        $e(r);
    }
    function ce(e) {
      if (!e) return 0;
      var t = e.search(/\S/);
      return -1 == t ? e.length : t;
    }
    function ue(e, t, r, n, o) {
      for (
        var i,
        a,
        s =
          ((a = (i = e).getCursor("head")),
            1 == i.getSelection().length && (a = G(a, i.getCursor("anchor"))),
            a),
        l = e.getLine(s.line),
        c = s.ch,
        u = o ? m[0] : g[0];
        !u(l.charAt(c));

      )
        if (++c >= l.length) return null;
      n ? (u = g[0]) : (u = m[0])(l.charAt(c)) || (u = m[1]);
      for (var h = c, p = c; u(l.charAt(h)) && h < l.length;) h++;
      for (; u(l.charAt(p)) && 0 <= p;) p--;
      if ((p++, t)) {
        for (var f = h; /\s/.test(l.charAt(h)) && h < l.length;) h++;
        if (f == h) {
          for (var d = p; /\s/.test(l.charAt(p - 1)) && 0 < p;) p--;
          p = p || d;
        }
      }
      return { start: tt(s.line, p), end: tt(s.line, h) };
    }
    function he(e, t, r) {
      X(t, r) || K.jumpList.add(e, t, r);
    }
    function pe(e, t) {
      (K.lastCharacterSearch.increment = e),
        (K.lastCharacterSearch.forward = t.forward),
        (K.lastCharacterSearch.selectedCharacter = t.selectedCharacter);
    }
    var fe = {
      "(": "bracket",
      ")": "bracket",
      "{": "bracket",
      "}": "bracket",
      "[": "section",
      "]": "section",
      "*": "comment",
      "/": "comment",
      m: "method",
      M: "method",
      "#": "preprocess",
    },
      de = {
        bracket: {
          isComplete: function(e) {
            if (e.nextCh === e.symb) {
              if ((e.depth++, 1 <= e.depth)) return !0;
            } else e.nextCh === e.reverseSymb && e.depth--;
            return !1;
          },
        },
        section: {
          init: function(e) {
            (e.curMoveThrough = !0),
              (e.symb = (e.forward ? "]" : "[") === e.symb ? "{" : "}");
          },
          isComplete: function(e) {
            return 0 === e.index && e.nextCh === e.symb;
          },
        },
        comment: {
          isComplete: function(e) {
            var t = "*" === e.lastCh && "/" === e.nextCh;
            return (e.lastCh = e.nextCh), t;
          },
        },
        method: {
          init: function(e) {
            (e.symb = "m" === e.symb ? "{" : "}"),
              (e.reverseSymb = "{" === e.symb ? "}" : "{");
          },
          isComplete: function(e) {
            return e.nextCh === e.symb;
          },
        },
        preprocess: {
          init: function(e) {
            e.index = 0;
          },
          isComplete: function(e) {
            if ("#" === e.nextCh) {
              var t = e.lineText.match(/#(\w+)/)[1];
              if ("endif" === t) {
                if (e.forward && 0 === e.depth) return !0;
                e.depth++;
              } else if ("if" === t) {
                if (!e.forward && 0 === e.depth) return !0;
                e.depth--;
              }
              if ("else" === t && 0 === e.depth) return !0;
            }
            return !1;
          },
        },
      };
    function me(e, t, r, n, o) {
      var i = tt(t.line + r.repeat - 1, 1 / 0),
        a = e.clipPos(i);
      return (
        a.ch--,
        o ||
        ((n.lastHPos = 1 / 0), (n.lastHSPos = e.charCoords(a, "div").left)),
        i
      );
    }
    function ge(e, t, r, n) {
      for (var o, i = e.getCursor(), a = i.ch, s = 0; s < t; s++) {
        if (
          -1 ==
          (o = (function(e, t, r, n, o) {
            var i;
            n
              ? -1 == (i = t.indexOf(r, e + 1)) || o || --i
              : -1 == (i = t.lastIndexOf(r, e - 1)) || o || (i += 1);
            return i;
          })(a, e.getLine(i.line), n, r, !0))
        )
          return null;
        a = o;
      }
      return tt(e.getCursor().line, o);
    }
    function ve(e, t, r, n) {
      w(r, f) &&
        (t.marks[r] && t.marks[r].clear(), (t.marks[r] = e.setBookmark(n)));
    }
    function ye(t, e, r, n, o) {
      var i,
        a = e.line,
        s = t.firstLine(),
        l = t.lastLine(),
        c = a;
      function u(e) {
        return !t.getLine(e);
      }
      function h(e, t, r) {
        return r ? u(e) != u(e + t) : !u(e) && u(e + t);
      }
      if (n) {
        for (; s <= c && c <= l && 0 < r;) h(c, n) && r--, (c += n);
        return new tt(c, 0);
      }
      var p,
        f = t.state.vim;
      f.visualLine &&
        h(a, 1, !0) &&
        h((p = f.sel.anchor).line, -1, !0) &&
        ((o && p.line == a) || (a += 1));
      for (var d = u(a), c = a; c <= l && r; c++)
        h(c, 1, !0) && ((o && u(c) == d) || r--);
      for (
        i = new tt(c, 0), l < c && !d ? (d = !0) : (o = !1), c = a;
        s < c && ((o && u(c) != d && c != a) || !h(c, -1, !0));
        c--
      );
      return { start: new tt(c, 0), end: i };
    }
    function ke() { }
    function Ce(e) {
      var t = e.state.vim;
      return t.searchState_ || (t.searchState_ = new ke());
    }
    function we(e, t) {
      var r = xe(e, t) || [];
      if (!r.length) return [];
      var n = [];
      if (0 === r[0]) {
        for (var o = 0; o < r.length; o++)
          "number" == typeof r[o] && n.push(e.substring(r[o] + 1, r[o + 1]));
        return n;
      }
    }
    function xe(e, t) {
      t = t || "/";
      for (var r = !1, n = [], o = 0; o < e.length; o++) {
        var i = e.charAt(o);
        r || i != t || n.push(o), (r = !r && "\\" == i);
      }
      return n;
    }
    M("pcre", !0, "boolean"),
      (ke.prototype = {
        getQuery: function() {
          return K.query;
        },
        setQuery: function(e) {
          K.query = e;
        },
        getOverlay: function() {
          return this.searchOverlay;
        },
        setOverlay: function(e) {
          this.searchOverlay = e;
        },
        isReversed: function() {
          return K.isReversed;
        },
        setReversed: function(e) {
          K.isReversed = e;
        },
        getScrollbarAnnotate: function() {
          return this.annotate;
        },
        setScrollbarAnnotate: function(e) {
          this.annotate = e;
        },
      });
    var Me = { "\\n": "\n", "\\r": "\r", "\\t": "\t" };
    function Se(e) {
      for (var t, r = !1, n = [], o = -1; o < e.length; o++) {
        var i = e.charAt(o) || "",
          a = e.charAt(o + 1) || "";
        Me[i + a]
          ? (n.push(Me[i + a]), o++)
          : r
            ? (n.push(i), (r = !1))
            : "\\" === i
              ? ((r = !0),
                (t = a),
                u.test(t) || "$" === a
                  ? n.push("$")
                  : "/" !== a && "\\" !== a && n.push("\\"))
              : ("$" === i && n.push("$"), n.push(i), "/" === a && n.push("\\"));
      }
      return n.join("");
    }
    var Ae = {
      "\\/": "/",
      "\\\\": "\\",
      "\\n": "\n",
      "\\r": "\r",
      "\\t": "\t",
      "\\&": "&",
    };
    function be(e, t, r) {
      if (
        (K.registerController.getRegister("/").setText(e), e instanceof RegExp)
      )
        return e;
      var n,
        o,
        i = xe(e, "/");
      return (
        i.length
          ? ((n = e.substring(0, i[0])),
            (o = -1 != e.substring(i[0]).indexOf("i")))
          : (n = e),
        n
          ? (A("pcre") ||
            (n = (function(e) {
              for (var t = !1, r = [], n = -1; n < e.length; n++) {
                var o = e.charAt(n) || "",
                  i = e.charAt(n + 1) || "",
                  a = i && -1 != "|(){".indexOf(i);
                t
                  ? (("\\" === o && a) || r.push(o), (t = !1))
                  : "\\" === o
                    ? ((t = !0),
                      i && -1 != "}".indexOf(i) && (a = !0),
                      (a && "\\" !== i) || r.push(o))
                    : (r.push(o), a && "\\" !== i && r.push("\\"));
              }
              return r.join("");
            })(n)),
            r && (t = /^[^A-Z]*$/.test(n)),
            new RegExp(n, t || o ? "i" : void 0))
          : null
      );
    }
    function Le(e, t) {
      e.openNotification
        ? e.openNotification('<span style="color: red">' + t + "</span>", {
          bottom: !0,
          duration: 5e3,
        })
        : alert(t);
    }
    var Te = "(Javascript regexp)";
    function Re(e, t) {
      var r,
        n,
        o,
        i,
        a,
        s,
        l,
        c,
        u = (t.prefix || "") + " " + (t.desc || ""),
        h =
          ((r = t.prefix),
            (n = t.desc),
            (o =
              '<span style="font-family: monospace; white-space: pre">' +
              (r || "") +
              '<input type="text" autocorrect="off" autocapitalize="off" spellcheck="false"></span>'),
            n && (o += ' <span style="color: #888">' + n + "</span>"),
            o);
      (i = e),
        (a = h),
        (s = u),
        (l = t.onClose),
        (c = t),
        i.openDialog
          ? i.openDialog(a, l, {
            bottom: !0,
            value: c.value,
            onKeyDown: c.onKeyDown,
            onKeyUp: c.onKeyUp,
            selectValueOnOpen: !1,
          })
          : l(prompt(s, ""));
    }
    function Ee(e, t, r, n) {
      if (t) {
        var o = Ce(e),
          i = be(t, !!r, !!n);
        if (i)
          return (
            Be(e, i),
            (function(e, t) {
              if (e instanceof RegExp && t instanceof RegExp) {
                for (
                  var r = ["global", "multiline", "ignoreCase", "source"],
                  n = 0;
                  n < r.length;
                  n++
                ) {
                  var o = r[n];
                  if (e[o] !== t[o]) return;
                }
                return 1;
              }
            })(i, o.getQuery()) || o.setQuery(i),
            i
          );
      }
    }
    var Oe = 0;
    function Be(o, i) {
      clearTimeout(Oe),
        (Oe = setTimeout(function() {
          var r,
            n,
            e = Ce(o),
            t = e.getOverlay();
          (t && i == t.query) ||
            (t && o.removeOverlay(t),
              "^" == (r = i).source.charAt(0) && (n = !0),
              (t = {
                token: function(e) {
                  if (!n || e.sol()) {
                    var t = e.match(r, !1);
                    if (t)
                      return 0 == t[0].length
                        ? (e.next(), "searching")
                        : e.sol() || (e.backUp(1), r.exec(e.next() + t[0]))
                          ? (e.match(r), "searching")
                          : (e.next(), null);
                    for (; !e.eol() && (e.next(), !e.match(r, !1)););
                  } else e.skipToEnd();
                },
                query: r,
              }),
              o.addOverlay(t),
              o.showMatchesOnScrollbar &&
              (e.getScrollbarAnnotate() && e.getScrollbarAnnotate().clear(),
                e.setScrollbarAnnotate(o.showMatchesOnScrollbar(i))),
              e.setOverlay(t));
        }, 50));
    }
    function Ie(o, i, a, s) {
      return (
        void 0 === s && (s = 1),
        o.operation(function() {
          for (
            var e = o.getCursor(), t = o.getSearchCursor(a, e), r = 0;
            r < s;
            r++
          ) {
            var n = t.find(i);
            if (
              (0 == r && n && X(t.from(), e) && (n = t.find(i)),
                !n &&
                !(t = o.getSearchCursor(
                  a,
                  i ? tt(o.lastLine()) : tt(o.firstLine(), 0)
                )).find(i))
            )
              return;
          }
          return t.from();
        })
      );
    }
    function Ke(e) {
      var t = Ce(e);
      e.removeOverlay(Ce(e).getOverlay()),
        t.setOverlay(null),
        t.getScrollbarAnnotate() &&
        (t.getScrollbarAnnotate().clear(), t.setScrollbarAnnotate(null));
    }
    function Ne(e) {
      var t = e.getScrollInfo(),
        r = e.coordsChar({ left: 0, top: 6 + t.top }, "local"),
        n = t.clientHeight - 10 + t.top,
        o = e.coordsChar({ left: 0, top: n }, "local");
      return { top: r.line, bottom: o.line };
    }
    function Pe(e, t, r) {
      if ("'" == r || "`" == r) return K.jumpList.find(e, -1) || tt(0, 0);
      if ("." == r) return _e(e);
      var n = t.marks[r];
      return n && n.find();
    }
    function _e(e) {
      for (var t = e.doc.history.done, r = t.length; r--;)
        if (t[r].changes) return z(t[r].changes[0].to);
    }
    function je() {
      this.buildCommandMap_();
    }
    je.prototype = {
      processCommand: function(e, t, r) {
        var n = this;
        e.operation(function() {
          (e.curOp.isVimOp = !0), n._processCommand(e, t, r);
        });
      },
      _processCommand: function(t, e, r) {
        var n = t.state.vim,
          o = K.registerController.getRegister(":"),
          i = o.toString();
        n.visualMode && le(t);
        var a = new Ze.StringStream(e);
        o.setText(e);
        var s,
          l,
          c = r || {};
        c.input = e;
        try {
          this.parseInput_(t, a, c);
        } catch (e) {
          throw (Le(t, e), e);
        }
        if (c.commandName) {
          if ((s = this.matchCommand_(c.commandName))) {
            if (
              ((l = s.name),
                s.excludeFromCommandHistory && o.setText(i),
                this.parseCommandArgs_(a, c, s),
                "exToKey" == s.type)
            ) {
              for (var u = 0; u < s.toKeys.length; u++)
                Ze.Vim.handleKey(t, s.toKeys[u], "mapping");
              return;
            }
            if ("exToEx" == s.type)
              return void this.processCommand(t, s.toInput);
          }
        } else void 0 !== c.line && (l = "move");
        if (l)
          try {
            He[l](t, c), (s && s.possiblyAsync) || !c.callback || c.callback();
          } catch (e) {
            throw (Le(t, e), e);
          }
        else Le(t, 'Not an editor command ":' + e + '"');
      },
      parseInput_: function(e, t, r) {
        t.eatWhile(":"),
          t.eat("%")
            ? ((r.line = e.firstLine()), (r.lineEnd = e.lastLine()))
            : ((r.line = this.parseLineSpec_(e, t)),
              void 0 !== r.line &&
              t.eat(",") &&
              (r.lineEnd = this.parseLineSpec_(e, t)));
        var n = t.match(/^(\w+|!!|@@|[!#&*<=>@~])/);
        return (r.commandName = n ? n[1] : t.match(/.*/)[0]), r;
      },
      parseLineSpec_: function(e, t) {
        var r = t.match(/^(\d+)/);
        if (r) return parseInt(r[1], 10) - 1;
        switch (t.next()) {
          case ".":
            return this.parseLineSpecOffset_(t, e.getCursor().line);
          case "$":
            return this.parseLineSpecOffset_(t, e.lastLine());
          case "'":
            var n = t.next(),
              o = Pe(e, e.state.vim, n);
            if (!o) throw new Error("Mark not set");
            return this.parseLineSpecOffset_(t, o.line);
          case "-":
          case "+":
            return (
              t.backUp(1), this.parseLineSpecOffset_(t, e.getCursor().line)
            );
          default:
            return void t.backUp(1);
        }
      },
      parseLineSpecOffset_: function(e, t) {
        var r,
          n = e.match(/^([+-])?(\d+)/);
        return (
          n && ((r = parseInt(n[2], 10)), "-" == n[1] ? (t -= r) : (t += r)), t
        );
      },
      parseCommandArgs_: function(e, t, r) {
        var n, o;
        e.eol() ||
          ((t.argString = e.match(/.*/)[0]),
            (n = r.argDelimiter || /\s+/),
            (o = re(t.argString).split(n)).length && o[0] && (t.args = o));
      },
      matchCommand_: function(e) {
        for (var t = e.length; 0 < t; t--) {
          var r = e.substring(0, t);
          if (this.commandMap_[r]) {
            var n = this.commandMap_[r];
            if (0 === n.name.indexOf(e)) return n;
          }
        }
        return null;
      },
      buildCommandMap_: function() {
        this.commandMap_ = {};
        for (var e = 0; e < et.length; e++) {
          var t = et[e],
            r = t.shortName || t.name;
          this.commandMap_[r] = t;
        }
      },
      map: function(e, t, r) {
        if (":" != e && ":" == e.charAt(0)) {
          if (r) throw Error("Mode not supported for ex mappings");
          var n = e.substring(1);
          ":" != t && ":" == t.charAt(0)
            ? (this.commandMap_[n] = {
              name: n,
              type: "exToEx",
              toInput: t.substring(1),
              user: !0,
            })
            : (this.commandMap_[n] = {
              name: n,
              type: "exToKey",
              toKeys: t,
              user: !0,
            });
        } else {
          var o;
          (o =
            ":" != t && ":" == t.charAt(0)
              ? { keys: e, type: "keyToEx", exArgs: { input: t.substring(1) } }
              : { keys: e, type: "keyToKey", toKeys: t }),
            r && (o.context = r),
            Ge.unshift(o);
        }
      },
      unmap: function(e, t) {
        if (":" != e && ":" == e.charAt(0)) {
          if (t) throw Error("Mode not supported for ex mappings");
          var r = e.substring(1);
          if (this.commandMap_[r] && this.commandMap_[r].user)
            return void delete this.commandMap_[r];
        } else
          for (var n = e, o = 0; o < Ge.length; o++)
            if (n == Ge[o].keys && Ge[o].context === t)
              return void Ge.splice(o, 1);
        throw Error("No such mapping.");
      },
    };
    var He = {
      colorscheme: function(e, t) {
        !t.args || t.args.length < 1
          ? Le(e, e.getOption("theme"))
          : e.setOption("theme", t.args[0]);
      },
      map: function(e, t, r) {
        var n = t.args;
        !n || n.length < 2
          ? e && Le(e, "Invalid mapping: " + t.input)
          : Fe.map(n[0], n[1], r);
      },
      imap: function(e, t) {
        this.map(e, t, "insert");
      },
      nmap: function(e, t) {
        this.map(e, t, "normal");
      },
      vmap: function(e, t) {
        this.map(e, t, "visual");
      },
      unmap: function(e, t, r) {
        var n = t.args;
        !n || n.length < 1
          ? e && Le(e, "No such mapping: " + t.input)
          : Fe.unmap(n[0], r);
      },
      move: function(e, t) {
        F.processCommand(e, e.state.vim, {
          type: "motion",
          motion: "moveToLineOrEdgeOfDocument",
          motionArgs: { forward: !1, explicitRepeat: !0, linewise: !0 },
          repeatOverride: t.line + 1,
        });
      },
      set: function(e, t) {
        var r = t.args,
          n = t.setCfg || {};
        if (!r || r.length < 1) e && Le(e, "Invalid mapping: " + t.input);
        else {
          var o = r[0].split("="),
            i = o[0],
            a = o[1],
            s = !1;
          if ("?" == i.charAt(i.length - 1)) {
            if (a) throw Error("Trailing characters: " + t.argString);
            (i = i.substring(0, i.length - 1)), (s = !0);
          }
          void 0 === a &&
            "no" == i.substring(0, 2) &&
            ((i = i.substring(2)), (a = !1));
          var l,
            c,
            u = x[i] && "boolean" == x[i].type;
          u && null == a && (a = !0),
            (!u && void 0 === a) || s
              ? (l = A(i, e, n)) instanceof Error
                ? Le(e, l.message)
                : Le(
                  e,
                  !0 === l || !1 === l
                    ? " " + (l ? "" : "no") + i
                    : "  " + i + "=" + l
                )
              : (c = S(i, a, e, n)) instanceof Error && Le(e, c.message);
        }
      },
      setlocal: function(e, t) {
        (t.setCfg = { scope: "local" }), this.set(e, t);
      },
      setglobal: function(e, t) {
        (t.setCfg = { scope: "global" }), this.set(e, t);
      },
      registers: function(e, t) {
        var r = t.args,
          n = K.registerController.registers,
          o = "----------Registers----------<br><br>";
        if (r)
          for (var r = r.join(""), i = 0; i < r.length; i++) {
            (a = r.charAt(i)),
              K.registerController.isValidRegister(a) &&
              (o +=
                '"' + a + "    " + (n[a] || new _()).toString() + "<br>");
          }
        else
          for (var a in n) {
            var s = n[a].toString();
            s.length && (o += '"' + a + "    " + s + "<br>");
          }
        Le(e, o);
      },
      sort: function(e, i) {
        var a, s, l, c, u;
        var t = (function() {
          if (i.argString) {
            var e = new Ze.StringStream(i.argString);
            if ((e.eat("!") && (a = !0), e.eol())) return;
            if (!e.eatSpace()) return "Invalid arguments";
            var t = e.match(/([dinuox]+)?\s*(\/.+\/)?\s*/);
            if (!t && !e.eol()) return "Invalid arguments";
            if (t[1]) {
              (s = -1 != t[1].indexOf("i")), (l = -1 != t[1].indexOf("u"));
              var r =
                -1 != t[1].indexOf("d") || (-1 != t[1].indexOf("n") && 1),
                n = -1 != t[1].indexOf("x") && 1,
                o = -1 != t[1].indexOf("o") && 1;
              if (1 < r + n + o) return "Invalid arguments";
              c = (r ? "decimal" : n && "hex") || (o && "octal");
            }
            t[2] &&
              (u = new RegExp(t[2].substr(1, t[2].length - 2), s ? "i" : ""));
          }
        })();
        if (t) Le(e, t + ": " + i.argString);
        else {
          var r = i.line || e.firstLine(),
            n = i.lineEnd || i.line || e.lastLine();
          if (r != n) {
            var o = tt(r, 0),
              h = tt(n, te(e, n)),
              p = e.getRange(o, h).split("\n"),
              f =
                u ||
                ("decimal" == c
                  ? /(-?)([\d]+)/
                  : "hex" == c
                    ? /(-?)(?:0x)?([0-9a-f]+)/i
                    : "octal" == c
                      ? /([0-7]+)/
                      : null),
              d =
                "decimal" == c
                  ? 10
                  : "hex" == c
                    ? 16
                    : "octal" == c
                      ? 8
                      : null,
              m = [],
              g = [];
            if (c || u)
              for (var v = 0; v < p.length; v++) {
                var y = u ? p[v].match(u) : null;
                y && "" != y[0]
                  ? m.push(y)
                  : !u && f.exec(p[v])
                    ? m.push(p[v])
                    : g.push(p[v]);
              }
            else g = p;
            if (
              (m.sort(
                u
                  ? function(e, t) {
                    var r;
                    return (
                      a && ((r = e), (e = t), (t = r)),
                      s &&
                      ((e[0] = e[0].toLowerCase()),
                        (t[0] = t[0].toLowerCase())),
                      e[0] < t[0] ? -1 : 1
                    );
                  }
                  : w
              ),
                u)
            )
              for (v = 0; v < m.length; v++) m[v] = m[v].input;
            else c || g.sort(w);
            if (((p = a ? m.concat(g) : g.concat(m)), l))
              for (var k, C = p, p = [], v = 0; v < C.length; v++)
                C[v] != k && p.push(C[v]), (k = C[v]);
            e.replaceRange(p.join("\n"), o, h);
          }
        }
        function w(e, t) {
          var r;
          a && ((r = e), (e = t), (t = r)),
            s && ((e = e.toLowerCase()), (t = t.toLowerCase()));
          var n = c && f.exec(e),
            o = c && f.exec(t);
          return n
            ? (n = parseInt((n[1] + n[2]).toLowerCase(), d)) -
            (o = parseInt((o[1] + o[2]).toLowerCase(), d))
            : e < t
              ? -1
              : 1;
        }
      },
      global: function(t, e) {
        var r = e.argString;
        if (r) {
          var n,
            o = void 0 !== e.line ? e.line : t.firstLine(),
            i = e.lineEnd || e.line || t.lastLine(),
            a = we(r, "/"),
            s = r;
          if (
            (a.length && ((s = a[0]), (n = a.slice(1, a.length).join("/"))),
              s)
          )
            try {
              Ee(t, s, !0, !0);
            } catch (e) {
              return void Le(t, "Invalid regex: " + s);
            }
          for (
            var l, c, u = Ce(t).getQuery(), h = [], p = "", f = o;
            f <= i;
            f++
          ) {
            u.test(t.getLine(f)) &&
              (h.push(f + 1), (p += t.getLine(f) + "<br>"));
          }
          n
            ? ((l = 0),
              (c = function() {
                var e;
                l < h.length &&
                  ((e = h[l] + n), Fe.processCommand(t, e, { callback: c })),
                  l++;
              })())
            : Le(t, p);
        } else Le(t, "Regular Expression missing from global");
      },
      substitute: function(t, e) {
        if (!t.getSearchCursor)
          throw new Error(
            "Search feature not available. Requires searchcursor.js or any other getSearchCursor implementation."
          );
        var r,
          n,
          o,
          i,
          a,
          s,
          l,
          c,
          u,
          h = e.argString,
          p = h ? we(h, h[0]) : [],
          f = "",
          d = !1,
          m = !1;
        if (p.length)
          (r = p[0]),
            A("pcre") && "" !== r && (r = new RegExp(r).source),
            (f = p[1]),
            r &&
            "$" === r[r.length - 1] &&
            ((r = r.slice(0, r.length - 1) + "\\n"),
              (f = f ? f + "\n" : "\n")),
            void 0 !== f &&
            ((f = A("pcre")
              ? (function(e) {
                for (var t = new Ze.StringStream(e), r = []; !t.eol();) {
                  for (; t.peek() && "\\" != t.peek();) r.push(t.next());
                  var n = !1;
                  for (var o in Ae)
                    if (t.match(o, !0)) {
                      (n = !0), r.push(Ae[o]);
                      break;
                    }
                  n || r.push(t.next());
                }
                return r.join("");
              })(f.replace(/([^\\])&/g, "$1$$&"))
              : Se(f)),
              (K.lastSubstituteReplacePart = f)),
            (n = p[2] ? p[2].split(" ") : []);
        else if (h && h.length)
          return void Le(
            t,
            "Substitutions should be of the form :s/pattern/replace/"
          );
        if (
          (n &&
            ((o = n[0]),
              (i = parseInt(n[1])),
              o &&
              (-1 != o.indexOf("c") && ((d = !0), o.replace("c", "")),
                -1 != o.indexOf("g") && ((m = !0), o.replace("g", "")),
                (r = A("pcre")
                  ? r + "/" + o
                  : r.replace(/\//g, "\\/") + "/" + o))),
            r)
        )
          try {
            Ee(t, r, !0, !0);
          } catch (e) {
            return void Le(t, "Invalid regex: " + r);
          }
        void 0 !== (f = f || K.lastSubstituteReplacePart)
          ? ((a = Ce(t).getQuery()),
            (s = void 0 !== e.line ? e.line : t.getCursor().line),
            (l = e.lineEnd || s),
            s == t.firstLine() && l == t.lastLine() && (l = 1 / 0),
            i && (l = (s = l) + i - 1),
            (c = J(t, tt(s, 0))),
            (u = t.getSearchCursor(a, c)),
            (function(o, e, n, i, a, s, t, r, l) {
              o.state.vim.exMode = !0;
              var c = !1,
                u = s.from();
              function h() {
                o.operation(function() {
                  for (; !c;) p(), f();
                  d();
                });
              }
              function p() {
                var e = o.getRange(s.from(), s.to()).replace(t, r);
                s.replace(e);
              }
              function f() {
                for (
                  ;
                  s.findNext() &&
                  ((e = s.from()),
                    (t = i),
                    (r = a),
                    "number" != typeof e && (e = e.line),
                    t instanceof Array
                      ? w(e, t)
                      : r
                        ? t <= e && e <= r
                        : e == t);

                )
                  if (n || !u || s.from().line != u.line)
                    return (
                      o.scrollIntoView(s.from(), 30),
                      o.setSelection(s.from(), s.to()),
                      (u = s.from()),
                      void (c = !1)
                    );
                var e, t, r;
                c = !0;
              }
              function d(e) {
                var t;
                e && e(),
                  o.focus(),
                  u &&
                  (o.setCursor(u),
                    ((t = o.state.vim).exMode = !1),
                    (t.lastHPos = t.lastHSPos = u.ch)),
                  l && l();
              }
              if ((f(), c)) return Le(o, "No matches for " + t.source);
              if (!e) return h(), l && l();
              Re(o, {
                prefix: "replace with <strong>" + r + "</strong> (y/n/a/q/l)",
                onKeyDown: function(e, t, r) {
                  switch ((Ze.e_stop(e), Ze.keyName(e))) {
                    case "Y":
                      p(), f();
                      break;
                    case "N":
                      f();
                      break;
                    case "A":
                      var n = l;
                      (l = void 0), o.operation(h), (l = n);
                      break;
                    case "L":
                      p();
                    case "Q":
                    case "Esc":
                    case "Ctrl-C":
                    case "Ctrl-[":
                      d(r);
                  }
                  return c && d(r), !0;
                },
              });
            })(t, d, m, s, l, u, a, f, e.callback))
          : Le(t, "No previous substitute regular expression");
      },
      redo: Ze.commands.redo,
      undo: Ze.commands.undo,
      write: function(e) {
        Ze.commands.save ? Ze.commands.save(e) : e.save && e.save();
      },
      nohlsearch: function(e) {
        Ke(e);
      },
      yank: function(e) {
        var t = z(e.getCursor()).line,
          r = e.getLine(t);
        K.registerController.pushText("0", "yank", r, !0, !0);
      },
      delmarks: function(e, t) {
        if (t.argString && re(t.argString))
          for (
            var r = e.state.vim, n = new Ze.StringStream(re(t.argString));
            !n.eol();

          ) {
            n.eatSpace();
            var o = n.pos;
            if (!n.match(/[a-zA-Z]/, !1))
              return void Le(
                e,
                "Invalid argument: " + t.argString.substring(o)
              );
            var i = n.next();
            if (n.match("-", !0)) {
              if (!n.match(/[a-zA-Z]/, !1))
                return void Le(
                  e,
                  "Invalid argument: " + t.argString.substring(o)
                );
              var a = i,
                s = n.next();
              if (!((y(a) && y(s)) || (k(a) && k(s))))
                return void Le(e, "Invalid argument: " + a + "-");
              var l = a.charCodeAt(0),
                c = s.charCodeAt(0);
              if (c <= l)
                return void Le(
                  e,
                  "Invalid argument: " + t.argString.substring(o)
                );
              for (var u = 0; u <= c - l; u++) {
                var h = String.fromCharCode(l + u);
                delete r.marks[h];
              }
            } else delete r.marks[i];
          }
        else Le(e, "Argument required");
      },
    },
      Fe = new je();
    function We(e) {
      var t = e.state.vim,
        r = K.macroModeState,
        n = K.registerController.getRegister("."),
        o = r.isPlaying,
        i = r.lastInsertModeChanges;
      o || (e.off("change", De), Ze.off(e.getInputField(), "keydown", Qe)),
        !o &&
        1 < t.insertModeRepeat &&
        (ze(e, t, t.insertModeRepeat - 1, !0),
          (t.lastEditInputState.repeatOverride = t.insertModeRepeat)),
        delete t.insertModeRepeat,
        (t.insertMode = !1),
        e.setCursor(e.getCursor().line, e.getCursor().ch - 1),
        e.setOption("keyMap", "vim"),
        e.setOption("disableInput", !0),
        e.toggleOverwrite(!1),
        n.setText(i.changes.join("")),
        Ze.signal(e, "vim-mode-change", { mode: "normal" }),
        r.isRecording &&
        (function(e) {
          if (e.isPlaying) return;
          var t = e.latestRegister,
            r = K.registerController.getRegister(t);
          r &&
            r.pushInsertModeChanges &&
            r.pushInsertModeChanges(e.lastInsertModeChanges);
        })(r);
    }
    function Ve(e) {
      Ge.unshift(e);
    }
    function De(e, t) {
      var r,
        n,
        o = K.macroModeState,
        i = o.lastInsertModeChanges;
      if (!o.isPlaying)
        for (; t;) {
          (i.expectCursorActivityForChange = !0),
            1 < i.ignoreCount
              ? i.ignoreCount--
              : ("+input" != t.origin &&
                "paste" != t.origin &&
                void 0 !== t.origin) ||
              (1 < (r = e.listSelections().length) && (i.ignoreCount = r),
                (n = t.text.join("\n")),
                i.maybeReset && ((i.changes = []), (i.maybeReset = !1)),
                n &&
                (e.state.overwrite && !/\n/.test(n)
                  ? i.changes.push([n])
                  : i.changes.push(n))),
            (t = t.next);
        }
    }
    function Ue(e) {
      var t = e.state.vim;
      if (t.insertMode) {
        var r = K.macroModeState;
        if (r.isPlaying) return;
        var n = r.lastInsertModeChanges;
        n.expectCursorActivityForChange
          ? (n.expectCursorActivityForChange = !1)
          : (n.maybeReset = !0);
      } else
        e.curOp.isVimOp ||
          (function(e, t) {
            var r = e.getCursor("anchor"),
              n = e.getCursor("head");
            t.visualMode && !e.somethingSelected()
              ? le(e, !1)
              : t.visualMode ||
              t.insertMode ||
              !e.somethingSelected() ||
              ((t.visualMode = !0),
                (t.visualLine = !1),
                Ze.signal(e, "vim-mode-change", { mode: "visual" }));
            {
              var o, i;
              t.visualMode
                ? ((o = Z(n, r) ? 0 : -1),
                  (i = Z(n, r) ? -1 : 0),
                  (n = q(n, 0, o)),
                  (r = q(r, 0, i)),
                  (t.sel = { anchor: r, head: n }),
                  ve(e, t, "<", G(n, r)),
                  ve(e, t, ">", Y(n, r)))
                : t.insertMode || (t.lastHPos = e.getCursor().ch);
            }
          })(e, t);
      t.visualMode && Je(e);
    }
    function Je(e) {
      var t,
        r = "cm-animate-fat-cursor",
        n = e.state.vim,
        o = J(e, z(n.sel.head)),
        i = q(o, 0, 1);
      $e(n),
        o.ch == e.getLine(o.line).length
          ? (((t = document.createElement("span")).textContent = " "),
            (t.className = r),
            (n.fakeCursorBookmark = e.setBookmark(o, { widget: t })))
          : (n.fakeCursor = e.markText(o, i, { className: r }));
    }
    function $e(e) {
      e.fakeCursor && (e.fakeCursor.clear(), (e.fakeCursor = null)),
        e.fakeCursorBookmark &&
        (e.fakeCursorBookmark.clear(), (e.fakeCursorBookmark = null));
    }
    function qe(e) {
      this.keyName = e;
    }
    function Qe(e) {
      var t = K.macroModeState.lastInsertModeChanges,
        r = Ze.keyName(e);
      r &&
        ((-1 == r.indexOf("Delete") && -1 == r.indexOf("Backspace")) ||
          Ze.lookupKey(r, "vim-insert", function() {
            return (
              t.maybeReset && ((t.changes = []), (t.maybeReset = !1)),
              t.changes.push(new qe(r)),
              !0
            );
          }));
    }
    function ze(r, n, e, t) {
      var o = K.macroModeState;
      o.isPlaying = !0;
      var i = !!n.lastEditActionCommand,
        a = n.inputState;
      function s() {
        i ? F.processAction(r, n, n.lastEditActionCommand) : F.evalInput(r, n);
      }
      function l(e) {
        var t;
        0 < o.lastInsertModeChanges.changes.length &&
          ((e = n.lastEditActionCommand ? e : 1),
            (t = o.lastInsertModeChanges),
            Xe(r, t.changes, e));
      }
      if (
        ((n.inputState = n.lastEditInputState),
          i && n.lastEditActionCommand.interlaceInsertRepeat)
      )
        for (var c = 0; c < e; c++) s(), l(1);
      else t || s(), l(e);
      (n.inputState = a), n.insertMode && !t && We(r), (o.isPlaying = !1);
    }
    function Xe(t, e, r) {
      function n(e) {
        return "string" == typeof e ? Ze.commands[e](t) : e(t), !0;
      }
      var o = t.getCursor("head"),
        i = K.macroModeState.lastInsertModeChanges.visualBlock;
      i && (oe(t, o, i + 1), (r = t.listSelections().length), t.setCursor(o));
      for (var a = 0; a < r; a++) {
        i && t.setCursor(q(o, a, 0));
        for (var s = 0; s < e.length; s++) {
          var l,
            c,
            u,
            h = e[s];
          h instanceof qe
            ? Ze.lookupKey(h.keyName, "vim-insert", n)
            : "string" == typeof h
              ? ((l = t.getCursor()), t.replaceRange(h, l, l))
              : ((u = q((c = t.getCursor()), 0, h[0].length)),
                t.replaceRange(h[0], c, u));
        }
      }
      i && t.setCursor(q(o, 0, 1));
    }
    return (
      (Ze.keyMap.vim = { attach: o, detach: e, call: t }),
      M("insertModeEscKeysTimeout", 200, "number"),
      (Ze.keyMap["vim-insert"] = {
        fallthrough: ["default"],
        attach: o,
        detach: e,
        call: t,
      }),
      (Ze.keyMap["vim-replace"] = {
        Backspace: "goCharLeft",
        fallthrough: ["vim-insert"],
        attach: o,
        detach: e,
        call: t,
      }),
      O(),
      I
    );
  })();
});
