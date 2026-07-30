'use strict';

(() => {
  var defineProperty = Object.defineProperty;
  var getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var getOwnPropNames = Object.getOwnPropertyNames;
  var hasOwnPropertyRef = Object.prototype.hasOwnProperty;
  var defineLazyModule = (initModule, cachedModule) => () => (
    initModule && (cachedModule = initModule((initModule = 0))),
    cachedModule
  );
  var defineCommonjsModule = (defineModule, cachedExports) => () => (
    cachedExports
      || defineModule(
        (cachedExports = {
          exports: {},
        }).exports,
        cachedExports,
      ),
    cachedExports.exports
  );
  var defineExports = (target, source) => {
    for (var key in source) {
      defineProperty(target, key, {
        get: source[key],
        enumerable: !0,
      });
    }
  };
  var copyProps = (targetObj, from, except, desc) => {
    if ((from && typeof from == 'object') || typeof from == 'function') {
      for (let key of getOwnPropNames(from)) {
        if (!hasOwnPropertyRef.call(targetObj, key) && key !== except) {
          defineProperty(targetObj, key, {
            get: () => from[key],
            enumerable: !(desc = getOwnPropDesc(from, key)) || desc.enumerable,
          });
        }
      }
    }
    return targetObj;
  };
  var toCommonjs = mod =>
    copyProps(
      defineProperty({}, '__esModule', {
        value: !0,
      }),
      mod,
    );
  var versionNs = {};
  defineExports(versionNs, {
    info: () => versionInfo,
  });
  var versionInfo;
  var initVersion = defineLazyModule(() => {
    'use strict';

    versionInfo = {
      lastVersion: '2.0.19',
    };
  });
  var requireBuildInfo = defineCommonjsModule((buildExports, buildModule) => {
    buildModule.exports = {
      prod: !0,
      channel: 'stable',
      buildDate: '2024-10-15',
      buildOptions: {
        linuxlic: !1,
        noyt: !0,
        target: 'google',
        browser: 'chrome',
      },
    };
  });
  var licPanelNs = {};
  defineExports(licPanelNs, {
    LicInfoPanelComponent: () => LicInfoPanelComponent,
  });
  var LicInfoPanelComponent;
  var initLicPanel = defineLazyModule(() => {
    'use strict';

    LicInfoPanelComponent = class extends React.Component {
      constructor(props) {
        super(props);
        this.state = {
          status: 'verifying',
          email: null,
          key: null,
          editing: !1,
          editKey: '',
        };
      }
      componentWillMount() {
        this.check();
      }
      check() {
        var self = this;
        self.setState({
          status: 'verifying',
          email: null,
          key: null,
        });
        weh.rpc
          .call('checkLicense')
          .then(license => {
            self.setState(license);
          })
          .catch(error => {
            console.error('Error checking license', error);
          });
      }
      onLicKeyChanged() {
        var self = this;
        return event => {
          self.setState({
            editKey: event.target.value,
          });
        };
      }
      onLicKeyPressed() {
        var self = this;
        return event => {
          if (event.key == 'Enter') {
            self.register();
          } else {
            if (event.key == 'Escape') {
              self.setState({
                editing: !1,
              });
            }
          }
        };
      }
      registerEdit() {
        var self = this;
        return () => {
          self.setState({
            editing: !0,
            editKey: '',
          });
        };
      }
      getLicense() {
        return () => {
          let browserTarget = requireBuildInfo().buildOptions.browser;
          let convertUrl =
            globalThis.extConfig.getUrlValue('convertUrl')
            + (browserTarget
              ? '?browser=' + encodeURIComponent(browserTarget)
              : '');
          weh.rpc.call('goto', convertUrl);
        };
      }
      cancelRegister() {
        var self = this;
        return () => {
          self.setState({
            editing: !1,
          });
        };
      }
      register() {
        var self = this;
        this.setState({
          editing: !1,
          status: 'verifying',
        });
        this.validate(this.state.editKey.trim()).catch(error => {
          self.setState({
            status: 'error',
            error: error.message,
          });
        });
      }
      validate(key) {
        var self = this;
        return weh.rpc.call('validateLicense', key).then(result => {
          if (result && result.status == 'nocoapp') {
            self.setState({
              status: 'nocoapp',
              key: result.key,
            });
          } else {
            self.check();
          }
        });
      }
      render() {
        let statusesWithKey = {
          unverified: 1,
          locked: 1,
          accepted: 1,
          blocked: 1,
          nocoapp: 1,
          error: 1,
          mismatch: 1,
        };
        var statusLabel = weh._('lic_status_' + this.state.status);
        var panel = React.createElement(
          'div',
          {
            className: 'lic-info-panel',
          },
          this.state.editing
            && React.createElement(
              'div',
              {
                className: 'input-license',
              },
              React.createElement('label', null, weh._('license_key')),
              React.createElement('input', {
                value: this.state.editKey,
                onChange: this.onLicKeyChanged(),
                onKeyDown: this.onLicKeyPressed(),
              }),
            ),
          !this.state.editing
            && statusesWithKey[this.state.status]
            && this.state.key
            && React.createElement(
              'div',
              {
                className: 'license-details',
              },
              React.createElement(
                'table',
                null,
                React.createElement(
                  'tbody',
                  null,
                  this.state.email
                    && React.createElement(
                      'tr',
                      null,
                      React.createElement(
                        'td',
                        null,
                        weh._('registered_email'),
                      ),
                      React.createElement('td', null, this.state.email),
                    ),
                  this.state.key
                    && React.createElement(
                      'tr',
                      null,
                      React.createElement('td', null, weh._('registered_key')),
                      React.createElement('td', null, this.state.key),
                    ),
                ),
              ),
            ),
          this.state.status == 'unneeded'
            && React.createElement('div', null, weh._('lic_not_needed_linux')),
          !this.state.editing
            && this.state.status == 'unset'
            && React.createElement('div', null, weh._('no_license_registered')),
          !this.state.editing
            && this.state.status == 'nocoapp'
            && React.createElement(
              'div',
              null,
              weh._('no_coapp_license_unverified'),
            ),
          !this.state.editing
            && this.state.status == 'mismatch'
            && this.state.brExt
            && React.createElement(
              'div',
              null,
              weh._('lic_mismatch2', [this.state.brLicense, this.state.brExt]),
            ),
          !this.state.editing
            && this.state.status == 'mismatch'
            && !this.state.brExt
            && React.createElement(
              'div',
              null,
              weh._('lic_mismatch1', [this.state.brLicense]),
            ),
          !this.state.editing
            && this.state.status == 'error'
            && React.createElement('div', null, this.state.error),
          React.createElement('br', null),
          React.createElement(
            'div',
            {
              className: 'btn-toolbar float-right',
            },
            React.createElement(
              'div',
              {
                className: 'btn-group',
              },
              !this.state.editing
                && this.state.status != 'unneeded'
                && this.state.key
                && React.createElement(
                  'div',
                  null,
                  React.createElement(
                    'button',
                    {
                      className: 'btn btn-outline-secondary',
                      onClick: this.validate.bind(this, this.state.key),
                    },
                    weh._('recheck_license'),
                  ),
                ),
              !this.state.editing
                && this.state.status == 'nocoapp'
                && this.state.key
                && React.createElement(
                  'button',
                  {
                    className: 'btn btn-outline-secondary',
                    onClick: () => weh.rpc.call('installCoApp'),
                  },
                  weh._('coapp_install'),
                ),
              !this.state.editing
                && this.state.status != 'unneeded'
                && this.state.status != 'nocoapp'
                && React.createElement(
                  'div',
                  null,
                  React.createElement(
                    'button',
                    {
                      className: 'btn btn-outline-secondary',
                      onClick: this.registerEdit(),
                    },
                    weh._('register_existing_license'),
                  ),
                  React.createElement(
                    'button',
                    {
                      className: 'btn btn-outline-secondary',
                      onClick: this.getLicense(),
                    },
                    weh._('get_conversion_license'),
                  ),
                ),
              this.state.editing
                && React.createElement(
                  'div',
                  null,
                  React.createElement(
                    'button',
                    {
                      className: 'btn btn-outline-secondary',
                      onClick: this.cancelRegister(),
                    },
                    weh._('cancel'),
                  ),
                  React.createElement(
                    'button',
                    {
                      className: 'btn btn-outline-primary',
                      disabled: this.state.editKey.trim().length === 0,
                      onClick: this.register.bind(this),
                    },
                    weh._('validate_license'),
                  ),
                ),
            ),
          ),
        );
        return React.createElement(
          'div',
          null,
          React.createElement(CollapsibleSection, {
            title: statusLabel,
            content: panel,
            open: this.props.open,
          }),
        );
      }
    };
    window.LicInfoPanel = LicInfoPanelComponent;
  });
  var { info: importedVersion } = (initVersion(), toCommonjs(versionNs));
  initLicPanel();
  window.CopyButton = class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {};
    }
    copyInfoToClipboard() {
      return async () => {
        let manifest = browser.runtime.getManifest();
        let version = manifest.version_name ?? manifest.version;
        let build = await weh.rpc.call('getBuild');
        let buildOptions = build.buildOptions;
        let platformInfo = await browser.runtime.getPlatformInfo();
        let uiLanguage = browser.i18n.getUILanguage();
        let coappStatus = await weh.rpc.call('checkCoApp');
        let licenseStatus = await weh.rpc.call('checkLicense');
        let info = '';
        info += `version: ${version}
`;
        info += `channel: ${build.channel}
`;
        info += `build date: ${build.buildDate}
`;
        info += `build options: linuxlic: ${buildOptions.linuxlic}, noyt: ${buildOptions.noyt}, browser: ${buildOptions.browser}
`;
        info += `lang: ${uiLanguage}
`;
        info += `license: ${licenseStatus.status}
`;
        if (licenseStatus.key) {
          info += `key (only 16 first characters): ${licenseStatus.key.substring(0, 16)}
`;
        }
        info += `platform: ${platformInfo.arch} ${platformInfo.os}
`;
        info += `UA: ${navigator.userAgent}
`;
        if (coappStatus && coappStatus.status) {
          info += `coapp: yes. Info:
`;
          info +=
            JSON.stringify(coappStatus.info, null, 2)
            + `
`;
        } else {
          info += `coapp: no.
`;
        }
        await navigator.clipboard.writeText(info);
        window.alert(weh._('copy_settings_info_to_clipboard_success'));
      };
    }
    render() {
      return React.createElement(
        'button',
        {
          onClick: this.copyInfoToClipboard(),
          className: 'btn btn-outline-secondary float-right',
        },
        weh._('copy_settings_info_to_clipboard'),
      );
    }
  };
})();
