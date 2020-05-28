package fr.formation.api;

import java.time.LocalDate;
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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import fr.formation.dao.IDAOMembre;
import fr.formation.dao.IDAOParachute;
import fr.formation.model.Membre;
import fr.formation.model.Parachute;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/parachute")
public class ParachuteApiController {

	@Autowired
	private IDAOParachute daoParachute;
	
	@Autowired
	private IDAOMembre daoMembre;

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
	
	@PostMapping("/pliage/{id_membre}/{id_parachute}/{secHaveBeenUsed}")
	public Parachute pliage(@PathVariable long id_membre, 
							@PathVariable int id_parachute,
							@PathVariable boolean secHaveBeenUsed) {
		
		Parachute parachute = this.daoParachute.findById(id_parachute).orElse(new Parachute());
		if (secHaveBeenUsed) {
			parachute.setPlieurVoileSec(this.daoMembre.findById(id_membre).orElse(new Membre()));
			parachute.setDatePliageVoileSec(LocalDate.now());
		} 
		parachute.setDispo(true);
		return this.daoParachute.save(parachute);
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
	
	@PutMapping("/etatFalse/{id}")
	public Parachute etatFalse(@PathVariable int id){
		Parachute parachute = this.daoParachute.findById(id).orElse(new Parachute());
		parachute.setDispo(false);
		return this.daoParachute.save(parachute);
	}
	
	@PutMapping("/etatTrue/{id}")
	public Parachute etatTrue(@PathVariable int id){
		Parachute parachute = this.daoParachute.findById(id).orElse(new Parachute());
		parachute.setDispo(true);
		return this.daoParachute.save(parachute);
	}
}
