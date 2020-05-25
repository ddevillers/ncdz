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

import fr.formation.dao.IDAOPilote;
import fr.formation.model.Pilote;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/pilote")
public class PiloteApiController {

	@Autowired
	private IDAOPilote daoPilote;
	
	@GetMapping
	public List<Pilote> findAll(){
		return this.daoPilote.findAll();
	}
	
	@GetMapping("/{numeroLicence}")
	public Pilote findById(@PathVariable int numeroLicence) {
		return this.daoPilote.findById(numeroLicence).orElse(new Pilote());
	}
	
	@PostMapping
	public Pilote add(Pilote pilote) {
		this.daoPilote.save(pilote);
		return pilote;
	}
	
	@PutMapping("/{numeroLicence}")
	public Pilote update(@PathVariable int numeroLicence, Pilote pilote) {
		pilote.setNumeroLicence(numeroLicence);
		return this.daoPilote.save(pilote);
	}
	
	@DeleteMapping("/{numeroLicence}")
	public Boolean delete(@PathVariable int numeroLicence) {
		try {
			this.daoPilote.deleteById(numeroLicence);
		} catch (Exception e) {
			return false;
		}
		return true;
	}
}
