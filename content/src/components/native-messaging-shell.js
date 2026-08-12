import React from '../externals/react.js';
import ReactJson from '../externals/react-json.js';
import { wehRpc } from '../core/runtime.js';

const reactRef = { default: React };
const reactJsonRef = { default: ReactJson };
const wehRpcRef = { default: wehRpc };

export const NativeMessagingShell = class
  extends reactRef.default.Component
{
  constructor(entryRef) {
    super(entryRef);
    this.state = {
      className: '',
      method: null,
      args: null,
      items: [],
    };
    this.itemIndex = 0;
    this.history = [];
    this.historyIndex = 0;
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.clear = this.clear.bind(this);
  }
  resetInput() {
    this.input.value = '';
    this.setState({
      className: '',
      method: null,
      args: null,
    });
  }
  clear() {
    this.setState({
      items: [],
    });
  }
  handleChange(entryRef) {
    var resultRef = this.input.value.trim();
    var countRef = '';
    var optionRef = null;
    var indexRef = null;
    if (resultRef.length) {
      countRef = 'syntax-error';
      var accumulator = /^\s*([^\s\(\)]+)\s*\((.*)\)\s*$/.exec(resultRef);
      if (accumulator) {
        var listRef = '[' + accumulator[2] + ']';
        try {
          indexRef = JSON.parse(listRef);
          optionRef = accumulator[1];
          countRef = 'syntax-ok';
        } catch {}
      }
    }
    this.setState({
      className: countRef,
      method: optionRef,
      args: indexRef,
    });
  }
  addItem(entryRef) {
    entryRef = Object.assign({}, entryRef, {
      key: ++this.itemIndex,
    });
    this.setState({
      items: this.state.items.concat([entryRef]),
    });
  }
  handleKeyDown(entryRef) {
    var resultRef = this;
    if (
      (entryRef.keyCode == 13
        && this.state.method
        && (this.history.push({
          method: this.state.method,
          args: this.state.args,
        }),
        (this.historyIndex = this.history.push()),
        this.addItem({
          type: 'call',
          method: this.state.method,
          args: this.state.args,
        }),
        wehRpcRef.default
          .call(this.props.proxyFnName, this.state.method, ...this.state.args)
          .then(countRef => {
            console.info('result', countRef);
            resultRef.addItem({
              type: 'result',
              result: countRef,
            });
          })
          .catch(countRef => {
            console.info('error', countRef);
            resultRef.addItem({
              type: 'error',
              error: countRef,
            });
          }),
        this.resetInput()),
      entryRef.keyCode == 38 && this.historyIndex > 0)
    ) {
      let countRef = this.history[--this.historyIndex];
      this.setState({
        method: countRef.method,
        args: countRef.args,
        className: 'syntax-ok',
      });
      this.input.value = this.entryString(countRef);
    }
    if (entryRef.keyCode == 40 && this.historyIndex < this.history.length) {
      let countRef = this.history[++this.historyIndex];
      if (countRef) {
        this.setState({
          method: countRef.method,
          args: countRef.args,
          className: 'syntax-ok',
        });
        this.input.value = this.entryString(countRef);
      } else {
        this.resetInput();
      }
    }
  }
  entryString(entryRef) {
    return (
      entryRef.method
      + '('
      + entryRef.args.map(resultRef => JSON.stringify(resultRef)).join(', ')
      + ')'
    );
  }
  scrollToBottom() {
    this.itemsEnd.scrollIntoView({
      behavior: 'smooth',
    });
  }
  componentDidMount() {
    this.scrollToBottom();
  }
  componentDidUpdate() {
    this.scrollToBottom();
  }
  renderJson(entryRef) {
    switch (typeof entryRef) {
      case 'undefined':
        return reactRef.default.createElement(
          'div',
          {
            className: 'react-json-view scalar-view',
          },
          reactRef.default.createElement(
            'em',
            null,
            'no explicit return value',
          ),
        );
      case 'number':
      case 'string':
      case 'boolean':
        return reactRef.default.createElement(
          'div',
          {
            className: 'react-json-view scalar-view',
          },
          JSON.stringify(entryRef),
        );
    }
    return reactRef.default.createElement(reactJsonRef.default, {
      src: entryRef,
      name: null,
      collapsed: !0,
      enableClipboard: !1,
      collapseStringsAfterLength: 64,
      displayDataTypes: !1,
      displayObjectSize: !1,
      style: {
        display: 'inline-block',
      },
    });
  }
  render() {
    var entryRef = this;
    var resultRef = this.state.items.map(countRef =>
      reactRef.default.createElement(
        'div',
        {
          key: countRef.key,
          className: 'natmsgsh-item',
        },
        countRef.type == 'call'
          && reactRef.default.createElement(
            'div',
            {
              className: 'natmsgsh-call',
            },
            entryRef.entryString(countRef),
          ),
        countRef.type == 'result'
          && reactRef.default.createElement(
            'div',
            {
              className: 'natmsgsh-return',
            },
            reactRef.default.createElement('span', {
              className: 'natmsgsh-ret-marker',
              dangerouslySetInnerHTML: {
                __html: '&rArr;',
              },
            }),
            entryRef.renderJson(countRef.result),
          ),
        countRef.type == 'error'
          && reactRef.default.createElement(
            'div',
            {
              className: 'natmsgsh-error',
            },
            reactRef.default.createElement('span', {
              className: 'natmsgsh-ret-marker',
              dangerouslySetInnerHTML: {
                __html: '&rArr;',
              },
            }),
            countRef.error.message,
          ),
      ),
    );
    return reactRef.default.createElement(
      'div',
      {
        className: 'natmsgsh',
      },
      reactRef.default.createElement(
        'div',
        {
          className: 'natmsgsh-result',
        },
        resultRef,
        reactRef.default.createElement('div', {
          style: {
            float: 'left',
            clear: 'both',
          },
          ref: countRef => {
            this.itemsEnd = countRef;
          },
        }),
      ),
      reactRef.default.createElement(
        'div',
        {
          className: 'natmsgsh-input',
        },
        reactRef.default.createElement('input', {
          ref: countRef => (this.input = countRef),
          className: this.state.className,
          onChange: this.handleChange,
          placeholder: 'RPC call as: method(arg1,arg2)',
          onKeyDown: this.handleKeyDown,
          type: 'text',
        }),
        reactRef.default.createElement(
          'button',
          {
            className: 'btn btn-outline-secondary',
            onClick: () => {
              wehRpcRef.default.call(this.props.proxyFnName, 'quit');
            },
          },
          this.props.exitAppText || 'Exit app',
        ),
        reactRef.default.createElement(
          'button',
          {
            className: 'btn btn-outline-secondary',
            onClick: this.clear,
          },
          this.props.clearText || 'Clear',
        ),
      ),
    );
  }
};
