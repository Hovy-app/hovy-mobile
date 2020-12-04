import React from 'react';

import LoginForm from '../components/LoginForm';

import KeyboardAvoidingContainer from '../../../components/ui/KeyboardAvoidingContainer';
import LoginPicture from '../components/LoginPicture';
import AuthContainer from '../components/AuthContainer';
import AuthFormContainer from '../components/AuthFormContainer';

const LoginScreen: React.FC = () => {
  return (
    <KeyboardAvoidingContainer>
      <AuthContainer>
        <LoginPicture />
        <AuthFormContainer>
          <LoginForm />
        </AuthFormContainer>
      </AuthContainer>
    </KeyboardAvoidingContainer>
  );
};

export default LoginScreen;
