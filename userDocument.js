users = [
  {
    _id: "3",
    name: "tes",
    email: "dilshod.me@gmail.com",
    password: "$2a$12$.PTgUtZDk4Owpbl1sUGQoudsmHpccve.tUZ0bmdjo7J5SA1JFozbu",
    role: "Recruiter",
    photo: "string",
    skills: ["string"],
    workPreference: "Onsite",
    resume: "string",
    resumeFileName: "resumeFileName.png",
    city: "string",
    country: "string",
    openToTravel: true,
    phoneNumber: "string",
    birthYear: 0,
    careerStartYear: 0,
    candidateType: "FULL_TIME",
    clients: ["string"],
    linkedIn: "string",
    udemy: ["string"],
    expectedCommercials: "string",
    aboutMe: "string",
    _class: "com.example.skillmatcherbackend.model.document.UserDocument",
  },
  {
    _id: "2",
    name: "DilshodM",
    email: "contact.me@gmail.com",
    password: "$2a$12$.PTgUtZDk4Owpbl1sUGQoudsmHpccve.tUZ0bmdjo7J5SA1JFozbu",
    role: "Candidate",
    photo: "string",
    skills: ["string"],
    workPreference: "Onsite",
    resume: "string",
    resumeFileName: "resumeFileName.png",
    city: "string",
    country: "string",
    openToTravel: true,
    phoneNumber: "string",
    birthYear: 0,
    careerStartYear: 0,
    candidateType: "FULL_TIME",
    clients: ["string"],
    linkedIn: "string",
    udemy: ["string"],
    expectedCommercials: "string",
    aboutMe: "string",
    _class: "com.example.skillmatcherbackend.model.document.UserDocument",
  },
];

skillIndex = { skills: "text" };

collInfoObjs = [{ coll: "userDocument", data: users, index: skillIndex }];

for (obj of collInfoObjs) {
  db[obj.coll].insertMany(obj.data);
  db[obj.coll].createIndex(obj.index);
}
