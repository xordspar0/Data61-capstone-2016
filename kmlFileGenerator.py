import httplib
import json

def application(environ, start_response):
    kml = environ['wsgi.input'].read()

    api_dev_key = 'd0d28998a18c515e9706f159dbd348fa'
    api_option = 'paste'
    api_paste_code = kml

    # Get the URL of the KML file from paste.kde.org.
    request_data = {
        'data': kml,
        'language': 'xml'
    }

    request_body = json.dumps(request_data).encode('utf-8')

    post_connection = httplib.HTTPSConnection('paste.kde.org')
    post_connection.request('POST', '/api/json/create', request_body, {'Content-Type': 'application/json'})
    post_data = json.loads(post_connection.getresponse().read())

    response_body = 'paste.kde.org/{}/{}/raw'.format(post_data['result']['id'], post_data['result']['hash'])

    # Send the URL back to the client.
    status = '200 OK'
    response_headers = [('Content-Type', 'application/vnd.google-earth.kml+xml; charset=utf-8'),
                        ('Content-Length', str(len(response_body)))]
    start_response(status, response_headers)

    return response_body

