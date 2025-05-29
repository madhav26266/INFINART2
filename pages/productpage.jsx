import Shop from "../src/components/Product/Testing/ShopM/Product/ShopM.jsx";

import { Provider } from "react-redux";
import { store } from "../src/components/Product/Testing/ShopM/Redux/store.js";

function Productpage() {
  return (
    <Provider store={store}>
      <Shop />
    </Provider>
  );
}

export default Productpage;
