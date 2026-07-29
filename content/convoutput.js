'use strict';

(() => {
  weh.is_safe.then(async () => {
    let prefs = await weh.prefs;
    let rootReducer = combineReducers({
      prefs: prefs.reducer,
      configs: (state = {}, action) => {
        switch (action.type) {
          case 'SET_CONFIGS':
            state = action.payload;
            break;
          case 'UPDATE_CONFIG':
            state = Object.assign({}, state, {
              [action.payload.id]: action.payload,
            });
            weh.rpc.call('setOutputConfigs', state).then(loadConfigs);
            break;
          case 'REMOVE_CONFIG':
            state = Object.assign({}, state);
            delete state[action.payload];
            weh.rpc.call('setOutputConfigs', state).then(loadConfigs);
            break;
        }
        return state;
      },
      config: (state = null, action) => {
        switch (action.type) {
          case 'SET_CONFIG':
            state = action.payload;
            break;
        }
        return state;
      },
      formats: (state = [], action) => {
        switch (action.type) {
          case 'SET_FORMATS':
            state = action.payload;
            break;
        }
        return state;
      },
      codecs: (state = [], action) => {
        switch (action.type) {
          case 'SET_CODECS':
            state = action.payload;
            break;
        }
        return state;
      },
    });
    let store = createStore(rootReducer);
    prefs.reduxDispatch(store);
    function loadConfigs() {
      return weh.rpc.call('getOutputConfigs').then(configs => {
        store.dispatch({
          type: 'SET_CONFIGS',
          payload: configs,
        });
      });
    }
    loadConfigs();
    weh.rpc.call('getFormats').then(formats => {
      store.dispatch({
        type: 'SET_FORMATS',
        payload: Object.keys(formats)
          .sort()
          .map(formatName =>
            Object.assign({}, formats[formatName], {
              name: formatName,
            }),
          ),
      });
    });
    weh.rpc.call('getCodecs').then(codecs => {
      store.dispatch({
        type: 'SET_CODECS',
        payload: Object.keys(codecs)
          .sort()
          .map(codecName =>
            Object.assign({}, codecs[codecName], {
              name: codecName,
            }),
          ),
      });
    });
    let selectedConfigId = decodeURIComponent(
      new URL(document.URL).hash.substr(1),
    );
    if (selectedConfigId) {
      store.dispatch({
        type: 'SET_CONFIG',
        payload: selectedConfigId,
      });
    }
    var ConvOutputEditor = connect((state, ownProps) => ({
      prefs: state.prefs,
      configs: state.configs,
      config: state.config,
      formats: state.formats,
      codecs: state.codecs,
    }))(
      class extends React.Component {
        constructor(props) {
          super(props);
          this.state = Object.assign(
            {
              actionButtonsOpen: !1,
              resetConfirmOpen: !1,
              activeTab: 'general',
            },
            this.stateFromProps(props),
          );
        }
        componentWillReceiveProps(nextProps) {
          var self = this;
          var configId =
            (this.state && this.state.configId) || nextProps.config;
          if (!configId || !nextProps.configs[configId]) {
            configId = Object.keys(nextProps.configs).sort(
              (keyA, keyB) => (
                (keyA = nextProps.configs[keyA]),
                (keyB = nextProps.configs[keyB]),
                keyA.title < keyB.title ? -1 : keyA.title > keyB.title ? 1 : 0
              ),
            )[0];
          }
          this.setState(this.stateFromProps(nextProps, configId));
        }
        stateFromProps(props, configId) {
          props = props || this.props;
          configId =
            configId
            || (this.state && this.state.configId)
            || props.config
            || '';
          return {
            configId: configId,
            config: Object.assign({}, props.configs[configId]),
          };
        }
        toggleActionButtons() {
          this.setState({
            actionButtonsOpen: !this.state.actionButtonsOpen,
          });
        }
        toggleResetConfirm() {
          this.setState({
            resetConfirmOpen: !this.state.resetConfirmOpen,
          });
        }
        setActiveTab(tab) {
          this.setState({
            activeTab: tab,
          });
        }
        local(methodName, ...args) {
          var self = this;
          return () => {
            self[methodName].apply(self, args);
          };
        }
        changeConfig() {
          var self = this;
          return event => {
            var value = event.target.value;
            self.setState(self.stateFromProps(self.props, value));
          };
        }
        changeTitle() {
          var self = this;
          return event => {
            self.setState({
              config: Object.assign({}, self.state.config, {
                title: event.target.value,
              }),
            });
          };
        }
        duplicate() {
          var newId = '' + Date.now();
          var newConfig = Object.assign({}, this.state.config, {
            params: Object.assign({}, this.state.config.params),
            readonly: !1,
            title: weh._('copy_of', this.state.config.title),
            id: newId,
          });
          this.setState({
            configId: newId,
            config: newConfig,
          });
        }
        reset() {
          this.setState({
            resetConfirmOpen: !0,
          });
        }
        doReset() {
          var self = this;
          weh.rpc.call('resetOutputConfigs').then(() => {
            self.setState({
              resetConfirmOpen: !1,
            });
            loadConfigs();
          });
        }
        shouldSave() {
          if (!this.state.configId) {
            return !1;
          }
          var savedConfig = this.props.configs[this.state.configId];
          if (savedConfig) {
            return !deepEqual(savedConfig, this.state.config);
          } else {
            return !0;
          }
        }
        canReset() {
          if (!this.props.configs[this.state.configId]) {
            return !0;
          }
          for (
            var configKeys = Object.keys(this.props.configs), index = 0;
            index < configKeys.length;
            index++
          ) {
            if (!this.props.configs[configKeys[index]].readonly) {
              return !0;
            }
          }
          return !1;
        }
        save() {
          store.dispatch({
            type: 'UPDATE_CONFIG',
            payload: this.state.config,
          });
        }
        remove() {
          store.dispatch({
            type: 'REMOVE_CONFIG',
            payload: this.state.config.id,
          });
        }
        create() {
          var newId = '' + Date.now();
          var newConfig = {
            id: newId,
            title: weh._('custom_output'),
            ext: 'xxx',
            readonly: !1,
            params: {},
          };
          this.setState({
            configId: newId,
            config: newConfig,
          });
        }
        renderParameterList(section) {
          if (!this.state.config.params) {
            return null;
          }
          var self = this;
          let booleanOptions = [
            {
              label: weh._('yes'),
              value: !0,
            },
            {
              label: weh._('no'),
              value: !1,
            },
          ];
          var params = this.getParameters()[section];
          var elements = [];
          if (this.state.config.readonly) {
            params.forEach(param => {
              var value = '';
              if (param.paramValue) {
                if (
                  ((value = self.state.config.params[param.paramValue]),
                  typeof value > 'u')
                ) {
                  return;
                }
              } else if (
                param.configValue
                && ((value = self.state.config[param.configValue]),
                typeof value > 'u' || value === null)
              ) {
                return;
              }
              elements.push(
                React.createElement(
                  'div',
                  {
                    key: param.paramValue || param.configValue,
                    className: 'param',
                  },
                  React.createElement(
                    'div',
                    {
                      className: 'paramname',
                    },
                    weh._(param.label),
                  ),
                  React.createElement(
                    'div',
                    {
                      className: 'paramvalue',
                    },
                    value,
                  ),
                ),
              );
            });
          } else {
            params.forEach(param => {
              var value = '';
              var isEnabled = !0;
              if (param.paramValue) {
                value = self.state.config.params[param.paramValue];
                if (typeof value > 'u') {
                  isEnabled = !1;
                }
              } else {
                if (param.configValue) {
                  value = self.state.config[param.configValue];
                }
              }
              if (param.type == 'boolean') {
                value = !!value;
              }
              var optionElements = [];
              var firstValue;
              if (param.type == 'select' || param.type == 'boolean') {
                optionElements = param.options;
                if (param.type == 'boolean') {
                  optionElements = booleanOptions;
                }
                optionElements = optionElements.map(option => {
                  var optionValue;
                  var optionLabel;
                  if (typeof option == 'object') {
                    optionValue = option.value;
                    optionLabel = option.label;
                  } else {
                    optionValue = option;
                    optionLabel = option;
                  }
                  if (typeof firstValue > 'u') {
                    firstValue = optionValue;
                  }
                  return React.createElement(
                    'option',
                    {
                      key: '' + optionValue,
                      value: optionValue,
                    },
                    optionLabel,
                  );
                });
              }
              function makeToggleHandler() {
                return event => {
                  var newParams = Object.assign({}, self.state.config.params);
                  if (event.target.checked) {
                    switch (param.type) {
                      case 'string':
                        newParams[param.paramValue] = '';
                        break;
                      case 'select':
                        newParams[param.paramValue] = firstValue;
                        break;
                      case 'boolean':
                        newParams[param.paramValue] = !0;
                        break;
                    }
                  } else {
                    delete newParams[param.paramValue];
                  }
                  self.setState({
                    config: Object.assign({}, self.state.config, {
                      params: newParams,
                    }),
                  });
                };
              }
              function makeValueHandler() {
                return event => {
                  var newConfig = Object.assign({}, self.state.config);
                  if (param.paramValue) {
                    newConfig.params = Object.assign({}, newConfig.params);
                    newConfig.params[param.paramValue] = event.target.value;
                  } else {
                    newConfig[param.configValue] = event.target.value;
                  }
                  if (param.type == 'boolean') {
                    newConfig[param.configValue] =
                      newConfig[param.configValue] === 'true';
                  }
                  self.setState({
                    config: newConfig,
                  });
                };
              }
              var inputStyle = param.style || {};
              if (value === null || typeof value > 'u') {
                value = '';
              }
              elements.push(
                React.createElement(
                  'div',
                  {
                    key: '' + param.paramValue + '/' + param.configValue,
                    className: 'param',
                  },
                  React.createElement(
                    'div',
                    {
                      className: 'paramname',
                    },
                    weh._(param.label),
                  ),
                  React.createElement(
                    'div',
                    {
                      className: 'paramedit',
                    },
                    React.createElement(
                      'span',
                      {
                        style: {
                          display: isEnabled ? 'none' : 'inline-block',
                        },
                      },
                      value,
                    ),
                    param.type === 'string'
                      && React.createElement(
                        'div',
                        {
                          style: {
                            display: isEnabled ? 'inline-block' : 'none',
                          },
                        },
                        React.createElement('input', {
                          value: value,
                          onChange: makeValueHandler(),
                          style: inputStyle,
                          type: 'text',
                        }),
                      ),
                    (param.type === 'select' || param.type == 'boolean')
                      && React.createElement(
                        'div',
                        {
                          style: {
                            display: isEnabled ? 'inline-block' : 'none',
                          },
                        },
                        React.createElement(
                          'select',
                          {
                            onChange: makeValueHandler(),
                            style: inputStyle,
                            className: 'form-control',
                            value: value,
                          },
                          optionElements,
                        ),
                      ),
                    param.paramValue
                      && React.createElement('input', {
                        onChange: makeToggleHandler(),
                        type: 'checkbox',
                        checked: isEnabled,
                      }),
                  ),
                ),
              );
            });
          }
          return React.createElement(
            'div',
            {
              className: 'paramlist',
            },
            elements,
          );
        }
        render() {
          var self = this;
          var configOptions = Object.keys(this.props.configs)
            .sort(
              (keyA, keyB) => (
                (keyA = self.props.configs[keyA]),
                (keyB = self.props.configs[keyB]),
                keyA.title < keyB.title ? -1 : keyA.title > keyB.title ? 1 : 0
              ),
            )
            .map(configKey =>
              React.createElement(
                'option',
                {
                  key: configKey,
                  value: configKey,
                },
                self.props.configs[configKey].title,
              ),
            );
          var canSave = this.shouldSave();
          return React.createElement(
            'div',
            {
              className: 'convconfs',
            },
            React.createElement(
              'div',
              {
                className: 'toprow',
              },
              React.createElement(
                'div',
                {
                  className: 'selector',
                },
                React.createElement(
                  'select',
                  {
                    value: this.state.configId,
                    onChange: this.changeConfig(),
                    className: 'form-control',
                  },
                  !this.props.configs[this.state.configId]
                    && React.createElement(
                      'option',
                      {
                        value: 'this.state.configId',
                      },
                      this.state.config.title,
                    ),
                  configOptions,
                ),
              ),
              React.createElement(
                'div',
                {
                  className: 'confname',
                },
                React.createElement('input', {
                  type: 'text',
                  onChange: this.changeTitle(),
                  readOnly: this.state.config && this.state.config.readonly,
                  value: (this.state.config && this.state.config.title) || '',
                  className: 'form-control',
                }),
              ),
              React.createElement(
                'div',
                {
                  className: 'btn-group btn-primary',
                },
                canSave
                  && React.createElement(
                    Button,
                    {
                      onClick: this.local('save'),
                      type: 'button',
                      color: 'success',
                    },
                    weh._('convconf_save'),
                  ),
                !canSave
                  && React.createElement(
                    Button,
                    {
                      onClick: this.local('duplicate'),
                      type: 'button',
                      color: 'secondary',
                    },
                    weh._('convconf_duplicate'),
                  ),
                React.createElement(
                  ButtonDropdown,
                  {
                    isOpen: this.state.actionButtonsOpen,
                    toggle: this.local('toggleActionButtons'),
                  },
                  React.createElement(DropdownToggle, {
                    caret: !0,
                    color: canSave ? 'success' : 'secondary',
                  }),
                  React.createElement(
                    DropdownMenu,
                    null,
                    React.createElement(DropdownItem, null),
                    React.createElement(
                      DropdownItem,
                      {
                        onClick: this.local('create'),
                      },
                      weh._('convconf_new'),
                    ),
                    React.createElement(DropdownItem, {
                      divider: !0,
                    }),
                    React.createElement(
                      DropdownItem,
                      {
                        onClick: this.local('remove'),
                        disabled: this.state.config.readonly,
                      },
                      weh._('convconf_remove'),
                    ),
                    React.createElement(
                      DropdownItem,
                      {
                        disabled: !this.canReset(),
                        onClick: this.local('reset'),
                      },
                      weh._('convconf_reset'),
                    ),
                  ),
                ),
              ),
            ),
            this.state.config
              && this.state.config.readonly
              && React.createElement(
                'div',
                {
                  className: 'notice',
                },
                weh._('convconf_readonly'),
              ),
            React.createElement(
              'div',
              {
                className: 'params',
              },
              React.createElement(
                Nav,
                {
                  tabs: !0,
                },
                React.createElement(
                  NavItem,
                  null,
                  React.createElement(
                    NavLink,
                    {
                      className:
                        this.state.activeTab === 'general' ? 'active' : '',
                      onClick: this.local('setActiveTab', 'general'),
                    },
                    weh._('general'),
                  ),
                ),
                React.createElement(
                  NavItem,
                  null,
                  React.createElement(
                    NavLink,
                    {
                      className:
                        this.state.activeTab === 'advanced' ? 'active' : '',
                      onClick: this.local('setActiveTab', 'advanced'),
                    },
                    weh._('advanced'),
                  ),
                ),
              ),
              React.createElement(
                TabContent,
                {
                  activeTab: this.state.activeTab,
                },
                React.createElement(
                  TabPane,
                  {
                    tabId: 'general',
                  },
                  this.renderParameterList('general'),
                ),
                React.createElement(
                  TabPane,
                  {
                    tabId: 'advanced',
                  },
                  this.renderParameterList('advanced'),
                ),
              ),
            ),
            React.createElement(
              Modal,
              {
                isOpen: this.state.resetConfirmOpen,
                toggle: this.local('toggleResetConfirm'),
                className: this.props.className,
              },
              React.createElement(ModalHeader, {
                toggle: this.local('toggleResetConfirm'),
              }),
              React.createElement(
                ModalBody,
                null,
                weh._('convconf_reset_confirm'),
              ),
              React.createElement(
                ModalFooter,
                null,
                React.createElement(
                  Button,
                  {
                    color: 'secondary',
                    onClick: this.local('toggleResetConfirm'),
                  },
                  weh._('cancel'),
                ),
                React.createElement(
                  Button,
                  {
                    color: 'primary',
                    onClick: this.local('doReset'),
                  },
                  weh._('convconf_reset'),
                ),
                ' ',
              ),
            ),
          );
        }
        getEncodingCodecs(codecType) {
          return this.props.codecs
            .filter(codec => (codec.t = codecType))
            .map(codec => codec.name);
        }
        getEncodingFormats() {
          return this.props.formats
            .filter(format => !!format.e)
            .map(format => format.name);
        }
        getParameters() {
          let baseTargets = ['vcd', 'svcd', 'dvd', 'dv', 'dv50'];
          let targetPrefixes = ['', 'pal-', 'ntsc-', 'film-'];
          var targets = [];
          baseTargets.forEach(baseTarget => {
            targetPrefixes.forEach(prefix => {
              targets.push(prefix + baseTarget);
            });
          });
          return {
            general: [
              {
                label: 'convconf_ext',
                type: 'string',
                configValue: 'ext',
              },
              {
                label: 'convconf_container',
                type: 'select',
                paramValue: 'f',
                options: this.getEncodingFormats(),
              },
              {
                label: 'convconf_vcodec',
                type: 'select',
                paramValue: 'c:v',
                options: this.getEncodingCodecs('V'),
              },
              {
                label: 'convconf_acodec',
                type: 'select',
                paramValue: 'c:a',
                options: this.getEncodingCodecs('A'),
              },
              {
                label: 'convconf_audioonly',
                type: 'boolean',
                configValue: 'audioonly',
              },
              {
                label: 'convconf_videobitrate',
                type: 'string',
                paramValue: 'b:v',
              },
              {
                label: 'convconf_target',
                type: 'select',
                paramValue: 'target',
                options: targets,
              },
              {
                label: 'convconf_rate',
                type: 'string',
                paramValue: 'r',
              },
            ],
            advanced: [
              {
                label: 'convconf_2passes',
                type: 'boolean',
                configValue: 'twopasses',
              },
              {
                label: 'convconf_size',
                type: 'string',
                paramValue: 's',
              },
              {
                label: 'convconf_audiofreq',
                type: 'string',
                paramValue: 'ar',
              },
              {
                label: 'convconf_audiobitrate',
                type: 'string',
                paramValue: 'b:a',
              },
              {
                label: 'convconf_ac',
                type: 'select',
                paramValue: 'ac',
                options: [
                  {
                    value: 0,
                    label: weh._('convconf_acnone'),
                  },
                  {
                    value: 1,
                    label: weh._('convconf_mono'),
                  },
                  {
                    value: 2,
                    label: weh._('convconf_stereo'),
                  },
                ],
              },
              {
                label: 'convconf_aspect',
                type: 'select',
                paramValue: 'aspect',
                options: ['4:3', '16:9'],
              },
              {
                label: 'convconf_preset',
                type: 'select',
                paramValue: 'preset',
                options: [
                  'ultrafast',
                  'superfast',
                  'veryfast',
                  'faster',
                  'fast',
                  'medium',
                  'slow',
                  'slower',
                  'veryslow',
                  'placebo',
                ],
              },
              {
                label: 'convconf_tune',
                type: 'select',
                paramValue: 'tune',
                options: [
                  'film',
                  'animation',
                  'grain',
                  'stillimage',
                  'psnr',
                  'ssim',
                  'fastdecode',
                  'zerolatency',
                ],
              },
              {
                label: 'convconf_profilev',
                type: 'select',
                paramValue: 'profile:v',
                options: ['baseline', 'main', 'high'],
              },
              {
                label: 'convconf_level',
                type: 'string',
                paramValue: 'level',
              },
              {
                label: 'convconf_extra',
                type: 'string',
                configValue: 'extra',
                style: {
                  minWidth: '500px',
                },
              },
            ],
          };
        }
      },
    );
    render(
      React.createElement(
        Provider,
        {
          store: store,
        },
        React.createElement(
          'div',
          {
            className: 'weh-shf',
          },
          React.createElement(
            'div',
            null,
            React.createElement(WehHeader, {
              title: weh._('conversion_outputs'),
            }),
            React.createElement(
              'main',
              null,
              React.createElement(ConvOutputEditor, null),
            ),
          ),
        ),
      ),
      document.getElementById('root'),
    );
    weh.setPageTitle(weh._('conversion_outputs'));
  });
})();
