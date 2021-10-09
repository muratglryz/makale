import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./App.css";
import makalelistesi from "./components/makaleListesi";
import makaleekle from "./components/makaleEkle";
import makaleDetay from "./components/makaleDetay";
import Baslik from "./components/baslik";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";

const client = new ApolloClient({
  uri: "http://localhost:5000/",
});

function App() {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Baslik />
        <Switch>
          <Route exact path="/" component={makalelistesi} />
          <Route path="/ekle" component={makaleekle} />
          <Route path="/makale/:id" component={makaleDetay} />
        </Switch>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
