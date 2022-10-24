import PropTypes from 'prop-types';
import Link from 'next/link';
import Toolbar from '@mui/material/Toolbar';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Hidden from '@mui/material/Hidden';
import MenuWithAvatar from './MenuWithAvatar';
import { styleToolbar } from './SharedStyles';
/* import { user } from '../server/models/User'; */

const optionsMenuCustomer = [
  {
    text: 'My books',
    href: '/customer/my-books',
    as: '/my-books',
  },
  {
    text: 'Log out',
    href: '/logout',
    anchor: true,
  },
];

const optionsMenuAdmin = [
  {
    text: 'Admin',
    href: '/admin',
    as: '/admin',
  },
  {
    text: 'Log out',
    href: '/logout',
    anchor: true,
  },
];

const propTypes = {
  user: PropTypes.shape({
    avatarUrl: PropTypes.string,
    displayName: PropTypes.string,
    isAdmin: PropTypes.bool,
    isGithubConnected: PropTypes.bool,
  }),
};

const defaultProps = {
  user: null,
};

function Header({ user }) {
  return (
    <div>
      <Toolbar style={styleToolbar}>
        <Grid item sm={9} xs={8} style={{ textAlign: 'left' }}>
          {!user ? (
            <Link href="/">
              <Avatar
                src="https://storage.googleapis.com/builderbook/logo.svg"
                alt="Builder Book logo"
                style={{ margin: '0px auto 0px 20px', cursor: 'pointer' }}
              />
            </Link>
          ) : null}
        </Grid>
        <Grid item sm={2} xs={2} style={{ textAlign: 'right' }}>
          {user && user.isAdmin && !user.isGithubConnected ? (
            <Hidden mdDown>
              <a href="/auth/github">
                <Button variant="contained" color="primary">
                  Connect Github
                </Button>
              </a>
            </Hidden>
          ) : null}
        </Grid>
        <Grid item sm={1} xs={2} style={{ textAlign: 'right' }}>
          {user ? (
            <div style={{ whiteSpace: 'nowrap' }}>
              {!user.isAdmin ? (
                <MenuWithAvatar
                  options={optionsMenuCustomer}
                  src={user.avatarUrl}
                  alt={user.displayName}
                />
              ) : null}
              {user.isAdmin ? (
                <MenuWithAvatar
                  options={optionsMenuAdmin}
                  src={user.avatarUrl}
                  alt={user.displayName}
                />
              ) : null}
            </div>
          ) : (
            <Link href="/public/login" as="/login">
              <a style={{ margin: '0px 20px 0px auto' }}>Log in</a>
            </Link>
          )}
        </Grid>
      </Toolbar>
    </div>
  );
}

Header.propTypes = propTypes;
Header.defaultProps = defaultProps;

export default Header;
