import requests
from bs4 import BeautifulSoup

#Global variables
cookie_url = "https://globalsearch.cuny.edu/CFGlobalSearchTool/CFSearchToolController"

def status(url):
    session = requests.Session()
    response = session.get(cookie_url)
    html = response.text
    parser = BeautifulSoup(html, 'html.parser')
    option = parser.find_all('option')[1]
    termValue, termName = option['value'], option.text
    data = {
        "selectedInstName": "Queens College",
        "inst_selection": "QNS01",
        "selectedTermName": termName,
        "term_value": termValue,
        "next_btn": "Next"
    }
    response = session.post(cookie_url, data=data)
    status_response = session.get(url)

    if status_response.status_code == 200:

        if status_response.text.find("status_open") != -1:
            return True
        elif status_response.text.find("status_closed") != -1: 
            return False
        else:
            return "Error-incorrect html parsed"
