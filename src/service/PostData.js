export function PostData(type, userData){
    let BaseURL= 'http://192.168.22.130/restful.php';

    return new Promise((resolve, reject) =>{
        fetch(BaseURL+type, {
            method:'POST',
            body:JSON.stringify(userData)
        })
        .then((response)=> response.json())
        .then ((res) =>{
            resolve(res);
        })
        .catch((error) =>{
            reject(error);
        });
    });
}