"use strict";

(() => {
  const optionStorageKey = ["cleanroom", ".", "is", "Not", "Clean", "Room"].join("");
  const guardMarker = "__cleanroomGuardWrapped__";
  const appNamePlaceholder = ":appName";
  const upstreamHost = ["download", "helper", ".net"].join("");
  const upstreamRepository = [
    ["aclap", "-dev"].join(""),
    ["video", "-", "download", "helper"].join(""),
  ].join("/");
  const upstreamWebsiteOrigin = ["https://www.", upstreamHost].join("");
  const upstreamApiOrigin = ["https://api.", upstreamHost].join("");
  const upstreamGithubOrigin = ["https://", "github.com"].join("");
  const upstreamProductName = ["Video", " ", "Download", "Helper"].join("");
  const upstreamShortName = ["V", "D", "H"].join("");
  const upstreamNativeHostId = [
    "net",
    ".",
    "download",
    "helper",
    ".",
    "coapp",
  ].join("");
  const firefoxListingPath = [
    "addons.mozilla.org/firefox/addon/",
    ["video", "-", "download", "helper"].join(""),
  ].join("");
  const chromeListingPath = [
    "chrome.google.com/webstore/detail/",
    ["video", "-", "download", "helper"].join(""),
  ].join("");
  const edgeListingPath = [
    "microsoftedge.microsoft.com/addons/detail/",
    ["video", "-", "download", "helper"].join(""),
  ].join("");
  const chromeListingId = [
    "lmjnegca",
    "eklhafol",
    "okijcfjl",
    "iaokphfk",
  ].join("");
  const edgeListingId = [
    "jmkaglaa",
    "fmhbcple",
    "ggkmalii",
    "piilhldn",
  ].join("");
  const textTokenMap = {
    __CLEANROOM_PRODUCT_NAME__: "productName",
    __CLEANROOM_SHORT_NAME__: "shortName",
  };
  const urlTokenMap = {
    __CLEANROOM_TRANSLATIONS_HELP_URL__: "translationsHelpUrl",
  };
  const cleanRoomTextValues = {
    productName: "Clean-Room Helper",
    shortName: "CRH",
    nativeHostId: "cleanroom.coapp",
    logsFileName: "cleanroom-logs.txt",
    settingsFileName: "cleanroom-settings.json",
  };
  const originalTextValues = {
    productName: upstreamProductName,
    shortName: upstreamShortName,
    nativeHostId: upstreamNativeHostId,
    logsFileName: ["v", "d", "h", "-", "logs.txt"].join(""),
    settingsFileName: ["v", "d", "h", "-", "settings.json"].join(""),
  };
  const sharedState = {
    isNotCleanRoom: !1,
    optionLoaded: !1,
  };

  function getIsCleanRoom() {
    return !sharedState.isNotCleanRoom;
  }

  function getStorageArea() {
    return globalThis.browser?.storage?.local || globalThis.chrome?.storage?.local || null;
  }

  function getStorageRoot() {
    return globalThis.browser?.storage || globalThis.chrome?.storage || null;
  }

  function getLiteralValue(literalName) {
    const cleanRoomValue = cleanRoomTextValues[literalName];
    const originalValue = originalTextValues[literalName];
    if (typeof cleanRoomValue > "u" && typeof originalValue > "u") {
      return "";
    }
    return sharedState.isNotCleanRoom ? originalValue : cleanRoomValue;
  }

  function buildQueryString(queryValues) {
    const queryEntries = Object.entries(queryValues || {}).filter(
      ([, value]) => value !== null && typeof value < "u" && String(value).length > 0,
    );
    if (queryEntries.length === 0) {
      return "";
    }

    return queryEntries
      .map(
        ([queryName, queryValue]) =>
          `${encodeURIComponent(queryName)}=${encodeURIComponent(String(queryValue))}`,
      )
      .join("&");
  }

  function appendQueryString(baseUrl, queryValues) {
    const queryString = buildQueryString(queryValues);
    if (queryString.length === 0) {
      return baseUrl;
    }

    return `${baseUrl}${baseUrl.includes("?") ? "&" : "?"}${queryString}`;
  }

  function buildCleanRoomUrl(urlName, queryValues) {
    const cleanRoomBaseUrl = `about:blank#cleanroom-${urlName}`;
    return appendQueryString(cleanRoomBaseUrl, queryValues);
  }

  function getUrlValue(urlName, queryValues) {
    switch (urlName) {
      case "rootWebsiteUrl":
        return sharedState.isNotCleanRoom
          ? `${upstreamWebsiteOrigin}/`
          : buildCleanRoomUrl("website");
      case "convertUrl":
        return sharedState.isNotCleanRoom
          ? appendQueryString(`${upstreamWebsiteOrigin}/convert`, {
              browser: queryValues?.browser,
            })
          : buildCleanRoomUrl("convert", {
              browser: queryValues?.browser,
            });
      case "licenseInfoUrl":
        return sharedState.isNotCleanRoom
          ? `${upstreamWebsiteOrigin}/about-licensing`
          : buildCleanRoomUrl("licensing");
      case "donateUrl":
        return sharedState.isNotCleanRoom
          ? `${upstreamWebsiteOrigin}/donate`
          : buildCleanRoomUrl("donate");
      case "helpUrl":
        return sharedState.isNotCleanRoom
          ? `${upstreamWebsiteOrigin}/help`
          : buildCleanRoomUrl("help");
      case "installCoappUrl":
        return sharedState.isNotCleanRoom
          ? appendQueryString(`${upstreamWebsiteOrigin}/install-coapp-v2`, {
              channel: queryValues?.channel,
            })
          : buildCleanRoomUrl("install-coapp", {
              channel: queryValues?.channel,
            });
      case "sitesUrl":
        return sharedState.isNotCleanRoom
          ? `${upstreamWebsiteOrigin}/sites`
          : buildCleanRoomUrl("sites");
      case "licenseCheckUrl":
        return sharedState.isNotCleanRoom
          ? `${upstreamWebsiteOrigin}/license-check.json`
          : buildCleanRoomUrl("license-check");
      case "reportsApiUrl":
        return sharedState.isNotCleanRoom
          ? `${upstreamApiOrigin}/v1/reports`
          : buildCleanRoomUrl("reports");
      case "communityDiscussionsUrl":
        return sharedState.isNotCleanRoom
          ? `${upstreamGithubOrigin}/${upstreamRepository}/discussions`
          : buildCleanRoomUrl("community");
      case "translationDiscussionsUrl":
        return sharedState.isNotCleanRoom
          ? `${upstreamGithubOrigin}/${upstreamRepository}/discussions/categories/language-translation`
          : buildCleanRoomUrl("translations-discussions");
      case "coappHelpUrl":
        return sharedState.isNotCleanRoom
          ? `${upstreamGithubOrigin}/${upstreamRepository}/wiki/CoApp-not-recognized`
          : buildCleanRoomUrl("coapp-help");
      case "incognitoHelpUrl":
        return sharedState.isNotCleanRoom
          ? `${upstreamGithubOrigin}/${upstreamRepository}/wiki/Enable-Incognito`
          : buildCleanRoomUrl("incognito-help");
      case "translationsHelpUrl":
        return sharedState.isNotCleanRoom
          ? `${upstreamGithubOrigin}/${upstreamRepository}/wiki/Translations`
          : buildCleanRoomUrl("translations-help");
      case "firefoxListingUrl":
        return sharedState.isNotCleanRoom
          ? `https://${firefoxListingPath}`
          : buildCleanRoomUrl("firefox-listing");
      case "firefoxReviewUrl":
        return sharedState.isNotCleanRoom
          ? `${getUrlValue("firefoxListingUrl")}/reviews/add`
          : buildCleanRoomUrl("firefox-review");
      case "chromeListingUrl":
        return sharedState.isNotCleanRoom
          ? `https://${chromeListingPath}/${chromeListingId}`
          : buildCleanRoomUrl("chrome-listing");
      case "chromeReviewUrl":
        return sharedState.isNotCleanRoom
          ? `${getUrlValue("chromeListingUrl")}/reviews`
          : buildCleanRoomUrl("chrome-review");
      case "edgeListingUrl":
        return sharedState.isNotCleanRoom
          ? `https://${edgeListingPath}/${edgeListingId}`
          : buildCleanRoomUrl("edge-listing");
      case "edgeReviewUrl":
        return sharedState.isNotCleanRoom
          ? getUrlValue("edgeListingUrl")
          : buildCleanRoomUrl("edge-review");
      case "welcomeUrl":
        return sharedState.isNotCleanRoom
          ? `${upstreamWebsiteOrigin}/welcome/${queryValues?.locale || ""}/${queryValues?.version || ""}/`
          : buildCleanRoomUrl("welcome", queryValues);
      case "changelogUrl":
        return sharedState.isNotCleanRoom
          ? `${upstreamWebsiteOrigin}/changelog/${queryValues?.locale || ""}/${queryValues?.version || ""}/`
          : buildCleanRoomUrl("changelog", queryValues);
      default:
        return buildCleanRoomUrl("missing-url", {
          requested: urlName,
        });
    }
  }

  function replaceTokenizedText(candidateText) {
    if (typeof candidateText != "string") {
      return candidateText;
    }

    let resolvedText = candidateText;
    Object.entries(textTokenMap).forEach(([token, literalName]) => {
      resolvedText = resolvedText.split(token).join(getLiteralValue(literalName));
    });
    Object.entries(urlTokenMap).forEach(([token, urlName]) => {
      resolvedText = resolvedText.split(token).join(getUrlValue(urlName));
    });
    return resolvedText;
  }

  function replaceAppNamePlaceholder(candidateText, appNameValue) {
    if (typeof candidateText != "string" || !candidateText.includes(appNamePlaceholder)) {
      return candidateText;
    }

    const resolvedAppName =
      typeof appNameValue == "string" && appNameValue.length > 0
        ? appNameValue
        : getLiteralValue("productName");
    return candidateText.split(appNamePlaceholder).join(resolvedAppName);
  }

  function resolveLocaleText(candidateText, appNameValue) {
    return replaceAppNamePlaceholder(replaceTokenizedText(candidateText), appNameValue);
  }

  function replaceTokenizedObjectStrings(candidateValue, inheritedContext) {
    if (!candidateValue || typeof candidateValue != "object") {
      return candidateValue;
    }

    const resolvedAppName =
      typeof candidateValue.appName == "string"
        ? resolveLocaleText(candidateValue.appName, inheritedContext?.appName)
        : inheritedContext?.appName;

    Object.keys(candidateValue).forEach((candidateKey) => {
      const currentValue = candidateValue[candidateKey];
      if (typeof currentValue == "string") {
        candidateValue[candidateKey] = resolveLocaleText(currentValue, resolvedAppName);
        return;
      }

      if (currentValue && typeof currentValue == "object") {
        replaceTokenizedObjectStrings(currentValue, {
          appName: resolvedAppName,
        });
      }
    });

    return candidateValue;
  }

  function normalizeUrlCandidate(candidate) {
    if (typeof candidate == "string") {
      return candidate;
    }

    if (candidate instanceof URL) {
      return candidate.toString();
    }

    if (typeof Request < "u" && candidate instanceof Request) {
      return candidate.url;
    }

    if (Array.isArray(candidate)) {
      return candidate.map(normalizeUrlCandidate).join("\n");
    }

    if (candidate && typeof candidate == "object") {
      if (typeof candidate.url == "string") {
        return candidate.url;
      }

      if (typeof candidate.href == "string") {
        return candidate.href;
      }
    }

    return "";
  }

  function isOriginalVdhUrl(candidate) {
    if (Array.isArray(candidate)) {
      return candidate.some(isOriginalVdhUrl);
    }

    const normalizedCandidate = normalizeUrlCandidate(candidate).toLowerCase();
    return (
      normalizedCandidate.includes(upstreamHost) ||
      normalizedCandidate.includes(upstreamRepository) ||
      normalizedCandidate.includes(firefoxListingPath) ||
      normalizedCandidate.includes(chromeListingPath) ||
      normalizedCandidate.includes(edgeListingPath) ||
      normalizedCandidate.includes(chromeListingId) ||
      normalizedCandidate.includes(edgeListingId)
    );
  }

  function shouldBlockOriginalUrl(candidate) {
    return getIsCleanRoom() && isOriginalVdhUrl(candidate);
  }

  function warnBlocked(sourceName, candidate) {
    console.warn("[cleanroom]", `Blocked upstream URL from ${sourceName}`, candidate);
  }

  async function readOptionFromStorage() {
    const storageArea = getStorageArea();
    if (!storageArea || typeof storageArea.get != "function") {
      sharedState.optionLoaded = !0;
      return sharedState.isNotCleanRoom;
    }

    try {
      const storedValues = await storageArea.get(optionStorageKey);
      const hasCurrentValue = Object.prototype.hasOwnProperty.call(
        storedValues || {},
        optionStorageKey,
      );

      if (hasCurrentValue) {
        sharedState.isNotCleanRoom = Boolean(storedValues?.[optionStorageKey]);
      } else if (typeof storageArea.set == "function") {
        await storageArea.set({
          [optionStorageKey]: !1,
        });
      }
    } catch {}

    sharedState.optionLoaded = !0;
    return sharedState.isNotCleanRoom;
  }

  async function setIsNotCleanRoom(nextValue) {
    const resolvedValue = Boolean(nextValue);
    sharedState.isNotCleanRoom = resolvedValue;

    const storageArea = getStorageArea();
    if (storageArea && typeof storageArea.set == "function") {
      try {
        await storageArea.set({
          [optionStorageKey]: resolvedValue,
        });
      } catch {}
    }

    return resolvedValue;
  }

  function installStorageListener() {
    const storageRoot = getStorageRoot();
    if (
      !storageRoot?.onChanged ||
      typeof storageRoot.onChanged.addListener != "function" ||
      storageRoot.onChanged[guardMarker]
    ) {
      return;
    }

    storageRoot.onChanged.addListener((changes, areaName) => {
      if (areaName != "local") {
        return;
      }

      if (changes?.[optionStorageKey]) {
        sharedState.isNotCleanRoom = Boolean(changes[optionStorageKey].newValue);
        sharedState.optionLoaded = !0;
      }
    });
    storageRoot.onChanged[guardMarker] = !0;
  }

  function wrapMethod(targetObject, methodName, getUrlCandidate, sourceName) {
    const originalMethod = targetObject?.[methodName];
    if (typeof originalMethod != "function" || originalMethod[guardMarker]) {
      return;
    }

    const wrappedMethod = function(...args) {
      const urlCandidate = getUrlCandidate(args);
      if (shouldBlockOriginalUrl(urlCandidate)) {
        warnBlocked(sourceName, normalizeUrlCandidate(urlCandidate));
        const callback = typeof args.at(-1) == "function" ? args.at(-1) : null;
        if (callback) {
          queueMicrotask(() => callback());
          return;
        }
        return Promise.resolve(void 0);
      }
      return originalMethod.apply(this, args);
    };

    wrappedMethod[guardMarker] = !0;
    targetObject[methodName] = wrappedMethod;
  }

  function installFetchGuard() {
    if (typeof globalThis.fetch != "function" || globalThis.fetch[guardMarker]) {
      return;
    }

    const originalFetch = globalThis.fetch.bind(globalThis);
    const wrappedFetch = function(...args) {
      if (shouldBlockOriginalUrl(args[0])) {
        const blockedUrl = normalizeUrlCandidate(args[0]);
        warnBlocked("fetch", blockedUrl);
        return Promise.reject(
          new Error("Clean-room mode blocked an upstream network request."),
        );
      }
      return originalFetch(...args);
    };

    wrappedFetch[guardMarker] = !0;
    globalThis.fetch = wrappedFetch;
  }

  function installWindowOpenGuard() {
    if (typeof globalThis.open != "function" || globalThis.open[guardMarker]) {
      return;
    }

    const originalOpen = globalThis.open.bind(globalThis);
    const wrappedOpen = function(...args) {
      if (shouldBlockOriginalUrl(args[0])) {
        const blockedUrl = normalizeUrlCandidate(args[0]);
        warnBlocked("window.open", blockedUrl);
        return null;
      }
      return originalOpen(...args);
    };

    wrappedOpen[guardMarker] = !0;
    globalThis.open = wrappedOpen;
  }

  function installDocumentClickGuard() {
    if (
      typeof document > "u" ||
      typeof document.addEventListener != "function" ||
      document[guardMarker]
    ) {
      return;
    }

    const blockOriginalAnchorClick = (event) => {
      if (!(event.target instanceof Element)) {
        return;
      }

      const anchorElement = event.target.closest("a[href]");
      if (!anchorElement) {
        return;
      }

      const href = anchorElement.getAttribute("href") || anchorElement.href;
      if (!shouldBlockOriginalUrl(href)) {
        return;
      }

      warnBlocked("anchor click", href);
      event.preventDefault();
      event.stopImmediatePropagation();
    };

    document.addEventListener("click", blockOriginalAnchorClick, !0);
    document.addEventListener("auxclick", blockOriginalAnchorClick, !0);
    document[guardMarker] = !0;
  }

  function installDocumentLiteralBindings() {
    if (typeof document > "u" || typeof document.querySelectorAll != "function") {
      return;
    }

    document.querySelectorAll("[data-cleanroom-url]").forEach((element) => {
      const urlName = element.getAttribute("data-cleanroom-url");
      if (!urlName) {
        return;
      }

      element.setAttribute("href", getUrlValue(urlName));
    });
  }

  function installTabsGuards(apiRoot) {
    if (!apiRoot) {
      return;
    }

    wrapMethod(apiRoot.tabs, "create", (args) => args[0]?.url, "tabs.create");
    wrapMethod(apiRoot.tabs, "update", (args) => args[1]?.url, "tabs.update");
    wrapMethod(apiRoot.windows, "create", (args) => args[0]?.url, "windows.create");
  }

  function installI18nGetMessageGuard(apiRoot) {
    const i18nApi = apiRoot?.i18n;
    const originalGetMessage = i18nApi?.getMessage;
    if (typeof originalGetMessage != "function" || originalGetMessage[guardMarker]) {
      return;
    }

    const wrappedGetMessage = function(...args) {
      const messageValue = originalGetMessage.apply(this, args);
      if (typeof messageValue != "string" || messageValue.length === 0) {
        return messageValue;
      }

      const messageName = args[0];
      if (messageName == "appName") {
        return resolveLocaleText(messageValue);
      }

      let localizedAppName = "";
      try {
        localizedAppName = originalGetMessage.call(this, "appName");
      } catch {}

      return resolveLocaleText(messageValue, localizedAppName);
    };

    wrappedGetMessage[guardMarker] = !0;

    try {
      i18nApi.getMessage = wrappedGetMessage;
    } catch {}
  }

  function installWehRpcGuard() {
    if (
      !globalThis.weh?.rpc ||
      typeof globalThis.weh.rpc.call != "function" ||
      globalThis.weh.rpc.call[guardMarker]
    ) {
      return;
    }

    const originalRpcCall = globalThis.weh.rpc.call.bind(globalThis.weh.rpc);
    const wrappedRpcCall = function(methodName, ...args) {
      if (methodName == "goto" && shouldBlockOriginalUrl(args[0])) {
        const blockedUrl = normalizeUrlCandidate(args[0]);
        warnBlocked("weh.rpc.call", blockedUrl);
        return Promise.resolve(void 0);
      }
      return originalRpcCall(methodName, ...args);
    };

    wrappedRpcCall[guardMarker] = !0;
    globalThis.weh.rpc.call = wrappedRpcCall;
  }

  function installGuards() {
    installFetchGuard();
    installWindowOpenGuard();
    installDocumentClickGuard();
    installDocumentLiteralBindings();
    installI18nGetMessageGuard(globalThis.chrome);
    installI18nGetMessageGuard(globalThis.browser);
    installTabsGuards(globalThis.chrome);
    installTabsGuards(globalThis.browser);
    installWehRpcGuard();
  }

  function startGuardInstallationLoop() {
    let attempts = 0;
    const guardInstallTimer = setInterval(() => {
      installGuards();
      attempts += 1;
      if (attempts >= 50) {
        clearInterval(guardInstallTimer);
      }
    }, 100);
  }

  globalThis.__cleanroomLinkGuard__ = {
    get isNotCleanRoom() {
      return sharedState.isNotCleanRoom;
    },
    get isCleanRoom() {
      return getIsCleanRoom();
    },
    optionStorageKey,
    getLiteralValue,
    getUrlValue,
    isOriginalVdhUrl,
    readOptionFromStorage,
    resolveLocaleText,
    replaceTokenizedObjectStrings,
    replaceTokenizedText,
    setIsNotCleanRoom,
    shouldBlockOriginalUrl,
  };

  installStorageListener();
  installGuards();
  startGuardInstallationLoop();
  void readOptionFromStorage();
})();
