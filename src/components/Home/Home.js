import {
  Button,
  Card,
} from 'components';
import classes from './Home.module.css';

const Home = (props) => {
  return (
    <Card className={classes.home}>
      <h1>Welcome back!</h1>
      <Button onClick={props.onLogout}>
        Logout
      </Button>
    </Card>
  );
};

export { Home };
