import React, { Component } from "react";
import { ContactItem, ContactEdit } from './App';

class List extends Component {

    render() {

        let listItems = this.props.entries.map(entry => (
            this.props.edits.indexOf(entry.key) > -1 
            ? <ContactEdit key={entry.key} entry={entry} editFinish={this.props.editFinish} /> 
            : <ContactItem key={entry.key} entry={entry} enableEdit={this.props.entriesEdit} deleteEntry={this.props.delete}  />
        ));


        return (
            <ul className="ui relaxed divided list selection">
                {listItems}
            </ul>
        )
    }
};

export default List;