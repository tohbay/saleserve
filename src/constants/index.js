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


export const addProductContraints = {
  title: {
    presence: true,
  },
  description: {
    presence: true,
  },
  price: {
    presence: true,
  },
  quantity: {
    presence: true,
  },
  category: {
    inclusion: {
      within: ["laptop", "phone", "accessories"],
      message: "Product categoery can only be laptop, phone or accessories",
      presence: true,
    },
  },
};
