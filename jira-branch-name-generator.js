// ==UserScript==
// @name         JIRA branch name generator
// @namespace    http://tampermonkey.net/
// @version      0.1
// @author       You
// @match        https://*.atlassian.net/browse/*
// @require http://code.jquery.com/jquery-latest.js
// @require https://cdn.jsdelivr.net/npm/clipboard@2/dist/clipboard.min.js
// @require https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.15/lodash.min.js
// @grant          GM_addStyle
// ==/UserScript==

function GM_addStyle(css) {
    const style =
        document.getElementById("GM_addStyleBy8626") ||
        (function () {
            const style = document.createElement("style");
            style.type = "text/css";
            style.id = "GM_addStyleBy8626";
            document.head.appendChild(style);
            return style;
        })();
    const sheet = style.sheet;
    sheet.insertRule(css, (sheet.rules || sheet.cssRules || []).length);
}

GM_addStyle(`
.copy-branch-btn-wrapper {
    display: flex;
    position: relative;
}
`);

GM_addStyle(`
.create-branch-btn {
    padding: 0 1em;
    margin: 0 1em;
    cursor: pointer;
    -webkit-box-align: baseline;
    align-items: baseline;
    box-sizing: border-box;
    display: inline-flex;
    font-size: inherit;
    font-style: normal;
    font-weight: normal;
    max-width: 100%;
    text-align: center;
    white-space: nowrap;
    height: auto;
    line-height: inherit;
    vertical-align: baseline;
    width: auto;
    color: rgb(80, 95, 121) !important;
    border-width: 0px;
    text-decoration: none;
    background: rgba(9, 30, 66, 0.04);
    border-radius: 3px;
    transition: background 0.1s ease-out 0s, box-shadow 0.15s cubic-bezier(0.47, 0.03, 0.49, 1.38) 0s;
    outline: none !important;
    position: relavent;
}`);

GM_addStyle(`
.create-branch-btn:hover {
    color: rgb(23, 43, 77) !important;
    background: rgb(223, 225, 230) !important;
}
`);

GM_addStyle(`
.create-branch-btn:active, .create-branch-btn:focus {
    color: rgb(0, 82, 204) !important;
    background: rgba(179, 212, 255, 0.6);
}
`);

(function () {
    "use strict";
    const lastBreadcrumb = _.last(
        document.querySelectorAll('div[data-test-id*="breadcrumbs"]')
    );

    function createBranchName() {
        const jiraTitle = _.first(document.querySelectorAll("h1")).innerText;
        const jiraId = lastBreadcrumb.innerText;

        copy(`${jiraId}-${_.kebabCase(jiraTitle)}`);
    }

    function copy(value) {
        const copyText = document.querySelector("#copy-branch-name");
        copyText.value = value;
        copyText.select();
        document.execCommand("copy");
    }

    $(lastBreadcrumb).append(`
            <div class="copy-branch-btn-wrapper">
               <input type="button" class="create-branch-btn" value="Copy branch name" id="create-branch-name">
               <textarea style="opacity: 0" id="copy-branch-name">
            </div>
    `);

    $("#create-branch-name").on("click", () => {
        createBranchName();
        $(".copy-branch-btn-wrapper").append(
            `<span id="copied-txt" style="position: absolute; top: 0; left: 60%; color: green;">Copied</span>`
        );
        setTimeout(() => $("#copied-txt").remove(), 3000);
    });
})();
