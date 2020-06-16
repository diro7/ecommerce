// App Imports
import params from "../../config/params";
import models from "../../setup/models";

// Get all products
export async function getAll() {
  return await models.Product.findAll({ order: [["id", "DESC"]] });
}

// Get product by slug
export async function getBySlug(parentValue, { slug }) {
  const product = await models.Product.findOne({ where: { slug } });

  if (!product) {
    // Product does not exists
    throw new Error("El producto que busca no existe o ha sido descontinuado.");
  } else {
    return product;
  }
}

// Get product by ID
export async function getById(parentValue, { productId }) {
  const product = await models.Product.findOne({ where: { id: productId } });

  if (!product) {
    // Product does not exists
    throw new Error("El producto que busca no existe o ha sido descontinuado.");
  } else {
    return product;
  }
}

// Get related products
export async function getRelated(parentValue, { productId }) {
  return await models.Product.findAll({
    where: {
      id: { [models.Sequelize.Op.not]: productId },
    },
    limit: 3,
    order: [[models.Sequelize.fn("RAND")]], // mock related products by showing random products
  });
}

// Create product
export async function create(
  parentValue,
  { name, slug, description, type, gender, image },
  { auth }
) {
  if (auth.user && auth.user.role === params.user.roles.admin) {
    return await models.Product.create({
      name,
      slug,
      description,
      type,
      gender,
      image,
    });
  } else {
    throw new Error("Operacion denegada.");
  }
}

// Update product
export async function update(
  parentValue,
  { id, name, slug, description, type, gender, image },
  { auth }
) {
  if (auth.user && auth.user.role === params.user.roles.admin) {
    return await models.Product.update(
      {
        name,
        slug,
        description,
        type,
        gender,
        image,
      },
      { where: { id } }
    );
  } else {
    throw new Error("Operacion Denegada.");
  }
}

// Delete product
export async function remove(parentValue, { id }, { auth }) {
  if (auth.user && auth.user.role === params.user.roles.admin) {
    const product = await models.Product.findOne({ where: { id } });

    if (!product) {
      // Product does not exists
      throw new Error("El producto no existe.");
    } else {
      return await models.Product.destroy({ where: { id } });
    }
  } else {
    throw new Error("Operacion Denegada.");
  }
}

// Product types
export async function getTypes() {
  return Object.values(params.product.types);
}
