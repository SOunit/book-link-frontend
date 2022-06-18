import { lazy, Suspense, useEffect } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { ProtectedRoute } from './presentation/components/molecules';
import { Layout } from './presentation/components/organisms';
import { SearchUsers, Login } from './presentation/pages';
import { useAuthStorage, useSocketAdapter } from './services';
import './App.css';

const Home = lazy(() =>
  import('./presentation/pages/home/home').then(({ Home }) => ({
    default: Home,
  })),
);

const PageNotFound = lazy(() =>
  import('./presentation/pages/page-not-found/page-not-found').then(
    ({ PageNotFound }) => ({
      default: PageNotFound,
    }),
  ),
);

const UserDetail = lazy(() =>
  import('./presentation/pages/user-detail/user-detail').then(
    ({ UserDetail }) => ({
      default: UserDetail,
    }),
  ),
);

const EditUser = lazy(() =>
  import('./presentation/pages/edit-user/edit-user').then(({ EditUser }) => ({
    default: EditUser,
  })),
);

const EditUserItems = lazy(() =>
  import('./presentation/pages/edit-user-items/edit-user-items').then(
    ({ EditUserItems }) => ({
      default: EditUserItems,
    }),
  ),
);

const Chat = lazy(() =>
  import('./presentation/pages/chat/chat').then(({ Chat }) => ({
    default: Chat,
  })),
);

const ChatList = lazy(() =>
  import('./presentation/pages/chat-list/chat-list').then(({ ChatList }) => ({
    default: ChatList,
  })),
);

const CreateItem = lazy(() =>
  import('./presentation/pages/create-item/create-item').then(
    ({ CreateItem }) => ({
      default: CreateItem,
    }),
  ),
);

const Follow = lazy(() =>
  import('./presentation/pages/follow/follow').then(({ Follow }) => ({
    default: Follow,
  })),
);

function App() {
  const { socket } = useSocketAdapter();
  const authStorage = useAuthStorage();
  const { token } = authStorage;

  useEffect(() => {
    document.title = 'Book Link';
  });

  useEffect(() => {
    if (socket) {
      socket.emit('join', token);
    }
  }, [token, socket]);

  return (
    <Layout>
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route path="/login">
            {authStorage.isLoggedIn ? <Redirect to="/" /> : <Login />}
          </Route>
          {/* Search */}
          <ProtectedRoute component={SearchUsers} path="/" exact />
          <ProtectedRoute component={SearchUsers} path="/search" />

          {/* Users */}
          <ProtectedRoute component={EditUser} path="/users/edit" />
          <ProtectedRoute component={EditUserItems} path="/users/items/edit" />
          <ProtectedRoute component={Follow} path="/users/:userId/followings" />
          <ProtectedRoute component={Follow} path="/users/:userId/followers" />
          <ProtectedRoute component={UserDetail} path="/users/:userId" />

          {/* Home */}
          <ProtectedRoute component={Home} path="/home" />

          {/* Items */}
          <ProtectedRoute component={CreateItem} path="/items/new" />

          {/* Chats */}
          <ProtectedRoute component={ChatList} path="/chats" exact />
          <ProtectedRoute
            component={Chat}
            path="/chats/:userId"
            socket={socket}
          />

          {/* Page Not Found */}
          <Route path="*">
            <PageNotFound />
          </Route>
        </Switch>
      </Suspense>
    </Layout>
  );
}

export default App;
