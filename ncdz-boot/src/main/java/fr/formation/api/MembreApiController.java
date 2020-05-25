package fr.formation.api;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import fr.formation.dao.IDAOMembre;
import fr.formation.model.Membre;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/membre")
public class MembreApiController {

	@Autowired
	private IDAOMembre daoMembre;
	
	@GetMapping
	public List<Membre> findAll(){
		return this.daoMembre.findAll();
	}
	
	@GetMapping("/{numeroLicence}")
	public Membre findById(@PathVariable int numeroLicence) {
		return this.daoMembre.findById(numeroLicence).orElse(new Membre());
	}
	
	@PostMapping
	public Membre add(Membre membre) {
		this.daoMembre.save(membre);
		return membre;
	}
	
	@PutMapping("/{numeroLicence}")
	public Membre update(@PathVariable int numeroLicence, Membre membre) {
		membre.setNumeroLicence(numeroLicence);
		return this.daoMembre.save(membre);
	}
	
	@DeleteMapping("/{numeroLicence}")
	public Boolean delete(@PathVariable int numeroLicence) {
		try {
			this.daoMembre.deleteById(numeroLicence);
		} catch (Exception e) {
			return false;
		}
		return true;
	}
}
