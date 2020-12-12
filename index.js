import React from "react";
import ReactDOM from "react-dom";

import { App } from "./App";

// init effector graph. Do not change it manual!!! 
import "./examples/features/feature2/model/init.ts"
// end of effector graph

ReactDOM.render(<App />, document.getElementById("root"));

serviceWorker.unregister();
