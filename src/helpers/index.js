import jwt, { sign, verify } from "jsonwebtoken";

export const createTokens = (user) => {
  const accessToken = sign(
    {
      username: user.username,
      id: user.id,
    },
    process.env.JWT_SECRET
  );

  return accessToken;
};

export const authorization = (req, res, next) => {
  const accessToken = req.cookies["access-token"];
  if (!accessToken)
    return res
      .status(403)
      .json({ error: true, message: "User not Authenticated" });

  try {
    const validToken = verify(accessToken, process.env.JWT_SECRET);
    if (validToken) {
      req.userId = validToken.id;
      req.username = validToken.username;
      req.authenticated = true;
    }
    return next();
  } catch (error) {
    return res.status(403).json({ error: true, message: error.message });
  }
};

export const checkSuperAdminAuthorization = (req, res, next) => {
  const accessToken = req.cookies["access-token"];
  if (!accessToken)
    return res
      .status(403)
      .json({ error: true, message: "User not Authenticated" });

  try {
    const validToken = verify(accessToken, process.env.JWT_SECRET);
    if (validToken) {
      req.userId = validToken.id;
      req.username = validToken.username;
      req.userType = validToken.userType
      req.authenticated = true;
    }

    if (validToken.userType !== 'super-admin') {
      return res
      .status(403)
      .json({ error: true, message: "User not Authorized" });
    }

    return next();
  } catch (error) {
    return res.status(403).json({ error: true, message: error.message });
  }
};

export const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

