import bs4
import json
import requests
from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

def fetch_github_page(**kwargs):
    try:
        params = '&'.join([f'{k}={v}' for k, v in kwargs.items()])
        url = 'https://github.com/topics/hacktoberfest?{}'.format(params)
        response = requests.get(url)
        response.raise_for_status()
        return response.content
    except requests.RequestException as e:
        return f"Error fetching data: {e}"

def parse_repositories(page_content):
    soup = bs4.BeautifulSoup(page_content, 'html.parser')
    articles = soup.find_all("article")
    repositories = []

    for article in articles:
        repo_info = [a_tag.text.strip() for a_tag in article.find_all("a") if a_tag.text.strip()]

        if len(repo_info) >= 3 and "Star" in repo_info[2]:
            owner = repo_info[0]
            repo_name = repo_info[1]
            stars = repo_info[2]
            repo_link = f"https://github.com/{owner}/{repo_name}"

            repositories.append({
                "repo": repo_name,
                "owner": owner,
                "stars": stars,
                "link": repo_link
            })

    return repositories

@app.route('/data/<string:lang>')
def get_repos(lang):
    page_content = fetch_github_page(l=lang)
    if isinstance(page_content, str) and page_content.startswith("Error"):
        return page_content

    repositories = parse_repositories(page_content)
    return json.dumps(repositories, indent=4)

if __name__ == '__main__':
    app.run(port=8000, debug=True)