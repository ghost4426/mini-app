import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import {getBooksQuery} from '../queries/queries'
import BookDetail from './BookDetail';

class BookList extends Component {
    constructor(props){
        super(props);
        this.state = {
            selected: null
        }
    }
    disPlayBooks() {
        var data = this.props.data;
        if (data.loading) {
            return (<div>Loading book...</div>);
        } else {
            return data.books.map(book => {
                return (
                    <li key={book.id} onClick={ (e) => { this.setState({selected: book.id})}}>{book.name}</li>
                );
            })
        }
    }
    render() {
        return (
            <div>
                <ul id="book-list">
                    {this.disPlayBooks()}
                </ul>
                <BookDetail bookId={this.state.selected}/>
            </div>
        );
    }
}


export default graphql(getBooksQuery)(BookList);
