'use client';

import 'bootstrap-icons/font/bootstrap-icons.css';
import PageContainer from '@/components/layout/page-container';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface RepoInfo {
  repo: number;
  owner: string;
  stars: string;
  link: string;
}

interface OverViewPageProps {
  repo_info: RepoInfo[];
}

// Use the defined props type in your component
export default function OverViewPage({ repo_info }: OverViewPageProps) {
  return (
    <PageContainer scrollable>
      <div className="space-y-2">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-2xl font-bold tracking-tight">
            Repository Overview
          </h2>
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
              {repo_info.map((repo, index) => (
                <a href={`${repo.link}`} target="_blank" key={index}>
                  <Card
                    className="card-header cursor-pointer hover:drop-shadow-lg"
                    key={index}
                  >
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium text-gray-500">
                        <a
                          href={`https://github.com/${repo.owner}`}
                          target="_blank"
                          className="hover:underline hover:drop-shadow-lg"
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
                        <a
                          href={`${repo.link}/stargazers`}
                          target="_blank"
                          className="hover:text-amber-500"
                        >
                          <span className="hover:text-amber-500">
                            <i className="bi bi-star"></i> &nbsp;{' '}
                            {repo.stars.replace('Star', '').trim()}
                          </span>
                        </a>
                        <a
                          href={`${repo.link}/stargazers`}
                          className="px-3"
                          target="_blank"
                        >
                          <span className="hover:text-amber-500">
                            <i className="bi bi-bullseye"></i> &nbsp;{' '}
                            {repo.stars.replace('Star', '').trim()}
                          </span>
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
