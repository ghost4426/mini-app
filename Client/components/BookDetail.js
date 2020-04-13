import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getBookQuery, removeBook } from '../queries/queries';
import { flowRight as compose } from 'lodash'

class BookDetail extends Component {
    displayBookDetail() {
        const { book } = this.props.getBookQuery;
        if (book) {
            console.log(book);
            return (
                <div>
                    <h2>{book.name}</h2>
                    <p>{book.genre}</p>
                    <p>{book.author.name}</p>
                    <p>All books by this authors</p>
                    <ul className="other-books">
                        {book.author.books.map(item => {
                            return <li key={item.id}>{item.name}</li>
                        })
                        }
                    </ul>
                </div>
            )
        } else {
            return (
                <div>No book selected</div>
            )
        }
    };


    render() {

        return (
            <div id="book-details">
                {this.displayBookDetail()}
            </div>
        );
    }
}


export default compose(
    graphql(getBookQuery, {
        name: "getBookQuery",
        options: (props) => {
            return {
                variables: {
                    id: props.bookId
                }
            }
        }
    },

    ),
    graphql(removeBook, {
        name: "removeBook",
        options: (props) => {
            return {
                variables: {
                    bookId: props.bookId
                }
            }
        }
    }
    )
)(BookDetail);