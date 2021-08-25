import { Switch, Route } from "react-router-dom";

import Home from "./pages/Home";
import Cart from "./pages/Cart";
import { NewProduct } from "./pages/NewProduct/index";

const Routes = (): JSX.Element => {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/cart" component={Cart} />
      <Route path="/newproduct" component={NewProduct} />
    </Switch>
  );
};

export default Routes;
