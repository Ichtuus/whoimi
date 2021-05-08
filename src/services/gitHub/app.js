const http = require('http');
const url = require('url');
const fetch = require("node-fetch");

(function gitHubServer () {
    const baseURL = 'https://api.github.com';
    try {
        const server = http
            .createServer()
            .listen(1070)
            .on("listening", function () {
            console.log(`Node server listening on port 1070`);
        });

        server.on("request", async (request, response) => {
            response.setHeader('Access-Control-Allow-Origin', request.headers.origin);
            response.setHeader('Access-Control-Allow-Credentials', true);

            const username = url.parse(request.url,true).query.username;
            const repo = url.parse(request.url,true).query.repo;

            const headers = {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer '+ process.env.GITHUB_ACCESS_TOKEN
                }
            };

            const path = new URL(`http://${request.headers.host}${request.url}`);
            if (path.pathname === '/repositories' && request.method === 'GET') {
                getResponse(response, await getUserRepositories(headers, username))
            } else if (path.pathname === '/commits' && request.method === 'GET') {
                getResponse(response, await getCommitsByRepository(headers, username, repo))
            } else if (path.pathname === '/branches' && request.method === 'GET') {
                getResponse(response, await getBranchesByRepository(headers, username, repo))
            } else if (path.pathname === '/user' && request.method === 'GET') {
                getResponse(response, await getUserInfo(headers, username))
            } else {
                console.log('route does not exist');
            }
        })
    } catch (err) {
        console.error('ERROR', err);
    }

    async function getUserRepositories (headers, username) {
        return await fetch(`${baseURL}/users/${username}/repos`, headers)
            .then(res => res.json())
            .then(json => { return json })
    }

    async function getCommitsByRepository(headers, username, repo) {
        return await fetch(`${baseURL}/repos/${username}/${repo}/commits`, headers)
            .then(res => res.json())
            .then(json => { return json })
    }

    async function getBranchesByRepository(headers, username, repo) {
        return await fetch(`${baseURL}/repos/${username}/${repo}/branches`, headers)
            .then(res => res.json())
            .then(json => { return json })
    }

    async function getUserInfo(headers, username) {
        return await fetch(`${baseURL}/users/${username}`, headers)
            .then(res => res.json())
            .then(json => { return json })
    }

    function getResponse (response, data) {
        if (data) {
            response.writeHead(200, { "Content-Type": "application/json"});
            response.write(JSON.stringify(data));
            response.end();
        } else {
            console.log('API return empty value')
        }
    }

}) ();


