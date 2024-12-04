import React from "react";
import {Route, Switch} from "react-router-dom";
import loadable from "@loadable/component";

const WelcomePage = loadable(() => import("./src/pages/login"));

const Routes = () => {
    return <Switch>
        <Route path="/main" exact><WelcomePage/></Route>
        <Route path="/main/*"><h2>Page Not Found</h2></Route>
    </Switch>
};

export default Routes;