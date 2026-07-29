'use strict';

(() => {
  weh.is_safe.then(() => {
    let rootReducer = combineReducers({
      data: (
        state = {
          mode: 'page-title',
          domains: [],
          domain: '',
          ref: null,
          xpath: null,
          regex: null,
          delay: 0,
        },
        action,
      ) => {
        switch (action.type) {
          case 'SET_DATA':
            state = Object.assign({}, state, action.payload);
            break;
        }
        return state;
      },
    });
    let store = createStore(rootReducer);
    weh.rpc.listen({
      setData: payload => {
        store.dispatch({
          type: 'SET_DATA',
          payload: payload,
        });
      },
    });
    var SmartNameDefiner = connect((state, ownProps) => ({
      data: state.data,
    }))(
      class extends React.Component {
        constructor(props) {
          super(props);
          this.state = {
            selected: '',
            mode: 'page-title',
            domain: '',
            domains: [],
            xpath: null,
            regex: null,
            delay: 0,
            advanced: !1,
            regexpClass: '',
            xpathClass: '',
            delayClass: '',
          };
        }
        componentWillReceiveProps(nextProps) {
          if (
            nextProps.data.mode == 'page-content'
            && nextProps.data.xpath !== this.state.xpath
          ) {
            weh.rpc.call(
              'selectSmartNameXPath',
              nextProps.data.ref,
              nextProps.data.xpath,
            );
          }
          for (
            var domainSuffixes = [],
              domainParts = nextProps.data.domain.split('.'),
              index = 0;
            index < domainParts.length - 1;
            index++
          ) {
            domainSuffixes.push(domainParts.slice(index).join('.'));
          }
          var defaultDomain = domainSuffixes[0];
          if (domainSuffixes.indexOf(this.state.domain) >= 0) {
            defaultDomain = this.state.domain;
          }
          var self = this;
          this.setState(
            {
              selected: '',
              mode: nextProps.data.mode || 'page-content',
              xpath: nextProps.data.xpath,
              xpathClass: '',
              regexp: '.*',
              regexpClass: '',
              domains: domainSuffixes,
              domain: defaultDomain,
            },
            () => {
              self.evaluate(nextProps);
            },
          );
          window.addEventListener('beforeunload', () => {
            weh.rpc.call('closedSmartNameDefiner', self.props.data.ref);
          });
        }
        evaluate(props) {
          props = props || this.props;
          var self = this;
          weh.rpc
            .call('evaluateSmartName', props.data.ref, {
              mode: this.state.mode,
              xpath: this.state.xpath,
              regexp: this.state.regexp,
            })
            .then(selected => {
              self.setState({
                selected: selected || '',
              });
            })
            .catch(error => {
              self.setState({
                selected: '',
              });
            });
        }
        save() {
          var self = this;
          return () => {
            weh.rpc
              .call('addSmartNameRule', {
                domain: self.state.domain,
                mode: self.state.mode,
                xpath: self.state.xpath,
                regexp: self.state.regexp,
                delay: self.state.delay,
              })
              .then(() => {
                weh.rpc.call('closeSmartNameDefiner');
              });
          };
        }
        onChange(field) {
          var self = this;
          return event => {
            if (field === 'advanced') {
              return self.setState({
                advanced: event.target.checked,
              });
            }
            var value = event.target.value;
            var update = {};
            var hasError = !1;
            switch (field) {
              case 'mode':
                update.mode = value;
                break;
              case 'xpath':
                update.xpath = value;
                try {
                  document.evaluate(
                    value,
                    document,
                    null,
                    XPathResult.STRING_TYPE,
                    null,
                  );
                  update.xpathClass = '';
                  weh.rpc.call(
                    'selectSmartNameXPath',
                    self.props.data.ref,
                    value,
                  );
                } catch {
                  update.xpathClass = 'error';
                  hasError = !0;
                }
                break;
              case 'regexp':
                update.regexp = value;
                try {
                  new RegExp(value);
                  update.regexpClass = '';
                } catch {
                  update.regexpClass = 'error';
                  hasError = !0;
                }
                break;
              case 'domain':
                update.domain = value;
                break;
              case 'delay':
                update.delay = value;
                if (/^[0-9]+$/.test(value)) {
                  update.delayClass = '';
                } else {
                  update.delayClass = 'error';
                }
                break;
            }
            self.setState(update, () => {
              if (
                !hasError
                && ['mode', 'xpath', 'regexp'].indexOf(field) >= 0
              ) {
                self.evaluate();
              }
            });
          };
        }
        renderParams() {
          var domainOptions = this.state.domains.map(domain =>
            React.createElement(
              'option',
              {
                key: domain,
                value: domain,
              },
              domain,
            ),
          );
          return React.createElement(
            'div',
            {
              className: 'container',
            },
            React.createElement(
              'div',
              {
                className: 'form-group row',
              },
              React.createElement(
                'label',
                {
                  className: 'col-form-label col-sm-4',
                },
                weh._('smartnamer_domain'),
              ),
              React.createElement(
                'select',
                {
                  className: 'form-control col-sm-8',
                  onChange: this.onChange('domain'),
                  value: this.state.domain,
                },
                domainOptions,
              ),
            ),
            React.createElement(
              'div',
              {
                className: 'form-group row',
              },
              React.createElement(
                'select',
                {
                  className: 'form-control col-sm-12',
                  onChange: this.onChange('mode'),
                  value: this.state.mode,
                },
                React.createElement(
                  'option',
                  {
                    value: 'header-url',
                  },
                  weh._('smartnamer_get_name_from_header_url'),
                ),
                React.createElement(
                  'option',
                  {
                    value: 'page-title',
                  },
                  weh._('smartnamer_get_name_from_page_title'),
                ),
                React.createElement(
                  'option',
                  {
                    value: 'page-content',
                  },
                  weh._('smartnamer_get_name_from_page_content'),
                ),
                React.createElement(
                  'option',
                  {
                    value: 'obfuscated',
                  },
                  weh._('smartnamer_get_obfuscated_name'),
                ),
              ),
            ),
            this.state.advanced
              && React.createElement(
                'div',
                null,
                React.createElement(
                  'div',
                  {
                    className: 'form-group row',
                  },
                  React.createElement(
                    'label',
                    {
                      className: 'col-form-label col-sm-12',
                    },
                    weh._('smartnamer_xpath_expr'),
                  ),
                  React.createElement('textarea', {
                    className:
                      'form-control col-sm-12 ' + this.state.xpathClass,
                    rows: '2',
                    onChange: this.onChange('xpath'),
                    value: this.state.xpath,
                  }),
                ),
                React.createElement(
                  'div',
                  {
                    className: 'form-group row',
                  },
                  React.createElement(
                    'label',
                    {
                      className: 'col-form-label col-sm-6',
                    },
                    weh._('smartnamer_regexp'),
                  ),
                  React.createElement('input', {
                    className:
                      'form-control col-sm-6 ' + this.state.regexpClass,
                    onChange: this.onChange('regexp'),
                    type: 'text',
                    value: this.state.regexp,
                  }),
                ),
                React.createElement(
                  'div',
                  {
                    className: 'form-group row',
                  },
                  React.createElement(
                    'label',
                    {
                      className: 'col-form-label col-sm-6',
                    },
                    weh._('smartnamer_delay'),
                  ),
                  React.createElement('input', {
                    className: 'form-control col-sm-6 ' + this.state.delayClass,
                    onChange: this.onChange('delay'),
                    type: 'text',
                    value: this.state.delay,
                  }),
                ),
              ),
          );
        }
        render() {
          return React.createElement(
            'div',
            {
              className: 'smartname-definer',
            },
            React.createElement(WehHeader, {
              title: weh._('smartname_define'),
            }),
            React.createElement(
              'header',
              null,
              React.createElement(
                'div',
                {
                  className: 'container',
                },
                React.createElement(
                  'div',
                  {
                    className: 'form-group row',
                  },
                  React.createElement('input', {
                    className: 'form-control col-sm-12',
                    title: weh._('smartnamer_selected_text'),
                    type: 'text',
                    disabled: !0,
                    value: this.state.selected,
                  }),
                ),
              ),
            ),
            React.createElement('main', null, this.renderParams()),
            React.createElement(
              'footer',
              null,
              React.createElement(
                'div',
                {
                  className: 'btn-toolbar',
                },
                React.createElement(
                  'div',
                  {
                    className: 'row',
                  },
                  React.createElement('input', {
                    id: 'advanced',
                    className: 'form-control col-sm-1',
                    type: 'checkbox',
                    onChange: this.onChange('advanced'),
                    checked: this.state.advanced,
                  }),
                  React.createElement(
                    'label',
                    {
                      htmlFor: 'advanced',
                      className: 'col-form-label col-sm-10',
                    },
                    weh._('advanced'),
                  ),
                ),
                React.createElement(
                  'div',
                  {
                    className: 'btn-group pull-right',
                  },
                  React.createElement(
                    'button',
                    {
                      type: 'button',
                      onClick: this.save(),
                      disabled:
                        this.state.xpathClass
                        || this.state.regexpClass
                        || this.state.delayClass,
                      className: 'btn btn-primary',
                    },
                    weh._('save'),
                  ),
                ),
              ),
            ),
          );
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
          React.createElement(SmartNameDefiner, null),
        ),
      ),
      document.getElementById('root'),
    );
    weh.setPageTitle(weh._('smartname_define'));
    weh.trigger('smartname-define');
  });
})();
