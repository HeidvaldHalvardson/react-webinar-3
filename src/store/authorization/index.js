import StoreModule from '../module';
import { getAuthToken } from "../../utils";

class AuthorizationState extends StoreModule {
  initState() {
    const authToken = getAuthToken()
    let isAuth = !!authToken

    return {
      isAuth,
      waiting: false,
      error: '',
    };
  }

  async signIn(login, password) {
    this.setState({
      ...this.getState(),
      waiting: true,
      error: '',
    });

    try {
      const response = await fetch('/api/v1/users/sign', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ login, password }),
      });

      const json = await response.json();

      if (!response.ok) {
        throw new Error(json.error.data.issues[0].message);
      }

      const userData = json.result.user;

      this.store.actions.user.saveUserData(userData);

      this.setState(
        {
          waiting: false,
          isAuth: true,
          error: ''
        },
        'Авторизация прошла успешно',
      );
    } catch (e) {
      this.setState({
        ...this.getState(),
        error: e.message,
        waiting: false,
      },
        'Ошибка авторизации',
      );
    }
  }

  async signOut() {
    const authToken = getAuthToken();

    this.setState({
      ...this.getState(),
      waiting: true,
      error: '',
    });

    try {
      const response = await fetch(`/api/v1/users/sign`, {
        method: 'DELETE',
        headers: {
          'X-Token': authToken,
          'Content-Type': 'application/json',
        },
      });

      const json = await response.json();

      if (!response.ok) {
        throw new Error(json.error.message);
      }

      this.store.actions.user.saveUserData({})
      document.cookie = 'token=; path=/;'

      this.setState(
        {
          ...this.getState(),
          waiting: false,
          isAuth: false
        },
        'Успешный выход из профиля'
      );

    } catch (e) {
      this.setState({
          ...this.getState(),
          error: e.message,
          waiting: false,
        },
        'Ошибка выхода из профиля',
      );
    }
  }

  clearError() {
    this.setState({
      ...this.getState(),
      error: ''
    })
  }
}

export default AuthorizationState;
