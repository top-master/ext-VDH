import React from '../externals/react.js';

// Host side of an embedded iframe: resizes to the height the Embedder posts.
export class Embedded extends React.Component {
  constructor(entryRef) {
    super(entryRef);
    this.receiveMessage = this.receiveMessage.bind(this);
    this.heightRe = new RegExp('^height (\\d+)');
    this.state = {
      height: 'auto',
    };
  }
  receiveMessage(entryRef) {
    var resultRef = entryRef.message || entryRef.data;
    var countRef = this.heightRe.exec(resultRef);
    if (countRef) {
      this.setState({
        height: Math.min(580, parseInt(countRef[1])) + 'px',
      });
    }
  }
  componentDidMount() {
    window.addEventListener('message', this.receiveMessage);
  }
  componentWillUnmount() {
    window.removeEventListener('message', this.receiveMessage);
  }
  render() {
    return React.createElement('iframe', {
      className: this.props.className,
      style: {
        height: this.state.height,
        borderTop: 0,
        borderBottom: 0,
      },
      src: this.props.src,
    });
  }
}
