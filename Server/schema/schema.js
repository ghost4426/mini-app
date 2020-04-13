const graphql = require('graphql');
const _ = require('lodash');
const models = require('../models')

const{ 
    GraphQLObjectType, 
    GraphQLString, 
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull
} = graphql;

  const BookType = new GraphQLObjectType({
    name: 'Book',
    fields:() => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        genre: {type: GraphQLString},
        author: {
            type: AuthorType,
            resolve(parent, args){
                return models.author.findOne(
                    {where: {id: parent.authorId}});
            }
        }
    })  
});

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields:() => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        age: {type: GraphQLInt},
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args){
                return models.book.findAll({where: 
                    {authorId: parent.id}
                })
            }
        }        
    })  
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args){
                return models.book.findOne({where:  {id: args.id}});
            }
        },
        author: {
            type: AuthorType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args){
                // return _.find(authors, {id: args.id});
                return models.author.findOne({where:  {id: args.id}});;
            }
        },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args){
                return models.book.findAll();
            }
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve(parent, args){
                return  models.author.findAll();
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addAuthor: {
            type: AuthorType,
            args: {
                name: {type: new GraphQLNonNull(GraphQLString)},
                age: {type: new GraphQLNonNull(GraphQLInt)}
            },
            resolve(parent, args){
                return  models.author.create({
                    name: args.name,
                    age: args.age,
                })
            }
        },
        addBook: {
            type: BookType,
            args:{
                name: {type: new GraphQLNonNull(GraphQLString)},
                genre: {type: new GraphQLNonNull(GraphQLString)},
                authorId: {type: new GraphQLNonNull(GraphQLID)}
            },
            resolve(parent, args){
             return  models.book.create({
                    name: args.name,
                    genre: args.genre,
                    authorId: args.authorId
                })
            }
        },
        removeBook: {
            type: BookType,
            args:{
                bookId: {type: new GraphQLNonNull(GraphQLID)}
            },
            resolve(parent, args){
                return models.book.destroy({where: {id: args.bookId}});
            }
        }
    }
})

module.exports = new GraphQLSchema({
   query: RootQuery,
   mutation: Mutation
});