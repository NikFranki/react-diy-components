import * as React from "react";
// import { Router, Route, Link, Switch } from "react-router-dom";
import { Router, Route, Switch } from "react-router-dom";

// import Index from 'components/page/Index';
// import About from 'components/page/About';
// import Users from 'components/page/Users';
import AppContainer from 'components/app';
import History from 'util/history';

const AppRouter: React.StatelessComponent<{}> = () => (
	<Router history={History}>
		<div>
			{/* <nav>
				<ul>
					<li>
						<Link to="/">Home</Link>
					</li>
					<li>
						<Link to="/index/">Index</Link>
					</li>
					<li>
						<Link to="/about/">About</Link>
					</li>
					<li>
						<Link to="/users/">Users</Link>
					</li>
				</ul>
			</nav> */}
			<Switch>
				<Route path="/" exact component={AppContainer} />
				{/* <Route path="/index" exact component={Index} />
				<Route path="/about/" component={About} />
				<Route path="/users/" component={Users} /> */}
			</Switch>
		</div>
	</Router>
);

export default AppRouter;