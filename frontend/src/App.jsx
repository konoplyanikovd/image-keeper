import './styles/App.css';
import Lobby from './components/Lobby';
import Header from './components/Header';
import Footer from './components/Footer';
import Upload from './components/Upload';
import Editor from './components/Editor';

function App() {
  return (
    <>
      <Header />
      <Lobby />
      <Upload />
      <Editor />
      <Footer />
    </>
  );
}

export default App
