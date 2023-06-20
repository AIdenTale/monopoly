import { createBrowserRouter } from "react-router-dom";
import React from "react";
import { Suspense, lazy } from "react";

import IndexPage from "../pages/IndexPage";
import SearchPage from "../pages/search/SearchPage";
import { Profile } from "../pages/profile/Profile";

const AsyncPage = ({children}) => {
    return <Suspense>{children}</Suspense>
}

const LoginPage = lazy(() => 
    import("../pages/auth/login/LoginPage")
);

const RegisterPage = lazy(() => 
    import("../pages/auth/register/RegisterPage")
);

const GamePage = lazy(() => 
    import("../pages/game/GamePage")
)


const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <AsyncPage>
                <IndexPage/>
            </AsyncPage>
        )
    },
    {
        path : "login",
        element: (
            <AsyncPage>
                <LoginPage/>
            </AsyncPage>
        )
    },
    {
        path: "register",
        element : (
            <AsyncPage>
                <RegisterPage/>
            </AsyncPage>
        )
    },
    {
        path: "game/:game_id",
        element: (
            <AsyncPage>
                <GamePage/>
            </AsyncPage>
        )
    },
    {
        path: "search",
        element: (
            <AsyncPage>
                <SearchPage/>
            </AsyncPage>
        )
    },
    {
        path:"profile",
        element: (
            <AsyncPage>
                <Profile/>
            </AsyncPage>
        )
    }
])

export default router;