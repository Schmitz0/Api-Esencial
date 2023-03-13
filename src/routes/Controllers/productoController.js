const { Router } = require("express");
const { Producto } = require("../../db.js");

const router = Router();

router.get("/", async (req, res) => {

    try {
        const productos = await Producto.findAll();
        res.json(productos);
      } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener los productos');
      }
  }
)

router.post("/", async (req, res) => {
    const { nombre, precio, stock , descripcion, proveedor, imgUrl, unidad, categoria} = req.body;
    try {
      const producto = await Producto.create({ nombre, precio, stock,descripcion, proveedor, imgUrl, unidad, categoria });
      res.json(producto);
    } catch (error) {
      console.error(error);
      res.status(500).send('Error al crear el producto');
    }
  }
)

router.put('/:id', async (req, res) => {
  const { id } = req.params 
  const changes = {}

  for (const property in req.body) {
      if(property !== "id" && property !== "userRole" && property !== "userName") changes[property] = req.body[property]
    }

  try {
      const producto = await Producto.findByPk(id)

      await producto.update(changes)

      return res.status(200).json(producto)

  } catch (error) {
      res.status(400).send(error.message)
  }
})


module.exports = router;