package fr.formation.api;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import fr.formation.dao.IDAOUtilisateur;
import fr.formation.exception.UtilisateurNotFoundException;
import fr.formation.model.Utilisateur;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/utilisateur")
public class UtilisateurApiController {
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	@Autowired
	private IDAOUtilisateur daoUtilisateur;

	@GetMapping
	public List<Utilisateur> findAll() {
		return this.daoUtilisateur.findAll();
	}

	@GetMapping("/{id}")
	public Utilisateur findById(@PathVariable int id) {
		return this.daoUtilisateur
				.findById(id)
				.orElse(new Utilisateur());
	}

	@PostMapping //("/subscribe")
	public Utilisateur add(@RequestBody Utilisateur utilisateur) {

		this.daoUtilisateur.save(utilisateur);
		return utilisateur;
	}
	
	@PostMapping("/login")
	public Utilisateur login(@RequestBody Utilisateur utilisateur) {
		Utilisateur dbUtilisateur = this.daoUtilisateur.findByLogin(utilisateur.getLogin());

		if (!passwordEncoder.matches(utilisateur.getPassword(), dbUtilisateur.getPassword())) {
			throw new UtilisateurNotFoundException();
		}

		return dbUtilisateur;
	}

	@PutMapping("/{id}")
	public Utilisateur update(@PathVariable int id, @RequestBody Utilisateur utilisateur) {
		utilisateur.setId(id);
		return this.daoUtilisateur.save(utilisateur);
	}

	@DeleteMapping("/{id}")
	public boolean delete(@PathVariable int id) {
		try {
			this.daoUtilisateur.deleteById(id);
			return true;
		}

		catch (Exception e) {
			return false;
		}
	}
	
}
