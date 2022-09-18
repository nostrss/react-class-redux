import React from 'react';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'Home',
      inputText: '',
    };
  }
  /**
   * 함수와 비슷하게 생겼지만 메소드라고 부른다.
   * @param {*} event
   */
  onChangeText = (event) => {
    this.setState({
      inputText: event.target.value,
    });
  };

  onSubmitForm = () => {
    alert(this.state.inputText);
  };

  render() {
    return (
      <div>
        <form onSubmit={this.onSubmitForm}>
          <h1>Hello, {this.state.name}</h1>
          <input type='text' onChange={this.onChangeText} />
          <button type='submit'>확인</button>
        </form>
      </div>
    );
  }
}

export default Home;
