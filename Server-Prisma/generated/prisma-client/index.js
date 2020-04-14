"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var prisma_lib_1 = require("prisma-client-lib");
var typeDefs = require("./prisma-schema").typeDefs;

var models = [
  {
    name: "Author",
    embedded: false
  },
  {
    name: "Book",
    embedded: false
  }
];
exports.Prisma = prisma_lib_1.makePrismaClientClass({
  typeDefs,
  models,
  endpoint: `https://new-server-cd57cadb6f.herokuapp.com/prisma-server/dev`
});
exports.prisma = new exports.Prisma();
