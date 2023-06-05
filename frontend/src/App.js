import './App.css';
import Navbar from './components/user/Navbar';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';

function App() {
  return (
    <>
      <Navbar/>
      {/* <SignIn/> */}
      <SignUp/>
    </>
  );
}

export default App;
