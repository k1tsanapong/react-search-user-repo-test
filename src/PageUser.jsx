import { useState, useEffect } from "react";
import { Routes, Route, useParams } from "react-router-dom";

import RepoCard from "./components/RepoCard";

function PageUser() {
  let { login } = useParams();

  console.log(login);

  const gitHub_token = import.meta.env.VITE_GITHUB_TOKEN_2;

  const [all_repos, setAllrepos] = useState({ repos: [] });
  const [loading, setLoading] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);
  const [isFirstTime, setIsFirstTime] = useState(true);
  const [public_repos, setPublicRepos] = useState(0);

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

    fetch(`${url}/${login}/repos?per_page=100`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.status == "404") {
          setAllrepos({
            repos: [],
          });
        } else {
          setAllrepos({
            repos: result,
          });
        }
        setLoading(false);
      })
      .catch((error) => console.error(error));

    fetch(`${url}/${login}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.status == undefined) {
          setPublicRepos(result.public_repos);
        }
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

  useEffect(() => {
    getUsersRepos();
  }, []);

  return (
    <>
      <div style={{ marginLeft: "50px", marginBottom: "1rem" }}>
        <h1>{login}</h1>
        <h4>Repositories on Github</h4>
      </div>

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

      <div className="grid-container" style={{marginBottom: "2rem"}}>
        {all_repos.repos.map((repo) => RepoCard(repo))}
      </div>
 
      {/* <div>
        {Math.ceil(public_repos/30)}

        <div class="pagination">
  <a href="#">&laquo;</a>
  <a href="#">1</a>
  <a href="#">2</a>
  <a href="#">3</a>
  <a href="#">4</a>
  <a href="#">5</a>
  <a href="#">6</a>
  <a href="#">&raquo;</a>
</div>
        
      </div> */}


    </>
  );
}

export default PageUser;
