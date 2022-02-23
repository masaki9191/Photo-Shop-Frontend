import axios from 'axios';
import qs from 'qs';
import { loadJSON } from '../utils';

axios.defaults.baseURL = 'http://localhost:8000';

export async function signup({ user }) {    
    const params = qs.stringify(user, { encode: false });
    const config = {
        method: 'post',
        url: `/api/register?${params}`,
    };
    try {
        const response = await axios(config);
        if(response.data.success){
            return response.data.data;
        }
    } catch (error) {
        throw error;
    }
}

export async function signin({ user }) {    
    const params = qs.stringify(user, { encode: false });
    var config = {
        method: 'post',
        url: `/api/login?${params}`,
    };

    try {
        const response = await axios(config);
        if(response.data.success){
            return response.data.data;
        }
    } catch (error) {
        throw error;
    }
}

export async function updateProfile({ user }) {    
    const data = new FormData() 
    data.append('name', user.name);
    const avatar = user.avatar;
    const token = loadJSON('token');
    if(avatar.length != 0){
        data.append('avatar', user.avatar);
    }
    
    var config = {
        method: 'post',
        url: `/api/profile/update`,
        data : data,        
        headers: { 
            'Authorization': `Bearer ${token}`
        }
    };

    try {
        const response = await axios(config);
        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        throw error;
    }
}

export async function getUser() {   
    const token = loadJSON('token');
    var config = {
        method: 'get',
        url: `/api/profile/show`,
        headers: { 
          'Authorization': `Bearer ${token}`
        }
    };
    try {
        const response = await axios(config);
        if (response.status === 200) {
            return response.data.data;
        }
    } catch (error) {
        throw error;
    }
}

export async function uploadmedia({ file }) {    
    const data = new FormData() 
    data.append('file', file);
    const token = loadJSON('token');
    
    var config = {
        method: 'post',
        url: `/api/products/dropzoneMedia`,
        data : data,        
        headers: { 
            'Authorization': `Bearer ${token}`
        }
    };

    try {
        const response = await axios(config);
        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        throw error;
    }
}

export async function productAdd({ product }) {    
    const token = loadJSON('token');

    var config = {
        method: 'post',
        url: `/api/products`,
        data : product,        
        headers: { 
            'Authorization': `Bearer ${token}`
        }
    };

    try {
        const response = await axios(config);
        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        throw error;
    }
}

export async function getProductList() {   
    const token = loadJSON('token');
    var config = {
        method: 'get',
        url: `/api/products`,
        headers: { 
          'Authorization': `Bearer ${token}`
        }
    };
    try {
        const response = await axios(config);
        if (response.status === 200) {
            return response.data.data;
        }
    } catch (error) {
        throw error;
    }
}

export async function getProductDetail({productId}) {   
    const token = loadJSON('token');
    var config = {
        method: 'get',
        url: `/api/products/${productId}`,
        headers: { 
          'Authorization': `Bearer ${token}`
        }
    };
    try {
        const response = await axios(config);
        if (response.status === 200) {
            return response.data.data;
        }
    } catch (error) {
        throw error;
    }
}

export async function getProductTotal() {   
    const token = loadJSON('token');
    var config = {
        method: 'get',
        url: `/api/products/total`
    };
    try {
        const response = await axios(config);
        if (response.status === 200) {
            return response.data.data;
        }
    } catch (error) {
        throw error;
    }
}

export async function productUpdate(productId, product) {    
    const token = loadJSON('token');

    var config = {
        method: 'PUT',
        url: `/api/products/${productId}`,
        data : product,
        headers: { 
            'Authorization': `Bearer ${token}`
        }
    };

    try {
        const response = await axios(config);
        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        throw error;
    }
}

export async function removeProduct({productId}) {    
    const token = loadJSON('token');
    var config = {
        method: 'DELETE',
        url: `/api/products/${productId}`,
        headers: { 
            'Authorization': `Bearer ${token}`
        }
    };

    try {
        const response = await axios(config);
        if (response.status === 200) {
            if(response.data.success) {
                return true;
            }
            else {
                return false;
            }
        }
    } catch (error) {
        throw error;
    }
}

export async function goRoom({productId}) {    
    const token = loadJSON('token');
    var config = {
        method: 'post',
        url: `/api/message/room`,
        headers: { 
            'Authorization': `Bearer ${token}`
        },
        data: {
            product_id: productId
        }        
    };

    try {
        const response = await axios(config);
        if (response.status === 200) {
            return response.data
        }
    } catch (error) {
        throw error;
    }
}

export async function getMessages({roomId}) {    
    const token = loadJSON('token');
    var config = {
        method: 'get',
        url: `/api/message/show`,
        headers: { 
            'Authorization': `Bearer ${token}`
        },
        params: {
            room_id: roomId
        }        
    };

    try {
        const response = await axios(config);
        if (response.status === 200) {
            return response.data.data;
        }
    } catch (error) {
        throw error;
    }
}

export async function getRooms() {    
    const token = loadJSON('token');
    var config = {
        method: 'get',
        url: `/api/message/index`,
        headers: { 
            'Authorization': `Bearer ${token}`
        }      
    };

    try {
        const response = await axios(config);
        if (response.status === 200) {
            return response.data.data;
        }
    } catch (error) {
        throw error;
    }
}

export async function sendMessage({ message }) {    
    const token = loadJSON('token');
    var config = {
        method: 'post',
        url: `/api/message/store`,
        headers: { 
            'Authorization': `Bearer ${token}`
        },
        data: message 
    };

    try {
        const response = await axios(config);
        if (response.status === 200) {
            if(response.data.success) {
                return true;
            }
            else {
                return false;
            }
        }
    } catch (error) {
        throw error;
    }
}

export async function getNotifications() {    
    const token = loadJSON('token');
    var config = {
        method: 'get',
        url: `/api/message/notification`,
        headers: { 
            'Authorization': `Bearer ${token}`
        }      
    };

    try {
        const response = await axios(config);
        if (response.status === 200) {
            return response.data.data;
        }
    } catch (error) {
        throw error;
    }
}

export async function test() {    
    const config = {
        method: 'get',
        url: `/test`,  
    };

    try {
        const response = await axios(config);
        if (response.status === 200) {
            return response.data.data;
        }
    } catch (error) {
        throw error;
    }
}

export async function setCart({productId}) {
    try {
        const response = await axios.get(`/api/add-cart/${productId}`);
        if (response.status === 200) {
            return response.data.data;
        }
    } catch (error) {
        throw error;
    }
}


export async function getCart() {
    try {
        const response = await axios.get(`/api/get-cart`);
        if (response.status === 200) {
            return response.data.data;
        }
    } catch (error) {
        throw error;
    }
}