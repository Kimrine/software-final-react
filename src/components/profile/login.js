import {useEffect, useState} from "react";
import {findAllUsers} from "../../services/users-services";
import {Link} from "react-router-dom";

export const Login = () => {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        findAllUsers()
            .then(users => setUsers(users))
    }, []);
    return(
        <div>
            <h1>All Users</h1>
            <div className="list-group">
                {
                    users.map(user => {
                        return(
                            <Link className="list-group-item"
                                  to={`/${user._id}/home`}>
                                {user.username}
                            </Link>
                        )
                    })
                }
            </div>
        </div>
    );
};