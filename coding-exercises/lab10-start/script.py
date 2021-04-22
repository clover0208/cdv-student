import requests
import json
from pprint import pprint
from bs4 import BeautifulSoup

result=request.get("")
soup =BeautifulSoup(result.text,'html.parser')
table_rows

print("hello python")
offset=0
url_start="https://www.metmuseum.org/mothra/collectionlisting/search?artist=&department=&era=&geolocation=&material=&offset="
url_end="&pageSize=0&perPage=20&q=portrait&searchField=All&showOnly=&sortBy=Relevance"

all_artwork=[]
for offset in range(0,40,20):
    url = url_start+str(offset)+url_end
    print("\n\n[+] Requesting:" +url)


result = requests.get(url)

data =json.load(result.text)
artworks=data["results"]
print("first artwork in the request:")
pprint(artwork[0])
all_artwork = all_artworks+artworks



# with open("myData.json","w") as outfile:
#     json.dump(artworks,outfile,indent=4)
