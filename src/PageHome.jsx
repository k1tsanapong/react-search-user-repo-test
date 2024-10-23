import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import "./App.css";
function PageHome() {
  const gitHub_token = import.meta.env.VITE_GithubTOKEN;

  const [all_users, setAllUsers] = useState({ users: [] });
  const [loading, setLoading] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);
  const [isFirstTime, setIsFirstTime] = useState(true);

  const [searchParams, setSearchParams] = useSearchParams();

  const PER_PAGE = 12

  let query = searchParams.get("q");

  useEffect(() => {

    let start_query = searchParams.get("q");

    if(start_query){
      getTheSearch(start_query);
    }

    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  async function handleSubmit(e) {
    setAllUsers({ users: [] });

    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());


    setSearchParams({"q": formJson.theSearch})   

    await getTheSearch(formJson.theSearch);
  }

  async function getTheSearch(search_user) {
    setIsFirstTime(false);
    setLoading(true);


    const url = "https://api.github.com/search/users";

    const myHeaders = new Headers();
    myHeaders.append("Accept", "application/vnd.github+json");
    myHeaders.append("Authorization", `Bearer ${gitHub_token}`);
    myHeaders.append("X-GitHub-Api-Version", "2022-11-28");

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`${url}?q=${search_user}&per_page=${PER_PAGE}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {


        console.log(result.status )

        if(result.status == undefined)
        {
          setAllUsers({
            users: result.items,
          });
          
        }

        else {
          setAllUsers({
            users: [],
          });
        }

        console.log(all_users);

        setLoading(false);
      })
      .catch((error) => console.error(error));
    
  }

  return (
    <>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        <div style={{ flexGrow: 1, textAlign: "center" }}>
          <img src="/gitHub_logo_2013.webp" />
        </div>

        <div
          style={{
            flexGrow: 1,
            justifyItems: width <= 800 ? "center" : "start",
            marginBottom: "1rem",
          }}
        >
          <h1>Quiz using GitHub API v3</h1>
          <p>
            Copy by{" "}
            <a
              href="https://github.com/k1tsanapong"
              target="_blank"
              style={{ color: "green" }}
            >
              Kitsanapong Warit
            </a>
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
          className="loader"
        ></div>
      )}

      {isFirstTime == false &&
        all_users.users.length == 0 &&
        loading == false && (
          <div style={{ justifySelf: "center" }}>
            <img src="https://media1.tenor.com/m/jotyiHEoUGUAAAAC/anime.gif" />{" "}
          </div>
        )}

      <div className="grid-container">
        {all_users.users.map((users) => (
          <div className="grid-item" key={users.id}>
            <div style={{ display: "flex", flexGrow: "2" }}>
              <div style={{ alignContent: "center" }}>
                <img src={users.avatar_url} alt="Avatar" className="avatar" />
              </div>
              <div style={{ alignContent: "center" }}>{users.login} &nbsp;</div>

              <a
                style={{ alignContent: "center" }}
                href={users.html_url}
                target="_blank"
              >
                <i className="material-icons">open_in_new</i>
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
              Score : {users.score}
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
              <a href={"/users/" + users.login} target="_blank">
                VIEW REPOSITORY
              </a>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default PageHome;
