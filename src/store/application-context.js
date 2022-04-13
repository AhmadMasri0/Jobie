import {createContext} from "react";

const application = [
    {
    id: '1',
    owner: 'Some business',//
    deadline: '20-03-2022',//
    location: 'Nablus-Rafedia',//
    title: 'Front-end developer',//
    description://
     'Lorem ipsum dolor sit amet, in laoreet molestie his,' +
        ' te ius omnium iuvaret euismod, ei pro vide cibo. Te assum latine liberavisse ' +
        'his, meis fabulas ancillae est ne. Graeci eripuit interesset vel no, ne molestiae argumentum appellantur' +
        ' per. Ius no admodum dignissim. Impedit habemus democritum mei ut, dicit electram te nec. Solum verterem per' +
        ' ut, ut eos justo debet, eu eirmod placerat periculis vis. Cetero legendos an duo.',
    requirements: [//
        'ghshdhshsdg',
        'ghshdhshsdg',
        'ghshdhshsdg',
        'ghshdhshsdg',
        'ghshdhshsdg',
        'ghshdhshsdg',
    ],
    details://
        {
            Place:  'Rafedia-Nablus',
            Experience: '3 years',
            JobType: 'Full-time',
            salary: 'N/A',
            Degree: 'Bachelors'
        }
    ,
    jobType: 'Full time',//
    email: 'example@example.com',//
    phone: '059828113',//
    submitters: 0},
    {
    id: '2',
    owner: 'Some business',
    deadline: '02-12-2021',
    location: 'Nablus',
    title: 'Back-end developer',
    description: 'Lorem ipsum dolor sit amet, in laoreet molestie his,' +
        ' te ius omnium iuvaret euismod, ei pro vide cibo. Te assum latine liberavisse ' +
        'his, meis fabulas ancillae est ne. Graeci eripuit interesset vel no, ne molestiae argumentum appellantur' +
        ' per. Ius no admodum dignissim. Impedit habemus democritum mei ut, dicit electram te nec. Solum verterem per' +
        ' ut, ut eos justo debet, eu eirmod placerat periculis vis. Cetero legendos an duo.',
    requirements: [
        'ghshdhshsdg',
        'ghshdhshsdg',
        'ghshdhshsdg',
        'ghshdhshsdg',
        'ghshdhshsdg',
        'ghshdhshsdg',
    ],
    details:
        {
            Place: 'Rafedia-Nablus',
            Experience: '3 years',
            JobType: 'Part-time',
            salary: 'N/A',
            Degree: 'Bachelors'
        },
    jobType: 'Part time',
    email: 'example@example.com',
    phone: '059828113',
    submitters: 0
},
    {
    id: '3',
    owner: 'exalt',
    deadline: '02-12-2021',
    location: 'ramallah',
    title: 'Back-end developer',
    description: 'Lorem ipsum dolor sit amet, in laoreet molestie his,' +
        ' te ius omnium iuvaret euismod, ei pro vide cibo. Te assum latine liberavisse ' +
        'his, meis fabulas ancillae est ne. Graeci eripuit interesset vel no, ne molestiae argumentum appellantur' +
        ' per. Ius no admodum dignissim. Impedit habemus democritum mei ut, dicit electram te nec. Solum verterem per' +
        ' ut, ut eos justo debet, eu eirmod placerat periculis vis. Cetero legendos an duo.',
    requirements: [
        'ghshdhshsdg',
        'ghshdhshsdg',
        'ghshdhshsdg',
        'ghshdhshsdg',
        'ghshdhshsdg',
        'ghshdhshsdg',
    ],
    details:
        {
            Place: 'some street',
            Experience: '3 years',
            JobType: 'Part-time',
            salary: 'N/A',
            Degree: 'Bachelors'
        },
    jobType: 'Part time',
    email: 'example@example.com',
    phone: '059828113',
    submitters: 0
},
    {
    id: '4',
    owner: 'idk',
    deadline: '02-12-2021',
    location: 'jeneen',
    title: 'Back-end developer',
    description: 'Lorem ipsum dolor sit amet, in laoreet molestie his,' +
        ' te ius omnium iuvaret euismod, ei pro vide cibo. Te assum latine liberavisse ' +
        'his, meis fabulas ancillae est ne. Graeci eripuit interesset vel no, ne molestiae argumentum appellantur' +
        ' per. Ius no admodum dignissim. Impedit habemus democritum mei ut, dicit electram te nec. Solum verterem per' +
        ' ut, ut eos justo debet, eu eirmod placerat periculis vis. Cetero legendos an duo.',
    requirements: [
        'ghshdhshsdg',
        'ghshdhshsdg',
        'ghshdhshsdg',
        'ghshdhshsdg',
        'ghshdhshsdg',
        'ghshdhshsdg',
    ],
    details:
        {
            Place: 'some street',
            Experience: '3 years',
            JobType: 'Part-time',
            salary: 'N/A',
            Degree: 'Bachelors'
        },
    jobType: 'Part time',
    email: 'example@example.com',
    phone: '059828113',
    submitters: 0
},
];
const ApplicationContext = createContext(application);


export const ApplicationContextProvider = props => {

    //
    // const [application, setApplication] = useState(application);
    //
    // const applicationContextValue =     application;

    return <ApplicationContext.Provider value={application}>{props.children}</ApplicationContext.Provider>
}

export default ApplicationContext;
