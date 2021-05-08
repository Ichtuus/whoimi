const http = require('http')
const url = require('url')
const fetch = require("node-fetch")
const gitHubApiPort = process.env.VUE_APP_GITHUB_API_PORT

if (!gitHubApiPort) {
    console.error('Environment variable VUE_APP_GITHUB_API_PORT empty, please define it')
}

(function gitHubServer () {
    try {
        const server = http.createServer(function(request, response) {
            console.log('UUUUUUUUUUUUURL', request.url)

        })

        server.listen(1070)
        .on("listening", function () {
            console.log(`TikTok signer listening on port`)
        })

        server.on("request", async (request, response) => {
            setHeaderResponse(request, response)
            const headers = {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer '+ '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'
                }
            }

            let path = url.parse(request.url, true)

            if (path.pathname === '/github' && request.method === 'GET') {
                getResponse(response, await getUserRepositories(headers))
            } else if (path.pathname === '/github' && request.method === 'GET') {

            } else if (path.pathname === '/t' && request.method === 'GET') {

            } else if (path.pathname === '/f' && request.method === 'GET') {

            } else {
                console.log('route does not exist')
            }
        })

        async function getUserRepositories (headers) {
            return await fetch('https://api.github.com/users/ichtuus/repos', headers)
                .then(res => res.json())
                .then(json => { return json })
        }

        function setHeaderResponse (response, request) {
            response.setHeader('Access-Control-Allow-Origin', request.headers.origin)
            response.setHeader('Access-Control-Allow-Credentials', true)
        }

        function getResponse (response, data) {
            response.writeHead(200, { "Content-Type": "application/json"})
            response.write(JSON.stringify(data))
            response.end()
        }

    } catch (err) {
        console.error('ERROR', err)
    }
}) ()


