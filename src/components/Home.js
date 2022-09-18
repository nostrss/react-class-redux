import React from 'react';
import { fireBaseApp } from '../../src/Firebase';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'Home',
      inputText: '',
      firebaseData: [],
    };
  }

  /**
   * 렌더링 시 firebase로 부터 글 정보를 받아오기 위한 componentDidMount
   */
  componentDidMount() {
    this.loadFirebase();
  }

  /**
   * Firebase로 부터 data를 받아올 메소드
   */

  loadFirebase = async () => {
    const querySnapshot = await getDocs(collection(fireBaseApp, 'boards'));
    const data = querySnapshot.docs.map((doc) => doc.data());
    this.setState({
      firebaseData: data,
    });
  };

  /**
   * 함수와 비슷하게 생겼지만 메소드라고 부른다.
   * @param {*} event
   */
  onChangeText = (event) => {
    this.setState({
      inputText: event.target.value,
    });
  };

  onSubmitForm = async (event) => {
    /**
     * 클릭 시 새로고침 되어 데이터가 사라지는 현상을 막아줌
     */
    event.preventDefault();
    try {
      await addDoc(collection(fireBaseApp, 'boards'), this.state);
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  };

  render() {
    return (
      <div>
        <h1>리스트</h1>
        {this.state.firebaseData.map((board) => (
          <li key={uuidv4()}>{board.inputText}</li>
        ))}

        <form onSubmit={this.onSubmitForm}>
          <input type='text' onChange={this.onChangeText} />
          <button type='submit'>확인</button>
        </form>
      </div>
    );
  }
}

export default Home;
