const jsonwebtoken = require("jsonwebtoken");
const compose = require("composable-middleware");

async function validateToken(token) {
  try {
    const payload = await jsonwebtoken.verify(token, "secret_token");
    return payload;
  } catch (error) {
    return null;
  }
}

function isAuthenticated(req, res, next) {
  return compose().use(async (req, res, next) => {
    const autHeader = req.headers.authorization;
    if (!autHeader) {
      return res.status(401).end();
    }
    const [, token] = autHeader.split(" ");
    const payload = await validateToken(token);

    if (!payload) {
      return res.status(401).end();
    }
    
    //const player = await getPlayerEmail(payload.email);

    next();
    return null;
  });
}

function signToken(payload) {
  const token = jsonwebtoken.sign(payload, "secret_token", { expiresIn: "8h" });
  return token;
}

function authLogin(req, res, next) {
  const { userEmail, userName } = req.body;
  console.log("Login : ", req.body);
  try {

    if (!userEmail || !userName){
      return res
      .status(401)
      .json({message: "Se requeire un nombre y corrreo de usuario válido." });
    }else{

      // validar si correo cumple sintaxis de correo electrónico
      const token = signToken(req.body);
      return res.status(201).json({token});
    }
  } catch (error) {
    return res.status(400).json(error);
  }
}

module.exports = {
  isAuthenticated,
  signToken,
  authLogin
};
