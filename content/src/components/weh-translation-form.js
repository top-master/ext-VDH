import React from '../externals/react.js';
import { connect } from '../externals/react-redux.js';
import { bindActionCreators } from '../externals/redux.js';
import { weh } from '../core/runtime.js';
import { WehHeader } from './weh-header.js';
import { WehTranslationRow } from './weh-translation-row.js';

const localVar_Be = { default: React };
const localVar_Xr = connect;
const helperFn_gr = bindActionCreators;
const localVar_ri = { browser: weh.browser };
const localVar_io = WehHeader;
const fnVar_Y4 = WehTranslationRow;
// One-shot flag: restore the persisted custom translations on first mount.
let localVar_P5 = !0;

function helperFn_Q4(valueRef) {
  var entryRef = !0;
  for (var resultRef in valueRef) {
    if (valueRef.hasOwnProperty(resultRef)) {
      entryRef = !1;
      break;
    }
  }
  return entryRef;
}

export const WehTranslationForm = localVar_Xr(
  valueRef => ({
    keys: valueRef.translate.keys || [],
    custom: valueRef.translate.custom,
    isModified: !helperFn_Q4(valueRef.translate.modified),
    modified: valueRef.translate.modified,
  }),
  valueRef =>
    helperFn_gr(
      {
        save: () => ({
          type: 'SAVE',
        }),
        cancel: () => ({
          type: 'CANCEL',
        }),
        import: entryRef => ({
          type: 'IMPORT',
          payload: entryRef,
        }),
        reset: entryRef => ({
          type: 'RESET',
        }),
        restore: entryRef => ({
          type: 'RESTORE',
          payload: entryRef,
        }),
      },
      valueRef,
    ),
)(
  class extends localVar_Be.default.Component {
    constructor(valueRef) {
      super(valueRef);
      this.state = {
        search: '',
        filter:
          (valueRef.missingTags
            && valueRef.missingTags.length > 0
            && 'missing')
          || 'all',
      };
      var entryRef = 4;
      this.argPlaceHolders = new Array(entryRef)
        .fill('')
        .map((resultRef, countRef) => '');
      this.handleSearchChange = this.handleSearchChange.bind(this);
      this.searchFilter = this.searchFilter.bind(this);
      this.fileInputChange = this.fileInputChange.bind(this);
    }
    componentWillMount(valueRef) {
      var entryRef = this;
      if (localVar_P5) {
        localVar_P5 = !1;
        localVar_ri.browser.storage.local
          .get('wehI18nCustom')
          .then(resultRef => {
            let countRef = resultRef.wehI18nCustom;
            if (countRef) {
              entryRef.props.restore(countRef);
            }
          });
      }
    }
    handleSearchChange(valueRef) {
      var entryRef = valueRef.target.value;
      this.setState({
        search: entryRef,
      });
    }
    searchFilter() {
      var valueRef = this;
      return entryRef => {
        entryRef = entryRef.toLowerCase();
        var resultRef = valueRef.state.search.toLowerCase().trim();
        if (
          resultRef.length === 0
          || typeof valueRef.props.modified[entryRef] < 'u'
          || entryRef.indexOf(resultRef) >= 0
          || (valueRef.props.custom[entryRef]
            && valueRef.props.custom[entryRef]
              .toLowerCase()
              .indexOf(resultRef) >= 0)
          || (valueRef.props.modified[entryRef]
            && valueRef.props.modified[entryRef]
              .toLowerCase()
              .indexOf(resultRef) >= 0)
        ) {
          return !0;
        }
        var countRef = localVar_ri.browser.i18n
          .getMessage(entryRef, valueRef.argPlaceHolders)
          .toLowerCase();
        return countRef.indexOf(resultRef) >= 0;
      };
    }
    typeFilter() {
      var valueRef = this;
      return entryRef =>
        valueRef.state.filter != 'missing'
        || !valueRef.props.missingTags
        || valueRef.props.missingTags.length == 0
        || valueRef.props.missingTags.indexOf(entryRef) >= 0;
    }
    changedFilter() {
      var valueRef = this;
      return entryRef => {
        valueRef.setState({
          filter: entryRef.target.value,
        });
      };
    }
    reset() {
      var valueRef = this;
      return () => {
        this.props.reset();
      };
    }
    import() {
      var valueRef = this;
      return () => {
        valueRef.fileInput.click();
      };
    }
    fileInputChange(valueRef) {
      var entryRef = this;
      var resultRef = entryRef.fileInput.files[0];
      if (resultRef) {
        var countRef = new FileReader();
        countRef.onload = optionRef => {
          try {
            var indexRef = JSON.parse(optionRef.target.result);
            entryRef.props.import(indexRef);
          } catch (accumulator) {
            alert(
              'File '
                + resultRef.name
                + ': Invalid format '
                + accumulator.message,
            );
          }
        };
        countRef.readAsText(resultRef);
      }
    }
    setFileInput(valueRef) {
      var entryRef = this;
      return resultRef => {
        if (resultRef) {
          resultRef.removeEventListener('change', entryRef.fileInputChange);
        }
        entryRef.fileInput = resultRef;
        if (resultRef) {
          resultRef.addEventListener('change', entryRef.fileInputChange);
        }
      };
    }
    export() {
      var valueRef = this;
      return () => {
        var entryRef = Object.assign(
          {},
          valueRef.props.custom,
          valueRef.props.modified,
        );
        var resultRef = new Blob([JSON.stringify(entryRef, null, 4)]);
        localVar_ri.browser.downloads.download({
          url: window.URL.createObjectURL(resultRef),
          filename: 'messages.json',
          saveAs: !0,
          conflictAction: 'uniquify',
        });
      };
    }
    render() {
      var valueRef = this.props.keys
        .filter(this.searchFilter())
        .filter(this.typeFilter())
        .sort()
        .map(entryRef =>
          localVar_Be.default.createElement(fnVar_Y4, {
            key: entryRef,
            keyName: entryRef,
          }),
        );
      return localVar_Be.default.createElement(
        'form',
        {
          className: 'weh-shf',
          onChange: this.handleChange,
          role: 'form',
        },
        localVar_Be.default.createElement(
          localVar_io,
          null,
          localVar_Be.default.createElement(
            'div',
            {
              className: 'col-sm-4 float-sm-right',
              style: {
                display: 'inline-flex',
                marginTop: '2px',
              },
            },
            localVar_Be.default.createElement('input', {
              className: 'form-control',
              onChange: this.handleSearchChange,
              placeholder: 'Filter...',
              type: 'text',
              value: this.state.search,
            }),
            '\xA0',
            this.props.missingTags
              && this.props.missingTags.length > 0
              && localVar_Be.default.createElement(
                'select',
                {
                  className: 'form-control',
                  value: this.state.filter,
                  onChange: this.changedFilter(),
                },
                localVar_Be.default.createElement(
                  'option',
                  {
                    value: 'all',
                  },
                  'All strings',
                ),
                localVar_Be.default.createElement(
                  'option',
                  {
                    value: 'missing',
                  },
                  'Missing strings',
                ),
              ),
          ),
        ),
        localVar_Be.default.createElement(
          'main',
          null,
          localVar_Be.default.createElement(
            'div',
            {
              className: 'container',
            },
            localVar_Be.default.createElement('section', null, valueRef),
          ),
        ),
        localVar_Be.default.createElement(
          'footer',
          null,
          localVar_Be.default.createElement(
            'div',
            {
              style: {
                display: 'none',
              },
            },
            localVar_Be.default.createElement('input', {
              type: 'file',
              accept: 'application/json',
              ref: this.setFileInput(),
            }),
          ),
          this.props.footerExtra
            && localVar_Be.default.createElement(
              'div',
              {
                className: 'form-control translation-footer-extra',
              },
              this.props.footerExtra,
            ),
          localVar_Be.default.createElement(
            'div',
            {
              className: 'btn-toolbar justify-content-end',
            },
            localVar_Be.default.createElement(
              'div',
              {
                className: 'btn-group pull-right',
              },
              localVar_Be.default.createElement(
                'button',
                {
                  type: 'button',
                  onClick: this.import(),
                  className: 'btn',
                },
                'Import',
              ),
              localVar_Be.default.createElement(
                'button',
                {
                  type: 'button',
                  onClick: this.export(),
                  className: 'btn',
                },
                'Export',
              ),
              localVar_Be.default.createElement(
                'button',
                {
                  type: 'button',
                  className: 'btn btn-danger',
                  onClick: this.reset(),
                },
                'Reset',
              ),
              localVar_Be.default.createElement(
                'button',
                {
                  type: 'button',
                  onClick: this.props.cancel,
                  className:
                    'btn ' + (this.props.isModified ? '' : 'disabled'),
                },
                'Cancel',
              ),
              localVar_Be.default.createElement(
                'button',
                {
                  type: 'button',
                  onClick: this.props.save,
                  className:
                    'btn btn-primary '
                    + (this.props.isModified ? '' : 'disabled'),
                },
                'Save',
              ),
            ),
          ),
        ),
      );
    }
  },
);
