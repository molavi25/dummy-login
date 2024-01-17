import {
  Button,
  Card,
} from 'components';
import { AuthContext } from 'context';
import { useContext } from 'react';
import classes from './Home.module.css';

const Home = () => {
  const ctx = useContext(AuthContext);

  return (
    <Card className={classes.home}>
      <h1>Welcome back!</h1>
      <Button onClick={ctx.onLogout}>
        Logout
      </Button>
    </Card>
  );
};

export { Home };
