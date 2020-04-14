import { gql } from 'apollo-boost';

export const getAuthorsQuery = gql`
{
    authors{
        name
        id
    }
}
`;

export const getBooksQuery = gql`
{
    books{
        name
        id
    }
}
`;

export const addBookMutation = gql`
mutation($name: String!, $genre: String!, $authorId: ID!){
    addBook(name: $name, genre: $genre, authorId:$authorId){
      id
    }
  }
`;


export const getBookQuery = gql`
    query($id: ID!){
        book(id: $id){
            id
            name
            genre
            author{
                id
                name
                age
                books{
                    name
                    id
                }
            }
        }
    }
`;


export const removeBook = gql`mutation{
    removeBook(bookId: "5e8ff7678be4cd038c2cb233"){
      id
    }
  }`;
