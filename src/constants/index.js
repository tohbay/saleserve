export const signupConstraints = {
  username: {
    presence: true,
    length: { minimum: 8, maximum: 20 },
  },
  email: {
    presence: true,
    email: true,
  },
  password: {
    presence: true,
    length: { minimum: 8, maximum: 20 },
  },
};
export const signinConstraints = {
  email: {
    presence: true,
    email: true,
  },
  password: {
    presence: true,
    length: { minimum: 8, maximum: 20 },
  },
};



