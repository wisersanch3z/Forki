async function loadModals(client) {
  const { loadFiles } = require("../Functions/fileLoader");

  await client.modals.clear();

  const Files = await loadFiles("Modals");

  Files.forEach((file) => {
    const modal = require(file);
    client.modals.set(modal.data.name, modal);
  });

  return console.log("\n---Modals Cargados---");
}

module.exports = { loadModals };
