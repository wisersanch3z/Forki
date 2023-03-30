module.exports = async (client) => {
  console.log(`${client.user.username} online!`);


  client.user.setStatus("online");
  client.user.setActivity({	
		name: `descontinued`,
		type: 'PLAYING'

})
};

