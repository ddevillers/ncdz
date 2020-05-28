package fr.formation.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;


@Configuration
@Profile("!dev")
public class SecurityConfig extends WebSecurityConfigurerAdapter {
	
	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}

	protected void configure(HttpSecurity http) throws Exception {
			http.authorizeRequests()
			.antMatchers(HttpMethod.OPTIONS).permitAll()
			.antMatchers("/portail/**","/accueil/**").permitAll()
			.antMatchers("/api/**").permitAll()
//			.antMatchers("/api/utilisateur/**").permitAll()
//			.antMatchers("/api/**").hasAnyRole("ADMIN", "SECRETAIRE")
			.antMatchers(
					"/materiel/**",
					"/historique/**"
					).hasRole("ADMIN")
			.antMatchers("/**").hasAnyRole("ADMIN", "SECRETAIRE")
			.and().httpBasic()
			.and().csrf().disable()
			;
	}
}
