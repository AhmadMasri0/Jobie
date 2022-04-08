import axios from "axios";
import { createContext, useEffect, useState } from "react";

const DUMMY_USER_PROFILE = {
    image: 'me.jpg',
    profession: 'Developer',
    username: 'Ahmad Masri',
    email: "ahmad.masri@stu.najah.edu",//
    skills: [
        { id: '1', skill: 'Work under pressure' },
        { id: '2', skill: 'Work ' },
        { id: '3', skill: 'Work under ' },
        { id: '4', skill: 'Work under lorem pressure' },

    ],
    gender: 'male',//
    phones: [
        {
            id: '1',
            type: 'Mobile',
            value: '+972-0598828113',
            visible: false
        }, {
            id: '3',
            type: 'Home',
            value: '+972-092235856',
            visible: false
        }],//
    city: 'Nablus',//
    country: 'Palestine',//
    prevJobs: [{
        id: '1',
        companyName: 'Some companycompanycompany',
        position: 'whatever',
        duration: '2020/2-2021/1(0years & 1months)',
        place: 'Nablus'
    }, {
        id: '2',
        companyName: 'Some company',
        position: 'whatever',
        duration: '2018/1-2022/4(0years & 1months)',
        place: 'Ramallah'
    }],
    bio: 'A nice bio, HEHEA nice bio, HEHEA nice bio, HEHEA nice bio, HEHEA nice bio, HEHEA nice bio, HEHEA nice bio, HEHE',//
    birthday: '2000-07-13',
    password: 'cccccccc',
    userType: 'applicant'

};

// const UserContext = createContext({
//     value: {},
//     token: '',
//     setCurrentUser: () => { }
// })
const UserContext = createContext({
    value: {},
    token: '',
    setCurrentUser: () => { },
    user: DUMMY_USER_PROFILE,
    addPrevJob: (job) => {
    },
    removePrevJob: (id) => {
    },
    editUserInfo: (info) => {
    },
    deletePhone: (id) => {
    },
    editPhones: (phones) => {
    },
    addPhone: (phone) => {
    },
    setPhonesVisibility: (isVisible) => {
    },
    removeSkill: (id) => {
    },
    editSkill: (info) => {
    },
});

export const UserContextProvider = props => {

    const initToken = localStorage.getItem('userToken');
    const initUser = JSON.parse(localStorage.getItem('user'));
    const [user, setUser] = useState(initUser);
    const [token, setToken] = useState(initToken);

    useEffect(() => {
        const id = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user'))._id : null;
        console.log('user')
        if (id)
            axios.get(`http://localhost:2000/users/${id}`).then(data => {
                if (!data)
                    throw new Error('Wrong')
                setUser(data.data);
                // console.log("img",data.data.image);
                // setToken(userCtx.token);
                // setName(data.data ? data.data.name : null);
                // setGender(data.data ? data.data.gender : 'male');
                // setCity(data.data && data.data.location ? data.data.location.city : null)
                // setCountry(data.data && data.data.location ? data.data.location.country : null)
                // setProfession(data.data ? data.data.specialization : null);
                // console.log(token)
                // setBio(data.data ? data.data.bio : null);
                // console.log(data.data);
            }).catch(err => console.log(err))
        // user = userCtx.user;

        // axios.get(`http://localhost:2000/users/${id}/avatar`).then(data => {

        //     if (!data)
        //         throw new Error('Wrong')
        //     console.log('img', data.data);
        //     localStorage.setItem('img', data.data);
        //     // console.log("img",data.data.image);
        //     // setToken(userCtx.token);
        //     // setName(data.data ? data.data.name : null);
        //     // setGender(data.data ? data.data.gender : 'male');
        //     // setCity(data.data && data.data.location ? data.data.location.city : null)
        //     // setCountry(data.data && data.data.location ? data.data.location.country : null)
        //     // setProfession(data.data ? data.data.specialization : null);
        //     // console.log(token)
        //     // setBio(data.data ? data.data.bio : null);
        //     // console.log(data.data);
        // }).catch(err => console.log(err))
    }, [])

    useEffect(() => {
        if (initUser) {
            setUser(initUser)
        } else setUser({})
        if (initToken)
            setToken(initToken)

    }, [])
    const setCurrentUserHandler = (value, token) => {
        localStorage.setItem('user', JSON.stringify(value));
        setUser(value);

        if (token) setToken(token);
    }
    const addPrevJobHandler = (job) => {
        const id = job.id;
        let temp_user = { ...user };
        if (id) {
            const existingJobIndex = temp_user.prevJobs.findIndex(job => job.id.toString() === id.toString());
            const updatedJobs = [...user.prevJobs];
            updatedJobs[existingJobIndex] = job;
            temp_user.prevJobs = updatedJobs;
            setUser(temp_user);
            // console.log(user);

        } else {
            const newId = new Date().getTime();
            const newJob = { ...job, id: newId };
            temp_user.prevJobs = [...temp_user.prevJobs, newJob];
            setUser(temp_user)
            // console.log(user);
        }
    }
    const removePrevJobHandler = (id) => {
        let temp_user = { ...user };

        temp_user.prevJobs = temp_user.prevJobs.filter(job => job.id.toString() !== id);
        setUser(temp_user);
        // console.log(temp_user);
    }
    const editUserInfoHandler = (info) => {
        // console.log(info);
        let temp_user = { ...user };
        temp_user.username = info.username;
        temp_user.bio = info.bio;
        temp_user.city = info.city;
        temp_user.country = info.country;
        temp_user.profession = info.profession;
        temp_user.gender = info.gender;
        setUser(temp_user);
    }
    const deletePhoneHandler = (id) => {
        let temp_user = { ...user };
        const updatedPhones = temp_user.phones.filter(phone => phone.id.toString() !== id.toString());
        // console.log(updatedPhones)
        temp_user.phones = updatedPhones;
        setUser(temp_user);
    }
    const editPhonesHandler = (p) => {
        let temp_user = { ...user };
        temp_user.phones = p;
        setUser(temp_user);

    }
    const addPhoneHandler = (p) => {
        let temp_user = { ...user };
        // if(p.id){
        //     const updatedPhoneIndex = temp_user.phones.findIndex(phone => phone.id.toString() === p.id);
        //     temp_user.phones[updatedPhoneIndex] = p;
        // }else{
        const newId = new Date().getTime();
        const newPhone = { ...p, id: newId };
        temp_user.phones = [...temp_user.phones, newPhone];
        // }
        setUser(temp_user);
    }
    const editSkillHandler = (skill) => {
        const id = skill.id;
        let temp_user = { ...user };
        if (id) {
            const existingSkillIndex = temp_user.skills.findIndex(skill => skill.id.toString() === id.toString());
            const updatedSkills = [...user.skills];
            updatedSkills[existingSkillIndex] = skill;
            temp_user.skills = updatedSkills;
            setUser(temp_user);
            // console.log(user);

        } else {
            const newId = new Date().getTime();
            const newSkill = { ...skill, id: newId };
            temp_user.skills = [...temp_user.skills, newSkill];
            setUser(temp_user)
            // console.log(user.skills);
        }
    }
    const removeSkillHandler = (id) => {
        let temp_user = { ...user };


        temp_user.skills = temp_user.skills.filter(skill => skill.id.toString() !== id.toString());
        setUser(temp_user);
        // console.log(temp_user.skills);
    }
    const setPhonesVisibilityHandler = (isVisible) => {
        let temp_user = { ...user };
        temp_user.phones.forEach((phone) => phone.visible = isVisible);
        setUser(temp_user);
        // console.log(temp_user.phones)
    }
    const userContextValue = {
        value: user,
        token,
        setCurrentUser: setCurrentUserHandler,
        user: user,
        addPrevJob: addPrevJobHandler,
        removePrevJob: removePrevJobHandler,
        editUserInfo: editUserInfoHandler,
        deletePhone: deletePhoneHandler,
        addPhone: addPhoneHandler,
        editPhones: editPhonesHandler,
        editSkill: editSkillHandler,
        removeSkill: removeSkillHandler,
        setPhonesVisibility: setPhonesVisibilityHandler
    }
    return <UserContext.Provider value={userContextValue}>{props.children} </UserContext.Provider>

}
export default UserContext;
