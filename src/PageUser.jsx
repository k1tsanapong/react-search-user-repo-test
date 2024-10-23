import { useState, useEffect } from "react";

import { Routes, Route, useParams } from "react-router-dom";

function PageUser() {
  let { login } = useParams();

  console.log(login);

  const gitHub_token = import.meta.env.VITE_GithubTOKEN;

  const [all_repos, setAllrepos] = useState({ repos: [] });
  const [loading, setLoading] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);
  const [isFirstTime, setIsFirstTime] = useState(true);

  async function getUsersRepos(e) {
    setIsFirstTime(false);
    setLoading(true);
    setAllrepos({ repos: [] });

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

    fetch(`${url}/${login}/repos?per_page=30`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result.status);


        if (result.status == "404")
        {
            setAllrepos({
                repos: [],
              });
        }

       else {
        setAllrepos({
            repos: result,
          });

       }
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
    myHeaders.append("Accept", "application/vnd.github+json");
    myHeaders.append("Authorization", `token ${gitHub_token}`);
    myHeaders.append("X-GitHub-Api-Version", "2022-11-28");
    myHeaders.append("Access-Control-Allow-Origin", "*");
    myHeaders.append("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    myHeaders.append("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
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
  

    url = 'https://corsproxy.io/?' + encodeURIComponent('https://api.github.com/repos/k1tsanapong/react-search-user-repo-test/zipball');

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
      {loading && (
        <div
          style={{ justifySelf: "center", marginTop: "10rem" }}
          className="loader"
        ></div>
      )}

      {all_repos.repos.length == 0 && loading == false && (
        <div style={{ justifySelf: "center" }}>
          <img src="https://media1.tenor.com/m/jotyiHEoUGUAAAAC/anime.gif" />{" "}
        </div>
      )}

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
        ))}
      </div>
    </>
  );
}

export default PageUser;
