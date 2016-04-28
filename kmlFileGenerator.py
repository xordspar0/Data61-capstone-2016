#!/usr/bin/env python3

def application(environ, start_response):
    response_body = environ['wsgi.input'].read()

    status = '200 OK'
    response_headers = [('Content-Type', 'application/vnd.google-earth.kml+xml; charset=utf-8'),
                        ('Content-Length', str(len(response_body)))]
    start_response(status, response_headers)

    return response_body

