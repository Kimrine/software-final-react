import Tuits from "../components/tuits";
import {screen, render} from "@testing-library/react";
import {HashRouter} from "react-router-dom";
import {findAllTuits} from "../services/tuits-service";
import axios from "axios";

//jest.mock('axios');

const MOCKED_USERS = [
    {username:'alice',password:'alice123',email: 'alice@wonderland.com', _id: "u123"},
    {username:'bob',password:'bob321',email: 'bob@google.com', _id: "u124"},
    {username:'charlie',password:'charlie456',email: 'bob@twitter.com', _id: "u125"}
];

const MOCKED_TUITS = [
    {   _id: "t123", tuit: "alice's tuit", postedBy: "u123" },
    {   _id: "t124", tuit: "bob's tuit", postedBy: "u124" },
    {   _id: "t125", tuit: "charlie's tuit", postedBy: "u125" }
];


test('tuit list renders static tuit array', () => {

    render(
        <HashRouter>
            <Tuits tuits={MOCKED_TUITS}/>
        </HashRouter>);

    const linkElement1 = screen.getByText(/alice's tuit/i);
    const linkElement2 = screen.getByText(/bob's tuit/i);
    const linkElement3 = screen.getByText(/charlie's tuit/i);

    expect(linkElement1).toBeInTheDocument();
    expect(linkElement2).toBeInTheDocument();
    expect(linkElement3).toBeInTheDocument();

});

test('tuit list renders async', async () => {
    // TODO: implement this
    const tuits = await findAllTuits();

    render(
        <HashRouter>
            <Tuits tuits={tuits}/>
        </HashRouter>
    );

    const linkElement  = screen.getByText(/Mars rover landed and our Ingenuity/i)
    expect(linkElement).toBeInTheDocument();
});


test('tuit list renders mocked', async () => {
    // TODO: implement this
    const mock = jest.spyOn(axios, 'get');
    mock.mockImplementation(() =>
                                Promise.resolve({ data: {tuits: MOCKED_TUITS} }));
    const response = await findAllTuits();
    const tuits = response.tuits;

    render(
        <HashRouter>
            <Tuits tuits={tuits}/>
        </HashRouter>);

    const tuit1 = screen.getByText(/charlie's tuit/i);
    expect(tuit1).toBeInTheDocument();

    const tuit2 = screen.getByText(/bob's tuit/i);
    expect(tuit2).toBeInTheDocument();

    const tuit3 = screen.getByText(/alice's tuit/i);
    expect(tuit3).toBeInTheDocument();
});

