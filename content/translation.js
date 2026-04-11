"use strict";

/** @typedef {import("./ui-types").MissingTranslationTags} MissingTranslationTags */

(() => {
  weh.is_safe.then(() => {
    const translationRootReducer = combineReducers({
      translate: translateReducer,
    });
    const translationStore = createStore(translationRootReducer);
    /** @type {MissingTranslationTags | null} */
    let missingTranslationTags = null;

    try {
      missingTranslationTags = JSON.parse(
        browser.i18n.getMessage("__missingI18nTags"),
      );
    } catch {}

    function renderTranslationFooterLink() {
      return React.createElement(
        "a",
        {
          href: "#",
          onClick: () => weh.rpc.call("openTranslationForum"),
        },
        "Please, share your translations",
      );
    }

    render(
      React.createElement(
        Provider,
        {
          store: translationStore,
        },
        React.createElement(WehTranslationForm, {
          missingTags: missingTranslationTags,
          footerExtra: renderTranslationFooterLink(),
        }),
      ),
      document.getElementById("root"),
    );
    weh.setPageTitle(weh._("translation"));
  });
})();
