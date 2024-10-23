function RepoCard(repo) {
    return <div
    className="grid-item"
    key={repo.id}
    style={{
      padding: "1rem",
    }}
  >
    <div
      style={{
        display: "flex",
        flexGrow: "1",
        flexDirection: "column",
      }}
    >
      <div className="text" style={{ marginBottom: "0.5rem" }}>{repo.name}</div>
      <div
        className="text"
        style={{ marginBottom: "0.5rem", fontSize: "13px" }}
      >
        {repo.description}
      </div>

      <div style={{ marginBottom: "0.5rem", fontSize: "13px" }}>
        <span style={{ color: "red" }}>
          {repo.language}
          {
            //  getRepoLanguages(repo.languages_url)
          }
        </span>
      </div>
    </div>

    <div
      style={{
        display: "flex",
        flexGrow: "1",
      }}
    >
      <div
        style={{
          flexGrow: "1",
          textAlign: "center",
          marginBottom: "10px",
        }}
      >
        <div>Star</div>
        <div>{repo.stargazers_count}</div>
      </div>
      <div
        style={{
          flexGrow: "1",
          textAlign: "center",
        }}
      >
        <div>View</div>
        <div>{repo.watchers_count}</div>
      </div>
    </div>

    <div
      style={{
        display: "flex",
        alignSelf: "center",
        color: "blue",
        flexGrow: "1",
      }}
    >
      {/* <a href={"https://corsproxy.io/?"+encodeURIComponent(repo.url+"/zipball")} target="_blank">VIEW REPOSITORY</a> */}
      <a href={repo.url+"/zipball"} target="_blank">Download</a>

      {/* https://corsproxy.io/?' + encodeURIComponent('https://api.github.com/repos/k1tsanapong/react-search-user-repo-test/zipball' */}
      {/* <button type="button" onClick={getDownloadFile}>Click Me!</button> */}
      </div>
  </div>
}

export default RepoCard;