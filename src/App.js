import React from "react";
import { Routes, Route } from "react-router-dom";

import DefaultLayout from "./layouts/DefaultLayouts";
import { publicRouters } from "./routes";

function App() {
  return (
    <div className="App">
      <Routes>
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
