const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'TRACTIAN CRUD API',
    description: 'Uma API baseada nos conceitos CRUD com o objetivo de gerenciar todos os ativos de uma unidade.',
  },
  host: 'localhost:3001',
  schemes: ['http'],
};

const outputFile = './swagger_output.json';
const endpointsFiles = ['./dist/src/routes/aset.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);