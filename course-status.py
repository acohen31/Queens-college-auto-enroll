import requests
from dotenv import load_dotenv
import os

load_dotenv()

my_fw_crm_v_ID = os.getenv('my_fw_crm_v_ID')
my_JSESSIONID = os.getenv('my_JSESSIONID')

url = "https://globalsearch.cuny.edu/CFGlobalSearchTool/CFSearchToolController?class_number_searched=MjU1MTE=&session_searched=MQ==&term_searched=MTIzOQ==&inst_searched=UXVlZW5zIENvbGxlZ2U="

headers = {
    "Cookie": f"_fw_crm_v={my_fw_crm_v_ID}!; OAMAuthnHintCookie=1; JSESSIONID={my_JSESSIONID}!"
}


response = requests.get(url, headers=headers)

if response.status_code == 200:

    if response.text.find("status_closed") == -1:
        print("Open")
    else: 
        print("Closed")