// Entry: aggregates the content-libs modules and publishes the window.* API that
// the extension's ~19 pages consume. ./core/runtime.js wires the vendored weh
// framework (../weh/) to the redux/react vendor globals and publishes the
// framework window.* names; the app's own components live one class per file
// under ./components/ and are fanned onto window below.
import './core/runtime.js';

import { InputField } from './components/input-field.js';
import { ComboBox } from './components/combo-box.js';
import { ComboBoxLabeled } from './components/combo-box-labeled.js';
import { Embedder } from './components/embedder.js';
import { Embedded } from './components/embedded.js';
import { VDHModal } from './components/vdh-modal.js';
import { WehParam } from './components/weh-param.js';
import {
  WehPrefsControls,
  listenPrefs,
} from './components/weh-prefs-controls.js';
import { PrefsSettingsApp } from './components/prefs-settings-app.js';
import { NativeMessagingShell } from './components/native-messaging-shell.js';
import { WehHeader } from './components/weh-header.js';
import { WehTranslationForm } from './components/weh-translation-form.js';

window.InputField = InputField;
window.ComboBox = ComboBox;
window.ComboBoxLabeled = ComboBoxLabeled;
window.Embedder = Embedder;
window.Embedded = Embedded;
window.VDHModal = VDHModal;
window.WehParam = WehParam;
window.WehPrefsControls = WehPrefsControls;
window.listenPrefs = listenPrefs;
window.PrefsSettingsApp = PrefsSettingsApp;
window.NativeMessagingShell = NativeMessagingShell;
window.WehHeader = WehHeader;
window.WehTranslationForm = WehTranslationForm;
