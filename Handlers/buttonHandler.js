async function loadbButtons(client) {
  const { loadFiles } = require("../Functions/fileLoader");

  await client.buttons.clear();

  const Files = await loadFiles("Buttons");

  Files.forEach((file) => {
    const button = require(file);
    client.buttons.set(button.data.name, button);
  });

  return console.log("\nButtons Loaded.");
}

module.exports = { loadbButtons };
