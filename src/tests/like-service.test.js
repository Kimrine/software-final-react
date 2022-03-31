/**
 * @jest-environment node
 */

import{
    userTogglesTuitLikes,
    userTogglesTuitDislikes,findAllTuitsLikedByUser,
    findAllTuitsDislikedByUser
} from "../services/like-service"
import {createUser, deleteUsersByUsername} from "../services/users-service";
import {createTuit, deleteTuit, findTuitById} from "../services/tuits-service";

/**
 * Test user can dislike a tuit with REST API
 */
describe('user can dislike a tuit with REST API',()=>{

    const ripley = {
        username: 'ellenripley',
        password: 'lv426',
        email: 'ellenripley@aliens.com'
    };

    const sowell = {
        username: 'thommas_sowell',
        password: 'compromise',
        email: 'compromise@solutions.com'
    };

    const testDisLikeTuit = {
        _id: '6213c0b08a4248e9e09e1faa',
        tuit: 'test dislike a tuit',
    };

    let ripleyId = null;
    let sowellId = null;
    let newTuit = null;

    beforeAll(async () => {
        await deleteUsersByUsername(ripley.username);
        await deleteUsersByUsername(sowell.username);
        await deleteTuit(testDisLikeTuit._id);


        const newRipley = await createUser(ripley);
        const newSowell = await createUser(sowell);
        ripleyId = newRipley._id;
        sowellId = newSowell._id;

        newTuit = await createTuit(newRipley._id,testDisLikeTuit);

    });

    afterAll(async () => {
        const newTuit = await findTuitById(testDisLikeTuit._id);
        if (newTuit.stats.dislikes > 0) {
            await userTogglesTuitDislikes(sowellId, testDisLikeTuit._id);
        }
        await deleteUsersByUsername(ripley.username)
        await deleteUsersByUsername(sowell.username)
        return deleteTuit(testDisLikeTuit._id);
    });

    test('user can dislike a tuit with REST API', async () => {
        expect(newTuit.stats.dislikes).toEqual(0);

        const dislike = await userTogglesTuitDislikes(sowellId,testDisLikeTuit._id);
        const dislikeTuit = await findTuitById(newTuit._id);
        expect(dislikeTuit.stats.dislikes).toEqual(1);
    })
});

/**
 * Test user can un-dislike a tuit with REST API
 */
describe('user can un-dislike a tuit with REST API',()=>{

    const ripley = {
        username: 'ellenripley',
        password: 'lv426',
        email: 'ellenripley@aliens.com'
    };

    const sowell = {
        username: 'thommas_sowell',
        password: 'compromise',
        email: 'compromise@solutions.com'
    };

    const testDisLikeTuit = {
        _id: '6213c0b08a4248e9e09e1faa',
        tuit: 'test dislike a tuit',
    };

    let ripleyId = null;
    let sowellId = null;
    let newTuit = null;

    beforeAll(async () => {
        await deleteUsersByUsername(ripley.username);
        await deleteUsersByUsername(sowell.username);
        await deleteTuit(testDisLikeTuit._id);


        const newRipley = await createUser(ripley);
        const newSowell = await createUser(sowell);
        ripleyId = newRipley._id;
        sowellId = newSowell._id;

        newTuit = await createTuit(newRipley._id,testDisLikeTuit);

    });

    afterAll(async () => {

        await deleteUsersByUsername(ripley.username)
        await deleteUsersByUsername(sowell.username)
        return deleteTuit(testDisLikeTuit._id);
    });

    test('user can un-dislike a tuit with REST API', async () => {
        expect(newTuit.stats.dislikes).toEqual(0);

        const dislike = await userTogglesTuitDislikes(sowellId,testDisLikeTuit._id);
        const dislikeTuit = await findTuitById(newTuit._id);
        expect(dislikeTuit.stats.dislikes).toEqual(1);

        const undislike = await userTogglesTuitDislikes(sowellId,testDisLikeTuit._id);
        const undislikeTuit = await findTuitById(newTuit._id);
        expect(undislikeTuit.stats.dislikes).toEqual(0);
    })
});