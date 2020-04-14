const { prisma } = require('./generated/prisma-client')
const { GraphQLServer } = require('graphql-yoga')

const resolvers = {
  Query: {
    book(root, args, context){
      return context.prisma.book({id: args.id})
    },
    books(root, args, context){
      return context.prisma.books({});
    },
    author(root, args, context){
      return context.prisma.author({id: args.id})
    },
    authors(root, args, context){
      return context.prisma.authors({});
    }
  },
  Mutation: {
    addBook(root, args, context) {
      return context.prisma.createBook({ 
        name: args.name,
        genre: args.genre,
        author:{
          connect: {id: args.authorId} 
        }
      })
    },
    addAuthor(root, args, context){
      return context.prisma.createAuthor({
        name: args.name,
        age: args.age
      })
    }
  },
  Author: {
    books(root, args, context) {
      return context.prisma
        .author({
          id: root.id,
        })
        .books()
    },
  },
  Book: {
    author(root, args, context) {
      return context.prisma
        .book({
          id: root.id,
        })
        .author()
    },
  },
}

const server = new GraphQLServer({
    typeDefs: './schema.graphql',
    resolvers,
    context: {
      prisma,
    },
  })
  server.start(() => console.log('Server is running on http://localhost:4000'))