import React from "react";
import { useDispatch } from "react-redux";
import { Routes, Route } from "react-router-dom";
// import { Routes, Route } from "react-router-loading";

// auth
import { auth } from "./firebase/firebase-config";
import { onAuthStateChanged } from "firebase/auth";

import DefaultLayout from "./layouts/DefaultLayouts";
import { publicRouters } from "./routes";
import { setInfoUser } from "./store/Auth/slice";

function App() {
  const dispatch = useDispatch();

  onAuthStateChanged(auth, (currentUser) => {
    dispatch(setInfoUser(currentUser));
  });

  return (
    <div className="App">
      <Routes maxLoadingTime={900}>
        {publicRouters.map((publicRouter, index) => {
          const Elements = publicRouter.element;
          let Layout = DefaultLayout;
          if (publicRouter.layout) {
            Layout = publicRouter.layout;
          }
          return (
            <Route
              exact
              key={index}
              path={publicRouter.path}
              element={
                <Layout>
                  <Elements />
                </Layout>
              }
            />
          );
        })}
      </Routes>
    </div>
  );
}

export default App;
