import { useState, useEffect } from "react";

function PageUser() {
  const gitHub_token = import.meta.env.VITE_GithubTOKEN;

  const [all_repos, setAllrepos] = useState({ repos: [] });
  const [loading, setLoading] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);
  const [isFirstTime, setIsFirstTime] = useState(true);

  async function getUsersRepos(e) {
    setIsFirstTime(false);
    setLoading(true);
    setAllrepos({ repos: [] });

    const the_user = "microsoft";

    // e.preventDefault();

    // const form = e.target;
    // const formData = new FormData(form);
    // const formJson = Object.fromEntries(formData.entries());

    const url = "https://api.github.com/users";

    const myHeaders = new Headers();
    myHeaders.append("Accept", "application/vnd.github+json");
    myHeaders.append("Authorization", `Bearer ${gitHub_token}`);
    myHeaders.append("X-GitHub-Api-Version", "2022-11-28");

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`${url}/${the_user}/repos?per_page=30`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setAllrepos({
          repos: result,
        });

        console.log(result);

        setLoading(false);
      })
      .catch((error) => console.error(error));
  }

  function getRepoLanguages(url) {
    console.log(url);
    fetch(`${url}`)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);

        const languages = Object.keys(result).map((key) => (
          <option value={key}>{result[key]}</option>
        ));

        return languages;
      })
      .catch((error) => console.error(error));
  }

  function getDownloadFile(url) {
    const myHeaders = new Headers();
    // myHeaders.append("Accept", "application/vnd.github+json");
    myHeaders.append("Authorization", `Bearer ${gitHub_token}`);
    // myHeaders.append("X-GitHub-Api-Version", "2022-11-28");

    const requestOptions = {
      //   method: "GET",
      headers: myHeaders,
      //   redirect: "follow",
    };

    // console.log(url);
    // fetch(`${url}`)
    //   .then((response) => response.json())
    //   .then((result) => {
    //     console.log(result);

    //     const languages = Object.keys(result).map((key) => (
    //       <option value={key}>{result[key]}</option>
    //     ));

    //     return languages;
    //   })
    //   .catch((error) => console.error(error));

    fetch(url, requestOptions)
      .then((res) => res.blob())
      .then((blob) => {
        var file = window.URL.createObjectURL(blob);
        window.location.assign(file);
      });
  }

  useEffect(() => {
    getUsersRepos();
  }, []);

  return (
    <>
      {/* <div className="grid-container">
        {all_repos.repos.map((repo) => ( <h1>{repo.id}</h1>))}


        </div> */}

      <div className="grid-container">
        {all_repos.repos.map((repo) => (
          <div
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
              <div style={{ marginBottom: "0.5rem" }}>{repo.name}</div>
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

            {/* <div

              style={{
                flexGrow: "1",
                paddingLeft: "1rem",
                paddingRight: "1rem",
              }}
            >
              <hr />
            </div> */}

            <div
              style={{
                display: "flex",
                alignSelf: "center",
                color: "blue",
                flexGrow: "1",
              }}
            >
              {/* <a href={repo.downloads_url + "/zipball"}>VIEW REPOSITORY</a> */}
              {/* <input type="button" value="kim"  /> */}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default PageUser;
