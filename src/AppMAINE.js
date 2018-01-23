import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';

class AppHeader extends React.Component {
  render() {
    return (
      <header className="ui fixed menu">
        <nav className="ui container">
          <a href="localhost:3000" className="header item">Menedżer kontaktów</a>
          <div className="header item">
            <button onClick={this.onClickHandler} className="ui button">Dodaj</button>
          </div>
          <div className="header item">
            <button className="ui button">Edytuj</button>
          </div>
          <div className="header item">
            <button className="ui button">Usuń</button>
          </div>
        </nav>
      </header>
    );
  }

  onClickHandler() {
    console.log("Kliknięto!");
    class AppComponent extends React.Component {
      state = {
        login: ' ',
        name: ' ',
        department: ' ',
        id: 0
      }

      render() {
        console.log("test")
        const items = [];

        for (var i = 0; i < this.state.id; i += 1) {
          items.push(<ContactItem login="q2" name="JAŚ" department="Domowy" id={i} />)
        }

        return (
          <ContactItem addChild={this.addItems}>
            {items}
          </ContactItem>
        );

      }
      addItems = () => {
        this.setState({
          id: this.state.id + 1
        });
      }
    }
    ReactDOM.render(<AppComponent />, document.getElementById("app2"));
  }
}

class ContactsList extends React.Component {
  render() {
    return (
      <ul className="ui relaxed divided list selection">
        <ContactItem login="q2" name="Marian" department="Domowy" />
        <ContactItem login="q1" name="Tadeusz" department="Komórka" />
        <ContactItem login="q" name="Antoni" department="Firmowy" />
        <ContactItem login="q" name="Paweł" department="Firmowy" />
      </ul>
    );
  }
}

class ContactItem extends React.Component {
  render() {
    const { login, name, department } = this.props
    const imgUrl = `${login}.png`;
    return (
      <li className="item">
        <img src={imgUrl} className="ui mini rounded image" alt="brak" />
        <div className="content">
          <h4 className="header">{name}</h4>
          <div className="description">{department}</div>
        </div>
      </li>
    );
  }
}

class App extends React.Component {
  render() {
    return (
      <div>
        <AppHeader />
        <main className="ui main text container">
          <ContactsList />
        </main>
      </div>
    );
  }
}

export default App;
