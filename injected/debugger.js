"use strict";

/** @typedef {import("./debugger-types").DebuggerMessage} DebuggerMessage */
/** @typedef {import("./debugger-types").RuntimeLike} RuntimeLike */

(() => {
  /** @type {RuntimeLike} */
  const runtimeApi = chrome?.runtime || browser?.runtime;

  function disableControlsAndShowLoading() {
    for (const buttonElement of Array.from(document.querySelectorAll("button"))) {
      buttonElement.setAttribute("disabled", !0);
    }
    document.querySelector("#logs").textContent = "wait\u2026";
  }

  function enableControls() {
    for (const buttonElement of Array.from(document.querySelectorAll("button"))) {
      buttonElement.removeAttribute("disabled");
    }
  }

  function renderDebuggerUi() {
    const rootElement = document.querySelector("#core");
    rootElement.innerHTML = "";

    const toggleDebuggerButton = document.createElement("button");
    toggleDebuggerButton.textContent = "Toggle Debugger";
    toggleDebuggerButton.onclick = () => {
      disableControlsAndShowLoading();
      runtimeApi.sendMessage("debugger_toggle");
      setTimeout(() => runtimeApi.sendMessage("debugger_request_logs"), 1e3);
    };
    rootElement.appendChild(toggleDebuggerButton);

    const restartAddonButton = document.createElement("button");
    restartAddonButton.textContent = "Restart Addon";
    restartAddonButton.onclick = () => {
      disableControlsAndShowLoading();
      runtimeApi.sendMessage("debugger_restart_addon");
      setTimeout(() => window.location.reload(), 1e3);
    };
    rootElement.appendChild(restartAddonButton);

    const updateLogsButton = document.createElement("button");
    updateLogsButton.textContent = "Update";
    updateLogsButton.onclick = () => {
      disableControlsAndShowLoading();
      runtimeApi.sendMessage("debugger_request_logs");
    };
    rootElement.appendChild(updateLogsButton);

    const saveLogsButton = document.createElement("button");
    saveLogsButton.textContent = "Save Logs";
    saveLogsButton.onclick = async () => {
      const logText = document.querySelector("#logs").textContent;
      const logFileBlob = new Blob([logText]);
      const objectUrl = URL.createObjectURL(logFileBlob);
      const downloadLink = document.createElement("a");

      downloadLink.href = objectUrl;
      downloadLink.target = "_blank";
      downloadLink.download = "vdh-logs.txt";
      downloadLink.click();

      setTimeout(() => URL.revokeObjectURL(objectUrl), 1e3);
    };
    rootElement.appendChild(saveLogsButton);

    const logsElement = document.createElement("pre");
    logsElement.textContent = "wait\u2026";
    logsElement.setAttribute("id", "logs");
    rootElement.appendChild(logsElement);
  }

  renderDebuggerUi();
  disableControlsAndShowLoading();
  runtimeApi.onMessage.addListener(
    /** @param {DebuggerMessage} message */
    (message) => {
      if (message.all_logs) {
        enableControls();
        document.querySelector("#logs").textContent = message.all_logs;
      }
    },
  );
  setTimeout(() => runtimeApi.sendMessage("debugger_request_logs"), 1e3);
})();
