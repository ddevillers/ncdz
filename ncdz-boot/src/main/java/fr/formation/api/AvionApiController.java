package fr.formation.api;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import fr.formation.dao.IDAOAvion;
import fr.formation.model.Avion;


@RestController
@CrossOrigin("*")
@RequestMapping("/api/avion")
public class AvionApiController {

	@Autowired
	private IDAOAvion daoAvion;

	@GetMapping
	public List<Avion> findAll() {
		return this.daoAvion.findAll();
	}

	@GetMapping("/{id}")
	public Avion findById(@PathVariable int id) {
		return this.daoAvion
				.findById(id)
				.orElse(new Avion());
	}

	@PostMapping
	public Avion add(@RequestBody Avion avion) {

		this.daoAvion.save(avion);
		return avion;
	}

	@PutMapping("/{id}")
	public Avion update(@PathVariable int id, @RequestBody Avion avion) {
		avion.setId(id);
		return this.daoAvion.save(avion);
	}

	@DeleteMapping("/{id}")
	public boolean delete(@PathVariable int id) {
		try {
			this.daoAvion.deleteById(id);
			return true;
		}

		catch (Exception e) {
			return false;
		}
	}
	
	@GetMapping("/dispo")
	public List<Avion> findAvionDispo() {
		return this.daoAvion.findByEtat(true);
	}
}