const fs = require('fs')
const http = require('http')

function delay(n) {
    return new Promise(resolve => setTimeout(resolve, n))
}

const meta = '<meta charset="utf-8">'
const head = `<head>${meta}</head>`

const script = fs.readFileSync('src/script1.js')

const server = http.createServer(async (req, res) => {
    console.log('req.url', req.url)
    console.log(req.url === '/')
    if (req.url !== '/') {
        res.writeHead(200, {
            'content-encoding': 'utf-8',
            'content-type': 'text/javascript',
        })
        res.write(script)
        res.end()
        return
    }
    res.writeHead(200, {
        'transfer-encoding': 'chunked',
        'content-type': 'text/html',
    })
    res.write(`<!DOCTYPE html><html>${head}<body>`)

    await delay(2000)

    res.write('<div>first</div>')

    await delay(2000)

    const id = Math.random()

    res.write(`<div id="${id}">second</div>`)

    await delay(2000)

    res.write('<div>third</div>')

    await delay(2000)

    res.write(`<script src="src/script1.js" data-target-id="${id}"></script>`)

    await delay(2000)

    res.write('<div>fourth</div>')

    await delay(2000)

    res.end('</body></html>')
})

const port = 8080;
server.listen(port, () => {
    console.log('server is listening on port', port)
})
