function SearchedUserCard(users) {
  return (
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
  );
}

export default SearchedUserCard;
