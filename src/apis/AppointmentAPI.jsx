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
    .then(result => result.json())
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
        .then(result => result.json())
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
        .then(result => result.status);
}

async function mapAppointments(arr) {
    const arr1 = [];
    arr.forEach(element => {
        var start = new Date(element.startTime);
        var id = start.getHours();
        if(arr1[id] != null && arr1[id].length != 0)
        {
            arr1[id] = [...arr1[id], element]
        }
        else{
            
            arr1[id] = [element];
        }
    });
    return arr1;
}

export const appointmentService = {
    getByDay,
    getByMonth,
    post,
    put,
    deleteAppointment,
    mapAppointments
};
