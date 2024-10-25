'use client';

import PageContainer from '@/components/layout/page-container';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { resolvePtr } from 'dns';

interface Repository {
  id: number;
  name: string;
  owner: {
    login: string;
  };
}

var repo_info = [
  {
    repo: 'Python',
    owner: 'TheAlgorithms',
    stars: 'Star\n 193k',
    link: 'https://github.com/TheAlgorithms/Python'
  },
  {
    repo: 'transformers',
    owner: 'huggingface',
    stars: 'Star\n 134k',
    link: 'https://github.com/huggingface/transformers'
  },
  {
    repo: 'core',
    owner: 'home-assistant',
    stars: 'Star\n 72.8k',
    link: 'https://github.com/home-assistant/core'
  },
  {
    repo: 'ansible',
    owner: 'ansible',
    stars: 'Star\n 62.7k',
    link: 'https://github.com/ansible/ansible'
  },
  {
    repo: 'sherlock',
    owner: 'sherlock-project',
    stars: 'Star\n 59.8k',
    link: 'https://github.com/sherlock-project/sherlock'
  },
  {
    repo: 'scrapy',
    owner: 'scrapy',
    stars: 'Star\n 52.9k',
    link: 'https://github.com/scrapy/scrapy'
  },
  {
    repo: 'MetaGPT',
    owner: 'geekan',
    stars: 'Star\n 44.5k',
    link: 'https://github.com/geekan/MetaGPT'
  },
  {
    repo: 'sentry',
    owner: 'getsentry',
    stars: 'Star\n 39k',
    link: 'https://github.com/getsentry/sentry'
  },
  {
    repo: 'gradio',
    owner: 'gradio-app',
    stars: 'Star\n 33.4k',
    link: 'https://github.com/gradio-app/gradio'
  },
  {
    repo: 'OpenBB',
    owner: 'OpenBB-finance',
    stars: 'Star\n 33.1k',
    link: 'https://github.com/OpenBB-finance/OpenBB'
  },
  {
    repo: 'mindsdb',
    owner: 'mindsdb',
    stars: 'Star\n 26.7k',
    link: 'https://github.com/mindsdb/mindsdb'
  },
  {
    repo: 'redash',
    owner: 'getredash',
    stars: 'Star\n 26.2k',
    link: 'https://github.com/getredash/redash'
  },
  {
    repo: 'python-telegram-bot',
    owner: 'python-telegram-bot',
    stars: 'Star\n 26.2k',
    link: 'https://github.com/python-telegram-bot/python-telegram-bot'
  },
  {
    repo: 'diffusers',
    owner: 'huggingface',
    stars: 'Star\n 25.7k',
    link: 'https://github.com/huggingface/diffusers'
  },
  {
    repo: 'manim',
    owner: 'ManimCommunity',
    stars: 'Star\n 25.1k',
    link: 'https://github.com/ManimCommunity/manim'
  },
  {
    repo: 'locust',
    owner: 'locustio',
    stars: 'Star\n 24.9k',
    link: 'https://github.com/locustio/locust'
  },
  {
    repo: 'supervision',
    owner: 'roboflow',
    stars: 'Star\n 23.9k',
    link: 'https://github.com/roboflow/supervision'
  }
];
console.log(typeof repo_info);
console.log(repo_info);

async function fetch_data(): Promise<Repository[]> {
  try {
    const response = await fetch(`http://127.0.0.1:8000/data`); //server ip

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const repo_info: Repository[] = await response.json();
    return repo_info;
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
}

export default function OverViewPage() {
  return (
    <PageContainer scrollable>
      <div className="space-y-2">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-2xl font-bold tracking-tight"></h2>
          <div className="hidden items-center space-x-2 md:flex"></div>
        </div>
        <Tabs defaultValue="python" className="space-y-4">
          <TabsList>
            <TabsTrigger value="python">Python</TabsTrigger>
            <TabsTrigger value="javascript">JavaScript</TabsTrigger>
            <TabsTrigger value="html">HTML</TabsTrigger>
            <TabsTrigger value="typescript">TypeScript</TabsTrigger>
            <TabsTrigger value="java">Java</TabsTrigger>
            <TabsTrigger value="cpp">C++</TabsTrigger>
            <TabsTrigger value="php">PHP</TabsTrigger>
            <TabsTrigger value="go">Go</TabsTrigger>
            <TabsTrigger value="css">CSS</TabsTrigger>
            <TabsTrigger value="c">C</TabsTrigger>
          </TabsList>
          <TabsContent value="python" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {repo_info.map((repo) => (
                <a href={`${repo.link}`} target="_blank" key={repo.repo}>
                  <Card className="card-header">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium text-gray-500">
                        <a
                          href={`https://github.com/${repo.owner}`}
                          target="_blank"
                        >
                          {repo.owner}
                        </a>
                      </CardTitle>
                      <a href={repo.link} target="_blank">
                        <i className="bi bi-github"></i>
                      </a>
                    </CardHeader>
                    <CardContent>
                      <div className="pb-2 text-2xl font-bold">
                        <a href={`${repo.link}`} target="_blank">
                          {repo.repo}
                        </a>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        <a href={`${repo.link}/stargazers`} target="_blank">
                          <i className="bi bi-star"></i>
                          &nbsp;&nbsp;&nbsp;
                          {repo.stars.replace('Star', '').trim()}
                        </a>
                        <a
                          href={`${repo.link}/stargazers`}
                          className="px-3"
                          target="_blank"
                        >
                          <i className="bi bi-bullseye"></i>
                          &nbsp;&nbsp;&nbsp;
                          {repo.stars.replace('Star', '').trim()}
                        </a>
                      </p>
                    </CardContent>
                  </Card>
                </a>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </PageContainer>
  );
}
