/**
 * @jest-environment node
 */

import{
    userTogglesTuitLikes,
    userTogglesTuitDislikes,findAllTuitsLikedByUser,
    findAllTuitsDislikedByUser
} from "../services/like-service"
import {createUser, deleteUsersByUsername} from "../services/users-service";
import {createTuit, deleteTuit, findAllTuits, findTuitById} from "../services/tuits-service";


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

describe('can retrieve all tuits disliked by user with REST API', () => {

    const tuit1 =
        {
            _id:'6213c0b08a4117e9e09e1fa1',
            tuit:'tuit1'
        };

    const tuit2 =
        {
            _id:'6213c0b08a4117e9e09e1fa2',
            tuit:'tuit2'
        };

    const tuit3 =
        {
            _id:'6213c0b08a4117e9e09e1fa3',
            tuit:'tuit3'
        };



    const ripley = {
        username: 'ellenripley',
        password: 'lv426',
        email: 'ellenripley@aliens.com'
    };

    let uid = null;

    beforeAll(async () => {
                  const user = await createUser(ripley);
                  uid = user._id;

                  const newTuit1 = await createTuit(uid,tuit1);
                  const newTuit2 = await createTuit(uid,tuit2);
                  const newTuit3 = await createTuit(uid,tuit3);


                  await userTogglesTuitDislikes(uid,newTuit1._id);
                  await userTogglesTuitDislikes(uid,newTuit2._id);
                  await userTogglesTuitLikes(uid,newTuit3._id);

              }


    );

    afterAll(async () => {

                 const newTuit1 = await findTuitById(tuit1._id);
                 if(newTuit1.stats.dislikes>0){
                     await userTogglesTuitDislikes(uid,tuit1._id);
                 }

                const newTuit2 = await findTuitById(tuit2._id);
                if(newTuit2.stats.dislikes>0){
                    await userTogglesTuitDislikes(uid,tuit2._id);
                }

                const newTuit3 = await findTuitById(tuit3._id);
                if(newTuit3.stats.likes>0){
                    await userTogglesTuitLikes(uid,tuit3._id);
                }

                await deleteUsersByUsername(ripley.username);

                await deleteTuit(tuit1._id);
                await deleteTuit(tuit2._id);
                await deleteTuit(tuit3._id);
             }



    );

    test('can retrieve all tuits disliked by user with REST API', async () => {


        const getDislikedTuits = await findAllTuitsDislikedByUser(uid);

        expect(getDislikedTuits.length).toBeGreaterThanOrEqual(2);

        const dislikedId = [tuit1._id,tuit2._id];

        getDislikedTuits.forEach(tuit => {
            expect(dislikedId.indexOf(tuit._id)).toBeGreaterThanOrEqual(0);
        });

        const getlikedTuits = await findAllTuitsLikedByUser(uid);

        expect(getlikedTuits.length).toBeGreaterThanOrEqual(1);

        const likedId = [tuit3._id];

        getlikedTuits.forEach(tuit => {
            expect(likedId.indexOf(tuit3._id)).toBeGreaterThanOrEqual(0);
        });

    });

});