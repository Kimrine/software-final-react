import Tuits from "../components/tuits";
import {screen, render} from "@testing-library/react";
import {HashRouter} from "react-router-dom";
import {findAllTuits} from "../services/tuits-service";

test('tuit list renders async', async () => {
  // TODO: implement this
    const tuits = await findAllTuits();

    render(
      <HashRouter>
          <Tuits tuits={tuits}/>
      </HashRouter>
    );

    const linkELement  = screen.getByText(/nasa/i)
});


