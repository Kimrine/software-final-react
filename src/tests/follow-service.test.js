/**
 * @jest-environment node
 * @file Implements tests for follow API
 */

import {createUser, deleteUsersByUsername,findUserById} from "../services/users-service";
import{userTogglesUserFollows,findAllUsersFollowers,findAllUsersFollowing} from "../services/follow-service"

/**
 * Test user can follow another user with REST API
 */
describe("user can follow another user with REST API",()=>{
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

    let newRipley = null;
    let newSowell = null;

    beforeAll(async () => {
        await deleteUsersByUsername(ripley.username);
        await deleteUsersByUsername(sowell.username);

        newRipley = await createUser(ripley);
        newSowell = await createUser(sowell);
    });

    afterAll(async ()=>{
        if(newRipley.followings>0){
            await userTogglesUserFollows(newRipley._id,newSowell._id);
        }

        await deleteUsersByUsername(newRipley.username);
        await deleteUsersByUsername(newSowell.username);
    })

    test('user can follow another user with REST API',async ()=>{
        expect(newRipley.followers).toEqual(0);
        expect(newSowell.followers).toEqual(0);
        expect(newRipley.followings).toEqual(0);
        expect(newSowell.followings).toEqual(0);

        const follow = await userTogglesUserFollows(newRipley._id,newSowell._id);
        newRipley = await findUserById(newRipley._id);
        newSowell = await findUserById(newSowell._id);

        expect(newRipley.followers).toEqual(0);
        expect(newSowell.followers).toEqual(1);
        expect(newRipley.followings).toEqual(1);
        expect(newSowell.followings).toEqual(0);


    })

})

/**
 * Test user can unfollow another user with REST API
 */
describe("user can unfollow another user with REST API",()=>{
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

    let newRipley = null;
    let newSowell = null;

    beforeAll(async () => {
        await deleteUsersByUsername(ripley.username);
        await deleteUsersByUsername(sowell.username);

        newRipley = await createUser(ripley);
        newSowell = await createUser(sowell);
    });

    afterAll(async ()=>{

        await deleteUsersByUsername(newRipley.username);
        await deleteUsersByUsername(newSowell.username);
    })

    test('user can unfollow another user with REST API',async ()=>{
        expect(newRipley.followers).toEqual(0);
        expect(newSowell.followers).toEqual(0);
        expect(newRipley.followings).toEqual(0);
        expect(newSowell.followings).toEqual(0);

        const follow = await userTogglesUserFollows(newRipley._id,newSowell._id);
        newRipley = await findUserById(newRipley._id);
        newSowell = await findUserById(newSowell._id);

        expect(newRipley.followers).toEqual(0);
        expect(newSowell.followers).toEqual(1);
        expect(newRipley.followings).toEqual(1);
        expect(newSowell.followings).toEqual(0);


        const unfollow = await userTogglesUserFollows(newRipley._id,newSowell._id);
        newRipley = await findUserById(newRipley._id);
        newSowell = await findUserById(newSowell._id);
        expect(newRipley.followers).toEqual(0);
        expect(newSowell.followers).toEqual(0);
        expect(newRipley.followings).toEqual(0);
        expect(newSowell.followings).toEqual(0);


    })

})

/**
 * Test can retrieve all users that user are following with REST API
 */
describe("can retrieve all users that user are following with REST API",()=>{
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

    const cathy = {
        username: 'cathy_brown',
        password: 'cacaca123',
        email: 'caca123@google.com'
    };

    let newRipley = null;
    let newSowell = null;
    let newCathy = null;

    beforeAll(async () => {
        await deleteUsersByUsername(ripley.username);
        await deleteUsersByUsername(sowell.username);
        await deleteUsersByUsername(cathy.username);

        newRipley = await createUser(ripley);
        newSowell = await createUser(sowell);
        newCathy = await createUser(cathy);

        await userTogglesUserFollows(newRipley._id, newSowell._id);
        await userTogglesUserFollows(newRipley._id, newCathy._id);

    });

    afterAll(async ()=>{

        await userTogglesUserFollows(newRipley._id, newSowell._id);
        await userTogglesUserFollows(newRipley._id, newCathy._id);

        await deleteUsersByUsername(newRipley.username);
        await deleteUsersByUsername(newSowell.username);
        await deleteUsersByUsername(newCathy.username);
    })

    test('can retrieve all users that user are following with REST API',async ()=>{

        const getFolloingUsers = await findAllUsersFollowing(newRipley.username);
        expect(getFolloingUsers.length).toBeGreaterThanOrEqual(2);

        const userId = [newSowell._id,newCathy._id];

        getFolloingUsers.forEach(user=>{
            expect(userId.indexOf(user._id)).toBeGreaterThanOrEqual(0);
        })
    })

})


/**
 * Test can retrieve all users that following user with REST API
 */
describe("can retrieve all users that following user with REST API",()=>{
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

    const cathy = {
        username: 'cathy_brown',
        password: 'cacaca123',
        email: 'caca123@google.com'
    };

    let newRipley = null;
    let newSowell = null;
    let newCathy = null;

    beforeAll(async () => {
        await deleteUsersByUsername(ripley.username);
        await deleteUsersByUsername(sowell.username);
        await deleteUsersByUsername(cathy.username);

        newRipley = await createUser(ripley);
        newSowell = await createUser(sowell);
        newCathy = await createUser(cathy);

        await userTogglesUserFollows(newRipley._id, newCathy._id);
        await userTogglesUserFollows(newSowell._id, newCathy._id);

    });

    afterAll(async ()=>{

        await userTogglesUserFollows(newRipley._id, newCathy._id);
        await userTogglesUserFollows(newSowell._id, newCathy._id);

        await deleteUsersByUsername(newRipley.username);
        await deleteUsersByUsername(newSowell.username);
        await deleteUsersByUsername(newCathy.username);
    })

    test('can retrieve all users that following user with REST API',async ()=>{

        const getUsersFollowers = await findAllUsersFollowers(newCathy.username);
        expect(getUsersFollowers.length).toBeGreaterThanOrEqual(2);

        const userId = [newSowell._id,newRipley._id];

        getUsersFollowers.forEach(user=>{
            expect(userId.indexOf(user._id)).toBeGreaterThanOrEqual(0);
        })
    })

})