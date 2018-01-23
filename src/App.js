import React from 'react';
import List from "./List";
import Add from "./Add";
import './App.css';

class AppHeader extends React.Component {
    render() {
        return (
            <header className="ui fixed menu">
                <nav className="ui container">
                    <a href="localhost:3000" className="header item">Menedżer kontaktów</a>
                </nav>
            </header>
        );
    }
}

class ContactsList extends React.Component {
    constructor(props, login) {
        super(props, login);
        this.state = {
            items: [],
            edits: [],
            value: ''
        };
        this.deleteItem = this.deleteItem.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.editContact = this.editContact.bind(this);
        this.editFinish = this.editFinish.bind(this);

    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    handleSubmit(event, items) {
        this.setState(prevState => ({
            items: [
                {
                    login: "q2",
                    name: this.state.value,
                    department: "Komórka",
                    key: Date.now()
                },
                ...prevState.items
            ],
            value: ''
        }));
        event.preventDefault();
    }

    deleteItem(key, items) {
        let filteredItems = this.state.items.filter(function (items) {
            return (items.key !== key);
        });

        this.setState({
            items: filteredItems
        });
    }

    editContact(key) {
        this.setState(prevState => ({
            edits: [...prevState.edits, key],
        }));
    }

    editFinish(key, newName, event) {

        this.setState(prevState => ({
            items: prevState.items.map(item => {
                if (item.key === key) {
                    return {
                        ...item,
                        name: newName
                    };
                }
                return item;
            })
        }));

        this.setState(prevState => ({
            edits: prevState.edits.filter(editKey => editKey !== key)
        }));
    }

    render() {
        return (
            <div className="header item">
                <form onSubmit={this.handleSubmit}>
                    <span>
                        <div className="ui action input">
                            <input type="text" placeholder="Podaj imię..." value={this.state.value} onChange={this.handleChange} />
                            <button type="submit" className="ui button">Dodaj</button>
                        </div>
                    </span>
                </form>

                <List entries={this.state.items} edits={this.state.edits} delete={this.deleteItem} entriesEdit={this.editContact} editFinish={this.editFinish} />
            </div>
        );

    }
}

class ContactItem extends React.Component {

    componentDidMount() {
        console.log("Dodanie usera")
    }

    render() {
        const { entry } = this.props
        return (
            <li className="item">
                <img src='q1.png' className="ui mini rounded image" alt="brak" />
                <div className="content">
                    <h4 className="header" onDoubleClick={() => this.props.enableEdit(entry.key)}>{entry.name}</h4>
                    <div className="description">{entry.department}</div>
                </div>
                <img src="del.png" className="ui mini rounded image  del" alt="brak"
                    onClick={() => this.props.deleteEntry(entry.key)} key={entry.key} />
            </li>
        );
    }
}


class ContactEdit extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            value: this.props.entry.name,
        }

        this.editChange = this.editChange.bind(this);
    }

    editChange(event) {
        this.setState({ value: event.target.value });
    }

    render() {
        const { entry } = this.props

        return (
            <li className="item">
                <form onSubmit={() => this.props.editFinish(entry.key, this.state.value)}>
                    <div className="content">
                        <h4 className="header">
                        <div className="ui action input">
                            <input type="text" placeholder="Edytuj imię..." value={this.state.value} onChange={this.editChange} />
                            <button type="submit" className="ui button">Edytuj</button>
                        </div>
                        </h4>
                    </div>
                </form>
            </li>
        );
    }
}


class App extends React.Component {
    render() {
        return (
            <React.Fragment>
                <AppHeader />
                <main className="ui main text container">
                    <ContactsList />
                </main>
            </React.Fragment>
        );
    }
}

export default App;
export { ContactItem, ContactEdit };

