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

import fr.formation.dao.IDAOParachute;
import fr.formation.model.Parachute;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/parachute")
public class ParachuteApiController {

	@Autowired
	private IDAOParachute daoParachute;

	@GetMapping
	public List<Parachute> findAll(){
		return this.daoParachute.findAll();
	}

	@GetMapping("/{id}")
	public Parachute findById(@PathVariable int id) {
		return this.daoParachute.findById(id).orElse(new Parachute());
	}

	@PostMapping
	public Parachute add(@RequestBody Parachute parachute) {
		this.daoParachute.save(parachute);
		return parachute;
	}

	@PutMapping("/{id}")
	public Parachute update(@PathVariable int id, @RequestBody Parachute parachute){
		parachute.setId(id);
		return this.daoParachute.save(parachute);
	}
	
	@DeleteMapping("/{id}")
	public boolean delete(@PathVariable int id) {
		try {
			this.daoParachute.deleteById(id);
			return true;
		} catch (Exception e) {return false;}
	}
}
