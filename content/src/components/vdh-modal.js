import React from '../externals/react.js';

// reactstrap components are window globals (loaded from /vendor/reactstrap.js).
const { Button, Modal, ModalHeader, ModalBody, ModalFooter } =
  window.Reactstrap;

// App-wide modal driven by a { title, body, buttons } modalData prop.
export class VDHModal extends React.Component {
  constructor(entryRef) {
    super(entryRef);
    this.state = {
      isOpen: !1,
    };
    this.close = this.close.bind(this);
  }
  componentWillReceiveProps(entryRef) {
    this.setState({
      modalData: entryRef.modalData,
    });
  }
  close() {
    this.props.close();
    this.setState({
      modalData: null,
    });
  }
  render() {
    if (!this.props.modalData) {
      return null;
    }
    var entryRef = (this.props.modalData.buttons || []).map(resultRef =>
      React.createElement(
        Button,
        {
          key: resultRef.text,
          color: resultRef.color || 'primary',
          onClick: resultRef.click || (() => {}),
        },
        resultRef.text || 'OK',
      ),
    );
    return React.createElement(
      Modal,
      {
        isOpen: !!this.state.modalData,
        toggle: this.close,
        className: this.props.className,
      },
      React.createElement(
        ModalHeader,
        {
          toggle: this.close,
        },
        this.props.modalData.title || '',
      ),
      React.createElement(ModalBody, null, this.props.modalData.body),
      React.createElement(ModalFooter, null, entryRef),
    );
  }
}
