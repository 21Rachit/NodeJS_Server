const http=require('http');
const fs=require('fs');
const path=require('path');

const hostname='localhost';
const port=3000;

const server=http.createServer((req,res)=> { 
console.log('request for '+req.url+' by method '+req.method);

if(req.method=='GET')
{
var fileurl;

if(req.url=='/')
fileurl='/index.html';
else
fileurl=req.url;

var filepath=path.resolve('./public'+fileurl);
const filext=path.extname(filepath);
if(filext=='.html')
{
fs.exists(filepath,(exists)=>{
	if(!exists){
res.statusCode=404;
res.setHeader('Content-Type','text/html');
res.end('<html><body><h1>Error 404:'+fileurl+'does not exist </h1></body></html>');

	}
	res.statusCode=200;
	res.setHeader('Content-Type','text/html');
	fs.createReadStream(filepath).pipe(res);
})	
}
else
{
res.statusCode=404;
res.setHeader('Content-Type','text/html');
res.end('<html><body><h1>Error 404:'+fileurl+'not a HTML file  </h1></body></html>');
}
}
else
{
res.statusCode=404;
res.setHeader('Content-Type','text/html');
res.end('<html><body><h1>Error 404: Not a GET Request </h1></body></html>');
}


});
server.listen(port,hostname,()=>{
console.log(`server running at http://${hostname}:${port}`);
});