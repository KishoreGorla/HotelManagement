import { API_BASE_URL, ACCESS_TOKEN, API_BASE_URL_GUEST,API_BASE_URL_ROOM,API_BASE_URL_RESERVATION,API_BASE_URL_PAYMENTS } from '../constants';

const request = (options) => {
    const headers = new Headers({
        'Content-Type': 'application/json',
    })
    
    if(localStorage.getItem(ACCESS_TOKEN)) {
        headers.append('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN))
    }

    const defaults = {headers: headers};
    options = Object.assign({}, defaults, options);

    return fetch(options.url, options)
    .then(response => 
        response.json().then(json => {
            if(!response.ok) {
                return Promise.reject(json);
            }
            return json;
        })
    );
};

export function getAllStaff(){
    return request({
        url: API_BASE_URL + "/users/staff",
        method: 'GET'
    });
}

export function deleteUser(id){
    return request({
        url: API_BASE_URL + "/users/staff/"+id,
        method: 'DELETE'
    });
}

export function getUserDetails(id){
    return request({
        url: API_BASE_URL + "/users/staff/"+id,
        method: 'GET'
    });
}

export function updateUser(updateUserRequest){
    return request({
        url: API_BASE_URL + "/user",
        method: 'PUT',
        body: JSON.stringify(updateUserRequest)
    });
}

export function getAllGuests(){
    return request({
        url: API_BASE_URL_GUEST + "/guests/all",
        method: 'GET'
    });
}

export function deleteGuest(id){
    return request({
        url: API_BASE_URL_GUEST + "/guests/"+id,
        method: 'DELETE'
    });
}

export function getGuestDetails(id){
    return request({
        url: API_BASE_URL_GUEST + "/guests/"+id,
        method: 'GET'
    });
}

export function updateGuest(updateGuestRequest){
    return request({
        url: API_BASE_URL_GUEST + "/guests/",
        method: 'PUT',
        body: JSON.stringify(updateGuestRequest)
    });
}

export function createGuest(createGuestRequest){
    return request({
        url: API_BASE_URL_GUEST + "/guests/",
        method: 'POST',
        body: JSON.stringify(createGuestRequest)
    });
}


export function getAllRooms(){
    return request({
        url: API_BASE_URL_ROOM + "/rooms/all",
        method: 'GET'
    });
}

export function deleteRoom(id){
    return request({
        url: API_BASE_URL_ROOM + "/rooms/"+id,
        method: 'DELETE'
    });
}

export function getRoomDetails(id){
    return request({
        url: API_BASE_URL_ROOM + "/rooms/"+id,
        method: 'GET'
    });
}

export function updateRoom(updateRoomsRequest){
    return request({
        url: API_BASE_URL_ROOM + "/rooms/",
        method: 'PUT',
        body: JSON.stringify(updateRoomsRequest)
    });
}

export function createRoom(createRoomRequest){
    return request({
        url: API_BASE_URL_ROOM + "/rooms/",
        method: 'POST',
        body: JSON.stringify(createRoomRequest)
    });
}

export function reserveRoom(reserveRoomRequest){
    return request({
        url: API_BASE_URL_RESERVATION + "/reservation/",
        method: 'POST',
        body: JSON.stringify(reserveRoomRequest)
    });
}


export function getAllReservations(){
    return request({
        url: API_BASE_URL_RESERVATION + "/reservation/all",
        method: 'GET'
    });
}

export function getReservationDetails(id){
    return request({
        url: API_BASE_URL_RESERVATION + "/reservation/"+id,
        method: 'GET'
    });
}


export function searchRoomDetails(checkindate,checkoutDate,guests){
    return request({
        url: API_BASE_URL_ROOM + "/rooms/search?checkinDate="+checkindate+"&checkoutDate="+checkoutDate+"&guests="+guests,
        method: 'GET'
    });
}

export function generateBill(billRequest){
    return request({
        url: API_BASE_URL_PAYMENTS + "/payments/issuebill",
        method: 'POST',
        body: JSON.stringify(billRequest)
    });
}
export function getBillingDetails(id){
    return request({
        url: API_BASE_URL_PAYMENTS + "/payments/bill/"+id,
        method: 'GET'
    });
}

export function makepayment(paymentRequest){
    return request({
        url: API_BASE_URL_PAYMENTS + "/payments/makepayment",
        method: 'POST',
        body: JSON.stringify(paymentRequest)
    });
}

export function login(loginRequest) {
    return request({
        url: API_BASE_URL + "/auth/signin",
        method: 'POST',
        body: JSON.stringify(loginRequest)
    });
}

export function signup(signupRequest) {
    return request({
        url: API_BASE_URL + "/auth/signup",
        method: 'POST',
        body: JSON.stringify(signupRequest)
    });
}

export function checkUsernameAvailability(username) {
    return request({
        url: API_BASE_URL + "/user/checkUsernameAvailability?username=" + username,
        method: 'GET'
    });
}

export function getCurrentUser() {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/user/me",
        method: 'GET'
    });
}
