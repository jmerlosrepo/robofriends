import React, {Component} from 'react';
import CardList from './components/CardList';
import SearhBox from './components/SearchBox';
import Scroll from './components/Scroll';
import ErrorBoudry from './components/ErrorBoundry';
import './App.css';

class App extends Component {
    constructor() {
        super();
        this.state = {
            robots: [],
            searchField: ''
        }
    }

    componentDidMount(){
        fetch('https://jsonplaceholder.typicode.com/users')
        .then(data => data.json())
        .then(data => this.setState({robots: data}));
    }

    onSearchChange = (e) => {
        this.setState({searchField: e.target.value});
    }

    render(){
        const {robots, searchField} = this.state;
        const filteredRobots = robots.filter(robot => robot.name.toLowerCase().includes(searchField.toLowerCase()));
        return !robots.length ? 
        <h1>Loading...</h1> :        
        <div className='tc container'>
            <h1 className="f1">RoboFriends</h1>
            <SearhBox searchChange={this.onSearchChange} />
            <Scroll>
                <ErrorBoudry>
                    <CardList robots={filteredRobots} />
                </ErrorBoudry>
            </Scroll>
        </div>
    }
}

export default App;