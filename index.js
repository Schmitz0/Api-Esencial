require('dotenv').config();
const bcrypt = require('bcrypt');
const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const { Receta } = require('./src/db.js');
const { Insumo } = require('./src/db.js');
const { Proveedor } = require('./src/db.js');
const { Usuario } = require("./src/db.js")
const { crearReceta, json } = require("./src/routes/Controllers/utils.js")
const { PORT } = process.env;

conn.sync({ force: false }).then(() => {
  server.listen(PORT, () => {
    console.log(`Server running...`);

    const insumos = [
      {categoria:"Alimentos", nombre:"ACIDO ASCORBICO", precio:0, stock: 0, proveedor:"LG", unidad:"", descripcion:"-", imgUrl:"-"},
      {categoria:"Alimentos", nombre:"ACIDO CITRICO ANHIDRO", precio:0, stock: 0, proveedor:"LG", unidad:"-", descripcion:"-", imgUrl:"-"},
      {categoria:"Alimentos", nombre:"Acido Fosfórico", precio:0, stock: 0, proveedor:"LG", unidad:"-", descripcion:"-", imgUrl:"-"},
      {categoria:"Alimentos", nombre:"AN CARAMELO 822227", precio:0, stock: 0, proveedor:"LG", unidad:"-", descripcion:"-", imgUrl:"-"},
      {categoria:"Alimentos", nombre:"AZUCAR INVERTIDO", precio:0, stock: 0, proveedor:"", unidad:"-", descripcion:"-", imgUrl:"-"},
      {categoria:"Alimentos", nombre:"BENZOATO DE SODIO", precio:0, stock: 0, proveedor:"LG", unidad:"-", descripcion:"-", imgUrl:"-"},
      {categoria:"Alimentos", nombre:"CITRATO DE SODIO", precio:0, stock: 0, proveedor:"", unidad:"-", descripcion:"-", imgUrl:"-"},
      {categoria:"Alimentos", nombre:"GAS CARBONICO", precio:0, stock: 0, proveedor:"Linde", unidad:"-", descripcion:"-", imgUrl:"-"},
      {categoria:"Alimentos", nombre:"SORBATO DE POTASIO", precio:0, stock: 0, proveedor:"", unidad:"-", descripcion:"-", imgUrl:"-"},
      {categoria:"Alimentos", nombre:"JUGO DE NARANJA CLARA", precio:0, stock: 0, proveedor:"", unidad:"", descripcion:"-", imgUrl:"-"},
      {categoria:"Alimentos", nombre:"Sabor Cola Givaudan", precio:0, stock: 0, proveedor:"Givaudan", unidad:"-", descripcion:"-", imgUrl:"-"},
      {categoria:"Alimentos", nombre:"EDTA", precio:0, stock: 0, proveedor:"", unidad:"-", descripcion:"-", imgUrl:"-"},
      {categoria:"Alimentos", nombre:"Sabor Naranja Givaudan", precio:0, stock: 0, proveedor:"Givaudan", unidad:"-", descripcion:"-", imgUrl:"-"},
      {categoria:"Alimentos", nombre:"Colorante Caramelo (INS 150d)", precio:0, stock: 0, proveedor:"", unidad:"-", descripcion:"-", imgUrl:"-"},
      {categoria:"Alimentos", nombre:"Colorante Tartrazina (Sol.al 1 % en agua)", precio:0, stock: 0, proveedor:"", unidad:"-", descripcion:"-", imgUrl:"-"},
      {categoria:"Alimentos", nombre:"Colorante Caramelo F 75", precio:0, stock: 0, proveedor:"", unidad:"-", descripcion:"-", imgUrl:"-"},
      {categoria:"Alimentos", nombre:"Sabor Pomelo Givaudan", precio:0, stock: 0, proveedor:"Givaudan", unidad:"-", descripcion:"-", imgUrl:"-"},
      {categoria:"Alimentos", nombre:"Bitter Givaudan", precio:0, stock: 0, proveedor:"Givaudan", unidad:"-", descripcion:"-", imgUrl:"-"},
      {categoria:"Alimentos", nombre:"Sabor Lima Limón", precio:0, stock: 0, proveedor:"", unidad:"-", descripcion:"-", imgUrl:"-"},
      {categoria:"Alimentos", nombre:"Sabor Limón", precio:0, stock: 0, proveedor:"", unidad:"-", descripcion:"-", imgUrl:"-"},
      {categoria:"Empaque", nombre:"ADHESIVO", precio:0, stock: 0, proveedor:"Percat", unidad:"-", descripcion:"-", imgUrl:"-"},
      {categoria:"Empaque", nombre:"CARTÓN FINO", precio:0, stock: 0, proveedor:"Pamer", unidad:"-", descripcion:"-", imgUrl:"-"},
      {categoria:"Empaque", nombre:"CARTÓN GRUESO", precio:0, stock: 0, proveedor:"Pamer", unidad:"-", descripcion:"-", imgUrl:"-"},
      {categoria:"Empaque", nombre:"ETIQUETA BIDÓN 6000", precio:0, stock: 0, proveedor:"RBS", unidad:"-", descripcion:"-", imgUrl:"-"},
      {categoria:"Empaque", nombre:"ETIQUETA SIFÓN 2000", precio:0, stock: 0, proveedor:"Strong", unidad:"-", descripcion:"-", imgUrl:"-"},
      {categoria:"Empaque", nombre:"ETIQUETA AGUA 2000", precio:0, stock: 0, proveedor:"Strong", unidad:"-", descripcion:"-", imgUrl:"-"},
      {categoria:"Empaque", nombre:"ETIQUETA AGUA 600", precio:0, stock: 0, proveedor:"Ecoflex", unidad:"-", descripcion:"-", imgUrl:"-"},
      {categoria:"Empaque", nombre:"Etiqueta Net 2250", precio:0, stock: 0, proveedor:"strong", unidad:"Unidades", descripcion:"-", imgUrl:"-"},
      {categoria:"Empaque", nombre:"STRECH TRANSPARENTE", precio:0, stock: 0, proveedor:"Dematte", unidad:"-", descripcion:"-", imgUrl:"-"},
      {categoria:"Empaque", nombre:"TERMO TRANSPARENTE", precio:0, stock: 0, proveedor:"Conopac", unidad:"-", descripcion:"-", imgUrl:"-"},
      {categoria:"Empaque", nombre:"TERMO IMPRESO", precio:0, stock: 0, proveedor:"Conopac", unidad:"-", descripcion:"-", imgUrl:"-"},
      {categoria:"Empaque", nombre:"STRECH BLANCO", precio:0, stock: 0, proveedor:"Dematte", unidad:"-", descripcion:"-", imgUrl:"-"},
      {categoria:"Envases", nombre:"ENVASE AGUA 2000", precio:0, stock: 0, proveedor:"Multiflex", unidad:"-", descripcion:"-", imgUrl:"-"},
      {categoria:"Envases", nombre:"ENVASE AGUA 600", precio:0, stock: 0, proveedor:"Multiflex", unidad:"-", descripcion:"-", imgUrl:"-"},
      {categoria:"Envases", nombre:"ENVASE BIDÓN SOPLADO", precio:0, stock: 0, proveedor:"Multiflex", unidad:"-", descripcion:"-", imgUrl:"-"},
      {categoria:"Envases", nombre:"ENVASE SIFÓN", precio:0, stock: 0, proveedor:"Multiflex", unidad:"-", descripcion:"-", imgUrl:"-"},
      {categoria:"Envases", nombre:"PREFORMA 41 GR", precio:0, stock: 0, proveedor:"Cristalpet", unidad:"-", descripcion:"-", imgUrl:"-"},
      {categoria:"Envases", nombre:"PREFORMA 19,5 GR", precio:0, stock: 0, proveedor:"Cristalpet", unidad:"-", descripcion:"-", imgUrl:"-"},
      {categoria:"Envases", nombre:"PREFORMA 28 GR", precio:0, stock: 0, proveedor:"Cristalpet", unidad:"-", descripcion:"-", imgUrl:"-"},
      {categoria:"Envases", nombre:"PREFORMA 36 GR", precio:0, stock: 0, proveedor:"Cristalpet", unidad:"-", descripcion:"-", imgUrl:"-"},
      {categoria:"Envases", nombre:"PREFORMA 42,7 GR", precio:0, stock: 0, proveedor:"Cristalpet", unidad:"-", descripcion:"-", imgUrl:"-"},
      {categoria:"Envases", nombre:"PREFORMA 47 GR", precio:0, stock: 0, proveedor:"Cristalpet", unidad:"-", descripcion:"-", imgUrl:"-"},
      {categoria:"Envases", nombre:"PREFORMA 52,7 GR", precio:0, stock: 0, proveedor:"Cristalpet", unidad:"-", descripcion:"-", imgUrl:"-"},
      {categoria:"Envases", nombre:"PREFORMA 56 GR", precio:0, stock: 0, proveedor:"Cristalpet", unidad:"-", descripcion:"-", imgUrl:"-"},
      {categoria:"Envases", nombre:"PREFORMA 94GR", precio:0, stock: 0, proveedor:"Cristalpet", unidad:"-", descripcion:"-", imgUrl:"-"},
      {categoria:"Tapa", nombre:"ASA BIDÓN", precio:0, stock: 0, proveedor:"Multiflex", unidad:"-", descripcion:"-", imgUrl:"-"},
      {categoria:"Tapa", nombre:"CABEZAL SIFON", precio:0, stock: 0, proveedor:"Sides", unidad:"-", descripcion:"-", imgUrl:"-"},
      {categoria:"Tapa", nombre:"TAPA AMARILLA", precio:0, stock: 0, proveedor:"Cristalpet", unidad:"-", descripcion:"-", imgUrl:"-"},
      {categoria:"Tapa", nombre:"TAPA AZUL", precio:0, stock: 0, proveedor:"Cristalpet", unidad:"-", descripcion:"-", imgUrl:"-"},
      {categoria:"Tapa", nombre:"TAPA BIDÓN", precio:0, stock: 0, proveedor:"Multiflex", unidad:"-", descripcion:"-", imgUrl:"-"},
      {categoria:"Tapa", nombre:"TAPA NARANJA", precio:0, stock: 0, proveedor:"Cristalpet", unidad:"-", descripcion:"-", imgUrl:"-"},
      {categoria:"Tapa", nombre:"TAPA ROJA", precio:0, stock: 0, proveedor:"Cristalpet", unidad:"-", descripcion:"-", imgUrl:"-"},
      {categoria:"Tapa", nombre:"TAPA VERDE", precio:0, stock: 0, proveedor:"Cristalpet", unidad:"-", descripcion:"-", imgUrl:"-"}
    ]

    const proveedores = [
      { nombre: "Cristalpet", nombreContacto: "Jorge Luis Borges", descripcion: "Este es un proveedor excelente", email: "abc@gmail.com", telefono: "1234567890", direccion:"Av. Siempreviva 777", codigoPostal:"ABC123" },
      { nombre: "Hilosplásticos", nombreContacto: "Jorge Luis Borges", descripcion: "Este es un proveedor excelente", email: "abc@gmail.com", telefono: "1234567890", direccion:"Av. Siempreviva 777", codigoPostal:"ABC123" },
      { nombre: "Linde", nombreContacto: "Jorge Luis Borges", descripcion: "Este es un proveedor excelente", email: "abc@gmail.com", telefono: "1234567890", direccion:"Av. Siempreviva 777", codigoPostal:"ABC123" },
      { nombre: "Multiflex", nombreContacto: "Jorge Luis Borges", descripcion: "Este es un proveedor excelente", email: "abc@gmail.com", telefono: "1234567890", direccion:"Av. Siempreviva 777", codigoPostal:"ABC123" },
      { nombre: "Nortesur", nombreContacto: "Jorge Luis Borges", descripcion: "Este es un proveedor excelente", email: "abc@gmail.com", telefono: "1234567890", direccion:"Av. Siempreviva 777", codigoPostal:"ABC123" },
      { nombre: "Pamer", nombreContacto: "Jorge Luis Borges", descripcion: "Este es un proveedor excelente", email: "abc@gmail.com", telefono: "1234567890", direccion:"Av. Siempreviva 777", codigoPostal:"ABC123" },
      { nombre: "Pandoplast", nombreContacto: "Jorge Luis Borges", descripcion: "Este es un proveedor excelente", email: "abc@gmail.com", telefono: "1234567890", direccion:"Av. Siempreviva 777", codigoPostal:"ABC123" },
      { nombre: "RBS", nombreContacto: "Jorge Luis Borges", descripcion: "Este es un proveedor excelente", email: "abc@gmail.com", telefono: "1234567890", direccion:"Av. Siempreviva 777", codigoPostal:"ABC123" },
      { nombre: "IMESI", nombreContacto: "Jorge Luis Borges", descripcion: "Este es un proveedor excelente", email: "abc@gmail.com", telefono: "1234567890", direccion:"Av. Siempreviva 777", codigoPostal:"ABC123" },
      { nombre: "Ecoflex", nombreContacto: "Jorge Luis Borges", descripcion: "Este es un proveedor excelente", email: "abc@gmail.com", telefono: "1234567890", direccion:"Av. Siempreviva 777", codigoPostal:"ABC123" },
      { nombre: "Percat", nombreContacto: "Jorge Luis Borges", descripcion: "Este es un proveedor excelente", email: "abc@gmail.com", telefono: "1234567890", direccion:"Av. Siempreviva 777", codigoPostal:"ABC123" },
    ]

    const usuario = [
      { name: "Fernando Bilotta", email: "fertest@gmail.com", hashPassword: "$2b$08$TX0LoufcQvdwVdjQw5n5V.S9Ghq8uVl4xdGMgmGxyZROl4pu8comS", role: "Admin", imgUrl: "https://www.aulafacil.com/uploads/perfiles/28/foto.2bd2e06d14be0fa01700d60c68fe646c.jpg" },
      { name: "Gaston Schmitz", email: "gastonschmitz0@gmail.com", hashPassword: "$2b$08$qLE41lkl/biCr/6o5caAMuLG0vtMyoaT.4TstpSeXOmJN8ZbZVus6", role: "Admin", imgUrl: "https://media.licdn.com/dms/image/D4D03AQGs2jvdMZQtEw/profile-displayphoto-shrink_800_800/0/1671992572055?e=2147483647&v=beta&t=B_jU0l_k-vUWW-zMM5a2YavUy9LmYk3WFkWSRH2TbzE" },      //123
      { name: "Pablo Lospennato", email: "yosoypxl@gmail.com", hashPassword: "$2b$08$VPQsvuTqfWv/MUBQZOy6n./d16Yucoxi53FkmI09qRRXZXKr7jJEa", role: "Admin", imgUrl: "data:image/jpeg;base64,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" },           //asd123
      { name: "Manu Casanueva", email: "manito@gmail.com", hashPassword: "$2b$08$BM/.aXiwkwDDBwm4GX8GoeZJZufFuFafqXOJs0WClpVleAJWpDqYG", role: "Admin", imgUrl: "data:image/jpeg;base64,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" },       //hola
      { name: "Cosme Fulanito", email: "cosme_fulanito@gmail.com", hashPassword: "$2b$08$EtUeekkUa6bOQKP904gCKeWYyuJH7ssTdcfPoJdrjJR2pIupPm01G", role: "User", imgUrl: "https://www.aulafacil.com/uploads/perfiles/28/foto.2bd2e06d14be0fa01700d60c68fe646c.jpg" },       //hola
    ]

    json.map(e=>crearReceta(e.name, e.insumos))
 
    Insumo.bulkCreate(insumos).then(() => console.log("Insumos cargados"));
    Proveedor.bulkCreate(proveedores).then(() => console.log("Proveedores cargados"));
    Usuario.bulkCreate(usuario).then(() => console.log("Usuarios cargados"));
  });
});