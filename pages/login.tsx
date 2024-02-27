import Navbar from '../components/Navbar';
import Login from '../components/Login';
import '../styles/globals.css';

const LoginPage = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <Login />
    </div>
  );
};

export default LoginPage;
