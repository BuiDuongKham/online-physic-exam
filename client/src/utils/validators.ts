export const validateLoginForm = ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const isMailValid = validateMail(email);
  const isPasswordValid = validatePassword(password);

  return isMailValid && isPasswordValid;
};

export const validateResetPassword = ({
  password,
  confirmPassword,
}: {
  password: string;
  confirmPassword: string;
}) => {
  const checkConfirmPassword = password === confirmPassword;
  if (checkConfirmPassword) {
    return validatePassword(confirmPassword);
  }
  return false;
};

export const validateForgotPassword = ({ email }: { email: string }) => {
  return validateMail(email);
};

export const validateRegisterForm = ({
  email,
  password,
  username,
}: {
  email: string;
  password: string;
  username: string;
}) => {
  return (
    validateMail(email) &&
    validatePassword(password) &&
    validateUsername(username)
  );
};

const validatePassword = (password: string) => {
  return password.length > 5;
};

export const validateMail = (email: string) => {
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return emailPattern.test(email);
};

const validateUsername = (username: string) => {
  return username.length > 2 && username.length < 13;
};

export const validateGroupName = (name: string) => {
  return name.length > 2 && name.length < 13;
};
