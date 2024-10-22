import { useState, useEffect } from "react";
import "./App.css";
function App() {
  const gitHub_token = import.meta.env.VITE_GithubTOKEN;
  const [count, setCount] = useState(0);

  const [search, setSearch] = useState("");
  const [all_repos, setRepo] = useState({ repos: [] });

  const [loading, setLoading] = useState(false);

  useEffect(() => {}, []);

  async function handleSubmit(e) {
    setLoading(true);
    setRepo({ repos: [] });

    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);

    const formJson = Object.fromEntries(formData.entries());
    console.log(formJson);

    const url = "https://api.github.com/search/users?q=";

    const myHeaders = new Headers();
    myHeaders.append("Accept", "application/vnd.github+json");
    myHeaders.append("Authorization", `Bearer ${gitHub_token}`);
    myHeaders.append("X-GitHub-Api-Version", "2022-11-28");

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    // console.log(form)
    // console.log(formData)

    fetch(
      `https://api.github.com/search/users?q=${formJson.theSearch}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setRepo({
          repos: result.items,
        });

        setLoading(false);
      })
      .catch((error) => console.error(error));
  }

  return (
    <>
      <div style={{ display: "flex" }}>
        <div
          className="github-logo"
          style={{ flexGrow: 1, textAlign: "center" }}
        >
          <img src="/gitHub_logo_2013.webp" />
        </div>

        <div className="the-search" style={{ flexGrow: 1 }}>
          <h1>Quiz using GitHub API v3</h1>
          <p>
            Copy by <span style={{ color: "green" }}>Kitsanapong Warit</span>
          </p>

          <form onSubmit={handleSubmit}>
            <input
              name="theSearch"
              type="text"
              style={{ marginRight: "10px" }}
            />
            <input type="submit" value="Search" />
          </form>
        </div>
      </div>

      {loading && (
        <div
          style={{ justifySelf: "center", marginTop: "10rem" }}
          class="loader"
        ></div>
      )}

      <div className="grid-container">
        {all_repos.repos.map((repo) => (
          <div className="grid-item" key={repo.id}>
            <div style={{ display: "flex", flexGrow: "2" }}>
              <div style={{ alignContent: "center" }}>
                <img src={repo.avatar_url} alt="Avatar" class="avatar" />
              </div>
              <div style={{ alignContent: "center" }}>{repo.login} &nbsp;</div>

              <a
                style={{ alignContent: "center" }}
                href={repo.html_url}
                target="_blank"
              >
                <i class="material-icons">open_in_new</i>
              </a>
            </div>

            <div
              style={{
                display: "flex",
                alignSelf: "end",
                paddingRight: "1rem",
                marginTop: "auto",
                flexGrow: "1",
              }}
            >
              Score : {repo.score}
            </div>

            <div
              style={{
                flexGrow: "1",
                paddingLeft: "1rem",
                paddingRight: "1rem",
              }}
            >
              <hr />
            </div>

            <div
              style={{
                display: "flex",
                alignSelf: "center",
                color: "blue",
                flexGrow: "1",
              }}
            >
              <a href={repo.html_url + "?tab=repositories"} target="_blank">
                {" "}
                VIEW REPOSITORY
              </a>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
