import config from './config';

export default class Data {

    api(path, method = 'GET', body = null, requiresAuth = false, credentials = null) {
        const url = config.apiBaseUrl + path;

        const options = {
            method,
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
            },
        };

        if (body !== null) {
            options.body = JSON.stringify(body);
        }

        if (requiresAuth) {
            const encodedCredentials = btoa(`${credentials.email}:${credentials.password}`);

            options.headers['Authorization'] = `Basic ${encodedCredentials}`;
        }

        return fetch(url, options);
    }

    async getUser(email, password) {
        const response = await this.api('/users', 'GET', null, true, { email, password});
        if (response.status === 200) {
            return response.json().then(data => data); 
        } else if (response.status === 401) {
            return null;
        } else {
            throw new Error();
        }
    }

    async createUser(user) {
        const response = await this.api('/users', 'POST', user); 
        if (response.status === 201) {
            return []; 
        } else if (response.status === 400) {
            return response.json().then(data => {
                return data.errors; 
            }); 
        } else {
            throw new Error();
        }   
    }

    async createCourse(course, email, password) {
        const response = await this.api('/courses', 'POST', course, true, {email, password}); 
        if (response.status === 201) {
            return []; 
        } else if (response.status === 400) {
            return response.json().then(data => {
                return data.errors; 
            });
        } else {
            throw new Error();
        }
    }

    async updateCourse(courseId, course, email, password){
        const response = await this.api(`/courses/${courseId}`, 'PUT', course, true, {email, password}); 
        if (response.status === 204) {
            return []; 
        } else if (response.status === 400) {
            return response.json().then(data => {
                return data.errors; 
            });
        } else {
            throw new Error();
        }
    }

    async deleteCourse(courseId, email, password){
        const response = await this.api(`/courses/${courseId}`, 'DELETE', null, true, {email, password}); 
        if (response.status === 204) {
            return []; 
        } else if (response.status === 400) {
            return response.json().then(data => {
                return data.errors; 
            });
        } else {
            throw new Error();
        }
    }
}