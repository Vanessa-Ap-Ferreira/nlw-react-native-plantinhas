import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.88.89:3333'
})

export default api;

//TODO fazer import axios
// importante como a API é mokada, não colocar o endereço como localhost, isso pode gerar problemas
// na hora de visualizar aplicação no celular, sempre colocar o endereço IP da máquina
// fazer import (npm install -g json-server) para rodar API mokada
// após import e configurações da endereço rodar o seguinte comando
// json-server (local do arquivo mokado) ./src/services/server.json --host (endereço IP) 192.168.88.89 --port 3333
