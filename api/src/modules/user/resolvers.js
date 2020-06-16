// Imports
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// App Imports
import serverConfig from "../../config/server";
import params from "../../config/params";
import models from "../../setup/models";

// Create
export async function create(parentValue, { name, email, password }) {
  // Users exists with same email check
  const user = await models.User.findOne({ where: { email } });

  if (!user) {
    // User does not exists
    const passwordHashed = await bcrypt.hash(password, serverConfig.saltRounds);

    return await models.User.create({
      name,
      email,
      password: passwordHashed,
    });
  } else {
    // User exists
    throw new Error(
      `el email ${email} ya esta registrado. Por favor intente iniciar sesión.`
    );
  }
}

export async function login(parentValue, { email, password }) {
  const user = await models.User.findOne({ where: { email } });

  if (!user) {
    // User does not exists
    throw new Error(
      `No tenemos ningún usuario registrado con ${email} dirección de correo electrónico. Por favor regístrese.`
    );
  } else {
    const userDetails = user.get();

    // User exists
    const passwordMatch = await bcrypt.compare(password, userDetails.password);

    if (!passwordMatch) {
      // Incorrect password
      throw new Error(
        `Lo sentimos, la contraseña que ingresó es incorrecta. Inténtalo de nuevo.`
      );
    } else {
      const userDetailsToken = {
        id: userDetails.id,
        name: userDetails.name,
        email: userDetails.email,
        role: userDetails.role,
      };

      return {
        user: userDetails,
        token: jwt.sign(userDetailsToken, serverConfig.secret),
      };
    }
  }
}

// Get by ID
export async function getById(parentValue, { id }) {
  return await models.User.findOne({ where: { id } });
}

// Get all
export async function getAll() {
  return await models.User.findAll();
}

// Delete
export async function remove(parentValue, { id }) {
  return await models.User.destroy({ where: { id } });
}

// User genders
export async function getGenders() {
  return Object.values(params.user.gender);
}
