import {
    createTuit,
    findTuitById, findAllTuits,
    deleteTuit
} from "../services/tuits-service"
import {createUser, deleteUsersByUsername} from "../services/users-service";

describe('can create tuit with REST API', () => {

    const ripley = {
        username: 'ellenripley',
        password: 'lv426',
        email: 'ellenripley@aliens.com'
    };

    const testCreat = {
        _id: '6213c0b08a4248e9e09e1faa',
        tuit: 'test creat a tuit',
    };

    beforeAll(async () => {
        await deleteUsersByUsername(ripley.username)
        return deleteTuit(testCreat._id);
    });

    afterAll(async () => {
        await deleteUsersByUsername(ripley.username)
        return deleteTuit(testCreat._id);
    });

    test('can create tuit with REST API', async () => {
        const newUser = await createUser(ripley);

        const newTuit = await createTuit(newUser._id, testCreat);
        expect(newTuit._id).toEqual(testCreat._id);
        expect(newTuit.tuit).toEqual(testCreat.tuit);
        expect(newTuit.postedBy).toEqual(newUser._id);

    })

});

describe('can delete tuit wtih REST API', () => {

    const ripley = {
        username: 'ellenripley',
        password: 'lv426',
        email: 'ellenripley@aliens.com'
    };

    const testDelete = {
        _id: '6213c0b08a4117e9e09e1faa',
        tuit: 'test delete a tuit',
    };

    beforeAll(async () => {
        const newUser = await createUser(ripley);

        return createTuit(newUser._id, testDelete);

    });

    afterAll(async () => {
        await deleteUsersByUsername(ripley.username);
        return deleteTuit(testDelete._id);
    });

    test('can delete tuit with REST API', async () => {

        const status = await deleteTuit(testDelete._id);

        expect(status.deletedCount).toBeGreaterThanOrEqual(1);

    });

});

describe('can retrieve a tuit by their primary key with REST API', () => {
    const ripley = {
        username: 'ellenripley',
        password: 'lv426',
        email: 'ellenripley@aliens.com'
    };

    const testFindId = {
        _id: '6213c0b08a4117e9e09e1faa',
        tuit: 'test find a tuit by id',
    };

    beforeAll(async () => {
        await deleteUsersByUsername(ripley.username)
        return deleteTuit(testFindId._id);
    });

    afterAll(async () => {
        await deleteUsersByUsername(ripley.username)
        return deleteTuit(testFindId._id);
    });

    test('can retrieve a tuit by their primary key with REST API', async () => {
        const newUser = await createUser(ripley);

        const newTuit = await createTuit(newUser._id, testFindId);

        expect(newTuit.tuit).toEqual(testFindId.tuit);
        expect(newTuit.postedBy).toEqual(newUser._id);

        const existingTuit = await findTuitById(newTuit._id);

        expect(newTuit._id).toEqual(existingTuit._id);
        expect(newTuit.tuit).toEqual(existingTuit.tuit);
        expect(newTuit.postedBy).toEqual(existingTuit.postedBy);

    });

});

describe('can retrieve all tuits with REST API', () => {

    const tuits = [
        {
            _id:'6213c0b08a4117e9e09e1fa1',
            tuit:'tuit1'
        },
        {
            _id:'6213c0b08a4117e9e09e1fa2',
            tuit:'tuit2'
        },
        {
            _id:'6213c0b08a4117e9e09e1fa3',
            tuit:'tuit3'
        },
    ];


    const ripley = {
        _id: '62291e21c2fcdb085d7c5b03',
        username: 'ellenripley',
        password: 'lv426',
        email: 'ellenripley@aliens.com'
    };



    beforeAll(() =>
        Promise.all(
            tuits.map(tuit => createTuit(ripley._id, {
                _id:tuit._id,
                tuit:tuit.tuit
            }))
        )

    );

    afterAll(() =>
        Promise.all(
            tuits.map(tuit=>
                deleteTuit(tuit._id)
            )
        )


    );

    test('can retrieve all tuits with REST API', async () => {


        const getTuits = await findAllTuits();

        expect(getTuits.length).toBeGreaterThanOrEqual(tuits.length);

        const tuitWeInserted = getTuits.filter(
            tuit => tuits.indexOf(tuit.tuit) >= 0);


        tuitWeInserted.forEach(tuit => {
            const tuitContent = tuits.find(content => content === tuit.tuit);
            expect(tuit.tuit).toEqual(tuitContent);
            expect(tuit.postedBy).toEqual(ripley._id);
        });


    });

});