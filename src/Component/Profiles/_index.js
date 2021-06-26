import { useState, useEffect, useCallback } from "react"
import "./Profile.css"

const Profiles = () => {
    const [state, setState] = useState({
        time: null,
        users: [],
        userInfo: null,
        selectedUser: null,
    })
    // https://jsonplaceholder.typicode.com/users/1

    const fetchUser = useCallback(
        (id) => {
            const path = id ?
                `https://jsonplaceholder.typicode.com/users/ ${id}` :
                'https://jsonplaceholder.typicode.com/users';

            fetch(path)
                .then(res => res.json())
                .then(data => {
                    // console.log(data);
                    if (id) {
                        setState((s) => {
                            return { ...s, userInfo: data }
                        })
                    }
                    else {
                        setState((s) => {
                            return { ...s, users: data }
                        })
                    }
                })
        }, []
    )
    console.log("fetchUser" , fetchUser);
    // useEffect(()=>{
    //         console.log('Component Did Mount');
    //     },[])

    // useEffect(()=>{
    //     console.log('Component Did Update');
    // })

    // useEffect(()=>{
    //     console.log(`Passed A depedency state.time ${state.time}`);
    // },[state.time])

    // useEffect(()=>{
    //     console.log(`Passsed a dependency state.userInfo ${state.userInfo}`);
    // },[state.userInfo ,state.time ])

    // return(<>
    //       <h2>{state.time}</h2>
    //       <button onClick={()=>setState({...state , time :(new Date()).toLocaleTimeString()})}>Update Time</button>
    //     </>
    // )
    useEffect(() => {
        fetchUser();
    }, [fetchUser])
    useEffect(() => {
        const timer = setInterval(() => {
            setState((s) => {
                return { ...s, time: (new Date()).toLocaleTimeString() }
            })
        }, 1000);
        return () => clearInterval(timer);
    }, [])

    useEffect(() => {
        if (state.selectedUser) fetchUser(state.selectedUser)
    }, [state.selectedUser, fetchUser])

    const getUserInfo = (id) => {
        // console.log(id);
        // const userInfo = state.users.filter(user => user.id === id);
        // if (userInfo.length) {
        //     setState({ userInfo: userInfo[0] })
        // }

        setState({ ...state, selectedUser: id })
    }



    // Mian RENDER
    return (
      
        <>   <h2>Profile : {state.time}</h2>
            <div className="container">
                <div className="userContainer">
                    <h2>User List </h2>
                    {
                        state.users.map((user, index) => {
                            return (
                                <div
                                    className="profile-card"
                                    key={index}
                                    onClick={() => getUserInfo(user.id)}
                                >
                                    <h3>{user.name}</h3>
                                    <address>{user.address.city}</address>
                                </div>
                            )
                        })
                    }
                </div>

                <div className="user-info">
                    <h2>User Info</h2>
                    <div className="profile-card">
                        <h3>{state.userInfo?.name}</h3>
                        <address>{state.userInfo?.address?.city}</address>
                    </div>
                </div>

            </div>
        </>
    )
}
export default Profiles;