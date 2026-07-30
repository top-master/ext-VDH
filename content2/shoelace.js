// Shoelace theme/storage setup for the extension panels. The third-party UI library it
// uses is vendored in ../vendor/shoelace-lib.js (importing it also registers the
// <sl-*> elements).
import {
  setBasePath,
  browserPolyfill,
  deepEqual,
} from '../vendor/shoelace-lib.js';
async function readStorageValue(storageDescriptor) {
  let storageResult = await browserPolyfill.storage[
    storageDescriptor.where
  ].get(storageDescriptor.name);
  if (storageDescriptor.name in storageResult) {
    let storedValue = storageResult[storageDescriptor.name];
    if (storageDescriptor.hooks) {
      return storageDescriptor.hooks.getter(storedValue, storageDescriptor);
    } else {
      return storedValue;
    }
  }
  return storageDescriptor.default();
}
function onStorageChange(storageDescriptor, changeCallback) {
  browserPolyfill.storage[storageDescriptor.where].onChanged.addListener(
    storageChanges => {
      let changeRecord = storageChanges[storageDescriptor.name];
      if (changeRecord) {
        if (deepEqual(changeRecord.oldValue, changeRecord.newValue)) {
          return;
        }
        if (typeof changeRecord.newValue > 'u') {
          changeCallback(storageDescriptor.default());
        } else {
          if (storageDescriptor.hooks) {
            changeCallback(
              storageDescriptor.hooks.getter(
                changeRecord.newValue,
                storageDescriptor,
              ),
            );
          } else {
            changeCallback(changeRecord.newValue);
          }
        }
      }
    },
  );
}
var themeStorageDescriptor = {
  name: 'theme',
  default: () => 'system',
  where: 'local',
};
setBasePath('/content2/shoelace/');
var darkModeMediaQuery = window.matchMedia('(prefers-color-scheme:dark)');
var prefersDarkScheme = darkModeMediaQuery.matches;
var storedThemePreference = await readStorageValue(themeStorageDescriptor);
var applyTheme = () => {
  let isDarkMode =
    storedThemePreference == 'dark'
    || (storedThemePreference == 'system' && prefersDarkScheme);
  document.documentElement.classList.toggle('sl-theme-dark', isDarkMode);
};
darkModeMediaQuery.addEventListener('change', mediaChangeEvent => {
  prefersDarkScheme = mediaChangeEvent.matches;
  applyTheme();
});
onStorageChange(themeStorageDescriptor, newThemeValue => {
  storedThemePreference = newThemeValue;
  applyTheme();
});
applyTheme();
