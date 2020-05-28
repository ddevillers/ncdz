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

import fr.formation.dao.IDAOMembre;
import fr.formation.dao.IDAOSaut;
import fr.formation.model.Membre;
import fr.formation.model.Saut;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/saut")
public class SautApiController {

	@Autowired
	private IDAOSaut daoSaut;
	
	@Autowired
	private IDAOMembre daoMembre;

	@GetMapping
	public List<Saut> findAll(){
		return this.daoSaut.findAll();
	}

	@GetMapping("/{id}")
	public Saut findById(@PathVariable int id) {
		return this.daoSaut.findById(id).orElse(new Saut());
	}
	
	@GetMapping("/count/{id}")
	public Long countById(@PathVariable int id) {
		return this.daoSaut.countSautParVol(id);
	}

	@PostMapping
	public Saut add(@RequestBody Saut saut) {
		this.daoSaut.save(saut);
		return saut;
	}
	
	@PostMapping("/add-beer-line/{id_saut}/{id_membre}")
	public Saut addBeerLine(@PathVariable int id_saut,
							@PathVariable long id_membre) {
		
		Membre parachutiste = this.daoMembre.findById(id_membre).orElse(new Membre());
		Saut saut = this.daoSaut.findById(id_saut).orElse(new Saut());
		saut.getBeerLine().add(parachutiste);
		return this.daoSaut.save(saut);
	}

	@PutMapping("/{id}")
	public Saut update(@PathVariable int id, @RequestBody Saut saut){
		saut.setId(id);
		return this.daoSaut.save(saut);
	}
	
	@DeleteMapping("/{id}")
	public boolean delete(@PathVariable int id) {
		try {
			this.daoSaut.deleteById(id);
			return true;
		} catch (Exception e) {return false;}
	}
}

