export const donationData = {
    locations: [
        { id: "Camp", label: "Camp" },
        { id: "Bibwewadi", label: "Bibwewadi" },
        { id: "Deccan", label: "Deccan" },
    ],
    thursdays: [
        {
            date: "Thursday, June 13, 2024",
            locations: [
                { id: "Camp", booked: true },
                { id: "Bibwewadi", booked: false },
                { id: "Deccan", booked: false },
            ],
        },
        {
            date: "Thursday, June 20, 2024",
            locations: [
                { id: "Camp", booked: false },
                { id: "Bibwewadi", booked: true },
                { id: "Deccan", booked: false },
            ],
        },
        {
            date: "Thursday, June 27, 2024",
            locations: [
                { id: "Camp", booked: true },
                { id: "Bibwewadi", booked: false },
                { id: "Deccan", booked: false },
            ],
        },
        {
            date: "Thursday, July 4, 2024",
            locations: [
                { id: "Camp", booked: false },
                { id: "Bibwewadi", booked: false },
                { id: "Deccan", booked: false },
            ],
        },
    ],
};
