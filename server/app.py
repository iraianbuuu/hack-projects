from typing import Dict, List, Any
import bs4
import requests
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

LANGUAGES = ["python", "javascript", "html", "typescript", "java", "cpp", "php", "go", "css", "c"]

def fetch_github_page(**kwargs) -> str:
    try:
        params = '&'.join([f'{k}={v}' for k, v in kwargs.items()])
        url = 'https://github.com/topics/hacktoberfest?{}'.format(params)
        response = requests.get(url)
        response.raise_for_status()
        
        return response.text
    
    except requests.RequestException as e:
        raise HTTPException(status_code=502, detail=f"Error fetching data: {e}")

def parse_repositories(page_content: str) -> List[Dict[str, Any]]:
    soup = bs4.BeautifulSoup(page_content, 'html.parser')
    articles = soup.find_all("article")
    repositories = []

    for article in articles:
        repo_info = [a_tag.text.strip() for a_tag in article.find_all("a") if a_tag.text.strip()]

        if len(repo_info) >= 3 and "Star" in repo_info[2]:
            owner = repo_info[0]
            repo_name = repo_info[1]
            stars = repo_info[2][6:-1] if repo_info[2].startswith("Star\n") else repo_info[2]

            repositories.append({
                "user": owner,
                "repo": repo_name,
                "stars": stars,
            })

    return repositories

@app.get("/")
def index():
    return {"name": "github repo scraper", "author": "arpy8"}

@app.get("/all")
def get_all_repos():
    payload: Dict[str, Any] = {}

    for lang in LANGUAGES:
        page_content = fetch_github_page(l=lang)
        repositories = parse_repositories(page_content)
        payload[lang] = repositories

    return payload

@app.get("/data/{lang}")
def get_repos(lang: str):
    page_content = fetch_github_page(l=lang)
    repositories = parse_repositories(page_content)

    return repositories


if __name__=="__main__":
    import uvicorn
    uvicorn.run(app)