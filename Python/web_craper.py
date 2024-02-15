"""
This is a collection of functions that perform various tasks related to
web scraping and parsing HTML.
"""
from urllib.parse import urlparse
import requests
from bs4 import BeautifulSoup
from inflection import titleize
from requests.exceptions import RequestException


def post_formatter(url):
    '''
    This function takes a URL as input and returns the formatted title
    of a post if the URL contains '/posts/', otherwise it returns None.
    '''
    return (
        titleize(url.split('/')[-1].replace('-', ' '))
        if '/posts/' in url else None
    )


def get_html(url, session=None):
    '''
    This function takes a URL and an optional session object as input
    and returns the HTML content of the webpage.
    It uses the requests library to make HTTP requests and handles exceptions.
    If the URL is not valid, it returns None.
    '''
    if not is_valid_url(url):
        return None

    try:
        response = (session.get(url, timeout=5)
                    if session
                    else requests.get(url, timeout=5))

        return response.text if response.status_code == 200 else None
    except RequestException as e:
        print(f"An error occurred: {e}")
        return None


def is_valid_url(url):
    '''
    This function takes a URL as input and checks if it is a valid URL
    by parsing it using the urlparse function from the urllib.parse module.
    It returns True if the URL is valid, otherwise it returns False.
    '''
    parsed_url = urlparse(url)
    return all([parsed_url.scheme, parsed_url.netloc])


def parse_links(html):
    '''
    This function takes HTML content as input and uses the
    BeautifulSoup library to parse the HTML and extract all the anchor tags
    with href attributes. It returns a list of BeautifulSoup Tag objects
    representing the anchor tags.
    '''
    soup = BeautifulSoup(html, 'html.parser')
    return soup.select('a[href]')


def get_links(url):
    '''
    This function takes a URL as input, calls the `get_html` function
    to retrieve the HTML content of the webpage, and then calls
    the `parse_links` function to extract the anchor tags.
    It returns a list of anchor tags.
    '''
    html = get_html(url)
    return parse_links(html) if html else []


def get_post_titles(links):
    '''
    This function takes a list of anchor tags as input and uses
    the `post_formatter` function to extract the formatted titles of the posts
    from the href attributes.
    It returns a generator object that yields the post titles.
    '''
    return (
        post_formatter(link.get('href'))
        for link in links if '/posts/' in link.get('href')
    )


def print_titles(titles):
    '''
    This function takes a generator object of post titles as input
    and prints each title.
    '''
    for title in titles:
        print(title)


# Main section where it
# defines a URL,
# calls the `get_links` function to retrieve the anchor tags,
# calls the `get_post_titles` function to extract the post titles,
# calls the `print_titles` function to print the titles.
URL = 'http://www.dailysmarty.com/topics/python'
LINKS = get_links(URL)
TITLES = get_post_titles(LINKS)
print_titles(TITLES)
