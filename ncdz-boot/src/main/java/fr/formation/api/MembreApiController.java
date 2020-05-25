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
	
	@GetMapping("/{id}")
	public Membre findById(@PathVariable int id) {
		return this.daoMembre.findById(id).orElse(new Membre());
	}
	
	@PostMapping
	public Membre add(Membre membre) {
		this.daoMembre.save(membre);
		return membre;
	}
	
	@PutMapping("/{id}")
	public Membre update(@PathVariable int id, Membre membre) {
		membre.setId(id);
		return this.daoMembre.save(membre);
	}
	
	@DeleteMapping("/{id}")
	public Boolean delete(@PathVariable int id) {
		try {
			this.daoMembre.deleteById(id);
		} catch (Exception e) {
			return false;
		}
		return true;
	}
}
