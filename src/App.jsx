import { useState, useEffect } from "react";
import "./App.css";
function App() {

  const gitHub_token = import.meta.env.VITE_GithubTOKEN;
  const [count, setCount] = useState(0);
  const [all_repos, setRepo] = useState({ repos: [] });

  console.log(gitHub_token)

  useEffect(() => {
    async function getData() {
      const url = "https://api.github.com/search/users?q=k1tsanapong";

      const myHeaders = new Headers();
      myHeaders.append("Accept", "application/vnd.github+json");
      myHeaders.append(
        "Authorization",
        `Bearer ${gitHub_token}`
      );
      myHeaders.append("X-GitHub-Api-Version", "2022-11-28");

      const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };

      fetch("https://api.github.com/search/users?q=Microsoft", requestOptions)
        .then((response) => response.json())
        .then((result) => {
          setRepo({
            repos: result.items,
          });
        })
        .catch((error) => console.error(error));
    }

    getData();
  }, []);

  return (
    <>
    
      {/* <div>
     <div className="github-logo" style={{ textAlign: "center" }}>
        <img src='/gitHub_logo_2013.webp' />
      </div>

      <div className="the-search">
        <h1>Quiz using GitHub API v3</h1>
        <p>Copy by Kitsanapong Warit</p>

        <input type="text" />
        <input type="button" value="Search" />

      </div>
     </div> */}

      <div className="grid-container">
        {all_repos.repos.map((repo) => (
          <div className="grid-item" key={repo.id}>
            <div style={{ display: "flex",  flexGrow: "2" }}>
              
              <div style={{alignContent:"center"}}>
              <img src={repo.avatar_url} alt="Avatar" class="avatar" />
              </div>                 
              <div style={{alignContent: "center",}}>{repo.login} &nbsp;</div>

              <a style={{alignContent: "center"}}href={repo.html_url} target="_blank">
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


<div style={{flexGrow: "1", paddingLeft:"1rem", paddingRight:"1rem"}}>
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
