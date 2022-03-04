import {createContext, useState} from "react";

const DUMMY_USER_PROFILE = {
    image: 'me.jpg',
    profession: 'Developer',
    username: 'Ahmad Masri',
    email: "ahmad.masri@stu.najah.edu",//
    skills: [
        'Work under '
    ],
    gender: 'male',//
    phone: '0598828113',//
    city: 'Nablus',//
    country: 'Palestine',//
    prevJobs: [{
        id: '1',
        companyName: 'Some companycompanycompany',
        position: 'whatever',
        duration: 3,
        place: 'Nablus'
    }, {
        id: '2',
        companyName: 'Some company',
        position: 'whatever',
        duration: 3,
        place: 'Ramallah'
    }],
    bio: 'A nice bio, HEHEA nice bio, HEHEA nice bio, HEHEA nice bio, HEHEA nice bio, HEHEA nice bio, HEHEA nice bio, HEHE',//
    birthday: '2000-07-13',
    password: ''

};

const UserContext = createContext({
    user: DUMMY_USER_PROFILE,
    addPrevJob: (job) => {
    },
    removePrevJob: (id) => {
    },
    editUserInfo: (info) => {
    }
});

export const UserContextProvider = props => {

    const [user, setUser] = useState(DUMMY_USER_PROFILE);

    const addPrevJobHandler = (job) => {
        const id = job.id;
        let temp_user = {...user};
        if (id) {
            const existingJobIndex = temp_user.prevJobs.findIndex(job => job.id.toString() === id.toString());
            const updatedJobs = [...user.prevJobs];
            updatedJobs[existingJobIndex] = job;
            temp_user.prevJobs = updatedJobs;
            setUser(temp_user);
            console.log(user);

        } else {
            const newId = new Date().getTime();
            const newJob = {...job, id: newId};
            temp_user.prevJobs = [...temp_user.prevJobs, newJob];
            setUser(temp_user)
            console.log(user);
        }
    }
    const removePrevJobHandler = (id) => {
        let temp_user = {...user};

        let updatedJobs = temp_user.prevJobs.filter(job => job.id.toString() !== id);
        temp_user.prevJobs = updatedJobs;
        setUser(temp_user);
        console.log(temp_user);
    }
    const editUserInfoHandler = (info) => {
        let temp_user = {...user};
        // temp_user.firstName = info.firstName;
        temp_user.username = info.username;
        temp_user.bio = info.bio;
        // temp_user.email = info.email;
        temp_user.city = info.city;
        temp_user.country = info.country;
        // temp_user.birthday = info.birthday;
        // temp_user.phone = info.phone;
        temp_user.profession = info.profession;
        temp_user.gender = info.gender;
        setUser(temp_user);
    }
    const userContextValue = {
        user: user,
        addPrevJob: addPrevJobHandler,
        removePrevJob: removePrevJobHandler,
        editUserInfo: editUserInfoHandler
    }
    return <UserContext.Provider value={userContextValue}>{props.children} </UserContext.Provider>

}
export default UserContext;
