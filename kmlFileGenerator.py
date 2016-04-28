import httplib

def application(environ, start_response):
    kmlUri = environ['wsgi.input'].read()

    api_dev_key = 'd0d28998a18c515e9706f159dbd348fa'
    api_option = 'paste'
    api_paste_code = kmlUri

    # Get the URL of the KML file from Pastebin.com.
    request_body = 'api_dev_key={}&api_option={}&api_paste_code={}'.format(
        api_dev_key,
        api_option,
        api_paste_code
    ).encode('utf-8')

    request_connection = httplib.HTTPConnection('pastebin.com', 80)
    request_connection.request('POST', '/api/api_post.php', request_body, {'Content-Type': 'application/x-www-form-urlencoded'})
    response_body = request_connection.getresponse().read()

    # Send the URL back to the client.
    status = '200 OK'
    response_headers = [('Content-Type', 'application/vnd.google-earth.kml+xml; charset=utf-8'),
                        ('Content-Length', str(len(response_body)))]
    start_response(status, response_headers)

    return response_body

