import { Injectable } from "@angular/core";


declare var Keycloak: any;

@Injectable()
export class KeycloakService {
    static auth: any = {};

  static init(): Promise<any> {
    let keycloakAuth: any = new Keycloak('keycloak/keycloak.json');
    KeycloakService.auth.loggedIn = false;

      return new Promise((resolve, reject) => {
        keycloakAuth.init({ onLoad: 'login-required' })
          .success(() => {
            KeycloakService.auth.loggedIn = true;
            KeycloakService.auth.authz = keycloakAuth;
            KeycloakService.auth.logoutUrl = keycloakAuth.authServerUrl + "/realms/demo/protocol/openid-connect/logout?redirect_uri=http://localhost:4200";
            resolve();
          })
          .error(() => {
            reject();
          });
      });
    }

  logout() {
    console.log('*** LOGOUT');
    KeycloakService.auth.loggedIn = false;
    KeycloakService.auth.authz = null;

    window.location.href = KeycloakService.auth.logoutUrl;
  }

  getToken(): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      if (KeycloakService.auth.authz.token) {
        KeycloakService.auth.authz.updateToken(5)
          .success(() => {
            resolve(<string>KeycloakService.auth.authz.token);
          })
          .error(() => {
            reject('Failed to refresh token');
          });
      }
    });
  }

    
    getLoadUserInfo() {
        console.log("loading...")
        KeycloakService.auth.authz.loadUserInfo().success(function (userInfo) {
            console.log(userInfo);
        }).error(function () {
            console.log('Failed to load user info');
        })
    }

   
    getHasResourceRole(role: string) {
        console.log(KeycloakService.auth.authz.hasResourceRole(role, 'spring-boot'));
    }
}