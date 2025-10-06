"use client";

export default function RepoCard({
  user,
  repo,
}: {
  user: string;
  repo: string;
}) {
  return (
    <div
      className="rounded-xl border bg-card text-card-foreground shadow hover:drop-shadow-lg cursor-pointer"
      onClick={() =>
        window.open(`https://github.com/${user}/${repo}`, "_blank")
      }
    >
      <div className="flex flex-row items-center justify-between p-6 pb-0">
        <h3 className="tracking-tight text-sm font-medium text-gray-500">
          <a
            href={`https://github.com/${user}`}
            target="_blank"
            className="hover:text-amber-500 hover:drop-shadow-lg"
          >
            home-assistant
          </a>
        </h3>
        <a href={`https://github.com/${user}/${repo}`} target="_blank">
          <i className="bi bi-github"></i>
        </a>
      </div>
      <div className="p-6 pt-0">
        <div className="pb-2 text-2xl font-bold">
          <a href={`https://github.com/${user}/${repo}`} target="_blank">
            core
          </a>
        </div>
        <p className="text-xs text-muted-foreground">
          <a
            href={`https://github.com/${user}/${repo}/stargazers`}
            target="_blank"
            className="hover:text-amber-500"
          >
            <span className="hover:text-amber-500">
              <i className="bi bi-star"></i> &nbsp; 73.2k
            </span>
          </a>
          <a
            href={`https://github.com/${user}/${repo}/stargazers`}
            className="px-3"
            target="_blank"
          >
            <span className="hover:text-amber-500">
              <i className="bi bi-bullseye"></i> &nbsp; 73.2k
            </span>
          </a>
        </p>
      </div>
    </div>
  );
}