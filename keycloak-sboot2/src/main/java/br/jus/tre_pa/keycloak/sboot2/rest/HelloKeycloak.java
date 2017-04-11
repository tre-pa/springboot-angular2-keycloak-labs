package br.jus.tre_pa.keycloak.sboot2.rest;
import javax.servlet.http.HttpServletRequest;

import org.keycloak.KeycloakSecurityContext;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloKeycloak {
	private Logger log = LoggerFactory.getLogger(HelloKeycloak.class);

	@Autowired
	private HttpServletRequest req;


	@RequestMapping(method = RequestMethod.GET, path = "/api/mngt/info")
	public ResponseEntity<?> retrictedEndpoint() {
		log.info("[retrictedEndpoint] Hello Keycloak... Chamando método...");
		System.out.println("ACCESS_TOKEN/ID: " + getKeycloakSecurityContext().getToken().getId());
		System.out.println("ACCESS_TOKEN/NAME: " + getKeycloakSecurityContext().getToken().getName());
		System.out.println("ACCESS_TOKEN/GIVEN_NAME: " + getKeycloakSecurityContext().getToken().getGivenName());
		System.out.println("ACCESS_TOKEN/PROFILE: " + getKeycloakSecurityContext().getToken().getProfile());
		System.out.println("ACCESS_TOKEN/OTHER_CLAIMS: " + getKeycloakSecurityContext().getToken().getOtherClaims());
		System.out.println("ACCESS_TOKEN/REALM_ACESS/ROLES: "
				+ getKeycloakSecurityContext().getToken().getRealmAccess().getRoles());
		System.out.println("ACCESS_TOKEN/AUTHORIZATION: " + getKeycloakSecurityContext().getToken().getAuthorization());
		System.out.println(
				"ACCESS_TOKEN/RESOURCE_ACCESS: " + getKeycloakSecurityContext().getToken().getResourceAccess());
		/*
		 * System.out.println("ACCESS_TOKEN/RESOURCE_ACCESS/GET_ROLES: " +
		 * getKeycloakSecurityContext().getToken().getResourceAccess().get(
		 * "springboot-keycloak-integration").getRoles());
		 */
		System.out.println("ID_TOKEN: " + getKeycloakSecurityContext().getIdToken());
		System.out.println("AUTH_CONTEXT: " + getKeycloakSecurityContext().getAuthorizationContext());

		return ResponseEntity.ok().build();
	}


	@RequestMapping(method = RequestMethod.GET, path = "/api/info")
	public ResponseEntity<?> publicEndpoint() {

		log.info("[publicEndpoint] Chamando método...");
		return ResponseEntity.ok().build();
	}

	protected KeycloakSecurityContext getKeycloakSecurityContext() {
		return (KeycloakSecurityContext) req.getAttribute(KeycloakSecurityContext.class.getName());
	}
}