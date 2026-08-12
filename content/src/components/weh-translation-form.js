import React from '../externals/react.js';
import { connect } from '../externals/react-redux.js';
import { bindActionCreators } from '../externals/redux.js';
import { weh } from '../core/runtime.js';
import { WehHeader } from './weh-header.js';
import { WehTranslationRow } from './weh-translation-row.js';

const reactRef = { default: React };
const browserRef = { browser: weh.browser };
// One-shot flag: restore the persisted custom translations on first mount.
let restorePending = !0;

function isEmpty(valueRef) {
  var entryRef = !0;
  for (var resultRef in valueRef) {
    if (valueRef.hasOwnProperty(resultRef)) {
      entryRef = !1;
      break;
    }
  }
  return entryRef;
}

export const WehTranslationForm = connect(
  valueRef => ({
    keys: valueRef.translate.keys || [],
    custom: valueRef.translate.custom,
    isModified: !isEmpty(valueRef.translate.modified),
    modified: valueRef.translate.modified,
  }),
  valueRef =>
    bindActionCreators(
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
  class extends reactRef.default.Component {
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
      if (restorePending) {
        restorePending = !1;
        browserRef.browser.storage.local
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
        var countRef = browserRef.browser.i18n
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
        browserRef.browser.downloads.download({
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
          reactRef.default.createElement(WehTranslationRow, {
            key: entryRef,
            keyName: entryRef,
          }),
        );
      return reactRef.default.createElement(
        'form',
        {
          className: 'weh-shf',
          onChange: this.handleChange,
          role: 'form',
        },
        reactRef.default.createElement(
          WehHeader,
          null,
          reactRef.default.createElement(
            'div',
            {
              className: 'col-sm-4 float-sm-right',
              style: {
                display: 'inline-flex',
                marginTop: '2px',
              },
            },
            reactRef.default.createElement('input', {
              className: 'form-control',
              onChange: this.handleSearchChange,
              placeholder: 'Filter...',
              type: 'text',
              value: this.state.search,
            }),
            '\xA0',
            this.props.missingTags
              && this.props.missingTags.length > 0
              && reactRef.default.createElement(
                'select',
                {
                  className: 'form-control',
                  value: this.state.filter,
                  onChange: this.changedFilter(),
                },
                reactRef.default.createElement(
                  'option',
                  {
                    value: 'all',
                  },
                  'All strings',
                ),
                reactRef.default.createElement(
                  'option',
                  {
                    value: 'missing',
                  },
                  'Missing strings',
                ),
              ),
          ),
        ),
        reactRef.default.createElement(
          'main',
          null,
          reactRef.default.createElement(
            'div',
            {
              className: 'container',
            },
            reactRef.default.createElement('section', null, valueRef),
          ),
        ),
        reactRef.default.createElement(
          'footer',
          null,
          reactRef.default.createElement(
            'div',
            {
              style: {
                display: 'none',
              },
            },
            reactRef.default.createElement('input', {
              type: 'file',
              accept: 'application/json',
              ref: this.setFileInput(),
            }),
          ),
          this.props.footerExtra
            && reactRef.default.createElement(
              'div',
              {
                className: 'form-control translation-footer-extra',
              },
              this.props.footerExtra,
            ),
          reactRef.default.createElement(
            'div',
            {
              className: 'btn-toolbar justify-content-end',
            },
            reactRef.default.createElement(
              'div',
              {
                className: 'btn-group pull-right',
              },
              reactRef.default.createElement(
                'button',
                {
                  type: 'button',
                  onClick: this.import(),
                  className: 'btn',
                },
                'Import',
              ),
              reactRef.default.createElement(
                'button',
                {
                  type: 'button',
                  onClick: this.export(),
                  className: 'btn',
                },
                'Export',
              ),
              reactRef.default.createElement(
                'button',
                {
                  type: 'button',
                  className: 'btn btn-danger',
                  onClick: this.reset(),
                },
                'Reset',
              ),
              reactRef.default.createElement(
                'button',
                {
                  type: 'button',
                  onClick: this.props.cancel,
                  className:
                    'btn ' + (this.props.isModified ? '' : 'disabled'),
                },
                'Cancel',
              ),
              reactRef.default.createElement(
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
