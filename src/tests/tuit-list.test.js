import {Tuits} from "../components/tuits";
import {screen, render} from "@testing-library/react";
import {HashRouter} from "react-router-dom";
import {findAllTuits} from "../services/tuits-services";
import axios from "axios";

jest.mock('axios');

const MOCKED_TUITS = [
  {
    _id: '123', tuit: 'tuit 123',
    postedBy: {
      username: 'alice', email: 'alice@wonderland.com', _id: 111
    },
    stats: {replies: 123, retuits: 234, likes: 345}
  },
]

test('tuit list renders static tuit array', () => {
  // TODO: implement this
});

test('tuit list renders async', async () => {
  // TODO: implement this
})

test('tuit list renders mocked', async () => {
  // TODO: implement this
});
