import axios from 'axios'
import { mainUrl } from './mainUrl';

export const addUser = data => axios.post(`${mainUrl}/users/adduser`, data);
export const loginUser = data => axios.post(`${mainUrl}/users/loginuser`, data);
// export const bookSlot = data => axios.post(`${mainUrl}/users/bookslot`, data);
// export const locationBooking = data => axios.post(`${mainUrl}/users/locationslot`, data);
// export const getSlots = () => axios.get(`${mainUrl}/users/getslots`);
// export const getBookingData = data => axios.post(`${mainUrl}/users/getbookingdata`,data);
// export const getHistory = data => axios.post(`${mainUrl}/users/gethistory`,data);
// export const getMonths = data => axios.post(`${mainUrl}/users/getmonths`,data);
// export const getDates = data => axios.post(`${mainUrl}/users/getdates`,data);


export const getDates = data =>axios.post(`${mainUrl}/users/getdates`,data, {
    headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('_token')
    }
});
export const bookSlot = data => axios.post(`${mainUrl}/users/bookslot`,data, {
    headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('_token')
    }
    
});
export const locationBooking = data => axios.post(`${mainUrl}/users/locationslot`, data, {
    headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('_token')
    }
});
export const getSlots = () => axios.get(`${mainUrl}/users/getslots`, {
    headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('_token')
    }
});
export const getBookingData = data => axios.post(`${mainUrl}/users/getbookingdata`, data, {
    headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('_token')
    }
});

export const getHistory = data => axios.post(`${mainUrl}/users/gethistory`, data, {
    headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('_token')
    }
});
export const getMonths = data => axios.post(`${mainUrl}/users/getmonths`, data, {
    headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('_token')
    }
});


