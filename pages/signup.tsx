import Navbar from '../components/Navbar';
import SignUp from '../components/Register';
import '../styles/globals.css';

const SignUpPage = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <SignUp />
    </div>
  );
};

export default SignUpPage;
