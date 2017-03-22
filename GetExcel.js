/**
 * Created by mc185249 on 3/22/2017.
 */
let request = require('request');

function downLoadExcel(parametro,url) {
    return new Promise((resolve,reject)=>{
        let buffers = [];
        let download = request.post({
            uri:url,
            headers:{
                'Content-Type':'application/x-www-form-urlencoded'
            },
            body: require('querystring').stringify(parametro)
        });
        download.on("data",(e)=>{
            buffers.push(e);
        });
        download.on("end",()=>{
            resolve(Buffer.concat(buffers));
        });
        download.on("error",(err)=>{
            reject(err)
        })
    })
}

module.exports = downLoadExcel;