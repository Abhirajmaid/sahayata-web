export const eventRegistrationFields = {
    default: [
        { id: 'name', label: 'Full Name', type: 'text', required: true },
        { id: 'email', label: 'Email', type: 'email', required: true },
        { id: 'phone', label: 'Phone Number', type: 'tel', required: true }
    ],
    workshop: [
        { id: 'name', label: 'Full Name', type: 'text', required: true },
        { id: 'email', label: 'Email', type: 'email', required: true },
        { id: 'phone', label: 'Phone Number', type: 'tel', required: true },
        {
            id: 'experience',
            label: 'Experience Level',
            type: 'select',
            required: true,
            options: [
                { value: 'beginner', label: 'Beginner' },
                { value: 'intermediate', label: 'Intermediate' },
                { value: 'advanced', label: 'Advanced' }
            ]
        }
    ],
    seminar: [
        { id: 'name', label: 'Full Name', type: 'text', required: true },
        { id: 'email', label: 'Email', type: 'email', required: true },
        { id: 'phone', label: 'Phone Number', type: 'tel', required: true },
        { id: 'organization', label: 'Organization', type: 'text', required: true },
        { id: 'designation', label: 'Designation', type: 'text', required: true }
    ]
};

export const events = [
    {
        id: 1,
        title: "Thursday Food Drive",
        date: "13 June 2024",
        time: "11:00 AM",
        location: "Camp, Pune",
        type: "food_drive",
        registrationType: "default",
        description: "Join our weekly food distribution drive and help serve nutritious meals to the underprivileged across Pune.",
        totalSlots: 30,
        availableSlots: 10,
        speakers: [
            { name: "Amit Sharma", designation: "Lead Volunteer" }
        ]
    },
    {
        id: 2,
        title: "Education Support Session",
        date: "15 June 2024",
        time: "10:00 AM",
        location: "Bibwewadi, Pune",
        type: "education",
        registrationType: "default",
        description: "Volunteer to teach and mentor children as part of our education support initiative.",
        totalSlots: 20,
        availableSlots: 7,
        speakers: [
            { name: "Priya Desai", designation: "Education Coordinator" }
        ]
    },
    {
        id: 3,
        title: "Medical Camp",
        date: "20 June 2024",
        time: "9:00 AM",
        location: "Deccan, Pune",
        type: "medical",
        registrationType: "default",
        description: "Assist doctors and staff in organizing free health checkups and distributing medicines.",
        totalSlots: 25,
        availableSlots: 12,
        speakers: [
            { name: "Dr. Sneha Kulkarni", designation: "Medical Volunteer" }
        ]
    },
    {
        id: 4,
        title: "Special Food Drive",
        date: "27 June 2024",
        time: "11:00 AM",
        location: "Camp, Pune",
        type: "food_drive",
        registrationType: "default",
        description: "Help us serve a special meal to celebrate our milestone of 10,000 meals served!",
        totalSlots: 40,
        availableSlots: 18,
        speakers: [
            { name: "Rahul Mehta", designation: "Volunteer" }
        ]
    }
];

export const categories = [
    { id: 'workshop', name: 'Workshops' },
    { id: 'seminar', name: 'Seminars' },
    { id: 'conference', name: 'Conferences' }
];
