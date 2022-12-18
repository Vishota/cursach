/*enum FetchType {
    TEXT,
    JSON
}*/

export async function post(url: string, data: Object, fetchType: string = 'text') {
    let body = new URLSearchParams();
    Object.keys(data).forEach(function(key) {
        body.append(key, (data as any)[key]);
    });
    return await fetch(url, {'method': 'post', body})
        .then(response => {
            switch(fetchType) {
                case 'text':
                    return response.text();
                default:
                    console.warn('Incorrect request type');
                case 'json':
                    return response.json();
            }
        });
}