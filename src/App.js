import React from 'react'
import { BrowserRouter as Router, Route} from 'react-router-dom'
import createHistory from 'history/createBrowserHistory'
import LoginForm from './LoginForm';
import UserPage from './UserPage';

class App extends React.Component {
    render(){
    return(
    <Router history={createHistory()}>
    <div>
            <Route exact path="/" component={LoginForm}/>
            <Route  path="/UserPage" component={UserPage}/>
        </div>
        </Router>
)
};
}
export default App;
