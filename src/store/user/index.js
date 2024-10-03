import StoreModule from '../module';
import { getAuthToken } from "../../utils";

class UserState extends StoreModule {
  initState() {
    return {
      data: {},
      waiting: false,
      error: ''
    };
  }

  saveUserData(userData) {
    this.setState({
      ...this.getState(),
      data: userData,
      waiting: false,
      error: ''
    }, 'Профиль успешно загружен');
  }

  async getUser() {
    const authToken = getAuthToken();
    
    this.setState({
      ...this.getState(),
      waiting: true,
    })
    try {
      const response = await fetch(`/api/v1/users/self`, {
        method: 'GET',
        headers: {
          'X-Token': authToken,
          'Content-Type': 'application/json',
        },
      });

      const json = await response.json();

      if (!response.ok) {
        throw new Error(json.error.message);
      }

      this.saveUserData(json.result);

    } catch (e) {
      this.setState(
        {
          ...this.getState(),
          error: e.message,
          waiting: false,
        },
        'Ошибка авторизации'
      );
    }
  }
}

export default UserState;
