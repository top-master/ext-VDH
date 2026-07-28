"use strict";
(() => {
  var defineProperty = Object.defineProperty;
  var getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var getOwnPropNames = Object.getOwnPropertyNames;
  var hasOwnPropertyRef = Object.prototype.hasOwnProperty;
  var defineLazyModule = (initModule, cachedModule) => () => (initModule && (cachedModule = initModule(initModule = 0)), cachedModule);
  var defineCommonjsModule = (defineModule, cachedExports) => () => (cachedExports || defineModule((cachedExports = {
        exports: {}
      })
      .exports, cachedExports), cachedExports.exports),
    defineExports = (target, source) => {
      for (var key in source) defineProperty(target, key, {
        get: source[key],
        enumerable: !0
      })
    },
    copyProps = (targetObj, from, except, desc) => {
      if (from && typeof from == "object" || typeof from == "function")
        for (let key of getOwnPropNames(from)) !hasOwnPropertyRef.call(targetObj, key) && key !== except && defineProperty(targetObj, key, {
          get: () => from[key],
          enumerable: !(desc = getOwnPropDesc(from, key)) || desc.enumerable
        });
      return targetObj
    };
  var toCommonjs = mod => copyProps(defineProperty({}, "__esModule", {
    value: !0
  }), mod);
  var versionNs = {};
  defineExports(versionNs, {
    info: () => versionInfo
  });
  var versionInfo, initVersion = defineLazyModule(() => {
    "use strict";
    versionInfo = {
      lastVersion: "2.0.19"
    }
  });
  var requireBuildInfo = defineCommonjsModule((buildExports, buildModule) => {
    buildModule.exports = {
      prod: !0,
      channel: "stable",
      buildDate: "2024-10-15",
      buildOptions: {
        linuxlic: !1,
        noyt: !0,
        target: "google",
        browser: "chrome"
      }
    }
  });
  var licPanelNs = {};
  defineExports(licPanelNs, {
    LicInfoPanelComponent: () => LicInfoPanelComponent
  });
  var LicInfoPanelComponent, initLicPanel = defineLazyModule(() => {
    "use strict";
    LicInfoPanelComponent = class extends React.Component {
      constructor(props) {
        super(props), this.state = {
          status: "verifying",
          email: null,
          key: null,
          editing: !1,
          editKey: ""
        }
      }
      componentWillMount() {
        this.check()
      }
      check() {
        var self = this;
        self.setState({
            status: "verifying",
            email: null,
            key: null
          }), weh.rpc.call("checkLicense")
          .then(license => {
            self.setState(license)
          })
          .catch(error => {
            console.error("Error checking license", error)
          })
      }
      onLicKeyChanged() {
        var self = this;
        return event => {
          self.setState({
            editKey: event.target.value
          })
        }
      }
      onLicKeyPressed() {
        var self = this;
        return event => {
          event.key == "Enter" ? self.register() : event.key == "Escape" && self
            .setState({
              editing: !1
            })
        }
      }
      registerEdit() {
        var self = this;
        return () => {
          self.setState({
            editing: !0,
            editKey: ""
          })
        }
      }
      getLicense() {
        return () => {
          let browserTarget = requireBuildInfo()
            .buildOptions.browser,
            convertUrl = "https://www.downloadhelper.net/convert" + (browserTarget ?
              "?browser=" + encodeURIComponent(browserTarget) : "");
          weh.rpc.call("goto", convertUrl)
        }
      }
      cancelRegister() {
        var self = this;
        return () => {
          self.setState({
            editing: !1
          })
        }
      }
      register() {
        var self = this;
        this.setState({
            editing: !1,
            status: "verifying"
          }), this.validate(this.state.editKey.trim())
          .catch(error => {
            self.setState({
              status: "error",
              error: error.message
            })
          })
      }
      validate(key) {
        var self = this;
        return weh.rpc.call("validateLicense", key)
          .then(result => {
            result && result.status == "nocoapp" ? self.setState({
              status: "nocoapp",
              key: result.key
            }) : self.check()
          })
      }
      render() {
        let statusesWithKey = {
          unverified: 1,
          locked: 1,
          accepted: 1,
          blocked: 1,
          nocoapp: 1,
          error: 1,
          mismatch: 1
        };
        var statusLabel = weh._("lic_status_" + this.state.status),
          panel = React.createElement("div", {
              className: "lic-info-panel"
            }, this.state.editing && React.createElement("div", {
              className: "input-license"
            }, React.createElement("label", null, weh._(
              "license_key")), React.createElement("input", {
              value: this.state.editKey,
              onChange: this.onLicKeyChanged(),
              onKeyDown: this.onLicKeyPressed()
            })), !this.state.editing && statusesWithKey[this.state.status] && this
            .state.key && React.createElement("div", {
              className: "license-details"
            }, React.createElement("table", null, React
              .createElement("tbody", null, this.state.email &&
                React.createElement("tr", null, React.createElement(
                    "td", null, weh._("registered_email")), React
                  .createElement("td", null, this.state.email)),
                this.state.key && React.createElement("tr", null,
                  React.createElement("td", null, weh._(
                    "registered_key")), React.createElement("td",
                    null, this.state.key))))), this.state.status ==
            "unneeded" && React.createElement("div", null, weh._(
              "lic_not_needed_linux")), !this.state.editing && this
            .state.status == "unset" && React.createElement("div",
              null, weh._("no_license_registered")), !this.state
            .editing && this.state.status == "nocoapp" && React
            .createElement("div", null, weh._(
              "no_coapp_license_unverified")), !this.state.editing &&
            this.state.status == "mismatch" && this.state.brExt &&
            React.createElement("div", null, weh._("lic_mismatch2", [
              this.state.brLicense, this.state.brExt
            ])), !this.state.editing && this.state.status ==
            "mismatch" && !this.state.brExt && React.createElement(
              "div", null, weh._("lic_mismatch1", [this.state
                .brLicense
              ])), !this.state.editing && this.state.status ==
            "error" && React.createElement("div", null, this.state
              .error), React.createElement("br", null), React
            .createElement("div", {
              className: "btn-toolbar float-right"
            }, React.createElement("div", {
                className: "btn-group"
              }, !this.state.editing && this.state.status !=
              "unneeded" && this.state.key && React.createElement(
                "div", null, React.createElement("button", {
                  className: "btn btn-outline-secondary",
                  onClick: this.validate.bind(this, this.state
                    .key)
                }, weh._("recheck_license"))), !this.state
              .editing && this.state.status == "nocoapp" && this
              .state.key && React.createElement("button", {
                className: "btn btn-outline-secondary",
                onClick: () => weh.rpc.call("installCoApp")
              }, weh._("coapp_install")), !this.state.editing &&
              this.state.status != "unneeded" && this.state
              .status != "nocoapp" && React.createElement("div",
                null, React.createElement("button", {
                  className: "btn btn-outline-secondary",
                  onClick: this.registerEdit()
                }, weh._("register_existing_license")), React
                .createElement("button", {
                  className: "btn btn-outline-secondary",
                  onClick: this.getLicense()
                }, weh._("get_conversion_license"))), this.state
              .editing && React.createElement("div", null, React
                .createElement("button", {
                  className: "btn btn-outline-secondary",
                  onClick: this.cancelRegister()
                }, weh._("cancel")), React.createElement("button", {
                  className: "btn btn-outline-primary",
                  disabled: this.state.editKey.trim()
                    .length === 0,
                  onClick: this.register.bind(this)
                }, weh._("validate_license"))))));
        return React.createElement("div", null, React.createElement(
          CollapsibleSection, {
            title: statusLabel,
            content: panel,
            open: this.props.open
          }))
      }
    };
    window.LicInfoPanel = LicInfoPanelComponent
  });
  weh.is_safe.then(() => {
    let {
      info: versionExport
    } = (initVersion(), toCommonjs(versionNs));
    initLicPanel(), window.CollapsibleSection = class extends React.Component {
      constructor(props) {
        super(props), this.state = {
          open: this.props.open || !1
        }
      }
      componentWillReceiveProps(nextProps) {
        nextProps.open != this.props.open && this.setState({
          open: !!nextProps.open
        })
      }
      toggle() {
        var self = this;
        return () => {
          self.setState({
            open: !self.state.open
          })
        }
      }
      render() {
        return React.createElement("div", {
          className: "collapsible-section"
        }, React.createElement("div", {
            className: "section-header " + (this.state.open ?
              "section-open" : "section-close"),
            onClick: this.toggle()
          }, React.createElement("div", {
            className: "open-close-sign"
          }, this.state.open ? "\u2296" : "\u2295"), React
          .createElement("span", {
            className: "title"
          }, this.props.title)), React.createElement(Collapse, {
          isOpen: this.state.open
        }, React.createElement(Card, null, React.createElement(
          CardBody, null, this.props.content))))
      }
    }, window.AddonInfoPanel = class extends React.Component {
      constructor(props) {
        super(props), this.state = {
          manifest: browser.runtime.getManifest(),
          build: null
        };
        var self = this;
        weh.rpc.call("getBuild")
          .then(build => {
            self.setState({
              build: build
            })
          })
      }
      render() {
        var self = this;
        let version = this.state.manifest.version_name || this.state
          .manifest.version,
          channelSuffix = this.state.build ? " (" + this.state.build.channel +
          ")" : "",
          content = React.createElement("div", null, React.createElement(
              "div", null, this.state.manifest.name), React
            .createElement("div", null, weh._("version", version) + channelSuffix),
            React.createElement("div", null, weh._("browser_locale",
              browser.i18n.getUILanguage())), this.state.build &&
            React.createElement("div", null, React.createElement(
                "div", null, this.state.build.prod ? weh._(
                  "prod_build") : weh._("dev_build")), React
              .createElement("div", null, weh._("built_on", this.state
                .build.buildDate)), Object.keys(this.state.build
                .buildOptions)
              .length > 0 && React.createElement("div", null, weh._(
                "build_options", Object.keys(this.state.build
                  .buildOptions)
                .sort()
                .map(optionKey => optionKey + "=" + self.state.build.buildOptions[optionKey])
                .join(", "))))),
          title = this.state.manifest.name + " " + version + channelSuffix;
        return React.createElement(CollapsibleSection, {
          title: title,
          content: content
        })
      }
    }, window.PlatformInfoPanel = class extends React.Component {
      constructor(props) {
        super(props), this.state = {
          platform: null,
          browser: null
        };
        var self = this;
        browser.runtime.getBrowserInfo && browser.runtime
          .getBrowserInfo()
          .then(browserInfo => {
            self.setState({
              browser: browserInfo
            })
          }), browser.runtime.getPlatformInfo()
          .then(platformInfo => {
            self.setState({
              platform: platformInfo
            })
          })
      }
      capitalize(text) {
        return text.substring(0, 1)
          .toUpperCase() + text.substring(1)
      }
      render() {
        let title = weh._("platform"),
          content = React.createElement("div", null, this.state.platform &&
            React.createElement("div", null, weh._("platform_info", [
              this.capitalize(this.state.platform.os), this.state
              .platform.arch
            ])), this.state.browser && React.createElement("div",
              null, weh._("browser_info", [this.state.browser.vendor,
                this.state.browser.name, this.state.browser.version
              ])) || React.createElement("div", null, navigator
              .userAgent));
        return React.createElement(CollapsibleSection, {
          title: title,
          content: content
        })
      }
    }, window.CoAppInfoPanel = class extends React.Component {
      constructor(props) {
        super(props), this.state = {
          status: null,
          info: null,
          error: null
        }
      }
      componentWillMount() {
        this.check()
      }
      async check(restart) {
        var self = this;
        let prefs = await weh.prefs;
        self.setState({
            status: null,
            info: null,
            error: null
          }), Promise.resolve()
          .then(() => {
            if (restart) return weh.rpc.call("coappProxy", "quit")
              .catch(() => {})
              .then(() => new Promise((resolve, reject) => {
                setTimeout(() => {
                  resolve()
                }, prefs.coappRestartDelay)
              }))
          })
          .then(() => {
            weh.rpc.call("checkCoApp")
              .then(status => {
                self.setState(Object.assign({
                  status: null,
                  info: null,
                  error: null
                }, status))
              })
          })
      }
      isMinimumVersion(version, minVersion) {
        for (var versionParts = version.split(".")
            .map(part => parseInt(part)), minParts = minVersion.split(".")
            .map(part => parseInt(part)), index = 0; index < versionParts.length; index++) {
          if (typeof minParts[index] > "u" || versionParts[index] > minParts[index]) return !0;
          if (versionParts[index] < minParts[index]) return !1
        }
        return !0
      }
      render() {
        var isOutdated = !1,
          statusLabel;
        this.state.status === null ? statusLabel = weh._("coapp_unchecked") :
          this.state.status ? this.isMinimumVersion(this.state.info
            .version, versionExport.lastVersion) ? statusLabel = weh._("coapp_installed") :
          (statusLabel = weh._("coapp_outdated"), isOutdated = !0) : statusLabel = weh._(
            "coapp_not_installed");
        var panel = React.createElement("div", null, this.state.error &&
          React.createElement("div", null, weh._("coapp_error"),
            "  ", React.createElement("em", null, this.state.error
              .message || this.state.error), ". ", React
            .createElement("a", {
              target: "_blank",
              href: "https://github.com/aclap-dev/video-downloadhelper/wiki/CoApp-not-recognized"
            }, weh._("coapp_help"))), this.state.status && React
          .createElement("div", null, React.createElement("div",
            null, weh._("coapp_found"), "  ", React.createElement(
              "em", null, this.state.info.displayName, " ", this
              .state.info.version)), isOutdated && React.createElement(
            "div", null, weh._("coapp_latest_version", versionExport
              .lastVersion)), React.createElement("div", null, weh
            ._("coapp_path"), "  ", React.createElement("em",
              null, this.state.info.binary))), React.createElement(
            "br", null), React.createElement("div", {
              className: "btn-toolbar float-right"
            }, React.createElement("button", {
              className: "btn btn-outline-secondary",
              onClick: this.check.bind(this, !0)
            }, weh._("coapp_recheck")), !this.state.status && React
            .createElement("button", {
              className: "btn btn-outline-primary",
              onClick: () => weh.rpc.call("installCoApp")
            }, weh._("coapp_install")), isOutdated && React.createElement(
              "button", {
                className: "btn btn-outline-primary",
                onClick: () => weh.rpc.call("installCoApp")
              }, weh._("coapp_update"))));
        return React.createElement("div", null, React.createElement(
          CollapsibleSection, {
            title: statusLabel,
            content: panel
          }))
      }
    }
  });
})();