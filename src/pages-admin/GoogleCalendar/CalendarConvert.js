const convertCalendar = (listCAL) => {
    const response = [];

    const item = {
        Id: 0,
        Subject: "",
        Location: "",
        StartTime: "",
        EndTime: "",
        CategoryColor: "",
    };

    listCAL.forEach(cal => {
        let newI = { ...item }; // Create a new object using spread operator
        if(cal.type === "EVENT") {
            newI.Subject = cal.title;
            newI.Location = cal.description;
            newI.StartTime = cal.date;
            newI.EndTime = cal.date;


        }
        if(cal.type === "INTERVIEW") {
            newI.Subject = cal.title;
            newI.Location = cal.detail.linkMeet;
            newI.StartTime = cal.date;
            newI.EndTime = cal.date;

        }
        response.push(newI);
    });

    return response;
};


export const calendarConver = {
    convertCalendar,
};
