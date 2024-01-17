import { AuthContext } from 'context';
import classes from './Navigation.module.css';

const Navigation = (props) => {
  return (
    <AuthContext.Consumer>
      {(ctx) => (
        <nav className={classes.nav}>
          <ul>
            {ctx.isLoggedIn && (
              <li>
                <a href='/'>Users</a>
              </li>
            )}
            {ctx.isLoggedIn && (
              <li>
                <a href='/'>Admin</a>
              </li>
            )}
            {ctx.isLoggedIn && (
              <li>
                <button
                  onClick={
                    props.onLogout
                  }>
                  Logout
                </button>
              </li>
            )}
          </ul>
        </nav>
      )}
    </AuthContext.Consumer>
  );
};

export { Navigation };
