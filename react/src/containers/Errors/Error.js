import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Error_404 from './E404';

const Errors = (props) => {
    const getUrl = () => {
        const inconsistentUrl = props.match.url;
        const lastUrlChar = inconsistentUrl[inconsistentUrl.length - 1];

        const url = ((lastUrlChar === '/') ? inconsistentUrl : (inconsistentUrl + '/'));

        return url;
    }

    return (

        <Switch>
            <Route exact path={`${getUrl()}404/`} component={Error_404} />

        </Switch>

    );
}


export default (Errors);