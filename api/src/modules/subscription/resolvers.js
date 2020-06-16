// App Imports
import models from "../../setup/models";

// Get subscription by ID
export async function get(parentValue, { id }) {
  return await models.Subscription.findOne({
    where: { id },
    include: [
      { model: models.User, as: "usuario" },
      { model: models.Crate, as: "caja" },
    ],
  });
}

// Get subscription by user
export async function getByUser(parentValue, {}, { auth }) {
  if (auth.user && auth.user.id > 0) {
    return await models.Subscription.findAll({
      where: {
        userId: auth.user.id,
      },
      include: [
        { model: models.User, as: "usuario" },
        { model: models.Crate, as: "caja" },
      ],
    });
  } else {
    throw new Error("Inicia sesión para ver tus suscripciones.");
  }
}

// Get all subscriptions
export async function getAll() {
  return await models.Subscription.findAll({
    include: [
      { model: models.User, as: "usuario" },
      { model: models.Crate, as: "caja" },
    ],
  });
}

// Create subscription
export async function create(parentValue, { crateId }, { auth }) {
  if (auth.user && auth.user.id > 0) {
    return await models.Subscription.create({
      crateId,
      userId: auth.user.id,
    });
  } else {
    throw new Error("Inicia sesión para ver tus suscripciones.");
  }
}

// Delete subscription
export async function remove(parentValue, { id }, { auth }) {
  if (auth.user && auth.user.id > 0) {
    return await models.Subscription.destroy({
      where: { id, userId: auth.user.id },
    });
  } else {
    throw new Error("Acceso denegado.");
  }
}
