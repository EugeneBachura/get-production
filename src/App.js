import React, {useState} from 'react';
import PostList from '././components/PostList';
import Post from '././components/Post';
import LoginForm from '././components/LoginForm';
import './css/App.css';

function App() {

  const [openPost, setPost] = useState(-1);
  const [login, setLogin] = useState(false);

  function idOpenPost(id) {
    if (openPost !== id) {setPost(id)}
  }

  function cLogin (login) {
    setLogin(login)
  }

  return (
    <div className="App">
      <header className="App-header">
        {login ? (openPost>=0 ? <Post idPost={openPost}/> : <PostList idOpenPost={idOpenPost}/>) : <LoginForm login={cLogin}/>}
      </header>
    </div>
  );
}

export default App;
