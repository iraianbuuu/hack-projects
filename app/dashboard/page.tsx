// 'use client';

import axios from 'axios';
import OverViewPage from './overview/_components/overview';

export const metadata = {
  title: 'HackProjects | Dashboard'
};

export default async function Page() {
  const lang = 'python';
  const response = await axios.get(
    `https://arpy8-github-repo-scraper.hf.space/data/${lang}`
  );
  const repo_info = response.data;

  return <OverViewPage repo_info={repo_info} />;
}
