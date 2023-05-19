async function loadbMenus(client) {
  const { loadFiles } = require("../Functions/fileLoader");

  await client.menus.clear();

  const Files = await loadFiles("Menus");

  Files.forEach((file) => {
    const menu = require(file);
    client.menus.set(menu.data.name, menu);
  });

  return console.log("\n---Menus Cargados---");
}

module.exports = { loadbMenus };
