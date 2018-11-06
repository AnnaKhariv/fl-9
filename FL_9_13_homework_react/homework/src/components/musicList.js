import React from 'react';
import music from './Slack.mp3';

class PlayList extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            active: true,
            records: this.props.records
        };

        this.activeChangeHandler = this.activeChangeHandler.bind(this);
    };

    activeChangeHandler() {
        this.setState({active: !this.state.active});
    }

    render() {
        return (
            <div>
                <div className='playlist'>
                    <button type='button' className='filters' onClick={this.activeChangeHandler}>All</button>
                    <button type='button' className='filters' onClick={this.activeChangeHandler}>Favorite</button>
                </div>
                {this.state.active ? <All records={this.state.records}/> : <Favorite records={this.state.records}/>}
            </div>
        );
    }
}


class All extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            records: this.props.records
        };

        this.likeHandler = this.likeHandler.bind(this);
    };

    likeHandler(i, e) {
        this.state.records[i].liked = !this.state.records[i].liked;

        if (this.state.records[i].liked) {
            e.target.style.color = 'red';
        } else {
            e.target.style.color = 'black';
        }
    }

    render() {
        const recordsList = this.state.records.map((record, i) =>
            <div className='record' key={record.id}>
                <i className="material-icons" onClick={(e) => {
                    this.playHandler(i, e);
                }}>play_arrow</i>
                <span className='details'>
                    <h6>{record.title}</h6>
                    <p>{record.author}</p>
                </span>
                <i className="material-icons"
                   onClick={(e) => {
                       this.likeHandler(i, e);
                   }}
                   style={{color: 'black'}}
                >favorite</i>
            </div>
        );

        return (
            <div>
                {recordsList}
            </div>
        );
    }
}

class Favorite extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            records: this.props.records
        };

        this.likeHandler = this.likeHandler.bind(this);
    };

    likeHandler(i, e) {
        this.state.records[i].liked = !this.state.records[i].liked;

        if (this.state.records[i].liked) {
            e.target.style.color = 'red';
        } else {
            e.target.style.color = 'black';
        }
    }

    render() {
        const recordsListFavorite = this.state.records.filter((record, i) =>
            record.liked
        );

        const recordsList = recordsListFavorite.map((record, i) =>
            <div className='record' key={record.id}>
                <i className="material-icons" onClick={(e) => {
                    this.playHandler(i, e);
                }}>play_arrow</i>
                <span className='details'>
                    <h6>{record.title}</h6>
                    <p>{record.author}</p>
                </span>
                <i className="material-icons"
                   onClick={(e) => {
                       this.likeHandler(i, e);
                   }}
                    style={{color: 'red'}}
                >favorite</i>
            </div>
        );


        return (
            <div>
                {recordsList}
            </div>
        );
    }
}

export default PlayList;