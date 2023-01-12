import { format } from "date-fns";

async function getByDay(day) {
    return fetch(`http://localhost:5169/v1/api/appointments?day=${format(day, 'yyyy-MM-dd')}`)
        .then(result => result.json());
}

async function getByMonth(day) {
    return fetch(`http://localhost:5169/v1/api/appointments?month=${format(day, 'yyyy-MM')}`)
        .then(result => result.json());
}

async function post(title, start, end) {
   return fetch('http://localhost:5169/v1/api/appointments',
        {
            method: 'POST',
            headers: {
                'accept': 'text/plain',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "title": title,
                "startTime": start,
                "endTime": end
            })
        })
        .then(result => result.status);
}

async function put(id, title, start, end) {
    return fetch('http://localhost:5169/v1/api/appointments',
        {
            method: 'PUT',
            headers: {
                'accept': 'text/plain',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "id": id,
                "title": title,
                "startTime": start,
                "endTime": end
            })
        })
        .then(result => result.status);
}

async function deleteAppointment(id) {
    return fetch(`http://localhost:5169/v1/api/appointments/${id}`,
        {
            method: 'DELETE',
            headers: {
                'accept': 'text/plain',
                'Content-Type': 'application/json'
            },
        })
        // .then(result => result.status);
        .then(result => console.log(result));
}

export const appointmentService = {
    getByDay,
    getByMonth,
    post,
    put,
    deleteAppointment
};