import { Route } from "react-router-dom";
import PokemonListPage from "../Components/ListPage";
import OnePokemon from "../Components/OnePokemon";
import './App.css'
function App() {
  return (
    <div>
      <Route path="/" exact component={PokemonListPage} />
      <Route path="/pokemons/:id" exact component={OnePokemon} />
    </div>
  );
}

export default App;
