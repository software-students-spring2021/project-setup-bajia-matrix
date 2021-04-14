import React from 'react';
import { Route, Switch, withRouter, Redirect} from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

import Layout from './hoc/Layout/Layout';
import Landing from './components/Landing/Landing';
import SignIn from '../src/containers/Auth/SignIn/SignIn';
import SignUp from '../src/containers/Auth/SignUp/SignUp';

import Home from './containers/Home/Home';
import Profile from './containers/Profile/Profile';
import EditAvatar from './containers/Profile/EditAvatar/EditAvatar';
import EditProfile from './containers/Profile/EditProfile/EditProfile';
import AddFriends from './containers/Profile/AddFriends/AddFriends';
import NewEvent from './containers/NewEvent/NewEvent';
import AcceptInvite from './containers/AcceptInvite/AcceptInvite';
import EditSupplies from './containers/EventPage/EventSupplies/EditSupplies/EditSupplies';
import EventPage from './containers/EventPage/EventPage';

/*
    This is the main component of our app, which is rendered
    by index.js. It sets up the layout of our app, with a navbar
    fixed to the top and a specific page below it. All routes are
    declared here as well.

    Props:
        This component does not accept any custom props
*/

const App = (props) => {
    let isAuthenticated = localStorage.getItem("isAuthenticated");
    if (isAuthenticated !== null && isAuthenticated === "true") {
        isAuthenticated = true;
    }
    else {
        isAuthenticated = false;
    }

    let routes = (
        <Switch>
            <Route path="/signin" component={SignIn} />]
            <Route path="/signup" component={SignUp} />]
            <Route path="/" exact component={Landing} />
            <Route path="/newevent" component={NewEvent}/>
            <Route path="/event/:id" exact component={() => <EventPage isAuthenticated={isAuthenticated} history={props.history} />} />
        </Switch>
    );

    if (isAuthenticated === true) {
        routes = (
            <Switch>
                <Route path="/profile" exact component={Profile}/>
                <Route path="/event/:id" exact component={() => <EventPage isAuthenticated={isAuthenticated} />} />
                <Route path="/editsupplies" exact component={EditSupplies} />
                <Route path="/user/newevent" exact component={() => <NewEvent isAuthenticated={isAuthenticated} />} />
                <Route path="/editfriends" exact component={AddFriends} />
                <Route path="/user/acceptinvite" exact component={AcceptInvite}/>
                <Route path="/editavatar" exact component={EditAvatar} />
                <Route path="/editprofile" exact component={EditProfile} />
                <Route path="/" exact component={Home} />
                <Redirect to="/" />
            </Switch>
        );
    }
    
    return (
        <div className="App">
            <Layout isAuthenticated={isAuthenticated}>
                {routes}
            </Layout>
        </div>
    );
}

export default withRouter(App);
