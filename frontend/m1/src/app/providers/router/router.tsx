import { App } from "app/App";
import { createBrowserRouter, RouteObject } from "react-router-dom";

export const routerPaths = {
	root: "g/:game_id/",
	// main: "main",
};

const routerConfig: RouteObject[] = [
	{
		path: '/',
		children: [
		{
			path: ':user_id',
			element: <App />,
			errorElement: <div> Not Found Page </div>,
		}
	]
		// 	{
		// 		path: routerPaths.about,
		// 		element: <div> About Page </div>,
		// 	},
		// ],
	},
];

export const router = createBrowserRouter(routerConfig);
