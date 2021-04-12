import React from "react";

import NavLinks from "./components/navLink";

export default class FavoriteList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { favorites } = this.props;
    return (
      <div>
        <NavLinks />
        <ul>
          {favorites.map(user => {
            return (
              <li key={user.id}>
                <div>
                  <img className="thumb" alt="" src={user._links.avatar.href} />
                </div>

                <div className="userInfo">
                  <p>
                    {user.first_name} {user.last_name}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}


const domContainer = document.querySelector('Favorites');ReactDOM.render(e(LikeButton), domContainer);