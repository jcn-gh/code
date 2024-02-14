"""
This code snippet is a script that scrapes a webpage
and extracts titles from the URLs found in the page.
It uses the requests library to make a GET request to a specified URL,
and then uses BeautifulSoup to parse the HTML response.
It finds all 'a' tags in the parsed HTML and extracts
the titles from the URLs using the post_formatter function.
The titles are then stored in a list and printed out.
The post_formatter function formats the URLs by removing unnecessary parts,
replacing hyphens with spaces, and capitalizing the words.
The code snippet demonstrates how to use requests, BeautifulSoup,
and inflection libraries to scrape and format data from a webpage.
"""

import requests
from bs4 import BeautifulSoup
from inflection import titleize

# Make a GET request to the URL with a timeout
r = requests.get('http://www.dailysmarty.com/topics/python', timeout=5)

# Parse the HTML response
soup = BeautifulSoup(r.text, 'html.parser')

# Find all 'a' tags in the parsed HTML
links = soup.find_all('a')

# Initialize an empty list to store the titles
titles = []


# Function to format and extract titles from URLs
def post_formatter(url):
    """
    Function to format the given URL into a title
    and add it to the list of titles.

    Parameters:
    url (str): The URL to be formatted into a title.

    Returns:
    None
    """
    if 'posts' in url:
        url = url.split('/')[-1]
        url = url.replace('-', ' ')
        url = titleize(url)
        titles.append(url)


# Iterate over the links and call the post_formatter function
for link in links:
    if link.get('href') is None:
        continue
    else:
        post_formatter(link.get("href"))

# Print the titles
for title in titles:
    print(title)
