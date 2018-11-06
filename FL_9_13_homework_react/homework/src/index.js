import React from 'react';
import ReactDOM from 'react-dom';
import './scss/index.scss';
import PlayList from './components/musicList';

class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            status: 'Loading music...',
            showButton: false,
            showList: false,
            records: []
        };

        this.apiHandler = this.apiHandler.bind(this);
    }

    componentDidMount() {
        this.apiHandler();
    }

    apiHandler() {
        this.setState({status: 'Loading music... ', showButton: false});
        fetch('https://fl-homework-api.firebaseio.com/mozart.json')
            .then((res) => res.json())
            .then(data => {
                this.setState({records: data, status: '', showList: true});
            })
            .catch(() => {
                this.setState({status: 'Failed to load music ', showButton: true});
            });
    }

    render() {
        return (
            <div>
                <h1 className='info'>Playlist</h1>
                {this.state.showList && <div><PlayList records={this.state.records}/></div>}
                <span className='info'>{this.state.status}</span>
                {this.state.showButton && <button type="button" onClick={this.apiHandler}>Retry</button>}
            </div>
        );
    }
}


ReactDOM.render(<App/>, document.getElementById('root'));