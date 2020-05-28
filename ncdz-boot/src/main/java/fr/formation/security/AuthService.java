package fr.formation.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;



import fr.formation.dao.IDAOUtilisateur;
import fr.formation.model.Utilisateur;

@Service
public class AuthService implements UserDetailsService {
	
	@Autowired
	private IDAOUtilisateur daoUtilisateur;
	
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException { 
		Utilisateur utilisateur = this.daoUtilisateur.findByLogin(username);
		
		UserDetails userDetails = new UserPrincipal(utilisateur);
		
		return userDetails;
	}
	
}